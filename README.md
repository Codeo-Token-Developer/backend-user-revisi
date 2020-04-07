# USERS & ACCOUNT BACKEND DOCUMENTATION

##### <u>Create</u> New User

Required:

```
path: '/users/',
method: 'POST',
data/body: {
	name, email, password, confirm_password
}
```

Success output example:

```
{
  "message": "A verification email has been sent to 						test@gmail.com",
  "status": 200
}
```

Error output example:

```
{
  "message": "Name cannot be empty, test@gmail.com already 					taken, please take another one",
  "status": 400
}
```

##### <u>Login</u>

Required:

```
path: '/users/login/',
method: 'POST',
data/body: {
	email, password
}
```

Success output example:

```
{
  "message": "Welcome <user name>, hope you have a nice 				day",
  "token": <user token>,
  "user": {
    "avatar": <user avatar>,
    "id_country": <user id country>,
    "date": "2020-02-27T09:10:39.354Z",
    "verification": true,
    "_id": <user id>,
    "name": <user name>,
    "email": <user email>,
    "password":<user password>,
    "__v": 0,
    "account": <user account>,
    "kyc": <user kyc>
  },
  "status": 201
}
```

Error output example:

```
{
  "message": "Invalid email / password",
  "status": 500
}
```

##### <u>Verification User</u>

Success:

```
redirect to "http://dapp.codeotoken.com"
```

##### <u>Forgot Password</u>

Required:

```
path: '/users/forgotPassword',
method: 'POST',
data/body: {
	email
}
```

Success:

```
{
	"message": "A verification email has been sent to <user email>"
}
```

Error:

```
{
	"message": "Email not found"
}
```

##### **<u>Recovery Password</u>**

Required:

```
path: '/api/auth/password/:userId',
method: 'GET',
data/body: {
	newPassword
}

*note: You can get userId from params that send from server
```

Success:

```
{
	"message": "Password has been changed"
}
```

##### <u>Update **Password**</u>

Required:

```
path: '/users/changePassword',
method: 'POST',
data/body: {
	oldPassword,
	newPassword
}
```

Success:

```
{
	"message": "A verification email has been sent to <user 				email>"
}
```

Error:

```
{
	"message": "Email not found"
}
```

##### <u>Update User Data</u>

Required:

```
path: '/users/',
method: 'PUT',
headers: {
	jwttoken
},
data/body: {
	full_name, avatar, id_country
}
```

Success output example:

```
{
	"message": 'Your data has been updated',
	"status": 201
}
```

##### <u>Get 1 User</u>

Required:

```
path: '/users/account',
method: 'GET',
headers: {
	jwttoken
}
```

Success example:

```
{
  "avatar": <avatar>,
  "id_country": <user id country>,
  "date": "2020-02-27T09:10:39.354Z",
  "verification": true,
  "_id": <user id>,
  "name": <user name>,
  "email": <user email>,
  "password": <user password>,
  "__v": 0,
  "account": { <user account> },
  "kyc": <user kyc>
}
```

Error example:

```
{
	"message": "Account not found"
}
```

### **ACCOUNT**

##### <u>**Create Account**</u>

Required:

```
path: '/accounts/newAccount',
method: 'POST',
headers: {
	jwttoken
}
```

Success example output:

```
{
  "account": {
          "_id": "5e534c0a7720bf1a48c018c1",
          "ETH": "0xD9aEBc08e7aee41ed73D9A1Ba93158E774089CFe",
          "key": {
            "version": 3,
            "id": "5e9e4a91-8535-4b04-8fb9-4cdf89b6385f",
            "address": "d9aebc08e7aee41ed73d9a1ba93158e774089cfe",
            "crypto": {
              "ciphertext": "09198daada4e6f9da71437153c337387eb93e27ab6a2ef199ed5f06e92917997",
              "cipherparams": {
                "iv": "56c87812506254178fd8e457cc6298b1"
              },
              "cipher": "aes-128-ctr",
              "kdf": "scrypt",
              "kdfparams": {
                "dklen": 32,
                "salt": "a1617efd2a6b39bf56c968887b066de98a9fb8616aff1343087b32ac49c251fd",
                "n": 8192,
                "r": 8,
                "p": 1
              },
              "mac": "3e30534849ecfa2563c927e95122a339d75063e3062b0a3fbf2408f442c1f3a7"
            }
          },
          "user": "5e533952988563168cbfb14b",
          "date": "2020-02-24T04:07:38.744Z",
          "__v": 0
        },
    "status": 202
}
```

## **<u>KYC</u>**

**Create**

Required:

```
path: '/kyc',
method: 'POST',
headers: {
	jwttoken : localStorage.getItem('codeoToken')
},
data/body: {
	id_number,
	document_type,
	country_issued,
	document_image,
	home_address,
	city,
	zip_code,
	phone_number1,
	phone_number2
}

```

Success Output example:

```
{
  "message": "Waiting for approval from our admin",
  "status": 202
}
```

Error Output example:

```
{
	"message": "ID Number cannot be empty"
}
```

### **<u>BANK ACCOUNT</u>**

#### **Create**

Required:

```
path: '/bankAccount/',
method: 'POST',
headers: {
	jwttoken
}
data/body: {
	bank_name,
	country,
	swift_code,
	account_holder_name,
	accout_number
}
```

Success Output example:

