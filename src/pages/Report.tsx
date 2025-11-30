import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import { Badge } from "../components/ui/badge";
import { CircularProgress } from "../components/ui/circular-progress";
import {
  CheckCircle,
  AlertCircle,
  XCircle,
  Download,
  Edit,
  BarChart3,
  FileText,
  TrendingUp,
  Eye,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
type BackendRecommendation = {
  id: string;
  title: string;
  impactLevel: "high" | "medium" | "low" | "none";
  severity: "error" | "warning" | "good";
  description: string;
  ctaText: string | null;
};

type BackendSection = {
  id: string;
  title: string;
  scores: {
    keywordsMatch: number;
    formatting: number;
    sectionStructure: number;
    fileFormat: number;
  };
};

type BackendAnalysis = {
  summary?: {
    ATSScore: number;
    overallStatus: string;
    headline: string;
    matchedKeywordsCount: number;
    missingKeywordsCount: number;
    issuesFoundCount: number;
    estimatedFixTimeMinutes: number;
  };
  keywords?: {
    matched: string[];
    missing: string[];
  };
  sectionAnalysis?: BackendSection[];
  recommendations?: BackendRecommendation[];
};

const Report = () => {
  const location = useLocation() as { state?: { analysis?: BackendAnalysis } };
  const analysis = location.state?.analysis;

  if (!analysis) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-secondary/30 gap-4">
        <p className="text-foreground text-lg">
          No analysis data available. Please re-upload a resume.
        </p>
        <Link to="/upload" className="underline text-primary">
          Return to Upload
        </Link>
      </div>
    );
  }

  const overallScore: number = analysis.summary?.ATSScore ?? 0;

  const matchedKeywords: string[] = analysis.keywords?.matched ?? [];
  const missingKeywords: string[] = analysis.keywords?.missing ?? [];

  const sections: {
    name: string;
    score: number;
    status: "good" | "warning" | "error";
  }[] = (analysis.sectionAnalysis ?? []).map((section) => {
    const score = section.scores?.keywordsMatch ?? 0;

    let status: "good" | "warning" | "error";
    if (score >= 80) status = "good";
    else if (score >= 50) status = "warning";
    else status = "error";

    return {
      name: section.title,
      score,
      status,
    };
  });

  const recommendations: {
    type: "good" | "warning" | "error";
    title: string;
    description: string;
    impact: string;
  }[] = (analysis.recommendations ?? []).map((rec) => ({
    type: rec.severity,
    title: rec.title,
    description: rec.description,
    impact: rec.impactLevel,
  }));

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 50) return "text-warning";
    return "text-destructive";
  };

  const getScoreDescription = (score: number) => {
    if (score >= 80) return "Excellent ATS Compatibility";
    if (score >= 50) return "Moderate ATS Compatibility";
    return "Poor ATS Compatibility";
  };

  return (
    <>
      <div className="min-h-screen bg-secondary/30 p-4">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              ATS Analysis Report
            </h1>
            <p className="text-xl text-muted-foreground">
              Comprehensive analysis of your resume's ATS compatibility
            </p>
          </div>

          <Card className="gradient-card border-0 shadow-elegant">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                <div className="text-center">
                  <CircularProgress
                    value={overallScore}
                    size={160}
                    strokeWidth={12}
                  >
                    <div className="text-center">
                      <div
                        className={`text-4xl font-bold ${getScoreColor(
                          overallScore
                        )}`}
                      >
                        {overallScore}/100
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        ATS Score
                      </div>
                    </div>
                  </CircularProgress>
                  <p className="text-lg font-medium mt-4 text-center max-w-xs">
                    {getScoreDescription(overallScore)}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-secondary/50 rounded-lg">
                    <div className="text-2xl font-bold text-success">
                      {matchedKeywords.length}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Matched Keywords
                    </div>
                  </div>
                  <div className="text-center p-4 bg-secondary/50 rounded-lg">
                    <div className="text-2xl font-bold text-destructive">
                      {missingKeywords.length}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Missing Keywords
                    </div>
                  </div>
                  <div className="text-center p-4 bg-secondary/50 rounded-lg">
                    <div className="text-2xl font-bold text-warning">4</div>
                    <div className="text-sm text-muted-foreground">
                      Issues Found
                    </div>
                  </div>
                  <div className="text-center p-4 bg-secondary/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">
                      {analysis.summary?.estimatedFixTimeMinutes} mins
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Fix Time
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3">
                  <Button
                    className="shadow-elegant hover:shadow-glow transition-smooth"
                    onClick={() => (window.location.href = "/editor")}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Resume
                  </Button>

                  <Button variant="outline">
                    <Eye className="mr-2 h-4 w-4" />
                    Preview Resume
                  </Button>
                </div>
              </div>
              <p className="mt-4  inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg font-medium shadow-sm border border-green-300">
                ✓ A report has been sent to your email
              </p>
              <Link to="/dashboard">
                {" "}
                <Button>Return to Dashboard</Button>
              </Link>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Keywords Analysis */}
            <div className="space-y-6">
              {/* Matched Keywords */}
              <Card className="gradient-card border-0 shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-success">
                    <CheckCircle className="h-5 w-5" />
                    Matched Keywords ({matchedKeywords.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {matchedKeywords.map((keyword, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-success/10 text-success border-success/30"
                      >
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
                    <XCircle className="h-5 w-5" />
                    Missing Keywords ({missingKeywords.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {missingKeywords.map((keyword, index) => (
                      <Badge
                        key={index}
                        variant="destructive"
                        className="cursor-pointer hover:bg-destructive/80"
                      >
                        + {keyword}
                      </Badge>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    <Edit className="mr-2 h-4 w-4" />
                    Add Missing Keywords to Resume
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Section Analysis */}
            <div className="space-y-6">
              <Card className="gradient-card border-0 shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Section Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {sections.map((section, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        {section.status === "good" && (
                          <CheckCircle className="h-5 w-5 text-success" />
                        )}
                        {section.status === "warning" && (
                          <AlertCircle className="h-5 w-5 text-warning" />
                        )}
                        {section.status === "error" && (
                          <XCircle className="h-5 w-5 text-destructive" />
                        )}
                        <span className="font-medium">{section.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Progress value={section.score} className="w-20" />
                        <span className="text-sm font-semibold w-12">
                          {section.score}%
                        </span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Detailed Recommendations */}
          <Card className="gradient-card border-0 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Improvement Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recommendations.map((rec, index) => (
                <div
                  key={index}
                  className="flex gap-4 p-4 bg-secondary/50 rounded-lg border border-border/50"
                >
                  <div className="mt-1">
                    {rec.type === "good" && (
                      <CheckCircle className="h-5 w-5 text-success" />
                    )}
                    {rec.type === "warning" && (
                      <AlertCircle className="h-5 w-5 text-warning" />
                    )}
                    {rec.type === "error" && (
                      <XCircle className="h-5 w-5 text-destructive" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{rec.title}</h4>
                      <div className="flex gap-2">
                        <Badge
                          variant={
                            rec.type === "good"
                              ? "secondary"
                              : rec.type === "warning"
                              ? "secondary"
                              : "destructive"
                          }
                        >
                          {rec.type}
                        </Badge>
                        {rec.impact !== "N/A" && (
                          <Badge variant="outline" className="text-xs">
                            {rec.impact} Impact
                          </Badge>
                        )}
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm mb-3">
                      {rec.description}
                    </p>
                    {rec.type !== "good" && (
                      <Button variant="outline" size="sm">
                        Fix This Issue
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="gradient-card border-0 shadow-elegant">
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-4">
                  Ready to Improve Your Resume?
                </h3>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button
                    size="lg"
                    className="shadow-elegant hover:shadow-glow transition-smooth"
                  >
                    <Edit className="mr-2 h-5 w-5" />
                    Edit in Resume Editor
                  </Button>
                  <Button variant="outline" size="lg">
                    <TrendingUp className="mr-2 h-5 w-5" />
                    Keyword Optimizer
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Report;
