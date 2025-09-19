import { Button } from "@/components/ui/button";
import { CheckCircle, Upload, FileText, TrendingUp } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 gradient-hero opacity-90" />
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10 opacity-30" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
            Beat the <span className="text-primary-glow">ATS</span>
            <br />
            Land Your Dream Job
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Analyze, optimize, and perfect your resume with our AI-powered ATS scanner. 
            Get past applicant tracking systems and into the hands of hiring managers.
          </p>
          
          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-6 text-white/80">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-success" />
              <span>98% ATS Compatibility</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-success" />
              <span>500+ Keywords Database</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-success" />
              <span>Instant Results</span>
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button 
              variant="hero" 
              size="lg" 
              className="min-w-[200px] shadow-elegant hover:shadow-glow transition-smooth"
              onClick={() => window.location.href = '/upload'}
            >
              <Upload className="mr-2 h-5 w-5" />
              Check Your Resume ATS Score in Seconds
            </Button>
            <Button 
              variant="outline-hero" 
              size="lg" 
              className="min-w-[200px] transition-smooth"
              onClick={() => window.location.href = '/report'}
            >
              <FileText className="mr-2 h-5 w-5" />
              See Sample Report
            </Button>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto pt-16">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">10,000+</div>
              <div className="text-white/80">Resumes Analyzed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">87%</div>
              <div className="text-white/80">Higher Interview Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">2 Min</div>
              <div className="text-white/80">Average Analysis Time</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-white/20 rounded-full animate-pulse" />
      <div className="absolute top-3/4 right-1/4 w-6 h-6 bg-accent/30 rounded-full animate-bounce" style={{animationDelay: "1s"}} />
      <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-success/40 rounded-full animate-pulse" style={{animationDelay: "2s"}} />
    </section>
  );
};

export default Hero;