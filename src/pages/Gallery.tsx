
import { useState } from "react";
import { mockProperties } from "@/data/mockData";
import PageHeader from "@/components/PageHeader";
import MediaCard from "@/components/MediaCard";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Upload } from "lucide-react";

const Gallery = () => {
  const [propertyFilter, setPropertyFilter] = useState("all");
  const [mediaType, setMediaType] = useState("photos");

  // Collect all images and documents from properties
  const allMedia = mockProperties.reduce((acc, property) => {
    const propertyImages = property.images.map(url => ({
      id: `img-${url}`,
      propertyId: property.id,
      propertyName: property.name,
      title: `${property.name} - Photo`,
      url,
      type: "image" as const,
      date: property.purchaseDate || property.rentedSince
    }));

    const propertyDocs = property.documents.map(doc => ({
      id: doc.id,
      propertyId: property.id,
      propertyName: property.name,
      title: doc.name,
      url: doc.url,
      type: "document" as const,
      date: doc.uploadDate
    }));

    return [...acc, ...propertyImages, ...propertyDocs];
  }, [] as Array<{
    id: string;
    propertyId: string;
    propertyName: string;
    title: string;
    url: string;
    type: "image" | "document";
    date?: string;
  }>);

  const filteredMedia = allMedia.filter(media => {
    // Apply property filter
    const matchesProperty = propertyFilter === "all" || media.propertyId === propertyFilter;
    
    // Apply media type filter
    const matchesType = 
      (mediaType === "photos" && media.type === "image") ||
      (mediaType === "documents" && media.type === "document");
    
    return matchesProperty && matchesType;
  });

  return (
    <div className="main-container animate-fade-in">
      <PageHeader 
        title="Gallery" 
        subtitle="Manage property photos and documents"
        rightElement={
          <Button size="sm" className="flex items-center gap-1">
            <Upload className="h-4 w-4" /> Upload
          </Button>
        }
      />
      
      <div className="mb-6">
        <div className="mb-4">
          <Select value={propertyFilter} onValueChange={setPropertyFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by property" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Properties</SelectItem>
              {mockProperties.map(property => (
                <SelectItem key={property.id} value={property.id}>{property.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <Tabs defaultValue="photos" onValueChange={setMediaType}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="photos">Photos</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div>
        {filteredMedia.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No media found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredMedia.map(media => (
              <MediaCard 
                key={media.id}
                title={media.title}
                url={media.url}
                type={media.type}
                date={media.date}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
