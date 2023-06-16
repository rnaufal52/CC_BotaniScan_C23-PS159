import dbPool from "../config/connection.js"
import { predictionPlant } from "../controller/predictionController.js"

// get id plant berdasarkan nama
const getPlantId = (plant) => {
    const SQLQuery = "SELECT plant_id From plant WHERE name=?"
    const values = [plant]

    return dbPool.execute(SQLQuery, values)
}

// get id disease berdasarkan hasil prediksi
const getDiseaseId = (predict) => {
    const SQLQuery = "SELECT disease_id from disease WHERE name=?"
    const values = [predict.prediction]

    return dbPool.execute(SQLQuery, values)
}

// post prediction
const postPredictModel = (prediction_id, dates, predict, plant_id, disease_id, user_id, imageUrl) => {
    const SQLQuery = "INSERT INTO prediction (prediction_id, user_id, plant_id, disease_id, img_url, accuration, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)"
    const values = [prediction_id, user_id, plant_id[0].plant_id, disease_id[0].disease_id, imageUrl, predict.confidence, dates]

    return dbPool.execute(SQLQuery, values)
}

export { getPlantId, getDiseaseId, postPredictModel }