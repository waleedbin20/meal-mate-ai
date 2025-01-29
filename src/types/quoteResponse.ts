export interface QuoteResponse {
	summary?: string;
	quoteDetails: {
		customerName?: string;
		apetitoCostResidentPerDay?: number;
		menuOrderTotal?: number;
		annualLaborSavings?: number;
		annualFoodSavings?: number;
		annualTotalSavings?: number;
	};
}

export interface SavedQuote {
	id: number;
	creatorName: string;
	createdOn: string;
	careHomeName: string;
	totalResidents: number;
	quoteStatus: string;
	quoteNo: string;
}

export interface ApiResponse<T> {
	success: boolean;
	statusCode: number;
	message: string;
	data: T;
	timestamp: string;
}

export interface QuoteHistory {
	id: number;
	quoteId: number;
	versionNumber: number;
	type: HistoryType;
	createdOn: string;
	summary?: string; // Added summary property
	careHomeName: string;
	numberOfResidents?: number;
	numberOfDiningRooms?: number;
	selectedMenu: string;
	includeBreakfast: boolean;
	lighterMealOption: string;
	includeLighterMealDessert: boolean;
	currentAnnualFoodSpend?: number;
	estimatedNonApetitoSpend?: number;
	numberOfRoles?: number;
	currentAnnualLabourCost?: number;
	apetitoEstimatedAnnualLabourCost?: number;
	costPerDayPerResident?: number;
	menuOrderTotal?: number;
	annualLaborSavings?: number;
	annualFoodSavings?: number;
	annualTotalSavings?: number;
}

export enum HistoryType {
	Request = 0,
	Response = 1,
}