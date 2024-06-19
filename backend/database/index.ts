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
      description: 'Tramway used in Strasbourg city',
      price: 13000,
      imageName: 'eurotram.webp',
    },
    {
      brand: 'CAF',
      name: 'Urbos',
      description: 'Tramway used in Barcelona',
      price: 14000,
      imageName: 'urbos.webp',
    },
    {
      brand: 'NTL',
      name: 'Translor',
      description: 'Tramway used in Medelin',
      price: 15000,
      imageName: 'translor.webp',
    },
    {
      brand: 'Bombardier',
      name: 'Incentro',
      description: 'Tramway used in Amsterdam',
      price: 16000,
      imageName: 'incentro.webp',
    },
    {
      brand: 'Alstom',
      name: 'Cityr runner 3005',
      description: 'Tramway used in Brussels',
      price: 17000,
      imageName: 'cityrunner.webp',
    },
    {
      brand: 'Breda',
      name: 'VLC',
      description: 'Tramway used in Lille',
      price: 18000,
      imageName: 'vlc.webp',
    },
    {
      brand: 'Alstom',
      name: 'Citadis compact',
      description: 'Tramway used in Nice',
      price: 19000,
      imageName: 'citadis_compact.webp',
    },
    {
      brand: 'Alsthom',
      name: 'TFS',
      description: 'Tramway used in Rouen',
      price: 20000,
      imageName: 'tfs.webp',
    },
  ])
}
