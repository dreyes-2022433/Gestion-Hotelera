import mongoose, { Schema, model } from "mongoose"

const hotelSchema = Schema(
    {
        name: {
            type: String,
            maxLength: [50, `Can´t be overcome 50 characters`],
            required: [true, 'Name is required']
        },
        direction: {
            type: String,
            maxLength: [100, `Can´t be overcome 100 characters`],
            required: [true, 'Direction is required']
        },
        category: {
            type: String,
            maxLength: [20, `Can´t be overcome 20 characters`],
            required: [true, 'Category is required']
        },
        phone: {
            type: String,
            maxLength: [14, `Can´t be overcome 14 characters`],
            required: [true, 'phone is required']
        },
        email: {
            type: String,
            maxLength: [50, `Can´t be overcome 50 characters`],
            required: [true, 'Email is required']
        },
        description: {
            type: String,
            maxLength: [150, `Can´t be overcome 150 characters`],
            required: [true, 'Description is required']
        },
        amenities: {
            type: String,
            maxLength: [100, `Can´t be overcome 100 characters`],
            required: [true, 'Amenities is required']
        },
        profilePicture : {
            type: String 
        },
        status:{
            type: Boolean,
            default: false
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }
)

export default model('Hotel', hotelSchema)