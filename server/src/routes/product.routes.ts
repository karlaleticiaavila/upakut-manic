import { Router } from "express";
import {
  browseProducts,
  readProduct,
  searchProductList,
  addProduct,
  editProduct,
  removeProduct,
} from "../controllers/product.controller";
import { requireAuth } from "../middleware/auth.middleware";

const router = Router();

router.get("/", browseProducts);
router.get("/search", searchProductList);
router.get("/:id", readProduct);

router.post("/",requireAuth, addProduct);
router.put("/:id", requireAuth, editProduct);
router.delete("/:id", requireAuth, removeProduct);

export default router;