import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F6F6F7] to-[#F2FCE2] flex flex-col items-center justify-center">
      <div className="container mx-auto px-4 text-center max-w-3xl">
        <div className="space-y-8 animate-fade-in">
          <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent 
            [text-shadow:_0_0_30px_rgb(139_92_246_/_0.3)] animate-pulse">
            Generate Customer Quotes
          </h1>
          <p className="text-xl text-gray-600 animate-[fade-in_0.6s_ease-out_0.3s] opacity-0 [animation-fill-mode:forwards]">
            Streamline your onboarding process with instant, AI-powered quote generation. Create detailed, accurate quotes for your customers before they are onboarded.
          </p>
          <div className="flex gap-4 justify-center animate-[fade-in_0.6s_ease-out_0.6s] opacity-0 [animation-fill-mode:forwards]">
            <Button 
              onClick={() => navigate("/quote")} 
              size="lg"
              className="text-lg px-8 py-6 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700
                transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              Create a Quote
            </Button>
            <Button 
              onClick={() => navigate("/retrieve")} 
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 border-2 border-purple-600 text-purple-600 hover:bg-purple-50
                transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              Retrieve a Quote
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;