Scheduler is a React application that allows users to book and cancel interviews witn an interviewer. 

# Getting started 

1. Fork this repository, then clone your fork of this repository.
2 .Install dependencies using the npm install command.
3 .Start the web server using the npm run start. The app will be served at http://localhost:8000/.
4 .Go to http://localhost:8000/ in your browser.
5. Data is stored in a PostgreSQL database that can be found here : https://github.com/elodiebhs/scheduler-api.git. To setup the api server, follow the instruction in the repository.
6. Running Jest Test Framework : npm test
7. Running Storybook Visual Testbed: npm run storybook

## Functionality

- Development focuses on a single page application (SPA) called Interview Scheduler, built using React.
- Data is persisted by the API server using a PostgreSQL database.
- The client application communicates with an API server over HTTP, using the JSON format.
- Jest tests are used through the development of the project.



### Technical Specifications:

- React: https://reactjs.org/
- Webpack : https://webpack.js.org/
- Babel: https://babeljs.io/
- Axios : https://github.com/axios/axios
- WebSockets: https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API
- Storybook: https://storybook.js.org/
- Webpack Dev Server: https://github.com/webpack/webpack-dev-server
- Jest: https://jestjs.io/
- Testing Library: https://testing-library.com/

The Scheduler client application created using Create React App. Express is the basis for the Scheduler API server application.

Both servers run concurrently; requests are proxied from the Webpack development server to the API server.

#### Final Project

##### Main Page
!["Screenshot of Main Page"](https://raw.githubusercontent.com/elodiebhs/Scheduler/master/Images/Main_page.png)
##### Form
!["Screenshot of the Form"](https://raw.githubusercontent.com/elodiebhs/Scheduler/master/Images/Form.png)
##### New Appointment created
!["Screenshot of the New Appointment created](https://raw.githubusercontent.com/elodiebhs/Scheduler/master/Images/new_apointment_created.png)
