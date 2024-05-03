import { sequelize } from './sequelize.js'
import { Users } from './models/users.js'
import { Products } from './models/products.js'

export const initDatabase = async () => {
  try {
    await sequelize.authenticate()
    Users.sync()
    Products.sync()

    const products = await Products.findAll()
    if (products.length === 0) {
      await addDefaultProducts()
    }
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

const addDefaultProducts = async () => {
  await Products.bulkCreate([
    {
      brand: 'Alstom',
      name: 'Citadis',
      description: 'Beautifull tramway used in strasbourg',
      price: 10000,
      imageName: 'citadis.webp',
    },
    {
      brand: 'Bombardier',
      name: 'Flexity',
      description: 'Tramway used in Basel',
      price: 12000,
      imageName: 'flexity.webp',
    },
    {
      brand: 'Siemens',
      name: 'Avenio',
      description: 'Tramway used in Munich',
      price: 11000,
      imageName: 'avenio.webp',
    },
    {
      brand: 'Alstom',
      name: 'Cobra',
      description: 'Tramway used in Zurich',
      price: 9000,
      imageName: 'cobra.webp',
    },
    {
      brand: 'Socimi',
      name: 'Eurotram',
      description: 'Tramway used in Strasbourg',
      price: 13000,
      imageName: 'eurotram.webp',
    },
  ])
}
