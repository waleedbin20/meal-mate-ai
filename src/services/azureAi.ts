interface AzureConfig {
  azureEndpoint: string;
  azureApiKey: string;
  deploymentName: string;
}

export const generateAiResponse = async (
  message: string,
  config: AzureConfig
): Promise<string> => {
  try {
    const response = await fetch(
      `${config.azureEndpoint}/openai/deployments/${config.deploymentName}/chat/completions?api-version=2024-02-15-preview`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": config.azureApiKey,
        },
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content:
                "You are a helpful assistant that helps generate quotes for care home meal plans.",
            },
            {
              role: "user",
              content: message,
            },
          ],
          max_tokens: 800,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to generate response");
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error calling Azure OpenAI:", error);
    throw error;
  }
};