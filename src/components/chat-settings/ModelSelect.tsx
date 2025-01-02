import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import SettingsField from "./SettingsField";

interface ModelSelectProps {
  value: string;
  onChange: (value: string) => void;
}

const ModelSelect = ({ value, onChange }: ModelSelectProps) => {
  return (
    <SettingsField
      label="Model"
      tooltip="Select the AI model to use for generating responses."
    >
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full bg-white border-gray-200">
          <SelectValue placeholder="Select model" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          <SelectItem value="gpt-4o">GPT-4 Optimized</SelectItem>
          <SelectItem value="gpt-4o-mini">GPT-4 Mini</SelectItem>
          <SelectItem value="gpt-35-turbo-16k">GPT-3.5 Turbo 16K</SelectItem>
        </SelectContent>
      </Select>
    </SettingsField>
  );
};

export default ModelSelect;