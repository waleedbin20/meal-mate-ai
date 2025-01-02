import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Settings2, Info } from "lucide-react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Input } from "./ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

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
      <SheetContent>
        <SheetHeader className="mb-6">
          <SheetTitle>Chat Settings</SheetTitle>
        </SheetHeader>
        <div className="space-y-6 py-4 px-2">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label className="text-sm font-medium">Model</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Select the AI model to use for generating responses.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Select
              value={settings.model}
              onValueChange={(value) => handleSettingChange("model", value)}
            >
              <SelectTrigger className="w-full bg-white">
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="gpt-4o">GPT-4 Optimized</SelectItem>
                <SelectItem value="gpt-4o-mini">GPT-4 Mini</SelectItem>
                <SelectItem value="gpt-35-turbo-16k">GPT-3.5 Turbo 16K</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Label className="text-sm font-medium">Temperature ({settings.temperature})</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Controls randomness in responses. Higher values make output more creative but less focused.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Slider
              value={[settings.temperature]}
              min={0}
              max={2}
              step={0.1}
              onValueChange={([value]) => handleSettingChange("temperature", value)}
              className="my-4"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Label className="text-sm font-medium">Max Tokens</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Maximum length of the generated response in tokens.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Input
              type="number"
              value={settings.maxTokens}
              onChange={(e) => handleSettingChange("maxTokens", parseInt(e.target.value))}
              min={1}
              max={4000}
              className="bg-white"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Label className="text-sm font-medium">Top P ({settings.topP})</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Controls diversity of responses. Lower values make output more focused and deterministic.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Slider
              value={[settings.topP]}
              min={0}
              max={1}
              step={0.1}
              onValueChange={([value]) => handleSettingChange("topP", value)}
              className="my-4"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Label className="text-sm font-medium">Frequency Penalty ({settings.frequencyPenalty})</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Reduces repetition by lowering the chance of reusing frequently used words.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Slider
              value={[settings.frequencyPenalty]}
              min={0}
              max={2}
              step={0.1}
              onValueChange={([value]) => handleSettingChange("frequencyPenalty", value)}
              className="my-4"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Label className="text-sm font-medium">Presence Penalty ({settings.presencePenalty})</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Encourages the model to talk about new topics by penalizing tokens that have appeared in the text.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Slider
              value={[settings.presencePenalty]}
              min={0}
              max={2}
              step={0.1}
              onValueChange={([value]) => handleSettingChange("presencePenalty", value)}
              className="my-4"
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ChatSettings;