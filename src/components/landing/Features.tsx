import { Card, CardContent } from "@/components/ui/card";
import { 
  FileSearch, 
  Brain, 
  Target, 
  RefreshCw, 
  Download, 
  Shield,
  Zap,
  Trophy,
  CheckCircle
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: FileSearch,
      title: "ATS Compatibility Check",
      description: "Scan your resume against 500+ ATS systems used by top companies. Get detailed formatting and structure analysis.",
      highlight: "98% Accuracy Rate"
    },
    {
      icon: Brain,
      title: "AI Keyword Optimization",
      description: "Our AI analyzes job descriptions and suggests the most impactful keywords to increase your match rate.",
      highlight: "Smart AI Analysis"
    },
    {
      icon: Target,
      title: "Job Match Scoring",
      description: "Get a precise compatibility score showing how well your resume matches specific job requirements.",
      highlight: "Instant Scoring"
    },
    {
      icon: RefreshCw,
      title: "Real-time Editor",
      description: "Edit your resume with live ATS feedback. See improvements immediately as you make changes.",
      highlight: "Live Updates"
    },
    {
      icon: Download,
      title: "Multi-format Export",
      description: "Download your optimized resume in PDF, DOCX, or ATS-friendly formats for any application.",
      highlight: "Multiple Formats"
    },
    {
      icon: Shield,
      title: "Privacy Protected",
      description: "Your resume data is encrypted and secure. We never share your information with third parties.",
      highlight: "100% Secure"
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Zap className="h-6 w-6 text-primary" />
            <span className="text-primary font-semibold">FEATURES</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Everything You Need to
            <span className="text-primary block">Optimize Your Resume</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our comprehensive suite of tools helps you create ATS-friendly resumes that get noticed by both systems and hiring managers.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="group hover:shadow-card transition-smooth border-0 gradient-card">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-smooth">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <div className="px-3 py-1 bg-success-light text-success text-sm font-medium rounded-full">
                      {feature.highlight}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Process Steps */}
        <div className="text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-12">
            How It Works in <span className="text-primary">3 Simple Steps</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                1
              </div>
              <h4 className="text-lg font-semibold mb-2">Upload Resume</h4>
              <p className="text-muted-foreground">Upload your resume in PDF or DOCX format</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                2
              </div>
              <h4 className="text-lg font-semibold mb-2">AI Analysis</h4>
              <p className="text-muted-foreground">Our AI scans for ATS compatibility and keywords</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                3
              </div>
              <h4 className="text-lg font-semibold mb-2">Get Optimized</h4>
              <p className="text-muted-foreground">Receive detailed report and download improved resume</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;