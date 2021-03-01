import timeStamp from 'mongoose-timestamp'
import mongoose from 'mongoose'

const codeSchema = new mongoose.Schema({
  codeId: {
    type: String,
    required: true,
  },
  gameId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  playingDate: {
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
  uniqueCode: {
    type: String,
    required: true,
    unique: true,
  },
  codeMembers: {
    type: Array,
    required: true,
  },
})

codeSchema.plugin(timeStamp)

const Code = mongoose.model('code', codeSchema)

export default Code
