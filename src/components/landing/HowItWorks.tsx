import { Card, CardContent } from "../../components/ui/card";
import { Upload, Search, BarChart3 } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: Upload,
      title: "1. Upload Resume",
      description: "Upload your resume (PDF or DOCX) or paste the text directly into our editor"
    },
    {
      icon: Search,
      title: "2. Add Job Description", 
      description: "Paste the job description you're targeting to get personalized keyword analysis"
    },
    {
      icon: BarChart3,
      title: "3. Get ATS Score",
      description: "Receive instant feedback with your ATS compatibility score and improvement suggestions"
    }
  ];

  return (
    <section className="py-20 bg-secondary/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get your ATS compatibility score in just 3 simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="gradient-card border-0 shadow-card hover:shadow-elegant transition-smooth group">
              <CardContent className="p-8 text-center">
                <div className="p-4 bg-primary/10 rounded-full w-fit mx-auto mb-6 group-hover:bg-primary/20 transition-smooth">
                  <step.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Connection Lines for Desktop */}
        <div className="hidden md:block relative -mt-32 mb-16">
          <div className="absolute top-16 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-primary/30 via-primary to-primary/30"></div>
          <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-white shadow-elegant"></div>
          <div className="absolute top-16 left-1/3 transform -translate-x-1/2 w-3 h-3 bg-primary/70 rounded-full border-2 border-white"></div>
          <div className="absolute top-16 left-2/3 transform -translate-x-1/2 w-3 h-3 bg-primary/70 rounded-full border-2 border-white"></div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;