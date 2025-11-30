import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { 
  Download, 
  FileText, 
  File, 
  Settings,
  CheckCircle 
} from "lucide-react";

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "resume" | "report";
}

const ExportModal = ({ isOpen, onClose, type }: ExportModalProps) => {
  const [format, setFormat] = useState<string>("pdf");
  const [filename, setFilename] = useState<string>(
    type === "resume" ? "my-resume-optimized" : "ats-analysis-report"
  );
  const [includeReport, setIncludeReport] = useState<boolean>(false);

  const formats = type === "resume" 
    ? [
        { id: "pdf", name: "PDF", description: "Most compatible with ATS systems", recommended: true },
        { id: "docx", name: "Word (.docx)", description: "Editable format for further customization", recommended: false },
        { id: "txt", name: "Plain Text", description: "Basic text format for maximum compatibility", recommended: false }
      ]
    : [
        { id: "pdf", name: "PDF Report", description: "Detailed analysis report with charts", recommended: true }
      ];

  const handleExport = () => {
    // This would connect to backend export functionality
    console.log("Exporting:", { format, filename, includeReport, type });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Export {type === "resume" ? "Resume" : "Report"}
          </DialogTitle>
          <DialogDescription>
            Choose your export format and options
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Format Selection */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Export Format</Label>
            <RadioGroup value={format} onValueChange={setFormat}>
              {formats.map((fmt) => (
                <div key={fmt.id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-secondary/50 transition-smooth">
                  <RadioGroupItem value={fmt.id} id={fmt.id} />
                  <Label htmlFor={fmt.id} className="flex-1 cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{fmt.name}</span>
                          {fmt.recommended && (
                            <Badge variant="secondary" className="bg-success/10 text-success border-success/30">
                              Recommended
                            </Badge>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">{fmt.description}</div>
                      </div>
                      {fmt.id === "pdf" && <FileText className="h-5 w-5 text-primary" />}
                      {fmt.id === "docx" && <File className="h-5 w-5 text-accent" />}
                      {fmt.id === "txt" && <FileText className="h-5 w-5 text-muted-foreground" />}
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Filename */}
          <div className="space-y-2">
            <Label htmlFor="filename">Filename</Label>
            <Input
              id="filename"
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
              placeholder="Enter filename"
            />
          </div>

          {/* Additional Options for Resume Export */}
          {type === "resume" && (
            <div className="space-y-3">
              <Label className="text-base font-medium">Additional Options</Label>
              <div className="flex items-center space-x-3 p-3 border rounded-lg">
                <input
                  type="checkbox"
                  id="includeReport"
                  checked={includeReport}
                  onChange={(e) => setIncludeReport(e.target.checked)}
                  className="rounded border-border"
                />
                <Label htmlFor="includeReport" className="flex-1 cursor-pointer">
                  <div className="font-medium">Include ATS Report</div>
                  <div className="text-sm text-muted-foreground">
                    Attach the analysis report as a separate page
                  </div>
                </Label>
              </div>
            </div>
          )}

          {/* Preview Info */}
          <Card className="bg-secondary/30 border-border/50">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-success mt-0.5" />
                <div className="space-y-1">
                  <div className="font-medium text-sm">Export Ready</div>
                  <div className="text-xs text-muted-foreground">
                    Your {type} will be exported as <span className="font-medium">{filename}.{format}</span>
                  </div>
                  {type === "resume" && includeReport && (
                    <div className="text-xs text-muted-foreground">
                      Includes ATS analysis report
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleExport} className="shadow-elegant hover:shadow-glow transition-smooth">
            <Download className="mr-2 h-4 w-4" />
            Export {format.toUpperCase()}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExportModal;