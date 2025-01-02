import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Settings2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import ModelSelect from "./chat-settings/ModelSelect";
import SliderField from "./chat-settings/SliderField";
import SettingsField from "./chat-settings/SettingsField";

interface ChatSettingsProps {
  settings: {
    model: string;
    temperature: number;
    maxTokens: number;
    topP: number;
    frequencyPenalty: number;
    presencePenalty: number;
  };
  onSettingsChange: (settings: any) => void;
}

const ChatSettings: React.FC<ChatSettingsProps> = ({ settings, onSettingsChange }) => {
  const handleSettingChange = (key: string, value: any) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-purple-100 hover:text-purple-900"
        >
          <Settings2 className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle>Chat Settings</SheetTitle>
        </SheetHeader>
        <div className="space-y-6 py-4 px-2 bg-white/95 rounded-lg">
          <ModelSelect
            value={settings.model}
            onChange={(value) => handleSettingChange("model", value)}
          />

          <SliderField
            label="Temperature"
            tooltip="Controls randomness in responses. Higher values make output more creative but less focused."
            value={settings.temperature}
            onChange={(value) => handleSettingChange("temperature", value)}
            min={0}
            max={2}
            step={0.1}
          />

          <SettingsField
            label="Max Tokens"
            tooltip="Maximum length of the generated response in tokens."
          >
            <Input
              type="number"
              value={settings.maxTokens}
              onChange={(e) => handleSettingChange("maxTokens", parseInt(e.target.value))}
              min={1}
              max={4000}
              className="bg-white border-gray-200"
            />
          </SettingsField>

          <SliderField
            label="Top P"
            tooltip="Controls diversity of responses. Lower values make output more focused and deterministic."
            value={settings.topP}
            onChange={(value) => handleSettingChange("topP", value)}
            min={0}
            max={1}
            step={0.1}
          />

          <SliderField
            label="Frequency Penalty"
            tooltip="Reduces repetition by lowering the chance of reusing frequently used words."
            value={settings.frequencyPenalty}
            onChange={(value) => handleSettingChange("frequencyPenalty", value)}
            min={0}
            max={2}
            step={0.1}
          />

          <SliderField
            label="Presence Penalty"
            tooltip="Encourages the model to talk about new topics by penalizing tokens that have appeared in the text."
            value={settings.presencePenalty}
            onChange={(value) => handleSettingChange("presencePenalty", value)}
            min={0}
            max={2}
            step={0.1}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ChatSettings;