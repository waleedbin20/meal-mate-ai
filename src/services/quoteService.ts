import { TransformedQuoteData } from "@/utils/transformQuoteData";

export const submitQuote = async (quoteData: TransformedQuoteData) => {
  const response = await fetch("/api/quotes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(quoteData),
  });

  if (!response.ok) {
    throw new Error("Failed to submit quote");
  }

  return response.json();
};