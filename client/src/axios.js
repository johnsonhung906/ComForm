import axios from 'axios'

const API_ROOT = "https://andyjjrt.ebg.tw"

const instance = axios.create({
  baseURL: API_ROOT,
})

export default instance;