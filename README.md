# Interview Scheduler

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```


Technical Specifications:

React: https://reactjs.org/
Webpack : https://webpack.js.org/
Babel: https://babeljs.io/
Axios : https://github.com/axios/axios
WebSockets: https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API
Storybook: https://storybook.js.org/
Webpack Dev Server: https://github.com/webpack/webpack-dev-server
Jest: https://jestjs.io/
Testing Library: https://testing-library.com/

The Scheduler client application created using Create React App. Express is the basis for the Scheduler API server application.

Both servers run concurrently; requests are proxied from the Webpack development server to the API server.