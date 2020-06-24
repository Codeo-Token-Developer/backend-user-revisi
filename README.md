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
  "message": "Welcome <user name>, hope you have a nice day",
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

##### <u>**GET 1 ACCOUNT**</u>

Required:

```
path: '/accounts/myAccount',
method: 'GET',
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
    "status": 200
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
    country_issued,
    document_imageFrontSide,
    document_imageBackSide,
    document_imageSelfieSide,
    home_address,
    city,
    zip_code,
    phone_number1,
    phone_number2,
    user,
}

```

Success Output example:

```
{
    "message": "Waiting for admin approval",
    "status": 202
}
```

Error Output example:

```
{
	"message": "ID Number cannot be empty"
}
```

**My KYC status**

```
path: 'kyc/mykyc',
method: 'GET',
headers: {
	jwttoken : localStorage.getItem('codeoToken')
},
```

Success Output example:

```
{
    "kyc": {
        "zip_code": "2010310",
        "approved_status": false,
        "review": false,
        "lock_status": true,
        "_id": "5ef301c8c79f5b3148a015e5",
        "id_number": "515122",
        "country_issued": "Indonesia",
        "document_imageFrontSide": "Front",
        "document_imageBackSide": "Back",
        "document_imageSelfieSide": "Selfie",
        "home_address": "Jl. Erlangga I ",
        "city": "Jakarta Selatan",
        "phone_number1": "945556123",
        "phone_number2": "8798561",
        "user": "5ea68712cd3fe40024359967",
        "__v": 0
    },
    "status": 200
}
```

**Cancel a KYC**

```
path: kyc/:id_number
method: 'DELETE'
headers: {
	jwttoken : localStorage.getItem('codeoToken')
}
```

Success Output Example:

```
{
    "status": "KYC has been deleted and canceled!"
}
```

## **<u>CMS</u>**

**READ**

Required:

```
path: '/cms',
method: 'GET',
headers: {
	jwttoken : localStorage.getItem('codeoToken')
}

```

Success Output example:

```
{
  "cms": <cms>,
  "status": 200
}
```

**GET 1 Account**

Required:

```
path: '/accounts/myAccount',
method: 'GET',
headers: {
	jwttoken : localStorage.getItem('codeoToken')
},

```

Success Output example:

```
{
  "account": <account>,
  "status": 200
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

#### **<u>Topup</u>**

Required:

```
path: "/topup",
method: 'POST'
headers: {
	jwttoken
},
data: {
  amount, payment_method
}

```

Success ouput example:

```
{
  "message": <message>
}


```

#### **<u>Notification</u>**

Required:

```
path: "/notif/one",
method: 'GET'
headers: {
	jwttoken
}

```

Success ouput example:

```
{
  "notifi": [data]
}


```

#### **<u>Notification read update</u>**

Required:

```
path: "notif/myNews/:notifId",
method: 'PATCH'

```

Success ouput example:

```
{
  "notifi": read : true
}


```

### <u>\*_LAUNCHPAD_</u>\*

### **Project**

**Step1**

Required:

```
path: '/project/step1',
method: 'POST',
headers: {
	jwttoken
},
data: {
			fullname,
            email,
            position,
            other_position,
            pitch,
            regulated,
            other_regulated,
            nda_signed,
            legal_opinion_document
}
```

Success:

```
{
	<project>
}
```

**Step2**

Required:

```
path: '/project/step2',
method: 'PATCH',
headers: {
	jwttoken
},
data: {
			project_name,
            coin_full_name,
            coin_symbol,
            official_website,
            permanent_link,
            nature_project,
            other_nature_project,
            main_application,
            target_industry,
            project_target,
            brief_project_history,f
            accrue_native_digital_asset,
            long_term_vision,
            quarterly_project_roadmap,
            current_development,
            native_digital_necessary,
            comprehensive_description,
            limit_number_token_held,
            existing_platform,differentiate_project
}
```

Success:

```
{
	"message": <message>
}
```

**Step3**

Required:

```
path: '/project/step3',
method: 'PATCH',
headers: {
	jwttoken
},
data: {
    how_many_users,
    social_communities,
    developer_communities
}
```

Success:

```
{
	"message": <message>
}
```

**Step4**

Required:

```
path: '/project/step4',
method: 'PATCH',
headers: {
	jwttoken
},
data: {
    level_development,
    product_demos,
    users_intended_purpose,
    applicable_feature,
    other_applicable_feature,
    associated_with_token,
    smart_contract_underlying,
    is_open_source,
    other_is_open_source
    open_source_documentation,
    github
}
```

Success:

```
{
	"message": <message>
}
```

**Step5**

Required:

```
path:'/project/step5',
method: 'PATCH',
headers: {
	jwttoken
},
data: {
    team_member,
    team_member_not_fulltime,
    team_members_involved,
    all_projects_currently,
    project_advistors,
    identifies_each_member
}
```

Success:

```
{
	"message": <message>
}
```

**Step6**

Required:

```
path: '/project/step6',
method: 'PATCH',
headers: {
	jwttoken
},
data: {
    fundraising,
    chart_detailing,
    owned_by_members,
    multiple_private,
    anticipated_codeo,
    expected_public,
    total_supply,
    conversion_price,
    countries_excluded
}
```

Success:

```
{
	"message": <message>
}
```

**Step7**

Required:

```
path: '/project/step7',
method: 'PATCH',
headers: {
	jwttoken
},
data: {
	ERC_20,
    link_relevant_blockchain,
}
```

Success:

```
{
	"message": <message>
}
```

**Step8**

Required:

```
path: '/project/step8',
method: 'PATCH',
headers: {
	jwttoken
},
data: {
	publicy,
    fullname_title,
    anti_phising_code,
    anything_add,
}
```

Success:

```
{
	"message": <message>
}
```

**Project List**

Required:

```
path: '/project/myProjects',
method: 'GET',
headers: {
	jwttoken
},

