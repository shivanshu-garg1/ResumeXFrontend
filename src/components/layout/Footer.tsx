import { FileText, Mail, Twitter, Linkedin, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-primary rounded-lg">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div className="font-bold text-xl">
                ATS<span className="text-primary">Pro</span>
              </div>
            </div>
            <p className="text-white/70 leading-relaxed max-w-md mb-6">
              The ultimate ATS resume analyzer that helps job seekers optimize their resumes 
              for applicant tracking systems and land their dream jobs.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-smooth">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-smooth">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-smooth">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-smooth">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-3 text-white/70">
              <li><a href="#" className="hover:text-white transition-smooth">ATS Scanner</a></li>
              <li><a href="#" className="hover:text-white transition-smooth">Keyword Optimizer</a></li>
              <li><a href="#" className="hover:text-white transition-smooth">Resume Editor</a></li>
              <li><a href="#" className="hover:text-white transition-smooth">Job Match Score</a></li>
              <li><a href="#" className="hover:text-white transition-smooth">API Access</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-3 text-white/70">
              <li><a href="#" className="hover:text-white transition-smooth">Resume Templates</a></li>
              <li><a href="#" className="hover:text-white transition-smooth">ATS Guide</a></li>
              <li><a href="#" className="hover:text-white transition-smooth">Interview Tips</a></li>
              <li><a href="#" className="hover:text-white transition-smooth">Career Blog</a></li>
              <li><a href="#" className="hover:text-white transition-smooth">Help Center</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-white/70 text-sm">
              © 2024 ATSPro. All rights reserved.
            </div>
            <div className="flex gap-6 text-sm text-white/70">
              <a href="#" className="hover:text-white transition-smooth">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-smooth">Terms of Service</a>
              <a href="#" className="hover:text-white transition-smooth">Contact</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;