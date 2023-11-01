const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const port = process.env.PORT || 3000
const router_usuarios = require('./routes/usuarios')
const router_posts = require('./routes/posts')
const router_comentarios = require('./routes/comentarios')
const swaggerUI = require('swagger-ui-express')
const swaggerDoc = require('../swagger.json')

app.use(cors())
app.use(express.json())
app.use('/static', express.static('src/public'))
app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(swaggerDoc))
app.use(router_usuarios)
app.use(router_posts)
app.use(router_comentarios)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})