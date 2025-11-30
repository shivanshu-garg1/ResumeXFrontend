import { Card, CardContent } from "../../components/ui/card";
import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Engineer",
      company: "Microsoft",
      quote: "This tool helped me identify key formatting issues that were preventing my resume from getting past ATS systems. I got 3 interviews within two weeks of optimizing my resume!",
      rating: 5,
      avatar: "SJ"
    },
    {
      name: "Michael Chen",
      role: "Marketing Manager", 
      company: "Google",
      quote: "The keyword analysis was incredibly detailed. It showed me exactly which skills to emphasize for different job applications. My interview rate increased by 80%.",
      rating: 5,
      avatar: "MC"
    },
    {
      name: "Emily Rodriguez",
      role: "Data Analyst",
      company: "Amazon",
      quote: "I was amazed by how many ATS-related issues my resume had. After using this service, I finally started getting responses from top companies I'd been applying to for months.",
      rating: 5,
      avatar: "ER"
    },
    {
      name: "David Kim",
      role: "Product Designer",
      company: "Meta",
      quote: "The real-time editor is fantastic. I could see my ATS score improve as I made changes. The interface is intuitive and the suggestions are spot-on.",
      rating: 5,
      avatar: "DK"
    },
    {
      name: "Jessica Taylor",
      role: "Financial Analyst",
      company: "Goldman Sachs",
      quote: "This platform gave me the confidence that my resume would get past automated screening. The detailed analysis report was worth every penny.",
      rating: 5,
      avatar: "JT"
    },
    {
      name: "Alex Thompson",
      role: "DevOps Engineer", 
      company: "Netflix",
      quote: "I tried other resume tools but none were as comprehensive. The ATS compatibility check revealed issues I never would have found on my own.",
      rating: 5,
      avatar: "AT"
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Star className="h-6 w-6 text-primary fill-primary" />
            <span className="text-primary font-semibold">TESTIMONIALS</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Loved by <span className="text-primary">10,000+</span> Job Seekers
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            See how our ATS resume analyzer has helped professionals land their dream jobs at top companies.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="gradient-card border-0 shadow-card hover:shadow-elegant transition-smooth group">
              <CardContent className="p-8">
                {/* Quote Icon */}
                <div className="flex items-center justify-between mb-4">
                  <Quote className="h-8 w-8 text-primary/30 group-hover:text-primary/50 transition-smooth" />
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-primary fill-primary" />
                    ))}
                  </div>
                </div>

                {/* Quote */}
                <blockquote className="text-foreground/90 leading-relaxed mb-6 italic">
                  "{testimonial.quote}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-semibold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Bar */}
        <div className="mt-20 p-8 rounded-2xl gradient-hero text-white text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">4.9/5</div>
              <div className="text-white/80">Average Rating</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">10,000+</div>
              <div className="text-white/80">Happy Users</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">87%</div>
              <div className="text-white/80">Interview Rate Increase</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">2 Min</div>
              <div className="text-white/80">Analysis Time</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;