import { PubSub } from 'apollo-server';
import { Message } from '../models';
require('dotenv').config();


const MESSAGE_CREATED = 'MESSAGE_CREATED';

const pubsub = new PubSub();

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
            })
            .then(message=>{
                pubsub.publish(MESSAGE_CREATED, 
                    { messageCreated: message });

            })
            .then(message=>{
                return message;
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
    Subscription: {
        messageCreated: {
          // Additional event labels can be passed to asyncIterator creation
          subscribe: () => pubsub.asyncIterator([MESSAGE_CREATED]),
        },
    },
}

export default resolvers;