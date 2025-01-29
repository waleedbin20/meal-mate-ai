import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-[#F1F0FB] to-[#E5DEFF]">
        <AppSidebar />
        <main className="flex-1 p-8">
          <div className="flex justify-between items-center mb-8">
            <SidebarTrigger />
          </div>
          
          <div className="max-w-4xl mx-auto space-y-16">
            {/* Hero Section */}
            <div className="text-center space-y-8 animate-fade-in">
              <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#1A1F2C] to-[#403E43] bg-clip-text text-transparent 
                [text-shadow:_0_0_30px_rgb(139_92_246_/_0.3)] animate-pulse">
                Quote Management System
              </h1>
              <p className="text-xl text-[#403E43] animate-[fade-in_0.6s_ease-out_0.3s] opacity-0 [animation-fill-mode:forwards]">
                Streamline your customer onboarding process with our intelligent quote generation tool. 
                Create detailed, accurate quotes for care home services with automated calculations and standardized pricing.
              </p>
              <div className="flex gap-4 justify-center animate-[fade-in_0.6s_ease-out_0.6s] opacity-0 [animation-fill-mode:forwards]">
                <Button 
                  onClick={() => navigate("/quote")} 
                  size="lg"
                  className="text-lg px-8 py-6 bg-[#1A1F2C] hover:bg-[#403E43] text-white
                    transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                  Create a Quote
                </Button>
                <Button 
                  onClick={() => navigate("/saved-quotes")} 
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6 border-2 border-[#1A1F2C] text-[#1A1F2C] hover:bg-[#F1F0FB] hover:text-[#403E43]
                    transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                  View Saved Quotes
                </Button>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-8 shadow-lg animate-[fade-in_0.6s_ease-out_0.9s] opacity-0 [animation-fill-mode:forwards]">
              <h2 className="text-3xl font-bold text-center mb-8 text-[#1A1F2C]">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1" className="border-[#E5DEFF]">
                  <AccordionTrigger className="text-[#1A1F2C] hover:text-[#403E43]">What is the Quote Management System?</AccordionTrigger>
                  <AccordionContent className="text-[#403E43]">
                    The Quote Management System is an internal tool designed to help generate accurate quotes for care home services. 
                    It automates calculations, standardizes pricing, and ensures consistency across all customer quotes.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2" className="border-[#E5DEFF]">
                  <AccordionTrigger className="text-[#1A1F2C] hover:text-[#403E43]">How do I create a new quote?</AccordionTrigger>
                  <AccordionContent className="text-[#403E43]">
                    Click the "Create a Quote" button above, fill in the required information about the care home, 
                    dining rooms, and labor costs. The system will automatically calculate the total quote based on your inputs.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3" className="border-[#E5DEFF]">
                  <AccordionTrigger className="text-[#1A1F2C] hover:text-[#403E43]">Can I modify a quote after creation?</AccordionTrigger>
                  <AccordionContent className="text-[#403E43]">
                    Yes, you can access and modify any saved quote through the "View Saved Quotes" section. 
                    All changes are tracked and saved automatically.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4" className="border-[#E5DEFF]">
                  <AccordionTrigger className="text-[#1A1F2C] hover:text-[#403E43]">How are labor costs calculated?</AccordionTrigger>
                  <AccordionContent className="text-[#403E43]">
                    Labor costs are calculated based on the roles you add, their hourly rates, hours per week, 
                    and the number of similar roles. The system automatically computes the total labor cost including any applicable overheads.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5" className="border-[#E5DEFF]">
                  <AccordionTrigger className="text-[#1A1F2C] hover:text-[#403E43]">Need technical support?</AccordionTrigger>
                  <AccordionContent className="text-[#403E43]">
                    For technical support or questions about using the system, please contact the IT support team at support@company.com 
                    or reach out to your team leader for assistance.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Landing;