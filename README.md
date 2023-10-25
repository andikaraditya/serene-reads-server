# serene-reads-server

## API Documentations
```
POST /register
POST /login
POST /books
GET /books/BookId
POST /books/:BookId/posts
POST /books/:BookId/posts/schedules
GET /books/:BookId/posts/:PostId
GET /books/search
GET /news
```
#
## POST /register
> Register a new user

- request
```json
{
    "username": "string", //required
    "email": "string", //required
    "password": "password" //required
}
```

- response (201)

```json
{
    "username": "string",
    "email": "string"
}
```

## POST /login
> Login to an existing account

- request
```json
{
    "email": "string", //required
    "password": "password" //required
}
```

- response (200)

```json
{
    "access_token": "string"
}
```

## POST /books
> Create a new Book Forum

- headers
```json
{
    "access_token": "string"
}
```

- request
```json
{
    "title": "string", //required
    "author": "string", //required
    "summary": "string", //required
    "isbn": "string", //required,
    "imageUrl": "string"
}
```

- response (201)
```json
{
    "title": "string", 
    "author": "string", 
    "summary": "string", 
    "isbn": "string", 
    "imageUrl": "string"
}
```

## GET /books
> Get currently availabe Book Forums

- headers
```
not needed
```

- request
```
not needed
```

- response (201)
```json
[
    {
    "title": "string", 
    "author": "string", 
    "summary": "string", 
    "isbn": "string", 
    "imageUrl": "string"
    },
    ...,
]
```

## GET /books/:BookId
> Get a selected Book Forum
- headers
```
not needed
```
- request
```json
not needed
```

- response (200)
```json
{
    {
        "title": "string", 
        "author": "string", 
        "summary": "string", 
        "isbn": "string", 
        "imageUrl": "string",
        "Posts": [
            {
                "title": "string",
                "content": "string",
                "User": {
                    "username": "string"
                }
            },
            ...,
        ]
    }
}
```

## POST /books/:BookId/posts
> Create a Book Forum post

- headers
```json
{
    "access_token": "string"
}
```

- request
```json
{
    "title": "string", //required
    "content": "string", //required
}
```

- response (201)
```json
{
    "title": "string",
    "content": "string",
}
```

## POST /books/:BookId/posts/schedules
> Create a Book Forum post

- headers
```json
{
    "access_token": "string"
}
```

- request
```json
{
    "title": "string", //required
    "content": "string", //required
    "scheduledTime": "string" // > timestamp  //required
}
```

- response (201)
```json
{
    "title": "string",
    "content": "string",
}
```

## GET /books/:BookId/posts/:PostId
> Get a selected Book Forum post
- headers
```
not needed
```
- request
```json
not needed
```

- response (200)
```json
{
    {
        "title": "string",
        "content": "string",
        "User": {
            "username": "string"
        }
    }
}
```

## GET /books/search
> Search all books
- headers
```
not needed
```
- query
```json
{
    "title": "string",
    "author": "string",
    "book_type": "string", // ["fiction", "nonfiction"]
    "page": "integer", // default 1
    "categories": "string" 
}

// available categories ['Mystery & Suspense', 'Science Fiction & Fantasy', 'Animals, Bugs & Pets', 'Art, Creativity & Music', 'General Literature', 'Hobbies, Sports & Outdoors', 'Science & Technology', 'Real Life','Reference']
```

- response (200)
```json
[
    {
    "title": "string", 
    "author": "string", 
    "summary": "string", 
    "isbn": "string", 
    "imageUrl": "string"
    },
    ...,
]
```

## GET /news
> Get all news about literature
- headers
```
not needed
```
- query
```json
{
    "page": "integer" // default 1
}
```

- response (200)
```json
[
    {
    "author": "string", 
    "title": "string", 
    "description": "string", 
    "url": "string", 
    "urlToImage": "string",
    "publishedAt": "string",
    "content": "string",
    "source": "string",
    },
    ...,
]
```