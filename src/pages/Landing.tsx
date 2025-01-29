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
    <SidebarProvider defaultOpen={false}>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-primary/10 to-accent/10">
        <AppSidebar />
        <main className="flex-1 p-4 md:p-8">
          <div className="flex justify-between items-center mb-6 md:mb-8">
            <SidebarTrigger />
          </div>
          
          <div className="max-w-4xl mx-auto space-y-8 md:space-y-16">
            {/* Hero Section */}
            <div className="text-center space-y-6 md:space-y-8 px-4">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-primary">
                Quote Management System
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground animate-[fade-in_0.6s_ease-out_0.3s] opacity-0 [animation-fill-mode:forwards]">
                Streamline your customer onboarding process with our intelligent quote generation tool. 
                Create detailed, accurate quotes for care home services with automated calculations and standardized pricing.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-[fade-in_0.6s_ease-out_0.6s] opacity-0 [animation-fill-mode:forwards]">
                <Button 
                  onClick={() => navigate("/quote")} 
                  size="lg"
                  className="text-base md:text-lg px-6 md:px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground
                    transform transition-all duration-300 hover:scale-105 hover:shadow-xl w-full sm:w-auto"
                >
                  Create a Quote
                </Button>
                <Button 
                  onClick={() => navigate("/saved-quotes")} 
                  size="lg"
                  variant="outline"
                  className="text-base md:text-lg px-6 md:px-8 py-6 border-2 hover:bg-accent/10
                    transform transition-all duration-300 hover:scale-105 hover:shadow-xl w-full sm:w-auto"
                >
                  View Saved Quotes
                </Button>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-background/90 backdrop-blur-sm rounded-lg p-4 md:p-8 shadow-lg animate-[fade-in_0.6s_ease-out_0.9s] opacity-0 [animation-fill-mode:forwards] mx-4 md:mx-0">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-left">
                    What is the Quote Management System?
                  </AccordionTrigger>
                  <AccordionContent>
                    The Quote Management System is an internal tool designed to help generate accurate quotes for care home services. 
                    It automates calculations, standardizes pricing, and ensures consistency across all customer quotes.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left">
                    How do I create a new quote?
                  </AccordionTrigger>
                  <AccordionContent>
                    Click the "Create a Quote" button above, fill in the required information about the care home, 
                    dining rooms, and labor costs. The system will automatically calculate the total quote based on your inputs.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left">
                    Can I modify a quote after creation?
                  </AccordionTrigger>
                  <AccordionContent>
                    Yes, you can access and modify any saved quote through the "View Saved Quotes" section. 
                    All changes are tracked and saved automatically.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-left">
                    How are labor costs calculated?
                  </AccordionTrigger>
                  <AccordionContent>
                    Labor costs are calculated based on the roles you add, their hourly rates, hours per week, 
                    and the number of similar roles. The system automatically computes the total labor cost including any applicable overheads.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-left">
                    Need technical support?
                  </AccordionTrigger>
                  <AccordionContent>
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