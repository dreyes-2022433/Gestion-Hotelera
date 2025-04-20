import { Schema, model } from "mongoose"

const eventSchema = new Schema(
    {
        eventType: {
            type: String,
            required: [true, 'Event Type is required'],
            maxLength: [50, 'Cannot exceed 50 characters'],
            enum: ['CONFERENCE', 'BUSINESS MEETING', 'MARRIAGE', 'BIRTHDAY PARTY', 'ANNIVERSARY', 'BABY SHOWER', 'FAMILY REUNION', 'CULTURA FESTIVAL', 'RELIGIOUS EVENTS']
        },
        hotel: {
            type: Schema.Types.ObjectId,
            ref: 'Hotel',
            required: [true, 'Hotel ID is required']
        },
        services: [{
            name: {
                type: String,
                required: [true, 'Name of the Service is required'],
                maxLength: [50, 'Cannot exceed 50 characters']
            },
            price: {
                type: Number,
                required: [true, 'Price of the Service is required'],
                min: [0, 'Price cannot be negative']
            },
            description: {
                type: String,
                required: true,
                maxLength: [100, 'Cannot exceed 100 characters']
            }
        }],
        booker: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Booker ID is required']
        },
        guests: {
            type: Number,
            required: true,
            min: [0, 'Number of guests cannot be negative']
        },
        status: {
            type: Boolean,
            default: true
        }
    }
)

eventSchema.methods.toJson = function(){
    const {__v, ...event} = this.toObject()
    return event
}

export default model('Event', eventSchema)