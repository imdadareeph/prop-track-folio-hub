
-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  username VARCHAR(100),
  full_name VARCHAR(255),
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create properties table
CREATE TABLE IF NOT EXISTS public.properties (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  name VARCHAR(255) NOT NULL,
  address TEXT NOT NULL,
  city VARCHAR(100) NOT NULL,
  state VARCHAR(100) NOT NULL,
  zip VARCHAR(20),
  size DECIMAL(10,2) NOT NULL,
  size_unit VARCHAR(10) DEFAULT 'sqft' CHECK (size_unit IN ('sqft', 'sqm')),
  type VARCHAR(20) NOT NULL CHECK (type IN ('apartment', 'villa', 'house', 'land', 'commercial')),
  status VARCHAR(20) NOT NULL CHECK (status IN ('rented', 'owned', 'construction')),
  purchase_date DATE,
  rented_since DATE,
  lease_end DATE,
  monthly_rent DECIMAL(12,2),
  down_payment DECIMAL(12,2),
  current_value DECIMAL(12,2) NOT NULL,
  initial_value DECIMAL(12,2),
  notes TEXT,
  primary_image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create property_images table
CREATE TABLE IF NOT EXISTS public.property_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE NOT NULL,
  image_url TEXT NOT NULL,
  alt_text VARCHAR(255),
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create property_documents table
CREATE TABLE IF NOT EXISTS public.property_documents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE NOT NULL,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(20) NOT NULL CHECK (type IN ('deed', 'agreement', 'noc', 'tax', 'other')),
  document_url TEXT NOT NULL,
  upload_date TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create property_tags table
CREATE TABLE IF NOT EXISTS public.property_tags (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE NOT NULL,
  tag VARCHAR(100) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create payments table
CREATE TABLE IF NOT EXISTS public.payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  amount DECIMAL(12,2) NOT NULL,
  type VARCHAR(20) NOT NULL CHECK (type IN ('rent', 'emi', 'maintenance', 'tax', 'society', 'utility', 'other')),
  status VARCHAR(20) NOT NULL CHECK (status IN ('paid', 'upcoming', 'overdue')),
  due_date DATE NOT NULL,
  paid_date DATE,
  mode VARCHAR(20) CHECK (mode IN ('cash', 'bank', 'card', 'upi', 'other')),
  recurring BOOLEAN DEFAULT false,
  frequency VARCHAR(20) CHECK (frequency IN ('monthly', 'quarterly', 'yearly')),
  notes TEXT,
  receipt_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_properties_user_id ON public.properties(user_id);
CREATE INDEX IF NOT EXISTS idx_property_images_property_id ON public.property_images(property_id);
CREATE INDEX IF NOT EXISTS idx_property_documents_property_id ON public.property_documents(property_id);
CREATE INDEX IF NOT EXISTS idx_property_tags_property_id ON public.property_tags(property_id);
CREATE INDEX IF NOT EXISTS idx_payments_property_id ON public.payments(property_id);
CREATE INDEX IF NOT EXISTS idx_payments_user_id ON public.payments(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_due_date ON public.payments(due_date);

-- Enable Row Level Security on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Create RLS policies for properties
CREATE POLICY "Users can view own properties" ON public.properties
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own properties" ON public.properties
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own properties" ON public.properties
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own properties" ON public.properties
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for property_images
CREATE POLICY "Users can view images of own properties" ON public.property_images
  FOR SELECT USING (
    property_id IN (
      SELECT id FROM public.properties WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert images for own properties" ON public.property_images
  FOR INSERT WITH CHECK (
    property_id IN (
      SELECT id FROM public.properties WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update images of own properties" ON public.property_images
  FOR UPDATE USING (
    property_id IN (
      SELECT id FROM public.properties WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete images of own properties" ON public.property_images
  FOR DELETE USING (
    property_id IN (
      SELECT id FROM public.properties WHERE user_id = auth.uid()
    )
  );

-- Create RLS policies for property_documents
CREATE POLICY "Users can view documents of own properties" ON public.property_documents
  FOR SELECT USING (
    property_id IN (
      SELECT id FROM public.properties WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert documents for own properties" ON public.property_documents
  FOR INSERT WITH CHECK (
    property_id IN (
      SELECT id FROM public.properties WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update documents of own properties" ON public.property_documents
  FOR UPDATE USING (
    property_id IN (
      SELECT id FROM public.properties WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete documents of own properties" ON public.property_documents
  FOR DELETE USING (
    property_id IN (
      SELECT id FROM public.properties WHERE user_id = auth.uid()
    )
  );

-- Create RLS policies for property_tags
CREATE POLICY "Users can view tags of own properties" ON public.property_tags
  FOR SELECT USING (
    property_id IN (
      SELECT id FROM public.properties WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert tags for own properties" ON public.property_tags
  FOR INSERT WITH CHECK (
    property_id IN (
      SELECT id FROM public.properties WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update tags of own properties" ON public.property_tags
  FOR UPDATE USING (
    property_id IN (
      SELECT id FROM public.properties WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete tags of own properties" ON public.property_tags
  FOR DELETE USING (
    property_id IN (
      SELECT id FROM public.properties WHERE user_id = auth.uid()
    )
  );

-- Create RLS policies for payments
CREATE POLICY "Users can view own payments" ON public.payments
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own payments" ON public.payments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own payments" ON public.payments
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own payments" ON public.payments
  FOR DELETE USING (auth.uid() = user_id);

-- Function to handle user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create profile on user signup
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_properties_updated_at BEFORE UPDATE ON public.properties
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON public.payments
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
