import React from "react";
import { Card } from "@/components/ui/card";

interface QuoteDetails {
  residents: number;
  mealsPerDay: number;
  dietaryRequirements: number;
  pricePerMeal: number;
  careHomeName?: string;
  diningRooms?: {
    name: string;
    standardMeals: number;
    allergyFreeMeals: number;
    fingerMeals: number;
  }[];
  menuType?: "Silver" | "Platinum";
}

interface QuoteCalculatorProps {
  details: QuoteDetails;
}

const QuoteCalculator: React.FC<QuoteCalculatorProps> = ({ details }) => {
  const totalResidents = details.diningRooms?.reduce(
    (acc, room) => acc + room.standardMeals + room.allergyFreeMeals + room.fingerMeals,
    0
  ) || details.residents;

  const dailyCost = totalResidents * details.mealsPerDay * details.pricePerMeal;
  const monthlyCost = dailyCost * 30;
  const yearlyCost = monthlyCost * 12;

  // Additional cost for dietary requirements
  const dietaryMultiplier = 1 + (details.dietaryRequirements / 100) * 0.2; // 20% increase for dietary requirements

  return (
    <Card className="p-6 bg-white">
      <h3 className="text-lg font-semibold mb-4">Quote Summary</h3>
      {details.careHomeName && (
        <div className="mb-4 pb-4 border-b">
          <p className="text-sm text-muted-foreground">Care Home</p>
          <p className="font-medium">{details.careHomeName}</p>
        </div>
      )}
      {details.menuType && (
        <div className="mb-4 pb-4 border-b">
          <p className="text-sm text-muted-foreground">Menu Type</p>
          <p className="font-medium">{details.menuType}</p>
        </div>
      )}
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-sm text-muted-foreground">Daily Cost:</span>
          <span className="font-medium">£{(dailyCost * dietaryMultiplier).toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-muted-foreground">Monthly Cost:</span>
          <span className="font-medium">£{(monthlyCost * dietaryMultiplier).toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-primary">
          <span className="text-sm">Yearly Cost:</span>
          <span className="font-semibold">£{(yearlyCost * dietaryMultiplier).toFixed(2)}</span>
        </div>
      </div>
    </Card>
  );
};

export default QuoteCalculator;