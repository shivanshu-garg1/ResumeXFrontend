import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload as UploadIcon, FileText, CheckCircle, Briefcase, Target } from "lucide-react";

const Upload = () => {
  return (
    <div className="min-h-screen bg-secondary/30 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Upload & Analyze Your Resume
          </h1>
          <p className="text-xl text-muted-foreground">
            Upload your resume and job description for comprehensive ATS analysis
          </p>
        </div>

        <Tabs defaultValue="upload" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload" className="flex items-center gap-2">
              <UploadIcon className="h-4 w-4" />
              Upload Files
            </TabsTrigger>
            <TabsTrigger value="paste" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Paste Text
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Resume Upload */}
              <Card className="gradient-card border-0 shadow-elegant">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Upload Resume
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-2 border-dashed border-primary/30 rounded-lg p-8 text-center hover:border-primary/50 transition-smooth cursor-pointer">
                    <UploadIcon className="h-10 w-10 text-primary mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">Drop your resume here</h3>
                    <p className="text-sm text-muted-foreground mb-3">or click to browse files</p>
                    <Button variant="outline" size="sm">Choose Resume File</Button>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <span>PDF and DOCX supported</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <span>Max file size: 10MB</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Job Description Upload */}
              <Card className="gradient-card border-0 shadow-elegant">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-accent" />
                    Upload Job Description
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-2 border-dashed border-accent/30 rounded-lg p-8 text-center hover:border-accent/50 transition-smooth cursor-pointer">
                    <Target className="h-10 w-10 text-accent mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">Drop job description</h3>
                    <p className="text-sm text-muted-foreground mb-3">or click to browse files</p>
                    <Button variant="outline" size="sm">Choose JD File</Button>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <span>PDF, DOCX, TXT supported</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <span>Optional but recommended</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="paste" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Resume Text Input */}
              <Card className="gradient-card border-0 shadow-elegant">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Resume Text
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Label htmlFor="resumeText">Paste your resume content</Label>
                    <Textarea
                      id="resumeText"
                      placeholder="Paste your resume text here..."
                      className="min-h-48 transition-smooth focus:shadow-card"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Job Description Text Input */}
              <Card className="gradient-card border-0 shadow-elegant">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-accent" />
                    Job Description Text
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Label htmlFor="jobText">Paste job description (optional)</Label>
                    <Textarea
                      id="jobText"
                      placeholder="Paste the job description here for better keyword analysis..."
                      className="min-h-48 transition-smooth focus:shadow-card"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <Button 
            size="lg" 
            className="shadow-elegant hover:shadow-glow transition-smooth"
            onClick={() => window.location.href = '/report'}
          >
            <Target className="mr-2 h-5 w-5" />
            Analyze Resume
          </Button>
          <Button variant="outline" size="lg">
            Save for Later
          </Button>
        </div>

        {/* Security & Privacy */}
        <Card className="gradient-card border-0 shadow-card mt-8">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <CheckCircle className="h-6 w-6 text-success mt-1" />
              <div>
                <h4 className="font-semibold mb-2">Your Privacy is Protected</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                  <div>• Files are processed securely and deleted after analysis</div>
                  <div>• No data is shared with third parties</div>
                  <div>• All analysis happens in real-time</div>
                  <div>• Optional account creation for saving results</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Upload;