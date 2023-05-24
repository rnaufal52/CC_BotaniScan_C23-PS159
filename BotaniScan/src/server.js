// import modul yang digunakan
import express from 'express'
import * as dotenv from 'dotenv' //untuk env
import logs from './middleware/logs.js' //
import diseaseRoute from './route/diseaseRoute.js'
import plantRoute from './route/plantRoute.js'
// tambahkan route store

dotenv.config()

const app = express()
const port = process.env.PORT || 5000

// middleware 
app.use(express.json());  //berupa json
app.use(express.urlencoded({ extended: false }));  //berupa url decoded
app.use(logs)

// routes
app.use(diseaseRoute)
app.use(plantRoute)
// tambahkan route store

////////////
app.listen(`${port}`, () => {
    console.log(`Server berjalan di port ${port}`)
})