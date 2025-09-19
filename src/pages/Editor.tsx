import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CircularProgress } from "@/components/ui/circular-progress";
import KeywordSuggestions from "@/components/editor/KeywordSuggestions";
import ExportModal from "@/components/export/ExportModal";
import { useState } from "react";
import { 
  Save, 
  Download, 
  Eye, 
  RefreshCw, 
  FileText,
  AlertCircle,
  CheckCircle,
  Sparkles,
  Target
} from "lucide-react";

const Editor = () => {
  const [atsScore, setAtsScore] = useState(87);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [resumeText, setResumeText] = useState(`JOHN SMITH
Senior Software Engineer
john.smith@email.com | (555) 123-4567 | LinkedIn: linkedin.com/in/johnsmith

PROFESSIONAL SUMMARY
Experienced Software Engineer with 5+ years developing scalable web applications using JavaScript, React, and Node.js. Proven track record of leading technical teams and delivering high-quality software solutions.

TECHNICAL SKILLS
• Programming Languages: JavaScript, HTML, CSS, SQL
• Frameworks: React, Node.js, Express
• Tools: Git, VS Code, npm
• Databases: MySQL, MongoDB

PROFESSIONAL EXPERIENCE

Senior Software Engineer | Tech Corp | 2021 - Present
• Developed and maintained web applications serving 100k+ users
• Led a team of 4 developers on key product initiatives
• Implemented CI/CD pipelines improving deployment efficiency by 40%
• Collaborated with product managers to define technical requirements

Software Engineer | StartUp Inc | 2019 - 2021  
• Built responsive web interfaces using React and CSS
• Optimized database queries resulting in 30% performance improvement
• Participated in code reviews and maintained coding standards
• Worked in Agile environment with 2-week sprints

EDUCATION
Bachelor of Science in Computer Science
University of Technology | 2015 - 2019`);
  
  const liveIssues = [
    { type: "warning", text: "Consider adding 'Machine Learning' keyword for better match" },
    { type: "good", text: "Contact information is properly formatted" },
    { type: "warning", text: "Missing technical skills mentioned in job description" },
    { type: "error", text: "Experience section could use more quantified achievements" },
  ];

  const handleAddKeyword = (keyword: string) => {
    // Add keyword to the skills section
    const skillsSection = resumeText.indexOf("TECHNICAL SKILLS");
    if (skillsSection !== -1) {
      const endOfSkills = resumeText.indexOf("\n\n", skillsSection);
      const beforeSkills = resumeText.substring(0, endOfSkills);
      const afterSkills = resumeText.substring(endOfSkills);
      setResumeText(beforeSkills + `, ${keyword}` + afterSkills);
    }
  };

  const handleReanalyze = () => {
    // Simulate reanalysis
    setAtsScore(Math.floor(Math.random() * (95 - 80) + 80));
  };

  return (
    <div className="min-h-screen bg-secondary/30 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">AI-Powered Resume Editor</h1>
            <p className="text-muted-foreground">Edit your resume with real-time ATS feedback and AI suggestions</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </Button>
            <Button variant="outline">
              <Save className="mr-2 h-4 w-4" />
              Save Draft
            </Button>
            <Button 
              className="shadow-elegant hover:shadow-glow transition-smooth"
              onClick={() => setExportModalOpen(true)}
            >
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Editor */}
          <div className="lg:col-span-2">
            <Card className="gradient-card border-0 shadow-card h-full">
              <CardHeader className="border-b border-border">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Resume Content
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={handleReanalyze}>
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Sparkles className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Textarea
                  placeholder="Paste or type your resume content here..."
                  className="min-h-[700px] border-0 resize-none rounded-none focus:ring-0 focus:border-0"
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                />
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-2 space-y-6">
            {/* Live ATS Score */}
            <Card className="gradient-card border-0 shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">Live ATS Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-center">
                  <CircularProgress value={atsScore} size={120}>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{atsScore}%</div>
                      <div className="text-xs text-muted-foreground">ATS Score</div>
                    </div>
                  </CircularProgress>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-3 bg-secondary/50 rounded-lg">
                    <div className="text-lg font-semibold text-success">12</div>
                    <div className="text-xs text-muted-foreground">Matched</div>
                  </div>
                  <div className="p-3 bg-secondary/50 rounded-lg">
                    <div className="text-lg font-semibold text-destructive">5</div>
                    <div className="text-xs text-muted-foreground">Missing</div>
                  </div>
                </div>
                
                <Button variant="outline" size="sm" className="w-full" onClick={handleReanalyze}>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Re-analyze
                </Button>
              </CardContent>
            </Card>

            {/* Live Issues */}
            <Card className="gradient-card border-0 shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">Real-time Feedback</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 max-h-64 overflow-y-auto">
                {liveIssues.map((issue, index) => (
                  <div key={index} className="flex gap-3 p-3 bg-secondary/50 rounded-lg">
                    {issue.type === "good" ? (
                      <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                    ) : issue.type === "warning" ? (
                      <AlertCircle className="h-4 w-4 text-warning mt-0.5 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm">{issue.text}</p>
                      <Badge 
                        variant="secondary"
                        className={
                          issue.type === "good" 
                            ? "bg-success/10 text-success border-success/30" 
                            : issue.type === "warning"
                            ? "bg-warning/10 text-warning border-warning/30"
                            : "bg-destructive/10 text-destructive border-destructive/30"
                        }
                      >
                        {issue.type}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Keyword Suggestions */}
            <KeywordSuggestions onAddKeyword={handleAddKeyword} />

            {/* Quick Actions */}
            <Card className="gradient-card border-0 shadow-card">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  AI Improvements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Enhance with AI
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  Fix ATS Issues
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  Optimize Keywords
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  Improve Formatting
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Export Modal */}
      <ExportModal 
        isOpen={exportModalOpen}
        onClose={() => setExportModalOpen(false)}
        type="resume"
      />
    </div>
  );
};

export default Editor;