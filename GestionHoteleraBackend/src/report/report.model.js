import mongoose, { Schema, model } from 'mongoose'

const reportSchema = Schema(
  {
    title: {
      type: String,
      maxLength: [100, `Can't be more than 100 characters`],
      required: [true, 'Title is required']
    },
    description: {
      type: String,
      maxLength: [300, `Can't be more than 300 characters`],
      required: [true, 'Description is required']
    },
    generatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    data: {
      type: Object,
      required: [true, 'Report data is required']
    },
    date: {
      type: Date,
      default: Date.now
    }
  }
)

export default model('Report', reportSchema)
