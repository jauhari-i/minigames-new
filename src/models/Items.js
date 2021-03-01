import timeStamp from 'mongoose-timestamp'
import mongoose from 'mongoose'

const itemSchema = new mongoose.Schema({
  itemId: {
    type: String,
    required: true,
  },
  gameId: {
    type: String,
    required: true,
  },
  datePlay: {
    type: Date,
    required: true,
  },
  timeStart: {
    type: Number,
    required: true,
  },
  timeEnd: {
    type: Number,
    required: true,
  },
  itemMembers: {
    type: Array,
    required: true,
  },
  itemPrice: {
    type: Number,
    required: true,
  },
})

itemSchema.plugin(timeStamp)

const Items = mongoose.model('item', itemSchema)

export default Items
