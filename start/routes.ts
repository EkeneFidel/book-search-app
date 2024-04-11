/*
|--------------------------------------------------------------------------
| routers file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const AuthController = () => import('#controllers/auth_controller')
const BookmarksController = () => import('#controllers/bookmarks_controller')
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router
  .group(() => {
    router.post('/login', [AuthController, 'login'])
    router.post('/register', [AuthController, 'register'])
  })
  .prefix('/auth')

router.get('/search', [BookmarksController, 'search'])
router
  .group(() => {
    router.post('/bookmarks', [BookmarksController, 'store'])
    router.get('/bookmarks', [BookmarksController, 'index'])
    router.delete('/bookmarks/:id?', [BookmarksController, 'destroy'])
  })
  .use(middleware.auth())
