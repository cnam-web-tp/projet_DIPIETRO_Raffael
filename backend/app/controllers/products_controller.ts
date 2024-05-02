// import type { HttpContext } from '@adonisjs/core/http'

// import { Products } from '#database/models/products'
import { ProductsService } from '#services/products_service'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  async index({ response }: HttpContext) {
    try {
      const products = await this.productsService.getAllProducts()
      return response.ok(products)
    } catch (error) {
      return response.badRequest({ message: error.message })
    }
  }

  async search({ request, response }: HttpContext) {
    try {
      if (!request.qs().search) {
        const products = await this.productsService.getAllProducts()
        return response.ok(products)
      }

      const searchTerm = request.qs().search as string
      const result = await this.productsService.searchProducts(searchTerm)
      return response.ok(result)
    } catch (error) {
      return response.badRequest({ message: error.message })
    }
  }
}
