# Products API

Pedro Mata 19/02/2023

This API allows you to authenticate, insert, change and read products


## Authentication
Everything about authentication

* POST      /auth/registration              Create a new user ->  JSON Body {email: string, password: string}
* POST      /auth/login                     Get the login token ->  JSON Body {email: string, password: string}
* GET       /auth/users                     Get all users in the database (token required) 
* DELETE    /auth/users/{id}                Delete user by id (token required)
* GET       /auth/users/id/{id}             Get one user by id (token required) 
* GET       /auth/users/email/{email}       Get one user by email (token required) 
* POST      /auth/recover                   Get mail to recover the password -> JSON Body {email: string}
* PUT       /auth/reset/{token}             Get all users in the database -> JSON Body {password: string}



## products
Everything about products

* POST      /api/products/      Add a new product (token required) ->  JSON Body {name: string, description: string, price: number, quantity: number, image: file }
* GET       /api/products/      Get all products
* GET       /api/products/{id}  Get one product by id
* PUT       /api/products/{id}  Update one product by id (token required)  
* DELETE    /api/products/{id}  Delete one product by id (token required) 





