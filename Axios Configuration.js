// Create a new instance of Axios with a base URL
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080/Student/App' // Update with your backend URL
});

export default instance;
