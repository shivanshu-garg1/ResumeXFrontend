import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { FileText, ArrowLeft } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Login = () => {
  const location = useLocation() as any;
const [toastMessage, setToastMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

 useEffect(() => {
  if (location.state?.message) {
    setToastMessage(location.state.message);

    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 3000);

    return () => clearTimeout(timer);
  }
}, [location.state]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      console.log("User logged in:", data);
      navigate("/dashboard");
    } catch (err: any) {
      // setError("Error: " + err.message);
    }
  };
  return (
    <div className="min-h-screen bg-secondary/30 flex items-center justify-center p-4">
   {toastMessage && (
  <div className="fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg animate-toast">
    {toastMessage}
  </div>
)}


      <div className="w-full max-w-md">
        <Card className="gradient-card border-0 shadow-elegant">
          <CardHeader className="text-center pb-8">
            {/* Logo */}
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="p-2 bg-primary rounded-lg">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div className="font-bold text-xl text-foreground">
                Resume<span className="text-primary">X</span>
              </div>
            </div>
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription>
              Sign in to your account to continue optimizing your resumes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="transition-smooth focus:shadow-card"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  onChange={handleChange}
                  value={formData.password}
                  placeholder="Enter your password"
                  className="transition-smooth focus:shadow-card"
                />
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
            </form>
            {error && <p className="text-red-500 text-sm">{error}</p>}
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