import axios from "axios";

export default {
  async request_data(url) {
    try {
      const res = await axios.get(url, {
        headers: { 'Access-Control-Allow-Origin': '*' },
      })
      return res.headers
    } catch (e) {
      return null
    }

  }
}