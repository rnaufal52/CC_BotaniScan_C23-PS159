import dbPool from "../config/connection.js"

// get Data by token
const getByTokenUserModel = (user_id) => {
    const SQLQuery = "SELECT * From user WHERE user_id=?";
    const values = [user_id];

    return dbPool.execute(SQLQuery, values)
}

// UPDATE DATA
const updateUserModel = (body, user_id, dates, hashedPassword) => {
    const SQLQuery = "UPDATE user SET name=?, email=?, password=?, updated_at=? WHERE user_id=?";
    const values = [body.name, body.email, hashedPassword, dates, user_id];

    return dbPool.execute(SQLQuery, values)
}

export {
    getByTokenUserModel,
    updateUserModel
}