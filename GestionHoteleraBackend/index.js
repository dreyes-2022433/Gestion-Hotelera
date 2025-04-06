import { initServer } from './configs/app.js'
import { config } from 'dotenv'
import { connect } from './configs/mongo.js'
import { createDefaultAdmin } from './src/user/createAdmin.js'

config()

const startApp = async () => {
  await connect()
  await createDefaultAdmin()
  await initServer()
}

startApp()
