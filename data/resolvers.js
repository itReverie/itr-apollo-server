import { PubSub, withFilter } from 'apollo-server';
import { Message } from '../models';
require('dotenv').config();

const MESSAGE_CREATED = 'MESSAGE_CREATED';
const MESSAGE_UPDATED = 'MESSAGE_UPDATED';

const pubsub = new PubSub();

const resolvers = {
    Query: {
        async allMessages() {
            return await Message.all({order:[['id', 'DESC']]});
        },
        async fetchMessage(_, { id }) {
            return await Message.findById(id);
        },
    },
    Mutation: {
        async createMessage(_, { text }) {
            const message = await Message.create({ text });
            await pubsub.publish(MESSAGE_CREATED, { messageCreated: message });
            return message;
        },
        async updateMessage(_, { id, text, isFavorite}) {
            const message = await Message.findById(id);
            await message.update({text,isFavorite})
            .then(message=>{
                pubsub.publish(MESSAGE_UPDATED, { messageUpdated: message });
            });
            return message;
        },
    },
    Subscription: {
        messageCreated: {
          subscribe: () => pubsub.asyncIterator([MESSAGE_CREATED]),
        },
        messageUpdated: {
            subscribe: withFilter(
                                  () => pubsub.asyncIterator('MESSAGE_UPDATED'),
                                        (payload, variables) => {
                                                return payload.messageUpdated.id === variables.id;
                                            },
                                  ),
          },
    }
}

export default resolvers;