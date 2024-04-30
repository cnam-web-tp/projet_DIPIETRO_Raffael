// import type { HttpContext } from '@adonisjs/core/http'

import { Products } from '#database/models/products'
import { HttpContext } from '@adonisjs/core/http'

export default class ProductsController {
  async index({ response }: HttpContext) {
    const products = await Products.findAll()
    const productNames = products.map((product) => product.name)
    return response.ok({ productNames: productNames, data: products })
  }
}
