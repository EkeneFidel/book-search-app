import vine from '@vinejs/vine'

/**
 * Validates the user auth actions
 */
export const authValidator = vine.compile(
  vine.object({
    email: vine.string().email().trim(),
    password: vine.string().minLength(8).maxLength(32),
  })
)
