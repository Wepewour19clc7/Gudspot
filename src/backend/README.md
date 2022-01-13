# Account session

## Register

- API link: `<hostname>/api/register`
- Method: `POST`
- Body:

```
{
    "username": <username>,
    "email": <email>,
    "password": <password>
    "type": <usertype> (ADMIN = 0,OWNER = 1, USERS = 2)
}
```

- Response:

```
{
    "status": "success",
    "code": 200,
    "message": "Account created",
}
```

<br>

## Login

- API link: `<hostname>/api/login`
- Method: `POST`
- Header:

```
{
    "username": <username>,
    "password": <password>
}
```

- Response:

```
{
    "expiry": <date and time>
    "token": <token>,
    "id": <userid>,
    "name": <username>,
    "type": <usertype>
}
```

## Logout

- API link: `<hostname>/api/logout`
- Method: `POST`
- Header:

```
"Authorization": Token <token>
```

- Response: None

## Change password

- API link: `<hostname>/api/change-password`
- Method: `PUT`
- Header:
  `Authorization": Token <token>`
- Body:

```
{
    "old_password": <old password>,
    "new_password": <new password>
}
```

- Response:

```
{
    "status": "success",
    "code": 200,
    "message": "Password updated successfully",
}
```
## Get user info
- API link: `<hostname>/api/get-review`
- Method: `GET`

- Body:

```
{
    "user_id": <id>
}
```
* Response: example

```
{
    "user_id": 1,
    "user_type": 1,
    "username": "test",
    "avatar": "{\"1\":\"123123123\"}",
    "description": "afhajgaegbkahbgkl",
    "status": "success",
    "code": 200
}
```
## Change user information
* API link: ```<hostname>/api/user-info/edit```
* Method: ```POST``` 
* Header:
```Authorization": Token <token>```
* Body:
```
{   
    "user_id": <user id>
    "store_id": <store id>
    "score": <score> (1 - 5)
    "description": <text>
}
```
* Response: Example
```
{
    "user_id": 1,
    "user_type": 1,
    "username": "test1ver3",
    "avatar": "{\"3\":\"test3\"}",
    "description": "fk u 3",
    "status": "success",
    "code": 200
}
```

# Store

## Search Store (conda install -c conda-forge django-filter)

Return list of store if keyword is in store name or store address

- Update: add pagination

* API link: `<hostname>/api/storelist?search=<keyword>&page=<page_number>`
* Method: `GET`
* Response: Example:

```
{
    "count": 3,
    "next": "http://127.0.0.1:8000/api/storelist?page=2&search=test",
    "previous": null,
    "results": [
        {
            "owner_id": 1,
            "store_name": "Test1",
            "store_address": "327NVC4",
            "img_url": {
                "1": "sfdfsd"
            },
            "description": "Fck this sh!t"
        }
    ]
}
```

## Get store page list

- API link: `<hostname>/api/storelist?search=<keyword>`
- Method: `GET`

* Header
  `Authorization": Token <token>`

- Body:

```
{
    "store_id": <id>
}
```
## Get store page
- API link: `<hostname>/api/store_id=<id>`
- Method: `GET`

```
{
    "status": "success",
    "code": 200,
    "store_data": {
        "id": 1,
        "owner_id": 1,
        "store_name": "1231244",
        "description": "adfhsghba",
        "store_address": "dfabadfb",
        "avatar": "https://github.com/Wepewour19clc7/Gudspot/tree/add-fields-store",
        "cover_img": {
            "1": "123"
        },
        "follow_counts": 0
    },
    "owner_data": {
        "user_id": 1,
        "user_type": 1,
        "username": "test",
        "avatar": "{\"1\":\"123123123\"}",
        "description": "afhajgaegbkahbgkl"
    }
}
```
- Repspose

## Create store

- API link: `<hostname>/api/create-store`
- Method: `POST`
- Header:
  `Authorization": Token <token>`
- Body:

```
{
    "owner_id": <id>,
    "store_name": <name>,
    "store_address": <address>,
    "cover_img": <json array>,
    "avatar": <url>,
    "description": <text>
}
```

- Response:

```
{
    "id": 1,
    "owner_id": 1,
    "store_name": "1231244",
    "description": "adfhsghba",
    "store_address": "dfabadfb",
    "avatar": "https://github.com/Wepewour19clc7/Gudspot/tree/add-fields-store",
    "cover_img": {
        "1": "123"
    }
}
```

