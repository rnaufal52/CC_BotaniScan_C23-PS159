import dbPool from "../config/connection.js"

// get Data by token
const getByTokenUserModel = (user_id) => {
    const SQLQuery = "SELECT name, email From user WHERE user_id=?"
    const values = [user_id]

    return dbPool.execute(SQLQuery, values)
}

// check email
const checkEmailUser = (body, user_id) => {
    const SQLQuery = "SELECT email from user WHERE email=? AND user_id!=?"
    const values = [body.email, user_id]

    return dbPool.execute(SQLQuery, values)
}

// get password
const getPasswordFromDatabase = (user_id) => {
    const SQLQuery = "SELECT password from user where user_id=?"
    const values = [user_id]

    return dbPool.execute(SQLQuery, values)
}

// UPDATE DATA
const updateUserModel = (body, user_id, dates) => {
    const SQLQuery = "UPDATE user SET name=?, email=?, updated_at=? WHERE user_id=?"
    const values = [body.name, body.email, dates, user_id]

    return dbPool.execute(SQLQuery, values)
}

// change password
const changePasswordModel = (user_id, hashedPassword, dates) => {
    const SQLQuery = "UPDATE user set password=?, updated_at=? WHERE user_id=?"
    const values = [hashedPassword, dates, user_id]

    return dbPool.execute(SQLQuery, values)
}

export {
    getByTokenUserModel,
    checkEmailUser,
    getPasswordFromDatabase,
    changePasswordModel,
    updateUserModel
}
