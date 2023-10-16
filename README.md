# serene-reads-server

## API Documentations
```
POST /register
POST /login
POST /books
GET /books/BookId
POST /books/:BookId/posts
GET /books/:BookId/posts/:PostId
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
    "ISBN": "string", //required
}
```

- response (201)
```json
{
    "title": "string", 
    "author": "string", 
    "summary": "string", 
    "ISBN": "string", 
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
    "ISBN": "string",
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
        "ISBN": "string",
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