# Blogs

## Write Blogs

- API link: `<hostname>/api/create-store`
- Method: `POST`
- Header:
  `Authorization": Token <token>`
- Body:

```
{
    "owner_id": <id>,
    "store_name": <name>,
    "title": <title>,
    "store_address": <address>,
    "img_url": <json array>,
    "description": <text>
}
```

- Response:

```
{
    "owner_id": <id>,
    "store_name": <name>,
    "title": <title>,
    "store_address": <address>,
    "img_url": <json array>,
    "description": <text>
    "activated": <default= False>
}
```

## Get blogs of a store

- API link: `<hostname>/api/getblogs`
- Method: `GET`
* Body:
```
{
    "store_id": <store_id>
}
```
* Response:
```
{
    "data": [
        {
            "id": 1,
            "user_id_id": 1,
            "store_id_id": 1,
            "title": "",
            "content": "Ngon lam ???222",
            "img_url": {
                "2": "1223221"
            },
            "posted_date": "2022-01-13T07:55:39.529445Z",
            "activated": false
        },
        {
            "id": 2,
            "user_id_id": 1,
            "store_id_id": 1,
            "title": "Blog2-1",
            "content": "Ngon lam ???222",
            "img_url": {
                "2": "1223221"
            },
            "posted_date": "2022-01-13T07:56:41.990592Z",
            "activated": false
        },
        {
            "id": 3,
            "user_id_id": 1,
            "store_id_id": 1,
            "title": "Blog2-1",
            "content": "Ngon lam ???222",
            "img_url": {
                "2": "1223221"
            },
            "posted_date": "2022-01-13T08:10:25.313524Z",
            "activated": false
        }
    ],
    "status": "success",
    "code": 200
}
```
# Follow
## Follow/Unfollow: If already has follow obj: Follow, else: Unfollow

- API link: `<hostname>/api/followstore`
- Method: `POST`
- Header:
  `Authorization": Token <token>`
- Body:

```
{
    "store_id": <store id>
    "user_id": <user id>
}
```

* Response: Example
```
{
    "Message": "Store Unfollowed"/ "Store Followed"
    "status": "success"
    "code": 201
}
```
## Get user follow list
- API link: `<hostname>/api/get-user-follow`
- Method: `POST`
- Header:
  `Authorization": Token <token>`
- Body:
```
{
    "user_id": <user id>
}
```
- Response: example
```
{
    "data": [
        {
            "id": 1,
            "store_id_id": 1,
            "user_id_id": 1,
            "score": 5,
            "description": "ngon"
        },
        {
            "id": 2,
            "store_id_id": 2,
            "user_id_id": 1,
            "score": 5,
            "description": "ngon"
        },
        {
            "id": 3,
            "store_id_id": 3,
            "user_id_id": 1,
            "score": 5,
            "description": "ngon"
        }
    ],
    "status": "success",
    "code": 200
}
```

# Review
## New review
- API link: `<hostname>/api/review`
- Method: `POST`
- Header:
  `Authorization": Token <token>`
- Body:
```
{
    "user_id" : <id>,
    "store_id" : <store_id>,
    "score" : <int> (1-5)
    "description" : <text>
}
```
* Response: example
```
{
    "data": {
        "id": 3,
        "store_id": 3,
        "user_id": 1,
        "score": 5,
        "description": "ngon"
    },
    "status": "success",
    "code": "200"
}
```
## Get review of a store
- API link: `<hostname>/api/get-review`
- Method: `GET`
- Body:
```
{
    "store_id": <store id>
}
```
- Response:
```
{
    "data": [
        {
            "id": 1,
            "store_id_id": 1,
            "user_id_id": 1,
            "score": 5,
            "description": "ngon"
        }
    ],
    "status": "success",
    "code": 200
}
```

# Comment
## Create comment
- API link: `<hostname>/api/createcomment`
- Method: `POST`
- Header:
  `Authorization": Token <token>`
- Body:
```
{
    "user_id": <user id>,
    "blog_id": <store id>,
    "content": <text>
}
```
- Response: example
```
{
    "id": 3,
    "blog_id": 1,
    "user_id": 1,
    "content": "adfhsdfb",
    "status": "success",
    "code": "201"
}
```

## Get comment of a blog