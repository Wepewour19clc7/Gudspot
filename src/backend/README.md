# Account session
## Register
* API link: ```<hostname>/api/register``` 
* Method: ```POST```
* Body:
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
* API link: ```<hostname>/api/login```
* Method: ```POST```
* Header:
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
* API link: ```<hostname>/api/logout```
* Method: ```POST```
* Header: 
```
"Authorization": Token <token>
```

- Response: None

## Change password
* API link: ```<hostname>/api/change-password```
* Method: ```PUT```
* Header:
```Authorization": Token <token>```
* Body:
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
# Store
## Search Store (conda install -c conda-forge django-filter)
Return list of store if keyword is in store name or store address

- API link: `<hostname>/api/storelist?search=<keyword>`
- Method: `GET`
- Response: Example:

```
[
    {
        "owner_id": 6,
        "store_name": "TestStore1",
        "store_address": "247NVS",
        "img_url": {
            "1": "sdsd"
        }
    },
    {
        "owner_id": 6,
        "store_name": "TestStore2",
        "store_address": "247NVS",
        "img_url": {
            "1": "sdsd"
        }
    },
    {
        "owner_id": 6,
        "store_name": "TestStore3",
        "store_address": "247NVS",
        "img_url": {
            "1": "sdsd"
        }
    }
]

## Create store
* API link: ```<hostname>/api/create-store```
* Method: ```POST```
* Header:
```Authorization": Token <token>```
* Body:
```
{   
    "owner_id": <id>,
    "store_name": <name>,
    "store_address": <address>,
    "img_url": <json array>,
    "description": <text>
}
```
* Response:
```
{
    "owner_id": <id>,
    "store_name": <name>,
    "store_address": <address>,
    "img_url": <json array>,
    "description": <text>
}
```
