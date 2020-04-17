import axios from "axios";

export default {
  async request_data(url) {
    try {
      const res = await axios.get(url)
      return res
    } catch (e) {
      return null
    }

  }
}