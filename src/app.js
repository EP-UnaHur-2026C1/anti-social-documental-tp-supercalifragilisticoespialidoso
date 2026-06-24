import express from 'express'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import YAML from 'yaml'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { router as authRoute } from './routes/auth.route.js'
import { router as usersRoute } from './routes/users.route.js'
import { router as postsRoute } from './routes/posts.route.js'
import { router as commentsRoute } from './routes/comments.route.js'
import { router as tagsRoute } from './routes/tags.route.js'
import { router as cloudinaryRoute } from './routes/cloudinary.route.js'
import { router as cleanupRoute } from './routes/cleanup.route.js'
import { router as seedRoute } from './routes/seed.route.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const swaggerYamlPath = path.join(__dirname, '..', 'swagger.yaml')
const swaggerYaml = fs.readFileSync(swaggerYamlPath, 'utf8')
const swaggerDocument = YAML.parse(swaggerYaml)

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use('/', authRoute)
app.use('/', usersRoute)
app.use('/', postsRoute)
app.use('/', commentsRoute)
app.use('/', tagsRoute)
app.use('/', cloudinaryRoute)
app.use('/', cleanupRoute)
app.use('/', seedRoute)

app.use((err, req, res, next) => {
  if (err.code === 11000) {
    const campo = Object.keys(err.keyPattern)[0]
    const mensajes = {
      nickName: 'El nickname ya está en uso',
      email: 'El email ya está registrado',
    }
    const mensaje = mensajes[campo] || `El valor de ${campo} ya existe`
    return res.status(409).json({ error: mensaje, campo })
  }

  res.status(err.status ?? 500).json({ error: err.message })
  next()
})

export { app }
