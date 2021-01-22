import { getConfig } from '../config/global_config'

export default function connectMongo(mongoose) {
  const mongoURI = getConfig('/mongoDbUrl')
  const mode = getConfig('/mode')
  mongoose.connect(
    mode === 'dev' ? 'mongodb://localhost:27017/minigames' : mongoURI,
    {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    err => {
      if (err) {
        console.error(err)
        console.log('Failed to connect database')
      } else {
        console.log('Connected to Mongo database')
      }
    }
  )
}
