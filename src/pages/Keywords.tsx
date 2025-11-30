import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Textarea } from "../components/ui/textarea";
import { Badge } from "../components/ui/badge";
import { Label } from "../components/ui/label";
import { Search, Target, CheckCircle, Plus } from "lucide-react";

const Keywords = () => {
  const presentKeywords = [
    "JavaScript", "React", "Node.js", "SQL", "Git", "HTML", "CSS"
  ];
  
  const missingKeywords = [
    "Machine Learning", "Python", "AWS", "Docker", "Kubernetes", "TypeScript"
  ];
  
  const suggestedKeywords = [
    "Redux", "Express.js", "MongoDB", "REST API", "Agile", "CI/CD"
  ];

  return (
    <div className="min-h-screen bg-secondary/30 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Keyword Analyzer</h1>
          <p className="text-muted-foreground">Optimize your resume keywords for specific job descriptions</p>
        </div>

        {/* Job Description Input */}
        <Card className="gradient-card border-0 shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Job Description Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="jobDescription">Paste Job Description</Label>
              <Textarea
                id="jobDescription"
                placeholder="Paste the job description here to analyze keyword matches..."
                className="min-h-32 transition-smooth focus:shadow-card"
              />
            </div>
          <Button 
            className="shadow-elegant hover:shadow-glow transition-smooth"
            onClick={() => window.location.href = '/keywords'}
          >
            <Target className="mr-2 h-4 w-4" />
            Analyze Keywords
          </Button>
          </CardContent>
        </Card>

        {/* Present Keywords */}
        <Card className="gradient-card border-0 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-success">
              <CheckCircle className="h-5 w-5" />
              Keywords Already Present ({presentKeywords.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {presentKeywords.map((keyword, index) => (
                <Badge key={index} variant="secondary" className="bg-success-light text-success border-success/30">
                  {keyword}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Missing Keywords */}
        <Card className="gradient-card border-0 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <Plus className="h-5 w-5" />
              Missing Important Keywords ({missingKeywords.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {missingKeywords.map((keyword, index) => (
                <Badge key={index} variant="destructive" className="cursor-pointer hover:bg-destructive/80">
                  + {keyword}
                </Badge>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Click on keywords to add them to your resume editor
            </p>
          </CardContent>
        </Card>

        {/* Suggested Keywords */}
        <Card className="gradient-card border-0 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Target className="h-5 w-5" />
              Suggested Keywords ({suggestedKeywords.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {suggestedKeywords.map((keyword, index) => (
                <Badge key={index} className="cursor-pointer hover:bg-primary/80">
                  + {keyword}
                </Badge>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Additional keywords that could strengthen your resume for this role
            </p>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-center gap-4">
          <Button 
            className="shadow-elegant hover:shadow-glow transition-smooth"
            onClick={() => window.location.href = '/editor'}
          >
            Apply to Resume Editor
          </Button>
          <Button variant="outline">
            Generate New Analysis
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Keywords;