```
{
  "message": "Waiting approval our admin"
}
```

Error Output example:

```
1.
    {
        "message" : "Bank Name cannot be emty"
    }
2.
	{
  "	message": "You already sumbit your bank account 					information",
 	 "status": 500
	}
```


#### **GET 1 BankAccount**

Required:

```
path: '/bankAccount/myBankAccount',
method: 'GET',
headers: {
	jwttoken
}
```

Success Output example:

```
{
  "myBankAccount": <myBankAccount>,
  "status": 200
}
```




### **<u>CRYPTO</u>**

#### **Create**

Required:

```
path: '/crypto/',
method: 'POST',
headers: {
	jwttoken
}
data/body: {
	paypal_email,
	address_bitcoin,
	address_ethereum
}
```

Success output example:

```
{
  "cryptos": [
    {
      "_id": "5e671a0cb1d0072760d0b106",
      "paypal_email": "laskarksatria266@gmail.com",
      "address_bitcoin": "0812445678",
      "__v": 0
    }
  ],
  "status": 200
}
```

Error output example:

```
{
	"message": "Paypal email cannot be empty"
}
```

### **<u>CREDIT CARD</u>**

Required:

```
path: '/credit-card',
method: 'POST',
headers: {
	jwttoken
},
data: {
	name,
	surname,
	card_name,
	exp_date => data type: Date,
	cvc,
	card_number => data type: Number
}
```

Success output example:

```
{
  "message": "Waiting for admin approval",
  "status": 202
}
```

Error output example:

```
{
  "message": "Name cannot be empty",
  "status": 400
}
```

#### **<u>HISTORY USER</u>**

Required:

```
path: '/history/',
method: 'GET',
headers: {
	jwttoken
}
```

Success output example:

```
{
  "history": [
    {
      "_id": "5e6881347de31c33f4038c40",
      "transaction_status": true,
      "value": 1000000000000,
      "to": "0x6505A7DB04147D52f51B039d7B36b6b8B1e6BB54",
      "user": "5e6735b32bc2ab089c4ec3e7",
      "created_at": "2020-03-11T06:12:04.060Z",
      "updatedAt": "2020-03-11T06:12:04.060Z",
      "__v": 0
    },
    {
      "_id": "5e688bf1bb130d0908b5d08e",
      "transaction_status": true,
      "value": 1000000000000,
      "to": "0x6505A7DB04147D52f51B039d7B36b6b8B1e6BB54",
      "user": "5e6735b32bc2ab089c4ec3e7",
      "created_at": "2020-03-11T06:57:53.690Z",
      "updatedAt": "2020-03-11T06:57:53.690Z",
      "__v": 0
    },
    {
      "_id": "5e689180042d2020d470e459",
      "transaction_status": true,
      "value": 1000000000000,
      "to": "0x6505A7DB04147D52f51B039d7B36b6b8B1e6BB54",
      "user": "5e6735b32bc2ab089c4ec3e7",
      "created_at": "2020-03-11T07:21:36.092Z",
      "updatedAt": "2020-03-11T07:21:36.092Z",
      "__v": 0
    }
  ],
  "status": 200
}
```

#### **<u>TRANSFER CODEO</u>**

Required:

```
path: '/transfer/',
method: 'POST'
headers: {
	jwttoken
},
data: {
	toAddress,
	myValue,
  adminValue
},

```

Success ouput example:

```
{
	"message": "Your Request on process"
}

*Note: The Result will appear in history
```

#### **<u>2FA</u>**

Required:

```
path: 'users/2fa/',
method: 'PATCH'
headers: {
	jwttoken
},


```

Success ouput example:

```
{
	"message": 'your 2FA is completed'
}

```

#### **<u>2FA LOGOUT</u>**

Required:

```
path: 'users/2faout/',
method: 'PATCH'
headers: {
	jwttoken
},


```

Success ouput example:

```
{
	"message": "Close 2FA"
}

```

#### **<u>LOGOUT</u>**

Required:

```
path: 'users/logout/',
method: 'PATCH'
headers: {
	jwttoken
},


```

Success ouput example:

```
{
	"message": <message>,
  "status": <status>
}

```

#### **<u>TRANSFER CODEO</u>**

Required:

```
path: 'users/transfer/',
method: 'PATCH'
headers: {
	jwttoken
},
data: {
  adminValue, myValue
}


```

Success ouput example:

```
{
	"message": "Your Request in process!!"
}


```

#### **<u>ADD LOGIN HISTORY</u>**

Required:

```
path: "/logHistory",
method: 'POST'
headers: {
	jwttoken
},
data: {
  ipad: <data that get from api>
}

```

Success ouput example:

```
{
  "logs": <data from server>,
  "status": 202
}


```

#### **<u>GET LOGIN HISTORY</u>**

Required:

```
path: 'loghistory/myhistory/',
method: 'GET'
headers: {
	jwttoken
}


```

Success ouput example:

```
{
  "loghistory":[{
      "history":{
      "ip": "140.213.41.203",
      "range": [
      2362777600,
      2362781695
      ],
      "country": "ID",
      "region": "JK",
      "eu": "0",
      "timezone": "Asia/Jakarta",
      "city": "Jakarta",
      "ll": [
      -6.1741,
      106.8296
      ],
      "metro": 0,
      "area": 20
     },
    "created_at":time
  }],
    "status": 200
}

```
