import timeStamp from 'mongoose-timestamp'
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  userImage: {
    type: Object,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verifiedAt: {
    type: Date,
  },
  city: {
    type: String,
    default: '',
  },
  province: {
    type: String,
    default: '',
  },
  birthday: {
    type: Date,
  },
  online: {
    type: Boolean,
    default: false,
  },
  phoneNumber: {
    type: String,
    default: '',
  },
  lastLogin: {
    type: Date,
  },
})

userSchema.plugin(timeStamp)

const Users = mongoose.model('user', userSchema)

export default Users
