import timeStamp from 'mongoose-timestamp'
import mongoose from 'mongoose'

const gameSchema = new mongoose.Schema({
  gameId: {
    type: String,
    required: true,
    unique: true,
  },
  gameTitle: {
    type: String,
    required: true,
  },
  posterImage: {
    type: Object,
    required: true,
  },
  gameImage: {
    type: Object,
    required: true,
  },
  gameDescription: {
    type: String,
    required: true,
  },
  gamePrice: {
    type: Number,
    required: true,
  },
  gameDiscount: {
    type: Number,
    default: 0,
  },
  gamePriceAfterDiscount: {
    type: Number,
    default: 0,
  },
  gameDifficulty: {
    type: Number,
    required: true,
  },
  gameRating: {
    type: Number,
    required: false,
    default: 0,
  },
  gameGenre: {
    type: Array,
    required: true,
    default: [],
  },
  gameDuration: {
    type: Number,
    required: true,
  },
  gameUrl: {
    type: String,
    required: true,
    unique: true,
  },
  gameCapacity: {
    type: Number,
    required: true,
  },
  gameReady: {
    type: Boolean,
    required: true,
  },
  createdBy: {
    type: Object,
    default: {
      name: '',
      adminId: '',
    },
  },
})

gameSchema.plugin(timeStamp)

const Game = mongoose.model('game', gameSchema)

export default Game
