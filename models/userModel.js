import Datastore from 'nedb-promises'

const userDB = Datastore.create({ filename: './db/users.db', autoload: true,})

export const createUser = async (user) => {
    return await userDB.insert(user)
}

export const findUserByEmail = async (email) => {
    return await userDB.findOne({ email })
}

export default userDB