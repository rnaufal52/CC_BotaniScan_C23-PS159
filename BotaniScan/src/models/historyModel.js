import dbPool from "../config/connection.js"

// get history
const getHistoryModel = (user_id) => {
    const SQLQuery = `
        SELECT prediction.prediction_id, prediction.img_url, prediction.accuration,
               plant.name AS plant_name, plant.desc AS plant_desc,
               disease.name AS disease_name, disease.desc AS disease_desc, disease.solution,prediction.created_at
        FROM prediction
        INNER JOIN plant ON prediction.plant_id = plant.plant_id
        INNER JOIN disease ON prediction.disease_id = disease.disease_id
        WHERE prediction.user_id = ? ORDER BY prediction.created_at DESC
    `
    const values = [user_id]

    return dbPool.execute(SQLQuery, values)
        .then(([rows]) => {
            const result = rows.map(row => ({
                prediction_id: row.prediction_id,
                img_url: row.img_url,
                accuration: row.accuration,
                plant_name: row.plant_name,
                plant_desc: row.plant_desc,
                disease_name: row.disease_name,
                disease_desc: row.disease_desc,
                solution: row.solution,
                created_at:row.created_at
            }))
            return result
        })
}

// get data by id
const getHistoryModelById = (prediction_id) => {
    const SQLQuery = `
        SELECT prediction.prediction_id, prediction.img_url, prediction.accuration,
               plant.name AS plant_name, plant.desc AS plant_desc,
               disease.name AS disease_name, disease.desc AS disease_desc, disease.solution,prediction.created_at
        FROM prediction
        INNER JOIN plant ON prediction.plant_id = plant.plant_id
        INNER JOIN disease ON prediction.disease_id = disease.disease_id
        WHERE prediction.prediction_id = ?
    `
    const values = [prediction_id]

    return dbPool.execute(SQLQuery, values)
        .then(([rows]) => {
            const result = rows.map(row => ({
                prediction_id: row.prediction_id,
                img_url: row.img_url,
                accuration: row.accuration,
                plant_name: row.plant_name,
                plant_desc: row.plant_desc,
                disease_name: row.disease_name,
                disease_desc: row.disease_desc,
                solution: row.solution,
                created_at:row.created_at
            }))
            return result
        })
}

// delete history
const deleteHistoryModel = (prediction_id) => {
    const SQLQuery = "Delete From prediction WHERE prediction_id=?"
    const values = [prediction_id]

    return dbPool.execute(SQLQuery, values)
}

export { getHistoryModel, getHistoryModelById, deleteHistoryModel }