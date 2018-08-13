import { PubSub, withFilter } from 'apollo-server';
import { Message } from '../models';
require('dotenv').config();


const MESSAGE_CREATED = 'MESSAGE_CREATED';
const MESSAGE_UPDATED = 'MESSAGE_UPDATED';

const pubsub = new PubSub();

// Define resolvers
const resolvers = {
    Query: {
        // Fetch all messages
        async allMessages() {
            return await Message.all({order:[['id', 'DESC']]});
        },
  
        // Get a message by ID
        async fetchMessage(_, { id }) {
            return await Message.findById(id);
        },
    },
    Mutation: {
        // Create new message
        async createMessage(_, { text }) {
            await Message.create({
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
        async updateMessage(_, { id, text, isFavorite}) {
            // fetch the user by it ID
            const message = await Message.findById(id);
            // Update the user
            await message.update({
                text,
                isFavorite
            })
            .then(message=>{
                pubsub.publish(MESSAGE_UPDATED, 
                    { messageUpdated: message });
            });
            return message;
        },
    },
    Subscription: {
        messageCreated: {
          // Additional event labels can be passed to asyncIterator creation
          subscribe: () => pubsub.asyncIterator([MESSAGE_CREATED]),
        },
        messageUpdated: {
            // Additional event labels can be passed to asyncIterator creation
            subscribe: withFilter(
                                        () => pubsub.asyncIterator([MESSAGE_UPDATED]),
                                        (payload, variables) => {
                                            return payload.messageUpdated.id === variables.id;
                                           },
                                        ),
          },
    }
}

export default resolvers;