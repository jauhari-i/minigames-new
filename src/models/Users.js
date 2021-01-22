import timeStamp from 'mongoose-timestamp'
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  name: {
    type: String,
  },
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  userPhotos: {
    type: String,
    default:
      'https://res.cloudinary.com/mygalleryfile/image/upload/v1591678783/269-2697881_computer-icons-user-clip-art-transparent-png-icon_yi1dtt.png',
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

const Users = mongoose.model('userV2', userSchema)

export default Users
