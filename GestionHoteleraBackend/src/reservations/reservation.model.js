import mongoose, { Schema, model } from 'mongoose'

const reservationSchema = Schema(
  {
    type: {
      type: String,
      enum: ['Room', 'Hotel'],
      required: [true, 'Reservation type is required']
    },
    room : {	
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room',
      
    },
    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hotel',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required']
    },
    startDate: {
      type: Date,
      required: [true, 'Start date is required']
    },
    endDate: {
      type: Date,
      required: [true, 'End date is required']
    },
    services: [
      {
        name: {
          type: String,
          required: [true, 'Service name is required']
        },
        description: {
          type: String,
          maxLength: [200, `Can't be more than 200 characters`],
          required: [true, 'Service description is required']
        },
        price: {
          type: Number,
          required: [true, 'Service price is required'],
          min: [0, 'Price cannot be negative']
        }
      }
    ],
    description: {
      type: String,
      maxLength: [300, `Can't be more than 300 characters`],
      required: [true, 'Reservation description is required']
    }
  },
  {
    timestamps: true
  }
)

export default model('Reservation', reservationSchema)
