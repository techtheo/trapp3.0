import OpenAI from "openai";
import { action } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";

export const chat = action({
  args: {
    messageBody: v.string(),
    conversation: v.id("conversations"),
  },
  handler: async (ctx, args) => {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      throw new Error("Missing OPENAI_API_KEY. Please provide the API key in your environment variables.");
    }

    const openai = new OpenAI({ apiKey });

    try {
      const res = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a terse bot in a group chat responding to questions with 1-sentence answers",
          },
          {
            role: "user",
            content: args.messageBody,
          },
        ],
      });

      const messageContent = res.choices[0]?.message?.content || "I'm sorry, I don't have a response for that.";

      await ctx.runMutation(api.messages.sendChatGPTMessage, {
        content: messageContent,
        conversation: args.conversation,
        messageType: "text",
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error with OpenAI Chat API:", error.message);
      } else {
        console.error("Unknown error with OpenAI Chat API:", error);
      }
      throw new Error("Failed to process the chat message. Please try again later.");
    }
  },
});

export const dall_e = action({
  args: {
    conversation: v.id("conversations"),
    messageBody: v.string(),
  },
  handler: async (ctx, args) => {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      throw new Error("Missing OPENAI_API_KEY. Please provide the API key in your environment variables.");
    }

    const openai = new OpenAI({ apiKey });

    try {
      const res = await openai.images.generate({
        prompt: args.messageBody,
        n: 1,
        size: "1024x1024",
      });

      const imageUrl = res.data[0]?.url || "/poopenai.png";

      await ctx.runMutation(api.messages.sendChatGPTMessage, {
        content: imageUrl,
        conversation: args.conversation,
        messageType: "image",
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error with OpenAI DALL-E API:", error.message);
      } else {
        console.error("Unknown error with OpenAI DALL-E API:", error);
      }
      throw new Error("Failed to generate the image. Please try again later.");
    }
  },
});
