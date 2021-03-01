import timeStamp from 'mongoose-timestamp'
import mongoose from 'mongoose'

const cartSchema = new mongoose.Schema({
  cartId: {
    type: String,
    required: true,
  },
  items: {
    type: Array,
    default: [],
  },
  total: {
    type: Number,
    default: 0,
  },
  userId: {
    type: String,
    required: true,
  },
})

cartSchema.plugin(timeStamp)

const Cart = mongoose.model('cart', cartSchema)

export default Cart
