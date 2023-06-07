import dbPool from "../config/connection.js"


// GET DATA
const getStoreModel = () => {
    const SQLQuery = "SELECT * FROM store"

    return dbPool.execute(SQLQuery)
}

// get Data by id
const getByIdStoreModel = (store_id) => {
    const SQLQuery = "SELECT * From store WHERE store_id=?"
    const values = [store_id]

    return dbPool.execute(SQLQuery, values)
}

// post Data
const postStoreModel = (body, store_id, dates) => {
    const SQLQuery = "INSERT INTO store (store_id, name, address, contact, onlineshop, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)"
    const values = [store_id, body.name, body.address, body.contact, body.onlineshop, dates, dates]

    console.log(SQLQuery)
    return dbPool.execute(SQLQuery, values)
}

// UPDATE DATA
const updateStoreModel = (body, store_id, dates) => {
    const SQLQuery = "UPDATE store SET name=?, address=?, contact=?, onlineshop=?, updated_at=? WHERE store_id=?"
    const values = [body.name, body.address, body.contact, body.onlineshop, dates, store_id]

    return dbPool.execute(SQLQuery, values)
}

// delete data
const deleteStoreModel = (store_id) => {
    const SQLQuery = "Delete From store WHERE store_id=?"
    const values = [store_id]

    return dbPool.execute(SQLQuery, values)
}
export {
    getStoreModel,
    getByIdStoreModel,
    postStoreModel,
    updateStoreModel,
    deleteStoreModel
}