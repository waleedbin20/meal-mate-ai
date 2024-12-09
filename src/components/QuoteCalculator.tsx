import React from "react";
import { Card } from "@/components/ui/card";

interface QuoteDetails {
  residents: number;
  mealsPerDay: number;
  dietaryRequirements: number;
  pricePerMeal: number;
}

interface QuoteCalculatorProps {
  details: QuoteDetails;
}

const QuoteCalculator: React.FC<QuoteCalculatorProps> = ({ details }) => {
  const dailyCost = details.residents * details.mealsPerDay * details.pricePerMeal;
  const monthlyCost = dailyCost * 30;
  const yearlyCost = monthlyCost * 12;

  return (
    <Card className="p-6 bg-secondary animate-fade-in">
      <h3 className="text-lg font-semibold mb-4">Quote Summary</h3>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Daily Cost:</span>
          <span className="font-semibold">£{dailyCost.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Monthly Cost:</span>
          <span className="font-semibold">£{monthlyCost.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-primary">
          <span>Yearly Cost:</span>
          <span className="font-semibold">£{yearlyCost.toFixed(2)}</span>
        </div>
      </div>
    </Card>
  );
};

export default QuoteCalculator;