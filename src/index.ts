import express from 'express'
import cors from 'cors'

import router from './router'
import config from './config'

const app = express()


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', router)

app.listen(config.port, () => {
  console.log(`Server is running on port http://localhost:${config.port}`)
})
