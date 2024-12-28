import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, MessageSquarePlus } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend, disabled }) => {
  const [message, setMessage] = useState("");

  const presetMessages = [
    "Create a quote for [care home name] with [number of residents] and dining rooms like [Room A: 10, Room B: 15]. The customer ID is [customer ID], and the menu ID is [menu ID].",
    "Modify the quote with ID [quote ID] to update the resident details or change the menu to [new menu ID]."
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSend(message);
      setMessage("");
    }
  };

  const handlePresetClick = (preset: string) => {
    setMessage(preset);
  };

  return (
    <div className="space-y-3 p-4 border-t bg-white/50 backdrop-blur-sm">
      <div className="flex gap-2 overflow-x-auto pb-2">
        {presetMessages.map((preset, index) => (
          <Button
            key={index}
            variant="outline"
            className="flex items-center gap-2 whitespace-nowrap text-sm bg-white hover:bg-purple-50 border-purple-100"
            onClick={() => handlePresetClick(preset)}
            disabled={disabled}
          >
            <MessageSquarePlus className="h-4 w-4 text-purple-500" />
            <span className="truncate max-w-[300px]">
              {preset.length > 50 ? preset.substring(0, 50) + "..." : preset}
            </span>
          </Button>
        ))}
      </div>
      
      <form onSubmit={handleSubmit} className="flex gap-3">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          disabled={disabled}
          className="flex-1 bg-white border-purple-100 focus-visible:ring-purple-500 rounded-xl"
        />
        <Button 
          type="submit" 
          disabled={disabled || !message.trim()}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 rounded-xl shadow-md"
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};

export default ChatInput;