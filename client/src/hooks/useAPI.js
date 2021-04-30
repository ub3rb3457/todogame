import axios from 'axios'
import { makeUseAxios } from "axios-hooks";
const useAPI = makeUseAxios({ axios: axios.create({ baseURL: 'http://localhost:3004' }) })
export default useAPI