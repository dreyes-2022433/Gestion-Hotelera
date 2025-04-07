import { Schema, model } from "mongoose"

const eventSchema = new Schema(
    {
        eventType: {
            type: String,
            required: [true, 'Event Type is required'],
            maxLength: [50, 'Cannot exceed 50 characters']
        },
        hotel: {
            type: Schema.Types.ObjectId,
            ref: 'Hotel',
            required: [true, 'Hotel ID is required']
        },
        room: {
            type: String,
            required: [true, 'Room is required'],
            maxLength: [5, 'Cannot exceed 5 characters'] 
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
            }
        }],
        booker: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Booker ID is required']
        },
        guests: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
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