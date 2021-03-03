import timeStamp from 'mongoose-timestamp'
import mongoose from 'mongoose'

const leaderboardSchema = new mongoose.Schema({
  leaderboardId: {
    type: String,
    default: '',
    required: true,
  },
  teamLeaderName: {
    type: String,
    default: '',
    required: true,
  },
  teamName: {
    type: String,
    default: '',
    required: true,
  },
  teamIcon: {
    type: String,
    default: '',
    required: true,
  },
  myGameId: {
    type: String,
    default: '',
    required: true,
  },
  gameId: {
    type: String,
    required: true,
  },
  time: {
    type: Number,
    default: 0,
    required: true,
  },
  score: {
    type: Number,
    default: 0,
    required: true,
  },
})

leaderboardSchema.plugin(timeStamp)

const Leaderboard = mongoose.model('leaderboard', leaderboardSchema)

export default Leaderboard
