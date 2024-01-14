const express = require("express")
const dotenv = require("dotenv")
const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()
const app = express()

dotenv.config()

app.use(express.json())

const PORT = process.env.PORT

//Get All
app.get("/products", async (req, res) => {
  const products = await prisma.product.findMany()

  res.send(products)
})

//Get by Id
app.get("/products/:id", async (req, res) => {
  const productId = req.params.id

  const product = await prisma.product.findUnique({
    where: {
      id: parseInt(productId),
    },
  })

  if (product == null) {
    res.status(400).send("Product Not Found")
  }
  res.send(product)
  // res.json(product)
})

//Post
app.post("/products", async (req, res) => {
  const newProductData = req.body

  const product = await prisma.product.create({
    data: {
      name: newProductData.name,
      description: newProductData.description,
      image: newProductData.image,
      price: newProductData.price,
    },
  })

  res.status(201).send({
    data: product,
    message: "create product success",
  })
})

// Delete
app.delete("/products/:id", async (req, res) => {
  try {
    const productId = req.params.id //string

    const product = await prisma.product.delete({
      where: {
        id: parseInt(productId), //diubah dari string ke Int / number
      },
    })

    res.send("Delete Product Success")
  } catch (error) {
    console.log(error.message)
    res.send("Delete failed")
  }
})

//Update
app.put("/products/:id", async (req, res) => {
  try {
    const productId = req.params.id
    const productData = req.body

    // perkondisian ketika salah satunya ga di update maka error
    if (
      !(
        productData.name &&
        productData.description &&
        productData.image &&
        productData.price
      )
    ) {
      return res.status(404).send("missing error")
    }

    await prisma.product.update({
      where: {
        id: parseInt(productId),
      },
      data: {
        name: productData.name,
        description: productData.description,
        image: productData.image,
        price: productData.price,
      },
    })

    res.send("Update Success")
  } catch (error) {
    console.log(error.message)
    res.send("Update Failed")
  }
})

//Update Patch
app.patch("/products/:id", async (req, res) => {
  try {
    const productId = req.params.id
    const productData = req.body

    await prisma.update({
      where: {
        id: parseInt(productId),
      },
      data: {
        name: productData.name,
        description: productData.description,
        image: productData.image,
        price: productData.price,
      },
    })

    res.status(201).send("Update Success")
  } catch (error) {
    console.log(error.message)
    res.send("Update Error")
  }
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
