
import { useState } from "react";
import { mockUserSettings } from "@/data/mockData";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Download, Moon, Sun, Upload, User, LogIn, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useTheme } from "@/components/ThemeProvider";
import { useAuth } from "@/contexts/AuthContext";

const Settings = () => {
  const [settings, setSettings] = useState({ ...mockUserSettings });
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const { user, loading, signInWithGoogle, signOut } = useAuth();

  const currencies = [
    { value: "AED", label: "UAE Dirham (AED)" },
    { value: "USD", label: "US Dollar ($)" },
    { value: "EUR", label: "Euro (€)" },
    { value: "GBP", label: "British Pound (£)" },
    { value: "INR", label: "Indian Rupee (₹)" },
  ];

  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your settings have been saved successfully.",
    });
  };

  const handleBackupData = () => {
    toast({
      title: "Backup created",
      description: "Your data has been backed up successfully.",
    });
  };

  const handleRestoreData = () => {
    toast({
      title: "Data restored",
      description: "Your data has been restored successfully.",
    });
  };

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
      toast({
        title: "Signing in...",
        description: "Redirecting to Google for authentication.",
      });
    } catch (error) {
      toast({
        title: "Sign in failed",
        description: "Failed to sign in with Google. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
    } catch (error) {
      toast({
        title: "Sign out failed",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="main-container animate-fade-in">
      <PageHeader 
        title="Settings" 
        subtitle="Manage your account and preferences"
        rightElement={<ThemeToggle />}
      />

      <div className="grid gap-6">
        {/* Authentication Section */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-propertyBlue" />
              <CardTitle>Authentication</CardTitle>
            </div>
            <CardDescription>
              Sign in to sync your data across devices
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-4">Loading...</div>
            ) : user ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {user.user_metadata?.avatar_url && (
                    <img 
                      src={user.user_metadata.avatar_url} 
                      alt="Profile" 
                      className="w-10 h-10 rounded-full"
                    />
                  )}
                  <div>
                    <p className="font-medium">{user.user_metadata?.full_name || user.email}</p>
                    <p className="text-sm text-slate-500">{user.email}</p>
                  </div>
                </div>
                <Button variant="outline" onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-slate-600 mb-4">Sign in to access your personalized settings</p>
                <Button onClick={handleSignIn}>
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign in with Google
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Profile Settings */}
        {user && (
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-propertyBlue" />
                <CardTitle>Profile</CardTitle>
              </div>
              <CardDescription>
                Manage your personal information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input 
                    id="name" 
                    value={user.user_metadata?.full_name || settings.name}
                    onChange={(e) => setSettings({...settings, name: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email"
                    value={user.email || ''}
                    disabled
                    className="bg-gray-50"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Preferences Settings */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Moon className="h-5 w-5 text-propertyPurple" />
              <CardTitle>Preferences</CardTitle>
            </div>
            <CardDescription>
              Customize your app experience
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Dark Mode</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Toggle dark theme</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm">{theme === "dark" ? "On" : "Off"}</span>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  >
                    {theme === "dark" ? (
                      <Moon className="h-5 w-5" />
                    ) : (
                      <Sun className="h-5 w-5" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="currency">Currency</Label>
                <Select 
                  value={settings.currency} 
                  defaultValue="AED"
                  onValueChange={(currency) => setSettings({...settings, currency})}
                >
                  <SelectTrigger id="currency">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((currency) => (
                      <SelectItem key={currency.value} value={currency.value}>
                        {currency.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-propertyOrange" />
              <CardTitle>Notifications</CardTitle>
            </div>
            <CardDescription>
              Manage your notification preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Enable Notifications</h4>
                  <p className="text-sm text-slate-500">Get reminders for payments and lease ends</p>
                </div>
                <Switch 
                  checked={settings.notificationsEnabled} 
                  onCheckedChange={(checked) => setSettings({...settings, notificationsEnabled: checked})}
                />
              </div>

              {settings.notificationsEnabled && (
                <div className="grid gap-2">
                  <Label htmlFor="reminderDays">Reminder Days</Label>
                  <div className="flex items-center gap-2">
                    <Input 
                      id="reminderDays"
                      type="number" 
                      min="1"
                      max="30"
                      value={settings.reminderDays}
                      onChange={(e) => setSettings({...settings, reminderDays: parseInt(e.target.value)})}
                      className="w-20"
                    />
                    <span className="text-sm text-slate-500">days before due date</span>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Backup Settings */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Download className="h-5 w-5 text-propertyGreen" />
              <CardTitle>Data Backup</CardTitle>
            </div>
            <CardDescription>
              Backup and restore your property data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <Button variant="outline" onClick={handleBackupData} className="w-full sm:w-auto">
                <Download className="mr-2 h-4 w-4" />
                Backup Data
              </Button>
              <Button variant="outline" onClick={handleRestoreData} className="w-full sm:w-auto">
                <Upload className="mr-2 h-4 w-4" />
                Restore Data
              </Button>
            </div>
          </CardContent>
        </Card>

        {user && (
          <div className="flex justify-end mt-4">
            <Button onClick={handleSaveSettings}>Save Settings</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
