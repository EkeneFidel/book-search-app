import type { HttpContext } from '@adonisjs/core/http'
import axios from 'axios'

import Bookmark from '#models/bookmark'
import env from '#start/env'

export default class BookmarksController {
  async search({ request, response }: HttpContext) {
    const { name, page, limit } = request.qs()
    let url = `https://www.googleapis.com/books/v1/volumes?q=${name}&key=${env.get('GOOGLE_API_KEY')}`

    page ? (url += `&startIndex=${page}`) : ''
    limit ? (url += `&maxResults=${limit}`) : ''
    try {
      const result = await axios(url)

      let data = result.data

      return data.totalItems > 0
        ? data.items?.map((item: any) => ({
            volumeId: item.id,
            title: item.volumeInfo.title,
            authors: item.volumeInfo.authors,
            description: item.volumeInfo.description,
            publisher: item.volumeInfo.publisher,
          }))
        : response.notFound({ message: `No Book with name ${name} found` })
    } catch (error) {
      return response.status(500).json({ error: 'Error searching books' })
    }
  }

  async index({ auth, request }: HttpContext) {
    const { page = 1, limit = 10 } = request.qs()
    const bookmarks = await Bookmark.query().where({ userId: auth.user?.id }).paginate(page, limit)

    return bookmarks
  }

  async store({ request, auth, response }: HttpContext) {
    const { user } = auth
    const { volumeId } = request.only(['volumeId'])

    try {
      const bookmarkExists = await Bookmark.findBy({ bookId: volumeId, userId: user?.id })

      if (bookmarkExists) {
        return response.badRequest({ message: 'This Book has been bookmarked already' })
      }

      const result = await axios(
        `https://www.googleapis.com/books/v1/volumes/${volumeId}?key=${env.get('GOOGLE_API_KEY')}`
      )

      let data = result.data.volumeInfo

      const bookmark = await user?.related('bookmarks').create({
        bookId: volumeId,
        title: data.title,
        authors: data.authors.toString(),
        description: data.description,
      })

      return bookmark
    } catch (error) {
      return response.badRequest({ message: `No Book with volumeId ${volumeId} found` })
    }
  }

  async destroy({ params, auth, response }: HttpContext) {
    const { user } = auth
    const { id } = params

    console.log(id)

    try {
      if (!id) {
        return response.badRequest({ error: 'id required' })
      }
      const bookmark = await Bookmark.findBy({ id, userId: user?.id })

      if (!bookmark) {
        return response.status(404).json({ message: 'Bookmark not found' })
      }

      await bookmark.delete()

      return response.json({ success: true })
    } catch (error) {
      return response.status(500).json({ message: 'Failed to remove bookmark' })
    }
  }
}
