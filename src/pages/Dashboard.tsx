import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { FileText, Upload, Edit, BarChart3 } from "lucide-react";

type RecentReport = {
  id: string;
  createdAt: string;          // ISO string from backend
  fileName?: string;
  jobTitle?: string;
  summary?: {
    ATSScore: number;
  };
  analysis: any;              // full analysis JSON needed by Report page
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [recentReports, setRecentReports] = useState<RecentReport[]>([]);
  const [loadingReports, setLoadingReports] = useState(true);

  // Fetch logged-in user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/auth/check", {
          method: "GET",
          credentials: "include",
        });

        if (res.status === 200) {
          const data = await res.json();
          setUser(data.user);
        }
      } catch (err) {
        console.error("User fetch error", err);
      }
    };

    fetchUser();
  }, []);

  // Fetch recent ATS reports
  useEffect(() => {
    const fetchRecentReports = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/ats/recent", {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch recent reports");
        }

        const data = await res.json();
        // Expecting: { reports: RecentReport[] }
        const reports: RecentReport[] = data.reports || [];

        // Sort newest → oldest just in case
        reports.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        // Keep only last 4
        setRecentReports(reports.slice(0, 4));
      } catch (err) {
        console.error("Recent reports fetch error", err);
      } finally {
        setLoadingReports(false);
      }
    };

    fetchRecentReports();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      navigate("/login", {
        replace: true,
        state: { message: "Logged out successfully" },
      });
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const handleOpenReport = (report: RecentReport) => {
    navigate("/report", {
      state: { analysis: report.analysis },
    });
  };

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <div className="min-h-screen bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome,{" "}
              <span className="font-semibold">
                {user?.name}
              </span>
            </p>
            <p className="text-muted-foreground">
              Manage your resumes and track your progress
            </p>
          </div>

          <div className="flex gap-3">
            <Button
              size="lg"
              variant="destructive"
              className="shadow-elegant hover:shadow-glow transition-smooth"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card
            className="gradient-card border-0 shadow-card hover:shadow-elegant transition-smooth group cursor-pointer"
            onClick={() => navigate("/upload")}
          >
            <CardContent className="p-6 text-center">
              <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto mb-4 group-hover:bg-primary/20 transition-smooth">
                <Upload className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Upload Resume</h3>
              <p className="text-sm text-muted-foreground">
                Upload and analyze a new resume
              </p>
            </CardContent>
          </Card>

          <Card
            className="gradient-card border-0 shadow-card hover:shadow-elegant transition-smooth group cursor-pointer"
            onClick={() => navigate("/editor")}
          >
            <CardContent className="p-6 text-center">
              <div className="p-3 bg-accent/10 rounded-full w-fit mx-auto mb-4 group-hover:bg-accent/20 transition-smooth">
                <Edit className="h-8 w-8 text-accent" />
              </div>
              <h3 className="font-semibold mb-2">Resume Editor</h3>
              <p className="text-sm text-muted-foreground">
                Edit and optimize your resume
              </p>
            </CardContent>
          </Card>

          <Card
            className="gradient-card border-0 shadow-card hover:shadow-elegant transition-smooth group cursor-pointer"
            onClick={() => navigate("/report")}
          >
            <CardContent className="p-6 text-center">
              <div className="p-3 bg-success/10 rounded-full w-fit mx-auto mb-4 group-hover:bg-success/20 transition-smooth">
                <BarChart3 className="h-8 w-8 text-success" />
              </div>
              <h3 className="font-semibold mb-2">View Reports</h3>
              <p className="text-sm text-muted-foreground">
                Check ATS compatibility scores
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="gradient-card border-0 shadow-card">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {loadingReports ? (
              <div className="text-center py-12 text-muted-foreground">
                <p>Loading your recent resumes...</p>
              </div>
            ) : recentReports.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>
                  No resumes uploaded yet. Upload your first resume to get
                  started!
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentReports.map((report) => (
                  <button
                    key={report.id}
                    onClick={() => handleOpenReport(report)}
                    className="w-full text-left flex items-center justify-between p-4 rounded-lg bg-secondary/40 hover:bg-secondary/70 transition-smooth border border-border/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-primary/10">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">
                          {report.jobTitle ||
                            report.fileName ||
                            "Resume Analysis"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(report.createdAt)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold">
                        {report.summary?.ATSScore ?? "—"}% match
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Click to view report
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
