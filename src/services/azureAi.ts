export const generateAiResponse = async (message: string): Promise<string> => {
  try {
    const response = await fetch('http://localhost:3000/api/chat', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to generate response");
    }

    const data = await response.json();
    return data.message;
  } catch (error) {
    console.error("Error calling chat API:", error);
    throw error;
  }
};