import mongoose from 'mongoose'

const databaseConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DATABASE_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('Base de Datos Conectada')
  } catch (error) {
    throw new Error(error)
  }
}

const mongooseConnection = mongoose.connection

export { databaseConnect, mongooseConnection }
