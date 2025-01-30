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
      <p><strong>Total Residents:</strong> ${data.totalResidents || 0}</p>
      <p><strong>Number of Dining Rooms:</strong> ${
				data.numberOfDiningRooms || 0
			}</p>

      <p><strong>Selected Menu:</strong> ${
				data.selectedMenu?.menuName || "Not selected"
			}</p>

      ${
				extraMealOptions.length > 0
					? `<p><strong>Multi Twin Extra Options:</strong></p><ul>${extraMealOptions.join(
							""
					  )}</ul>`
					: ""
			}

      <p><strong>Labour Hours:</strong> ${
				data.currentLabourHours || 0
			} per day</p>
      <p><strong>Labour Cost:</strong> £${(
				data.currentLabourCost || 0
			).toLocaleString()} per year</p>
      <p><strong>Apetito Estimated Annual Labor Cost:</strong> £${(
				(data.apetitoLabor?.hourlyRate || 0) *
					(data.apetitoLabor?.hoursPerWeek || 0) *
					52 || 0
			).toLocaleString()} per year</p>
      <p><strong>Food Spend:</strong> £${(
				data.currentFoodSpend || 0
			).toLocaleString()} per year</p>
      <p><strong>Estimated Non-Apetito Spend:</strong> £${(
				data.estimatedNonApetitoSpend || 0
			).toLocaleString()} per year</p>
    </div>
  `;
};

export const formatQuoteResponse = (data: QuoteResponse): string => {
	return `
    <div style="font-family: Arial, sans-serif; padding: 10px; background-color: #f9f9f9; border-radius: 8px;">
      <p style="color: #34495e; font-size:18px">📢 Here is your generated quote for <strong>${
				data.quoteDetails.customerName
			}</strong> </p>
      <p><strong>Apetito Cost Per Resident Per Day:</strong> £${data.quoteDetails.apetitoCostResidentPerDay.toFixed(
				2
			)}</p>
      <p><strong>Menu Order Total:</strong> £${(
				data.quoteDetails.menuOrderTotal || 0
			).toLocaleString()}</p>
      <h3 style="margin-top: 10px; color: #27ae60;">📉 Annual Savings:</h3>
      <p><strong>Labour Savings:</strong> £${(
				data.quoteDetails.annualLaborSavings || 0
			).toLocaleString()}</p>
      <p><strong>Food Savings:</strong> £${(
				data.quoteDetails.annualFoodSavings || 0
			).toLocaleString()}</p>
      <p><strong>Total Annual Savings:</strong> £${(
				data.quoteDetails.annualTotalSavings || 0
			).toLocaleString()}</p>

    </div>
  `;
};
