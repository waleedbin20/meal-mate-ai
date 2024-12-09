import { useState, useEffect } from "react";

interface ApiKeys {
  azureEndpoint: string;
  azureApiKey: string;
  deploymentName: string;
}

export const useApiKeys = () => {
  const [apiKeys, setApiKeys] = useState<ApiKeys | null>(null);

  useEffect(() => {
    const storedKeys = localStorage.getItem("azureApiKeys");
    if (storedKeys) {
      setApiKeys(JSON.parse(storedKeys));
    }
  }, []);

  const saveApiKeys = (keys: ApiKeys) => {
    localStorage.setItem("azureApiKeys", JSON.stringify(keys));
    setApiKeys(keys);
  };

  const clearApiKeys = () => {
    localStorage.removeItem("azureApiKeys");
    setApiKeys(null);
  };

  return { apiKeys, saveApiKeys, clearApiKeys };
};