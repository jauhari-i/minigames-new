import timeStamp from 'mongoose-timestamp'
import mongoose from 'mongoose'

const transactionSchema = new mongoose.Schema({
  transactionId: {
    type: String,
    required: true,
  },
  transactionItems: {
    type: Array,
  },
  transactionTotal: {
    type: Number,
    default: 0,
  },
  transactionStatus: {
    type: Number,
    default: 0,
  },
  transactionImage: {
    type: String,
  },
  paymentToken: {
    type: String,
  },
  isExpired: {
    type: Boolean,
    default: false,
  },
  isRejected: {
    type: Boolean,
    default: false,
  },
  rejectedReason: {
    type: String,
  },
  userId: {
    type: String,
    required: true,
  },
  adminId: {
    type: String,
    required: true,
  },
})

transactionSchema.plugin(timeStamp)

const Transaction = mongoose.model('transaction', transactionSchema)

export default Transaction
