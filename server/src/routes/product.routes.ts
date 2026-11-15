import { Router } from "express";
import {
  browseProducts,
  readProduct,
  searchProductList,
  addProduct,
  editProduct,
  removeProduct,
} from "../controllers/product.controller";
import { requireAdmin } from "../middleware/auth.middleware";

const router = Router();

router.get("/", browseProducts);
router.get("/search", searchProductList);
router.get("/:id", readProduct);

router.post("/",requireAdmin, addProduct);
router.put("/:id", requireAdmin, editProduct);
router.delete("/:id", requireAdmin, removeProduct);

export default router;