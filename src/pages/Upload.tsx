import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Upload as UploadIcon, FileText, CheckCircle, Briefcase, Target } from "lucide-react";

type SectionScore = {
  score: number;          
  comments: string;       
};

export type AtsAnalysisResponse = {
  atsScore: number;             
  atsDescription: string;       
  recommendations: string[];    
  matchedKeywords: string[];    
  missingKeywords: string[];   
  sections: {
    summary?: SectionScore;
    experience?: SectionScore;
    skills?: SectionScore;
    education?: SectionScore;
    projects?: SectionScore;
    [key: string]: SectionScore | undefined;
  };
};

const Upload = () => {
  const navigate = useNavigate();


  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jdFile, setJdFile] = useState<File | null>(null);

 
  const [resumeText, setResumeText] = useState("");
  const [jobText, setJobText] = useState("");


  const [activeTab, setActiveTab] = useState<"upload" | "paste">("upload");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resumeInputRef = useRef<HTMLInputElement | null>(null);
  const jdInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
  if (!error) return;

  const timer = setTimeout(() => {
    setError(null);
  }, 3000); 

  return () => clearTimeout(timer);
}, [error]);

 
const handleAnalyze = async () => {
  try {
    setLoading(true);
    // setError(null);

    const formData = new FormData();

    if (activeTab === "upload") {
      if (!resumeFile) {
    
        setError("Please upload your resume file.");
        console.log(error);
        setLoading(false);

        return;
      }
      formData.append("mode", "upload");
      formData.append("resume", resumeFile);
      if (jdFile) formData.append("jobDescription", jdFile);
    } else {
      if (!resumeText.trim()) {
        
        setError("Please paste your resume text.");
        setLoading(false);
        return;
      }
      formData.append("mode", "paste");
      formData.append("resumeText", resumeText);
      if (jobText.trim()) formData.append("jobText", jobText);
    }

    const res = await fetch("http://localhost:5000/api/ats/upload", {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.message || "Failed to analyze resume");
    }

    const data: AtsAnalysisResponse = await res.json();

    setError(null);
    // console.log(data);

    navigate("/report", { state: { analysis: data } });
  } catch (err: any) {
    console.error(err);
    setError(err.message || "Something went wrong while analyzing.");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-secondary/30 p-4">
      <div className="max-w-4xl mx-auto">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Upload & Analyze Your Resume
          </h1>
          <p className="text-xl text-muted-foreground">
            Upload your resume and job description for comprehensive ATS analysis
          </p>
        </div>

        <Tabs
          defaultValue="upload"
          className="space-y-6"
          value={activeTab}
          onValueChange={(val) => setActiveTab(val as "upload" | "paste")}
        >
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
              <Card className="gradient-card border-0 shadow-elegant">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Upload Resume
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div
                    className="border-2 border-dashed border-primary/30 rounded-lg p-8 text-center hover:border-primary/50 transition-smooth cursor-pointer"
                    onClick={() => resumeInputRef.current?.click()}
                  >
                    <UploadIcon className="h-10 w-10 text-primary mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">
                      {resumeFile ? resumeFile.name : "Drop your resume here"}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      or click to browse files
                    </p>
                    <Button variant="outline" size="sm">
                      Choose Resume File
                    </Button>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      ref={resumeInputRef}
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) setResumeFile(file);
                      }}
                    />
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

              <Card className="gradient-card border-0 shadow-elegant">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-accent" />
                    Upload Job Description
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div
                    className="border-2 border-dashed border-accent/30 rounded-lg p-8 text-center hover:border-accent/50 transition-smooth cursor-pointer"
                    onClick={() => jdInputRef.current?.click()}
                  >
                    <Target className="h-10 w-10 text-accent mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">
                      {jdFile ? jdFile.name : "Drop job description"}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      or click to browse files
                    </p>
                    <Button variant="outline" size="sm">
                      Choose JD File
                    </Button>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.txt"
                      ref={jdInputRef}
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) setJdFile(file);
                      }}
                    />
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
                      value={resumeText}
                      onChange={(e) => setResumeText(e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>

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
                      value={jobText}
                      onChange={(e) => setJobText(e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {error && (
          <div  className="fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg animate-toast">
            {error}
          </div>
        )}

        <div className="flex justify-center gap-4 mt-8">
          <Button
            size="lg"
            className="shadow-elegant hover:shadow-glow transition-smooth"
            onClick={handleAnalyze}
            disabled={loading}
          >
            <Target className="mr-2 h-5 w-5" />
            {loading ? "Analyzing..." : "Analyze Resume"}
          </Button>
          <Button variant="outline" size="lg" type="button">
            Save for Later
          </Button>
        </div>

\        <Card className="gradient-card border-0 shadow-card mt-8">
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
