import 'dotenv/config'
import { app } from './app.js'
import mongoose from 'mongoose'

const PORT = process.env.PORT || 3000

await mongoose.connect(process.env.MONGODB_URI)
console.log('Conectado a MongoDB')

app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`)
})
