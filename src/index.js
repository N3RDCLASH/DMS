import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux'
import App from 'App'
import store from 'store'

const apiUrl = "http://localhost:3000"

// axios.interceptors.request.use(
//   config => {
//     const { origin } = new URL(config.url);
//     const allowedOrigins = [apiUrl];
//     const token = localStorage.getItem('token');
//     if (allowedOrigins.includes(origin)) {
//       config.headers.authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   }
// );


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider >, document.querySelector("#root")

);

export { apiUrl }
