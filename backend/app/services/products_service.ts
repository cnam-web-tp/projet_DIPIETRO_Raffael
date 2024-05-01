import { Products } from '#database/models/products'
import { inject } from '@adonisjs/core'
import { Op } from 'sequelize'
// import { Product } from '../../types/product.js'

@inject()
export class ProductsService {
  async getAllProducts() {
    return await Products.findAll()
  }

  async getProductById(id: number) {
    return await Products.findOne({ where: { productId: id } })
  }

  async searchProducts(searchTerm: string) {
    return await Products.findAll({
      where: {
        [Op.or]: [
          {
            name: {
              [Op.substring]: `%${searchTerm}%`,
            },
          },
          {
            brand: {
              [Op.substring]: `%${searchTerm}%`,
            },
          },
        ],
      },
    })
  }
}
