import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import ExportModal from "../components/export/ExportModal";
import { Eye, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../lib/utils";

type Report = {
  id: string;
  createdAt?: string;
  fileName?: string;
  jobTitle?: string;
  summary?:
    | string
    | {
        ATSScore?: number;
        overallStatus?: string;
        headline?: string;
        [k: string]: any;
      };
  analysis?: any;
};

const ViewReports = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [exportModalOpen, setExportModalOpen] = useState<boolean>(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchReports = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(apiUrl("/api/ats/recent"), {
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || `Failed to fetch (${res.status})`);
        }

        const data = await res.json();
        if (!mounted) return;

        const items: Report[] = (data.reports || []).map((r: any) => ({
          id: r.id || r._id || String(r._id),
          createdAt: r.createdAt,
          fileName: r.fileName,
          jobTitle: r.jobTitle,
          summary: r.summary,
          analysis: r.analysis,
        }));

        setReports(items);
      } catch (err: any) {
        console.error("Error fetching recent reports:", err);
        setError(err?.message || "Failed to load reports");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchReports();
    return () => {
      mounted = false;
    };
  }, []);

 

  const formatDate = (iso?: string) => {
    if (!iso) return "-";
    try {
      const d = new Date(iso);
      return d.toLocaleString();
    } catch {
      return iso;
    }
  };

  const summaryToText = (s?: Report["summary"]) => {
    if (!s) return "No summary available.";
    if (typeof s === "string") return s;
    if (s.headline) return s.headline;
    if (s.ATSScore !== undefined || s.overallStatus) {
      const score = s.ATSScore !== undefined ? `${s.ATSScore}%` : "";
      const status = s.overallStatus ? ` ${s.overallStatus}` : "";
      return `${score}${status}`.trim() || JSON.stringify(s);
    }
    try {
      const keys = Object.keys(s).slice(0, 4);
      const kv = keys.map((k) => `${k}: ${String((s as any)[k])}`).join(", ");
      return kv || JSON.stringify(s);
    } catch {
      return JSON.stringify(s);
    }
  };

const downloadFullReport = (id: any) => {
  fetch(apiUrl(`/api/ats/report/${id}/full-download`), {
    method: "GET",
    credentials: "include",
  })
    .then((res) => res.blob())
    .then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `ATS-Full-Report-${id}.pdf`;
      a.click();
    });
};


  return (
    <div className="min-h-screen bg-secondary/30 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Recent ATS Reports
            </h1>
            <p className="text-muted-foreground">
              Your latest resume analysis results — view, export, or revisit.
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => window.location.reload()}>
              Refresh
            </Button>
             <Button variant="outline" onClick={() => navigate('/dashboard')}>
              Return to Dashboard
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-16">Loading recent reports...</div>
        ) : error ? (
          <div className="text-center text-destructive py-16">
            Failed to load reports: {error}
          </div>
        ) : reports.length === 0 ? (
          <div className="text-center py-16">No recent reports found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reports.map((report) => (
              <Card className="border-0 shadow-card" key={report.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">
                      {report.jobTitle || report.fileName || "Untitled Report"}
                    </CardTitle>
                    <div className="text-xs text-muted-foreground">
                      {formatDate(report.createdAt)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm text-muted-foreground">
                    <strong>File:</strong> {report.fileName || "—"}
                  </div>

                  <div className="text-sm text-muted-foreground line-clamp-4">
                    {summaryToText(report.summary)}
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => downloadFullReport(report.id)}
                      className="flex-1"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      PDF
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <ExportModal
        isOpen={exportModalOpen}
        onClose={() => {
          setExportModalOpen(false);
          setSelectedReport(null);
        }}
        type="report"
      />
    </div>
  );
};

export default ViewReports;
