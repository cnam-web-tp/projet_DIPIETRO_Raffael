import vine from '@vinejs/vine'

export const productsSearchQueryValidator = vine.compile(
  vine.object({
    search: vine.string().minLength(2).trim(),
  })
)
