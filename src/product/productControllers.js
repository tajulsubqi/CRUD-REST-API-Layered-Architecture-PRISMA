const express = require("express")
const prisma = require("../db")
const {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProductById,
  editProductById,
} = require("./productServices")

const router = express.Router()

//Get All
router.get("/", async (req, res) => {
  const products = await getAllProducts()
  res.send(products)
})

//Get by Id
router.get("/:id", async (req, res) => {
  try {
    const productId = req.params.id
    const product = await getProductById(parseInt(productId))

    res.send(product)
  } catch (error) {
    return res.status(404).send(error.message)
  }
})

//Post
router.post("/", async (req, res) => {
  try {
    const newProductData = req.body
    const product = await createProduct(newProductData)

    return res.status(201).send({
      data: product,
      message: "Create Product Success",
    })
  } catch (error) {
    return res.status(404).send(error.message)
  }
})

// Delete
router.delete("/:id", async (req, res) => {
  try {
    const productId = req.params.id //string harus di parsInt dulu
    await deleteProductById(parseInt(productId))

    return res.send("Delete success")
  } catch (error) {
    console.log(error.message)
    res.status(400).send("Product Not Found")
  }
})

//Update put
// router.put("/:id", async (req, res) => {
//   try {
//     const productId = req.params.id
//     const productData = req.body

   // // perkondisian ketika salah satunya ga di update maka error
//     if (
//       !(
//         productData.name &&
//         productData.description &&
//         productData.image &&
//         productData.price
//       )
//     ) {
//       return res.status(404).send("missing error")
//     }

//     await prisma.product.update({
//       where: {
//         id: parseInt(productId),
//       },
//       data: {
//         name: productData.name,
//         description: productData.description,
//         image: productData.image,
//         price: productData.price,
//       },
//     })

//     res.send("Update Success")
//   } catch (error) {
//     console.log(error.message)
//     res.send("Update Failed")
//   }
// })

//Update Put
router.put("/:id", async (req, res) => {
  try {
    const productId = req.params.id
    const productData = req.body

    if (
      !(
        productData.name &&
        productData.description &&
        productData.image &&
        productData.price
      )
    )
      return res.send({
        data: product,
        message: "Update Success",
      })

    const product = await editProductById(parseInt(productId), productData)
  } catch (error) {
    console.log(error.message)
    res.status(400).send("Product Not Found")
  }
})

//Update Patch
router.patch("/:id", async (req, res) => {
  try {
    const productId = req.params.id
    const productData = req.body

    const product = await editProductById(parseInt(productId), productData)

    return res.status(201).send({
      data: product,
      message: "Update Success",
    })
  } catch (error) {
    console.log(error.message)
    res.send("Update Error")
  }
})

module.exports = router
