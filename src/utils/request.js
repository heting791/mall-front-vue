import axios from 'axios'

const request = axios.create({
  baseUrl: 'http://localhost:8888/',
})

export default { request }
