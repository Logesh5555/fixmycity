import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { currentUser } from "@/lib/data";

export default function SettingsPage() {
  const appVersion = "1.0.0"; // Mock version

  return (
    <div className="flex flex-1 flex-col gap-6">
      <header>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account and application settings.
        </p>
      </header>
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>This is how others will see you on the site.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue={currentUser.name} suppressHydrationWarning />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue={currentUser.email} readOnly suppressHydrationWarning />
              </div>
              <Button suppressHydrationWarning>Update Profile</Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
            <CardDescription>Customize your experience.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select defaultValue="en">
                  <SelectTrigger id="language" suppressHydrationWarning>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button suppressHydrationWarning>Save Preferences</Button>
            </form>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle>About FixMyCity</CardTitle>
                <CardDescription>Information about the application.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">App Version</span>
                    <span className="text-sm font-medium">{appVersion}</span>
                </div>
                <Separator />
                 <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Framework</span>
                    <span className="text-sm font-medium">Next.js</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">UI Library</span>
                    <span className="text-sm font-medium">ShadCN UI</span>
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
