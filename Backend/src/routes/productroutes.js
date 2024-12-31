import { Router } from "express";
import { createProduct, deleteProduct, getallProducts, getparticularProduct, updateProduct } from "../controller/products.js";
const router=Router();

router.route("/").get(getallProducts)
router.route("/:productId").get(getparticularProduct)
router.route("/create").post(createProduct)
router.route("/update/:productId").put(updateProduct)
router.route("/:productId").delete(deleteProduct)
export default router