```

Success:

```
{
	projects: <projects>
}
```

### <u>\*_BITCOIN_</u>\*

**add Bitcoin address**

Required:

```
path: '/btc/addAddress',
method: 'POST',
headers: {
	jwttoken
},
```

Success:

```
{
	"message": "Success"
}
```

**get address**

Required:

```
path: '/btc/Address',
method: 'GET',
headers: {
	jwttoken
},
```

Success:

```
{
	"payload": [
        {
            "_id": "5ecf41f8f3d8ed5708d3ea5e",
            "user": "5e8ca4e2898bb0332078c26f",
            "address": "1HxcPe2mj1La2jkXYfv6AGp9oCEZFwTW4Q",
            "privateKey": "U2FsdGVkX1/uYmkVe1r6UnaSIR8uy92akjBgxPBjlAGhPfgG3mGOK3E237CJLAGJrGXPYnlxtNjXjz7o5aIi1mLYvS6JYRharwf/Rrs052J/yq2sBSZrXS9lb/Q2uXV9",
            "publicKey": "U2FsdGVkX19jG/fbdC8ws11iDHwB791fSW1MOquZotCnQBL8qDxphY1u8NmREYa0DvpkyileHMqw4LnzKwvRUr04mMk5SiFFVMlAeKS+M16Tk8+M+R/B+lqoLsBGoIRd",
            "balance": null,
            "totalSpent": "",
            "totalReceived": "",
            "txi": 0,
            "txo": 0,
            "txsCount": 0,
            "createdAt": "2020-05-28T04:45:44.115Z",
            "updatedAt": "2020-05-28T04:45:44.115Z",
            "__v": 0
        }
    ],
    "status": 200
}
```

**get balance**

Required:

```
path: '/btc/infoAccount/{:Address}',
method: 'GET',
headers: {
	jwttoken
},
```

Success:

```
{
    "message": "success",
    "info": {
        "balance": 0,
        "totalSpent": "0",
        "totalReceived": "0",
        "txi": 0,
        "txo": 0,
        "txsCount": 0
    },
    "status": 202
}
```

**get Transactions history**

Required:

```
path: '/btc/historyAccount/{:Address}',
method: 'GET',
headers: {
	jwttoken
},
```

Success:

```
{
    "message": "success",
    "payload": {
        "History": [
                     {
                      "txid": "ace6f04e13d4c9482dec860eeccab59e5bf50bfd8bf966ab179131c0b218d5e8",
                      "amount": 0.00015802,
                      "fee": 0.00015198,
                      "unit": "btc",
                      "datetime": "2020-03-04 11:25:57 UTC",
                      "timestamp": 1583321157,
                      "confirmations": 502,
                      "sent": {
                        "mnetBQ8h3srGd3oNT4uczwcQpXjR6AE73E": 0.00021,
                        "n1s4jV66dGSX6TDezLRWZgcEuH5Sy2Pujg": 0.0001
                      },
                      "received": {
                        "mnetBQ8h3srGd3oNT4uczwcQpXjR6AE73E": 0.00015802
                      }
                    },
                    {
                      "txid": "ffa143f44b114be4db0091500ab189c5d50f29758970a54e7a1dc08c2b47ea50",
                      "amount": 0.11484588,
                      "fee": 0.00000168,
                      "unit": "btc",
                      "datetime": "2020-03-03 09:20:12 UTC",
                      "timestamp": 1583227212,
                      "confirmations": 728,
                      "sent": {
                        "2NCJCzQFPANPkRmYDidKcUao9c9fLp5HeXV": 0.11484756
                      },
                      "received": {
                        "n1s4jV66dGSX6TDezLRWZgcEuH5Sy2Pujg": 0.0001,
                        "2NDEprTde2Uci9zqNVNWc1eXkCe8NENi3gY": 0.11474588
                      }
                  }
        ],
        "_id": "5ecf41f8f3d8ed5708d3ea5f",
        "user": "5e8ca4e2898bb0332078c26f",
        "createdAt": "2020-05-28T04:45:44.116Z",
        "updatedAt": "2020-05-28T08:45:19.527Z",
        "__v": 0
    },
    "status": 202
}
```

### <u>\*_LITECOIN_</u>\*

**add litecoin address**

Required:

```
path: '/ltc/addAddress',
method: 'POST',
headers: {
	jwttoken
},
```

Success:

```
{
	"message": "Success"
}
```

**get address**

Required:

```
path: '/ltc/Address',
method: 'GET',
headers: {
	jwttoken
},
```

Success:

```
{
	"payload": [
        {
            "_id": "5ecf41f8f3d8ed5708d3ea5e",
            "user": "5e8ca4e2898bb0332078c26f",
            "address": "1HxcPe2mj1La2jkXYfv6AGp9oCEZFwTW4Q",
            "privateKey": "U2FsdGVkX1/uYmkVe1r6UnaSIR8uy92akjBgxPBjlAGhPfgG3mGOK3E237CJLAGJrGXPYnlxtNjXjz7o5aIi1mLYvS6JYRharwf/Rrs052J/yq2sBSZrXS9lb/Q2uXV9",
            "publicKey": "U2FsdGVkX19jG/fbdC8ws11iDHwB791fSW1MOquZotCnQBL8qDxphY1u8NmREYa0DvpkyileHMqw4LnzKwvRUr04mMk5SiFFVMlAeKS+M16Tk8+M+R/B+lqoLsBGoIRd",
            "balance": null,
            "totalSpent": "",
            "totalReceived": "",
            "txi": 0,
            "txo": 0,
            "txsCount": 0,
            "createdAt": "2020-05-28T04:45:44.115Z",
            "updatedAt": "2020-05-28T04:45:44.115Z",
            "__v": 0
        }
    ],
    "status": 200
}
```

**get balance**

Required:

```
path: '/ltc/infoAccount/{:Address}',
method: 'GET',
headers: {
	jwttoken
},
```

Success:

```
{
    "message": "success",
    "info": {
        "balance": 0,
        "totalSpent": "0",
        "totalReceived": "0",
        "txi": 0,
        "txo": 0,
        "txsCount": 0
    },
    "status": 202
}
```

**get Transactions history**

Required:

```
path: '/ltc/historyAccount/{:Address}',
method: 'GET',
headers: {
	jwttoken
},
```

Success:

```
{
    "message": "success",
    "payload": {
        "History": [
                     {
                      "txid": "79e983ff661b84801f2d4e9283e8fa4df678714a7a4ec435b4c7e7720a0c1374",
                      "amount": 25,
                      "fee": 0,
                      "unit": "ltc",
                      "datetime": "2020-03-06 08:44:28 UTC",
                      "timestamp": 1583484268,
                      "confirmations": 1,
                      "sent": {
                        "coinbase": 25
                      },
                      "received": {
                        "mvymY6wswVHDh9iW3bSg7zRgJgcvwPdV9F": 25
                      }
                    },
                    {
                      "txid": "4a37bdccac863f4afc0ea46cdfb524c3763443ebe9aa8fcc04817d579e356b5c",
                      "amount": 25.00007051,
                      "fee": 0,
                      "unit": "ltc",
                      "datetime": "2020-03-06 02:59:45 UTC",
                      "timestamp": 1583463585,
                      "confirmations": 90,
                      "sent": {
                        "coinbase": 25.00007051
                      },
                      "received": {
                        "mvymY6wswVHDh9iW3bSg7zRgJgcvwPdV9F": 25.00007051
                      }
                    }
        ],
        "_id": "5ecf41f8f3d8ed5708d3ea5f",
        "user": "5e8ca4e2898bb0332078c26f",
        "createdAt": "2020-05-28T04:45:44.116Z",
        "updatedAt": "2020-05-28T08:45:19.527Z",
        "__v": 0
    },
    "status": 202
}
```
