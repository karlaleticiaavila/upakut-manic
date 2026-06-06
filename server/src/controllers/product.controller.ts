import { Request, Response } from "express";
import {
  getAllProducts,
  findProductById,
  searchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../models/product.model";

export function browseProducts(_req: Request, res: Response) {
  return res.status(200).json(getAllProducts());
}

export function readProduct(req: Request, res: Response) {
  const product = findProductById(req.params.id as string);

  if (!product) {
    return res.status(404).json({ message: "Product not found." });
  }

  return res.status(200).json(product);
}

export function searchProductList(req: Request, res: Response) {
  const q = req.query.q as string;

  if (!q) {
    return res.status(400).json({ message: "Search query is required." });
  }

  return res.status(200).json(searchProducts(q));
}

export function addProduct(req: Request, res: Response) {
  const { title, description, category, price, imageUrl, tags, createdBy } = req.body;

  if (!title || !description || !category || price === undefined || !imageUrl) {
    return res.status(400).json({ message: "Missing required product fields." });
  }

  const product = createProduct({
    title,
    description,
    category,
    price: Number(price),
    imageUrl,
    tags: Array.isArray(tags) ? tags : [],
    createdBy: createdBy || "karla",
  });

  return res.status(201).json(product);
}

export function editProduct(req: Request, res: Response) {
  const { title, description, category, price, imageUrl, tags } = req.body;

  const updated = updateProduct(req.params.id as string, {
    title,
    description,
    category,
    price: price !== undefined ? Number(price) : undefined,
    imageUrl,
    tags,
  });

  if (!updated) {
    return res.status(404).json({ message: "Product not found." });
  }

  return res.status(200).json(updated);
}

export function removeProduct(req: Request, res: Response) {
  const deleted = deleteProduct(req.params.id as string);

  if (!deleted) {
    return res.status(404).json({ message: "Product not found." });
  }

  return res.status(200).json({ message: "Product deleted successfully." });
}