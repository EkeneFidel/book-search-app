# book-search-app
> A book search and bookmarking API where users
can login, register, bookmark and search for any related books by title, author or keywords

## Requirements
[Node.Js](https://nodejs.org/en/download), [Redis](https://redis.io/docs/latest/operate/oss_and_stack/install/install-redis/) and [MySQL Server](https://dev.mysql.com/downloads/mysql/) are required

## Installation and setup

1. To get started, you would need to first clone the application in your local system running the following command on your terminal
```
git clone https://github.com/EkeneFidel/book-search-app.git
```

2. Create a `.env` file in the root directory using the [.env.example](https://github.com/EkeneFidel/book-search-app/blob/main/.env.example) as an example.

3. Update the `.env` file with the following:
    - GOOGLE_API_KEY gotten from [Google console](https://console.cloud.google.com/apis/credentials)
    - DB_PASSWORD
    - DB_DATABASE
    - REDIS_PASSWORD

4. You can either work with an online MySQL and Redis database or use your locally installed MySQL and Redis. Do configure to your choice in the `.env` file.


5.  Go into the cloned repository and run `npm install` to install the packages required.

6. Use `npm run dev` to start the application.

7. Your application should be running on [localhost:3333](http://localhost:3333/)
> [!NOTE]
> `3333` is the default port, your app would run on the port set in the `PORT` variable in your `.env` file

### API Endpoints
| Method | Endpoints | Description |
| --- | --- | --- |
| `GET` | `/search?name=harry porter&limit=10&page=4` | To get page 4 of books with 10 per page and with keyword/name `harry potter`  |
| `POST` | `/auth/login` | To login an existing user |
| `POST` | `/auth/register` | To register a new user |
| `POST` | `/bookmarks` | To add a bookmark |
| `GET` | `/bookmarks?limit=10&page=4` | To get page 4 of bookmarks by logged in user, with 10 per page |
| `DELETE` | `/bookmarks/20` | To delete a single bookmark with id of 20 |

## Documentation
Details on the API structure is available in the [Dcumentation](https://documenter.getpostman.com/view/16637530/2sA3BheEkW)

You can use the documentation to test the app in your local enviroment


