// File: src/chatbot/ActionProvider.js
import { sendMessageToBackend, uploadImageToBackend } from "../api";

class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  handleUserMessage = async (message) => {
    try {
      const response = await sendMessageToBackend(message);
      const botMessage = this.createChatBotMessage(response);
      this.addMessageToState(botMessage);
    } catch (err) {
      const errorResponse = this.createChatBotMessage(
        "Sorry, I'm having trouble connecting. Try again soon!"
      );
      this.addMessageToState(errorResponse);
    }
  };

  // Optional: method to handle image uploads if you integrate UI for this
  handleImageUpload = async (file) => {
    try {
      const result = await uploadImageToBackend(file);
      const botMessage = this.createChatBotMessage(`Diagnosis: ${result}`);
      this.addMessageToState(botMessage);
    } catch (err) {
      const errorResponse = this.createChatBotMessage(
        "Image upload failed. Please retry."
      );
      this.addMessageToState(errorResponse);
    }
  };

  addMessageToState = (botMessage) => {
    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };
}

export default ActionProvider;
