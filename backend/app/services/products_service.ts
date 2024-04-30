import { Products } from '#database/models/products'
import { inject } from '@adonisjs/core'
// import { Product } from '../../types/product.js'

@inject()
export class ProductsService {
  async getAllProducts() {
    return await Products.findAll()
  }
}
