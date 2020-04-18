# Node ES6 configuration

[reference](https://www.freecodecamp.org/news/how-to-enable-es6-and-beyond-syntax-with-node-and-express-68d3e11fe1ab/)

## Create the project

```sh
npx express-generator --no-view --git server
cd server
npm install
```

Add .js extension to the `bin/www` file

Move the source code (`bin/`, `routes/` and `app.js`) to a new `src/` folder
*This requires changing all the relative paths*

Convert the code to ES6

## Configure babel and nodemon

```sh
npm install --save-dev @babel/core @babel/cli @babel/node @babel/preset-env nodemon
```

In package.json:

```json

"scripts.start": "nodemon --exec babel-node ./src/bin/www",

"babel": {
    "presets": [
      "@babel/preset-env"
    ]
  }
```

## Configure environment variables

```sh
touch .env
npm install --save dotenv dotenv-expand
```

In app.js:

```js
import "dotenv/config";
```
