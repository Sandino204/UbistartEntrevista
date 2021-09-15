# **Documentação Ubistart Desafio**

**Editar o Arquivo Config para se adequar ao banco de dados**

**Será necessario dar um npm i para baixar os node_modules**

(Usuario administrador padrão: { 
    "email": "ubistartAdmin",
    "password": "ubistartAdmin"
})

### BaseURL: http://localhost:5000/api

# **Rotas de usuario**

# SignUp

```
/post /signup
```

**Body Required**

```
{
    "password": "senha" (Minimo oito caracteres, pelo menos uma letra maiuscula, uma minuscula e um numero) (String) , 
    "email": "email@email.com" (string) (precisa ser um email valido)
}
```

**Return if success:**

```
{
    "success": true,
    "message": "User was registered successfully!"
}
```

# SignIn

```
/post /signin
```

**Body Required**

```
{
    "password": "senha" (Minimo oito caracteres, pelo menos uma letra maiuscula, uma minuscula e um numero) (String) , 
    "email": "email@email.com" (string) (precisa ser um email valido)
}
```

**Return if success:**

```
{
    "id": "userId" (uuid) (String),
    "email": "email@email.com" (string),
    "accessToken": "Token of access"
}
```

# **Rotas de todo**

# Obter todos os Todos

```
/get /todo/all
```
**Query Optional**
```
    ?page=<number of page> (a paginação é a cada 25 todos)
```

**Headers Required**
```
    "x-access-token": "token de acesso" (token precisa ser administrador)
```

**Return if success:**

```
{    
    "success": true,
    "data": [array de todos listados em ordem de criação             decrescente],
}
```

# Obter todos os Todos atrazados

```
/get /todo/late
```
**Query Optional**
```
    ?page=<number of page> (a paginação é a cada 25 todos)
```

**Headers Required**
```
    "x-access-token": "token de acesso" (token precisa ser administrador)
```

**Return if success:**

```
{    
    "success": true,
    "data": [array de todos listados em ordem de criação             decrescente],
}
```

# Obter todos os Todos do usuario com flag de atrazado ou não

```
/get /todo
```

**Headers Required**
```
    "x-access-token": "token de acesso"
```

**Return if success:**

```
{    
    "success": true,
    "data": [array de todos listados em ordem de criação             decrescente] (o todo adiciona uma flag: "isLate= (boleano) se for atrazado ou não)",
}
```

# Criar um Todo

```
/post /todo
```

**Headers Required**
```
    "x-access-token": "token de acesso"
```

**Body Required**

```
{
    "title": "Titulo" (String), 
    "description": "Descrição do Todo" (string),
    "prediction": "YYYY-MM-DD" (date)
}
```

**Return if success:**

```
{    
    "success": true,
    "data": {
        "createdAt": "data de criação",
        "id": "id do Todo" (UUID) (String),
        "isCompleted": false,
        "title": "titulo do todo" (String),
        "author": (ID do Author) (UUID) (String),
        "description": "Descrição do todo" (String),
        "prediction": "Data da previsão de entrega" (Date),
        "updatedAt": "Data de Atualização" (Date),
    }
}
```


# Editar um todo

(Só poderá ser atualizado um Todo que não esteja ainda finalizado ou que seja do proprio usuario do token)

```
/put /todo/:id
```

**Headers Required**
```
    "x-access-token": "token de acesso"
```

**Body Required**

(pelo menos um dos valores do Body não devem ser nulos)

```
{
    "description": "Nova descrição" (String),
    "prediction": "Nova previsão" (YYYY-MM-DD) (Date)
}
```

**Return if success:**

```
{    
    "success": true,
    "data": {
        "createdAt": "data de criação",
        "id": "id do Todo" (UUID) (String),
        "isCompleted": false,
        "title": "titulo do todo" (String),
        "author": (ID do Author) (UUID) (String),
        "description": "Descrição do todo" (String),
        "prediction": "Data da previsão de entrega" (Date),
        "updatedAt": "Data de Atualização" (Date),
    }, 
    "message": "Todo edited"
}
```

# Finalizar um todo

(Só poderá ser atualizado um Todo que não esteja ainda finalizado ou que seja do proprio usuario do token)

```
/put /todo/finalize/:id
```

**Headers Required**
```
    "x-access-token": "token de acesso"
```

**Return if success:**

```
{    
    "success": true,
    "data": {
        "createdAt": "data de criação",
        "id": "id do Todo" (UUID) (String),
        "isCompleted": true,
        "title": "titulo do todo" (String),
        "author": (ID do Author) (UUID) (String),
        "description": "Descrição do todo" (String),
        "prediction": "Data da previsão de entrega" (Date),
        "updatedAt": "Data de Atualização" (Date),
    }, 
    "message": "Todo ended"
}
```
