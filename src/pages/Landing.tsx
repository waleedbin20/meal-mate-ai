import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F6F6F7] to-[#F2FCE2]">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-20 pb-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent 
              [text-shadow:_0_0_30px_rgb(139_92_246_/_0.3)] animate-pulse">
              Generate Professional Customer Quotes in Minutes
            </h1>
            <p className="text-xl text-gray-600 animate-[fade-in_0.6s_ease-out_0.3s] opacity-0 [animation-fill-mode:forwards]">
              Streamline your onboarding process with instant, AI-powered quote generation. Create detailed, accurate quotes for your customers before they join your care home meal planning service.
            </p>
            <Button 
              onClick={() => navigate("/quote")} 
              size="lg"
              className="text-lg px-8 py-6 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700
                transform transition-all duration-300 hover:scale-105 hover:shadow-xl animate-[fade-in_0.6s_ease-out_0.6s] opacity-0 [animation-fill-mode:forwards]"
            >
              Get Started
            </Button>
          </div>
          <div className="relative animate-[fade-in_0.6s_ease-out_0.9s] opacity-0 [animation-fill-mode:forwards]">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl blur opacity-30"></div>
            <div className="relative bg-white p-6 rounded-2xl shadow-xl transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
              <img 
                src="/lovable-uploads/efa2d967-5018-4d0f-9240-df3da802bd4e.png"
                alt="Team collaborating on meal planning" 
                className="w-full h-auto rounded-lg object-cover aspect-video"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white/80 backdrop-blur-sm py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent
            [text-shadow:_0_0_20px_rgb(139_92_246_/_0.2)]">
            Why Choose Quote AI?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Instant Quotes",
                description: "Get accurate meal planning quotes in minutes, not days."
              },
              {
                title: "AI Assistant",
                description: "Chat with our AI to understand your quote and optimize your planning."
              },
              {
                title: "Customizable Plans",
                description: "Tailor your meal plans to your care home's specific needs and requirements."
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105
                  animate-[fade-in_0.6s_ease-out] [animation-delay:var(--delay)] opacity-0 [animation-fill-mode:forwards]"
                style={{ '--delay': `${1.2 + index * 0.2}s` } as React.CSSProperties}
              >
                <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;