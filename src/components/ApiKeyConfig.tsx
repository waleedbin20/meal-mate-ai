import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";

interface ApiKeyConfigProps {
  onSave: (keys: {
    azureEndpoint: string;
    azureApiKey: string;
    deploymentName: string;
  }) => void;
}

const ApiKeyConfig: React.FC<ApiKeyConfigProps> = ({ onSave }) => {
  const form = useForm({
    defaultValues: {
      azureEndpoint: "",
      azureApiKey: "",
      deploymentName: "",
    },
  });
  const { toast } = useToast();

  const onSubmit = (values: {
    azureEndpoint: string;
    azureApiKey: string;
    deploymentName: string;
  }) => {
    onSave(values);
    toast({
      title: "API Keys Saved",
      description: "Your Azure OpenAI configuration has been saved securely.",
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="azureEndpoint"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Azure Endpoint URL</FormLabel>
              <FormControl>
                <Input placeholder="https://your-resource.openai.azure.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="azureApiKey"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Azure API Key</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Enter your API key" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="deploymentName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deployment Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your deployment name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Save Configuration</Button>
      </form>
    </Form>
  );
};

export default ApiKeyConfig;