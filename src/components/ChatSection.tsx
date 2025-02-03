import React from "react";
import { Message } from "@/components/ui/message";

interface ChatSectionProps {
  messages: Array<{ content: string; isAi: boolean; versionNumber?: number }>;
  isProcessing: boolean;
  onShowForm: () => void;
}

const ChatSection: React.FC<ChatSectionProps> = ({ messages, isProcessing, onShowForm }) => {
  return (
    <div className="chat-section">
      <div className="messages">
        {messages.map((msg, index) => (
          <Message key={index} isAi={msg.isAi}>
            {msg.content}
          </Message>
        ))}
        {isProcessing && <Message isAi={true}>Processing your request...</Message>}
      </div>
      <button onClick={onShowForm} className="show-form-button">
        Back to Form
      </button>
    </div>
  );
};

export default ChatSection;
