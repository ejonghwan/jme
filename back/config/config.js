// json -> js로 바꾸고 module.exports 넣어줌 .env쓰려고. json은 못씀

const dotenv = require('dotenv')
dotenv.config();

module.exports = {
  "development": {
    "username": "root",
    "password": 'sksksksk1@',
    "database": "jme",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "jme",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "jme",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
