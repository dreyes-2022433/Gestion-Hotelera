import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const roomSchema = new Schema({
    number: {
        type: String, 
        required: true, 
        unique: true,
        trim: true, //Elimina espacios en blanco al inicio y al final
        match: [/^[A-Za-z0-9-]+$/, 'Room number must be alphanumeric with optional hyphens'],
        minLength: [1, 'Room number must be at least 1 character'],
        maxLength: [10, 'Room number cannot exceed 10 characters']
    },
    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotel',
        required: true,
        index: true // Agregar índice para mejorar el rendimiento de las consultas
    },
    capacity: {
        type: Number,
        required: true,
        min: [1, 'Capacity must be at least 1 person'],
        max: [20, 'Capacity cannot exceed 20 persons'],
        validate: {
            validator: Number.isInteger,
            message: 'Capacity must be an integer'
        }
    },
    reserved: {
        type: Boolean,
        default: false
    },
    stars: {
        type: String, 
        enum: {
            values: ['1', '2', '3', '4', '5'],
            message: '{VALUE} is not a valid star rating'
        }, 
        required: [true, 'Star rating is required']
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price cannot be negative'],
        validate: {
          validator: function(v) {
            // Verifica que el número tenga como máximo dos decimales
            return /^\d+(\.\d{1,2})?$/.test(v)  // Expresión regular para permitir hasta 2 decimales
          },
          message: 'Price must have up to 2 decimal places'
        }
      },   
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true, //Elimina espacios en blanco al inicio y al final
        minLength: [10, 'Description muest be at least 10 characters'],
        maxLength: [500, 'Description cannot exceed 500 characters']
    },
    
}, {
    timestamps: true, // Agregar timestamps para createdAt y updatedAt
    toJSON: { virtuals: true,},
    toObject: { virtuals: true,}
})

export default model('Room', roomSchema)