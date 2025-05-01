import mongoose,{Schema,model} from "mongoose"

const factureSchema = Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'User ID is required']
        },
        hotel: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Hotel',
            required: [true, 'Hotel ID is required']
        },
        event: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event',
            
        },
        room : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Room',  
        },
        totalAmount: {
            type: Number,
            required: [true, 'Total Amount is required'],
            min: [0, 'Total Amount cannot be negative']
        },
        paymentStatus: {
            type: String,
            enum: ['Paid', 'Pending', 'Cancelled'],
            default: 'Pending'
        }
    }
)


export default model('Facture', factureSchema)