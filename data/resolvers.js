'use strict';

const { Message } = require('../models');
require('dotenv').config();

// Define resolvers
const resolvers = {
    Query: {
        // Fetch all messages
        async allMessages() {
            return await Message.all();
        },

        // Get a message by ID
        async fetchMessage(_, { id }) {
            return await Message.findById(id);
        },
    },
    Mutation: {
        // Create new message
        async createMessage(_, { text }) {
            return await Message.create({
                text
            });
        },
        // Update a particular message
        async updateMessage(_, { id, text}) {
            // fetch the user by it ID
            const message = await Message.findById(id);
            // Update the user
            await message.update({
                text
            });
            return message;
        },
    },

}
module.exports = resolvers;