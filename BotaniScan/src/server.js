// import modul yang digunakan
import express from 'express'
import * as dotenv from 'dotenv' //untuk env
import logs from './middleware/logs.js' //
import diseaseRoute from './route/diseaseRoute.js'
import plantRoute from './route/plantRoute.js'
import authRoute from './route/authRoute.js'
import storeRoute from './route/storeRoute.js'
import userRoute from './route/userRoute.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 5000

// middleware 
app.use(express.json());  //berupa json
app.use(express.urlencoded({ extended: false }));  //berupa url decoded
app.use(logs)

// routes
app.use(authRoute)
app.use(diseaseRoute)
app.use(plantRoute)
app.use(storeRoute)
app.use(userRoute)

////////////
app.listen(`${port}`, () => {
    console.log(`Server berjalan di port ${port}`)
})