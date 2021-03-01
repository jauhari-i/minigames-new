import timeStamp from 'mongoose-timestamp'
import mongoose from 'mongoose'

const myGameSchema = new mongoose.Schema({
  myGameId: {
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
  isExpired: {
    type: Boolean,
    required: true,
    default: false,
  },
  isPlayed: {
    type: Boolean,
    default: false,
    required: true,
  },
  lastPlayedDate: {
    type: Date,
  },
  lastPlayer: {
    type: String,
  },
  codeId: {
    type: String,
    required: true,
  },
})

myGameSchema.plugin(timeStamp)

const MyGame = mongoose.model('mygame', myGameSchema)

export default MyGame
