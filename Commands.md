<h3>SIGNUP : </h3>

```sh
curl \
-d '{
    "username":"xyz",
    "email":"test@gmail.com",
    "password":"1234567890",
    "passwordConfirm":"1234567890",
    "firstname":"ABC",
    "lastname":"XYZ",
    "phoneNumber":"1234567390",
    "DOB":"01/01/2001",
    "address":"abc"
}' \
-H 'Content-Type: application/json' \
https://twainlabassignment.herokuapp.com/v1/users/signup

```

<h3>LOGIN : </h3>

```sh
curl \
-d '{"username":"xyz","password":"1234567890"}' \
-H 'Content-Type: application/json' \
https://twainlabassignment.herokuapp.com/v1/users/login
```

<h3>Export the Token Created at a time of Login</h3>

```
export TOKEN = Token which you get after Login
```

<h3>Party Registration : </h3>

```sh
curl -d '{
  "partyName":"BJP",
  "logo":"Kamal",
  "headquater":"India",
  "motive":"Sabka sath sabka vikas"
}' -H 'Content-Type: application/json' -H "Authorization: Bearer $TOKEN" https://twainlabassignment.herokuapp.com/v1/party
```

<h3>Update Party</h3>

```sh
curl -X PATCH -H "Content-Type: application/json" \
-H "Authorization: Bearer $TOKEN" -d '{
"logo":"kamal",
"headquater":"Irndrria",
"motive":"vikas"
}' https://twainlabassignment.herokuapp.com/v1/party/BJP
```

<h3>Delete Party</h3>

```sh
curl -X DELETE -H "Authorization: Bearer $TOKEN" \ https://twainlabassignment.herokuapp.com/v1/party/BJP
```

<h3>Upload Rating of a Political Party</h3>

```sh
curl -X PATCH -H "Content-Type: application/json" \
-H "Authorization: Bearer $TOKEN" \
 -d '{
"rating":5
}' \
 https://twainlabassignment.herokuapp.com/v1/party/uploadRating/608fd0bac4211d0015c01a5e
```

<h3>Create Application in a Party</h3>

```sh
curl -d '{
    "application":"true",
    "aadharCardNo":"123456yy7df899"
}' -H 'Content-Type: application/json' -H "Authorization: Bearer $TOKEN" https://twainlabassignment.herokuapp.com/v1/party/BJP/application
```

<h3>Filter Application on a Party Name</h3>

```
curl -H "Authorization: Bearer $TOKEN" https://twainlabassignment.herokuapp.com/v1/party/Congress/application
```

<h3>Change Application Status from Waiting to Working to Accpeted (0,1,-1)</h3>

```sh
curl -X PATCH -d '{
    "status":1
}' -H 'Content-Type: application/json' -H "Authorization: Bearer $TOKEN" \
https://twainlabassignment.herokuapp.com/v1/party/BJP/application/changeAppStatus/608fd368c4211d0015c01a60
```

<h3>Add Work</h3>

```sh
curl -d '{
    "title" : "xyz",
	"description" : "xyz"
}' -H 'Content-Type: application/json' -H "Authorization: Bearer $TOKEN" \
https://twainlabassignment.herokuapp.com/v1/work
```

<h3>Upload Rating of a Work</h3>

```sh
curl -X PATCH -d '{
    "rating" : 5
}' -H 'Content-Type: application/json' -H "Authorization: Bearer $TOKEN" \
https://twainlabassignment.herokuapp.com/v1/work/608fd5fec4211d0015c01a61
```

<h3>Upload Rating of the Politician</h3>

```sh
curl -X PATCH -d '{
    "rating" : 5
}' -H 'Content-Type: application/json' -H "Authorization: Bearer $TOKEN" \
https://twainlabassignment.herokuapp.com/v1/users/uploadRating/608fc3021d2e3f0015b6f0ac
```
