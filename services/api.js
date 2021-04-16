import axios from 'axios'

const api = axios.create({
    //http://localhost:3333
    // https://api-omie-etiquetas.herokuapp.com
    baseURL: "http://localhost:3333"
})

export default api