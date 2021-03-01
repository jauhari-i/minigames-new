import timeStamp from 'mongoose-timestamp'
import mongoose from 'mongoose'

const adminSchema = new mongoose.Schema({
  adminId: {
    type: String,
    required: true,
  },
  adminName: {
    type: String,
    required: true,
  },
  adminEmail: {
    type: String,
    unique: true,
    required: true,
  },
  adminPassword: {
    type: String,
    required: true,
  },
  adminImage: {
    type: Object,
    required: true,
  },
  level: {
    type: Number,
    default: 0,
  },
  lastLogin: {
    type: Date,
  },
})

adminSchema.plugin(timeStamp)

const Admin = mongoose.model('admin', adminSchema)

export default Admin
