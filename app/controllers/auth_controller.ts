import User from '#models/user'
import { authValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  async login({ request, auth }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])
    await authValidator.validate({ email, password })

    const user = await User.verifyCredentials(email, password)
    await auth.use('web').login(user)

    return { message: 'login successful' }
  }

  async register({ request, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])
    const data = await authValidator.validate({ email, password })

    const existingUser = await User.findBy('email', email)
    if (existingUser) {
      return response.badRequest({ message: 'Email already exists' })
    }

    const user = await User.create(data)

    return user
  }
}
