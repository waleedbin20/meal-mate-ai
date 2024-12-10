import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileDown, FileText } from "lucide-react";
import { Separator } from "@/components/ui/separator";

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
  const costPerDinerPerDay = dailyCost / totalResidents;

  // Additional cost for dietary requirements
  const dietaryMultiplier = 1 + (details.dietaryRequirements / 100) * 0.2;

  // Mock data for demonstration
  const labourSavings = 15000; // Annual labour cost savings
  const foodSavings = 8000; // Annual food cost savings
  const timeSavings = 520; // Hours saved per year

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="text-xl text-primary">Quote Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Care Home Details */}
        {details.careHomeName && (
          <div className="space-y-2">
            <h4 className="font-medium">Care Home Details</h4>
            <p className="text-sm text-muted-foreground">{details.careHomeName}</p>
            {details.menuType && (
              <p className="text-sm text-muted-foreground">Menu Type: {details.menuType}</p>
            )}
          </div>
        )}

        <Separator />

        {/* Costing Summary */}
        <div className="space-y-2">
          <h4 className="font-medium">Costing Summary</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Average cost/diner/day</p>
              <p className="font-medium">£{costPerDinerPerDay.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Daily Total</p>
              <p className="font-medium">£{(dailyCost * dietaryMultiplier).toFixed(2)}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Monthly Total</p>
              <p className="font-medium">£{(monthlyCost * dietaryMultiplier).toFixed(2)}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Yearly Total</p>
              <p className="font-medium text-primary">£{(yearlyCost * dietaryMultiplier).toFixed(2)}</p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Savings Summary */}
        <div className="space-y-2">
          <h4 className="font-medium">Cost & Time Savings</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Annual Labour Savings</p>
              <p className="font-medium text-green-600">£{labourSavings.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Annual Food Savings</p>
              <p className="font-medium text-green-600">£{foodSavings.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Time Saved (Hours/Year)</p>
              <p className="font-medium text-green-600">{timeSavings} hours</p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Nutritional Summary */}
        <div className="space-y-2">
          <h4 className="font-medium">Nutritional Summary</h4>
          <div className="text-sm text-muted-foreground">
            <p>• Meets CQC nutritional guidelines</p>
            <p>• Balanced macro and micronutrients</p>
            <p>• Specialized dietary requirements supported</p>
            <p>• Regular menu rotation</p>
          </div>
        </div>

        <Separator />

        {/* Export Options */}
        <div className="flex gap-4 flex-wrap">
          <Button variant="outline" className="flex-1 min-w-[120px]">
            <FileText className="mr-2 h-4 w-4" />
            Export Proposal
          </Button>
          <Button variant="outline" className="flex-1 min-w-[120px]">
            <FileDown className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuoteCalculator;