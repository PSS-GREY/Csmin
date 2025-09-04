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
      console.error(err);
      const errorMessage = this.createChatBotMessage(
        "Sorry, I'm having trouble connecting. Please try again later."
      );
      this.addMessageToState(errorMessage);
    }
  };

  handleImageUpload = async (file) => {
    try {
      const result = await uploadImageToBackend(file);
      const botMessage = this.createChatBotMessage(
        `Model prediction: ${result}`
      );
      this.addMessageToState(botMessage);
    } catch (err) {
      console.error(err);
      const errorMessage = this.createChatBotMessage(
        "Image upload failed. Try again."
      );
      this.addMessageToState(errorMessage);
    }
  };

  addMessageToState = (botMessage) => {
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, botMessage],
    }));
  };
}

export default ActionProvider;
