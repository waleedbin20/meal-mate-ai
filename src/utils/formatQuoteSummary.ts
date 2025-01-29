import { QuoteFormData } from "@/components/quote-form/types";
import { QuoteResponse } from "@/types/quoteResponse";

export const formatQuoteRequest = (data: QuoteFormData): string => {
    const extraMealOptions = [];
    if (data.extras.includeBreakfast) {
        extraMealOptions.push(
            `<li>Include Breakfast: ${data.extras.includeBreakfast}</li>`
        );
    }
    if (data.extras.includeLighterMealDessert) {
        extraMealOptions.push(
            `<li>Include Lighter Meal Dessert: <strong>${data.extras.includeLighterMealDessert}</strong></li>`
        );
    }
    if (data.extras.lighterMealOption) {
        extraMealOptions.push(
            `<li>Lighter Meal Option: <strong>${data.extras.lighterMealOption}</strong></li>`
        );
    }

    return `
    <div style="font-family: Arial, sans-serif; padding: 10px; background-color: #f9f9f9; border-radius: 8px; color: #2c3e50;">
      <p style="color: #34495e; font-size: 18px;">📌 <strong>Quote Request Summary</strong></p>
      <p><strong>Care Home:</strong> ${data.careHomeName}</p>
      <p><strong>Total Residents:</strong> ${data.totalResidents}</p>
      <p><strong>Number of Dining Rooms:</strong> ${data.numberOfDiningRooms}</p>
      <p><strong>Selected Menu:</strong> ${data.selectedMenu?.menuName || "Not selected"}</p>

      ${extraMealOptions.length > 0
            ? `<p><strong>Extra Meal Options:</strong></p><ul>${extraMealOptions.join("")}</ul>`
            : ""
        }

      <p><strong>Labour Hours:</strong> ${data.currentLabourHours} per day</p>
      <p><strong>Labour Cost:</strong> £${data.currentLabourCost.toLocaleString()} per year</p>
      <p><strong>Food Spend:</strong> £${data.currentFoodSpend.toLocaleString()} per year</p>
      <p><strong>Estimated Non-Apetito Spend:</strong> £${data.estimatedNonApetitoSpend.toLocaleString()} per year</p>
    </div>
  `;
};

export const formatQuoteResponse = (data: QuoteResponse): string => {
    return `
    <div style="font-family: Arial, sans-serif; padding: 10px; background-color: #f9f9f9; border-radius: 8px;">
      <p style="color: #34495e; font-size:18px">📢 Here is your generated quote for <strong>${data.quoteDetails.customerName}</strong> </p>
      <p><strong>Apetito Cost Per Resident Per Day:</strong> £${data.quoteDetails.apetitoCostResidentPerDay.toFixed(2)}</p>
      <p><strong>Menu Order Total:</strong> £${data.quoteDetails.menuOrderTotal.toLocaleString()}</p>
      <h3 style="margin-top: 10px; color: #27ae60;">📉 Annual Savings:</h3>
      <p><strong>Labour Savings:</strong> £${data.quoteDetails.annualLaborSavings.toLocaleString()}</p>
      <p><strong>Food Savings:</strong> £${data.quoteDetails.annualFoodSavings.toLocaleString()}</p>
      <p><strong>Total Annual Savings:</strong> £${data.quoteDetails.annualTotalSavings.toLocaleString()}</p>
    </div>
  `;
};