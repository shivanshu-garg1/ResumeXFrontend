import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Plus, TrendingUp, Target } from "lucide-react";

interface KeywordSuggestionsProps {
  onAddKeyword: (keyword: string) => void;
}

const KeywordSuggestions = ({ onAddKeyword }: KeywordSuggestionsProps) => {
  const criticalKeywords = [
    { word: "Machine Learning", priority: "high", reason: "Appears 8 times in job description" },
    { word: "Python", priority: "high", reason: "Required skill mentioned 5 times" },
    { word: "AWS", priority: "medium", reason: "Cloud platform requirement" },
    { word: "Docker", priority: "medium", reason: "DevOps tool mentioned" }
  ];

  const suggestedKeywords = [
    "TypeScript", "Redux", "Kubernetes", "CI/CD", "Agile", "Microservices"
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-destructive/10 text-destructive border-destructive/30";
      case "medium": return "bg-warning/10 text-warning border-warning/30";
      default: return "bg-secondary";
    }
  };

  return (
    <div className="space-y-4">
      {/* Critical Missing Keywords */}
      <Card className="gradient-card border-0 shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <Target className="h-4 w-4 text-destructive" />
            Critical Keywords
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {criticalKeywords.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg border border-border/50">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium">{item.word}</span>
                  <Badge className={getPriorityColor(item.priority)}>
                    {item.priority}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{item.reason}</p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onAddKeyword(item.word)}
                className="ml-3"
              >
                <Plus className="h-3 w-3 mr-1" />
                Add
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Suggested Keywords */}
      <Card className="gradient-card border-0 shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <TrendingUp className="h-4 w-4 text-primary" />
            Suggested Keywords
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-3">
            {suggestedKeywords.map((keyword, index) => (
              <Badge
                key={index}
                variant="outline"
                className="cursor-pointer hover:bg-primary/10 hover:border-primary/30"
                onClick={() => onAddKeyword(keyword)}
              >
                <Plus className="h-3 w-3 mr-1" />
                {keyword}
              </Badge>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            Click to add relevant keywords to your resume
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default KeywordSuggestions;