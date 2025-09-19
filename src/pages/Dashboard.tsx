import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Upload, Edit, BarChart3, Plus } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">Manage your resumes and track your progress</p>
          </div>
          <Button 
            size="lg" 
            className="shadow-elegant hover:shadow-glow transition-smooth"
            onClick={() => window.location.href = '/dashboard'}
          >
            <Plus className="mr-2 h-5 w-5" />
            Upload New Resume
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card 
            className="gradient-card border-0 shadow-card hover:shadow-elegant transition-smooth group cursor-pointer"
            onClick={() => window.location.href = '/upload'}
          >
            <CardContent className="p-6 text-center">
              <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto mb-4 group-hover:bg-primary/20 transition-smooth">
                <Upload className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Upload Resume</h3>
              <p className="text-sm text-muted-foreground">Upload and analyze a new resume</p>
            </CardContent>
          </Card>

          <Card 
            className="gradient-card border-0 shadow-card hover:shadow-elegant transition-smooth group cursor-pointer"
            onClick={() => window.location.href = '/editor'}
          >
            <CardContent className="p-6 text-center">
              <div className="p-3 bg-accent/10 rounded-full w-fit mx-auto mb-4 group-hover:bg-accent/20 transition-smooth">
                <Edit className="h-8 w-8 text-accent" />
              </div>
              <h3 className="font-semibold mb-2">Resume Editor</h3>
              <p className="text-sm text-muted-foreground">Edit and optimize your resume</p>
            </CardContent>
          </Card>

          <Card 
            className="gradient-card border-0 shadow-card hover:shadow-elegant transition-smooth group cursor-pointer"
            onClick={() => window.location.href = '/report'}
          >
            <CardContent className="p-6 text-center">
              <div className="p-3 bg-success/10 rounded-full w-fit mx-auto mb-4 group-hover:bg-success/20 transition-smooth">
                <BarChart3 className="h-8 w-8 text-success" />
              </div>
              <h3 className="font-semibold mb-2">View Reports</h3>
              <p className="text-sm text-muted-foreground">Check ATS compatibility scores</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="gradient-card border-0 shadow-card">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No resumes uploaded yet. Upload your first resume to get started!</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;