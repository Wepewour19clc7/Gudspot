# Login session
## Registering
* API link: ```<hostname>/api/register/``` 
* Method: ```POST```
* Body:
```
{
    "username": <username>,
    "email": <email>,
    "password": <password>
}
```
* Response:
```
{
    "user": {
        "id": <id>,
        "username": <username>,
        "email": <email>
    },
    "token": <token>
}
```
<br>

## Login
* API link: ```<hostname>/api/login/```
* Method: ```POST```
* Header:
```
{
    "username": <username>,
    "password": <password>
}
```
* Response:
```
{
    "expiry": <date and time>
    "token": <token>
}
```
## Logout
* API link: ```<hostname>/api/logout```
* Method: ```POST```
* Header: 
```
"Authorization": Token <token>
```
* Response: None