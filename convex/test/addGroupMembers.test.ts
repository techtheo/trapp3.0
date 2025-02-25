// import { ConvexHttpClient } from "convex/browser";
// import { addGroupMembers, createConversation } from "../conversations";

// const client = new ConvexHttpClient("http://localhost:3000");

// describe("addGroupMembers", () => {
// 	it("should add new members to an existing group conversation", async () => {
// 		// Create a conversation and add initial members
// 		const conversationId = await client.mutation(createConversation, {
// 			participants: ["user1", "user2"],
// 			isGroup: true,
// 			groupName: "Test Group",
// 		});

// 		// Add new members
// 		const result = await client.mutation(addGroupMembers, {
// 			conversationId,
// 			newMembers: ["user3", "user4"],
// 		});

// 		// Fetch the updated conversation
// 		const updatedConversation = await client.query("getMyConversations");

// 		// Check if new members were added
// 		expect(updatedConversation[0].participants).toContain("user3");
// 		expect(updatedConversation[0].participants).toContain("user4");
// 	});
// });
