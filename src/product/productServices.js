// service layer bertujuan untuk menghandle bisnis logic
const prisma = require("../db")

//get all
const getAllProducts = async () => {
  const products = await prisma.product.findMany()
  return products
}

//get by id
const getProductById = async (id) => {
  if (typeof id !== "number") {
    throw Error("ID is not a number")
  }

  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  })

  if (!product) {
    throw Error("Product Not Found")
  }

  return product
}

//create (post)
const createProduct = async (newProductData) => {
  const product = await prisma.product.create({
    data: {
      name: newProductData.name,
      description: newProductData.description,
      image: newProductData.image,
      price: newProductData.price,
    },
  })

  return product
}

//delete
const deleteProductById = async (id) => {
  if (typeof id !== "number") {
    throw Error("ID is not a number")
  }

  // const product = await prisma.product.findUnique({
  //   where: {
  //     id,
  //   },
  // })

  await getProductById(id)

  await prisma.product.delete({
    where: {
      id,
    },
  })

  return product
}

//update patch
const editProductById = async (id, productData) => {
  const product = await prisma.update({
    where: {
      id: parseInt(id),
    },
    data: {
      name: productData.name,
      description: productData.description,
      image: productData.image,
      price: productData.price,
    },
  })

  return product
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProductById,
  editProductById,
}
