import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="min-h-screen bg-secondary/30 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="gradient-card border-0 shadow-elegant">
          <CardHeader className="text-center pb-8">
            {/* Logo */}
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="p-2 bg-primary rounded-lg">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div className="font-bold text-xl text-foreground">
                ATS<span className="text-primary">Pro</span>
              </div>
            </div>
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription>
              Sign in to your account to continue optimizing your resumes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="Enter your email"
                  className="transition-smooth focus:shadow-card"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="Enter your password"
                  className="transition-smooth focus:shadow-card"
                />
              </div>
            </div>

            <div className="text-right">
              <Link 
                to="#" 
                className="text-sm text-primary hover:text-primary-deep transition-smooth"
              >
                Forgot password?
              </Link>
            </div>

            <Button className="w-full shadow-elegant hover:shadow-glow transition-smooth">
              Sign In
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link 
                to="/signup" 
                className="text-primary hover:text-primary-deep font-semibold transition-smooth"
              >
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-smooth"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;