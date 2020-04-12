export default {
  text_to_json(text) {
    try {
      const data = JSON.parse(text)
      return data
    } catch(e) {
      if (e.name === "SyntaxError") {
        console.log("SyntaxError")
        return null
      } else {
        console.log("error")
        return null
      }
    }
  }
}