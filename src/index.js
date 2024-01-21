const express = require("express")
const dotenv = require("dotenv")

const app = express()

dotenv.config()

app.use(express.json())
app.use("/products", require("./product/productControllers"))

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
