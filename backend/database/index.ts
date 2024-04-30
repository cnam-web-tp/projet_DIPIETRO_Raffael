import { sequelize } from './sequelize.js'
import { Users } from './models/users.js'
import { Products } from './models/products.js'

export const initDatabase = async () => {
  try {
    await sequelize.authenticate()
    Users.sync()
    Products.sync()
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}
