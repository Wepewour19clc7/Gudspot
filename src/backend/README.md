# Login session
## Register
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
    "status": "success",
    "code": 200,
    "message": "Account created",
    "data": []
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
* API link: ```<hostname>/api/logout/```
* Method: ```POST```
* Header: 
```
"Authorization": Token <token>
```
* Response: None

## Login
* API link: ```<hostname>/api/change-password/```
* Method: ```PUT```
* Header:
```Authorization": Token <token>```
* Body:
```
{
    old_password: <old password>,
    new_password: <new password>
}
```
* Response:
```
{
    "status": "success",
    "code": 200,
    "message": "Password updated successfully",
    "data": []
}
```