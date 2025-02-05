import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Compare with the password from .env
    const correctPassword = import.meta.env.VITE_ADMIN_PASSWORD;
    
    if (!correctPassword) {
      toast.error("Server configuration error. Please contact administrator.");
      setIsLoading(false);
      return;
    }

    if (password === correctPassword) {
      setIsAuthenticated(true);
      toast.success("Authentication successful");
    } else {
      toast.error("Invalid password");
      setPassword("");
    }
    setIsLoading(false);
  };

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F6F6F7] to-[#F2FCE2] p-4">
      <Card className="w-full max-w-md p-6 space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold text-purple-600">Authentication Required</h1>
          <p className="text-gray-500 text-sm">Please enter the password to access pricing management</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full"
            />
          </div>
          <Button 
            type="submit" 
            className="w-full bg-purple-600 hover:bg-purple-700"
            disabled={isLoading}
          >
            {isLoading ? "Verifying..." : "Access Pricing"}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default AuthGuard;