// import type { HttpContext } from '@adonisjs/core/http'

// import { Products } from '#database/models/products'
import { ProductsService } from '#services/products_service'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  async index({ response }: HttpContext) {
    const products = await this.productsService.getAllProducts()
    const productNames = products.map((product) => product.name)
    return response.ok({ productNames: productNames, data: products })
  }

  async search({ request, response }: HttpContext) {
    try {
      const searchTerm = request.qs().search as string

      if (searchTerm.length <= 0) {
        throw new Error('Search term is required')
      }

      const result = await this.productsService.searchProducts(searchTerm)
      return response.ok(result)
    } catch (error) {
      return response.badRequest({ message: error.message })
    }
  }
}
