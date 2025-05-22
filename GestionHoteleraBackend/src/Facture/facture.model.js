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
        description: {
            type: String,
            maxLength: [300, 'Description cannot exceed 300 characters']
        },
        additionalServices: [{
            serviceId: {
                type: mongoose.Schema.Types.ObjectId,
                required: [true, 'Service ID is required']
            },
            serviceType: {
                type: String,
                enum: ['Room', 'Event'],
                required: [true, 'Service Type is required']
            },
    }],
        event: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event',   
        },
        room : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Room',  
        },
        totaladditionalServices: {
            type: Number,
            
            min: [0, 'Total Additional Services cannot be negative']
        },
        totalAmount: {
            type: Number,
            required: [true, 'Total Amount is required'],
            min: [0, 'Total Amount cannot be negative']
        },
        totalValue: {
            type: Number,
            required: [true, 'Total Value is required'],
            min: [0, 'Total Value cannot be negative']
        },
        paymentStatus: {
            type: String,
            enum: ['Paid', 'Pending', 'Cancelled'],
            default: 'Pending'
        }
    }
)


export default model('Facture', factureSchema)