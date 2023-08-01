# json-server-template

[JSON Server](https://github.com/typicode/json-server) with message controller classes

## Installation
```
npm install
```

## Usage
Configure listening port in package.json
Start json-server
```
npm run watch
```

## Sample request message
###Endpoint

```
http://localhost:20000/login
```
###Login

```json
{
  "params": {
    "AttendantID": "999",
    "Password": "1"
  }
}
```
###Logout

```json
{
  "params": {
    "SessionID":"{F484B778-833F-4994-9CA8-C019C4DF5F04}"
  }
}
```
