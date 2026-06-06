import { v4 as uuidv4 } from "uuid";

export interface Product {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  imageUrl: string;
  tags: string[];
  createdBy: string;
}

const products: Product[] = [];

export function getAllProducts(): Product[] {
  return products;
}

export function findProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase();

  return products.filter((product) => {
    return (
      product.title.toLowerCase().includes(lowerQuery) ||
      product.description.toLowerCase().includes(lowerQuery) ||
      product.category.toLowerCase().includes(lowerQuery) ||
      product.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
    );
  });
}

export function createProduct(data: Omit<Product, "id">): Product {
  const newProduct: Product = {
    id: uuidv4(),
    ...data,
  };

  products.push(newProduct);
  return newProduct;
}

export function updateProduct(
  id: string,
  updatedData: Partial<Omit<Product, "id" | "createdBy">>
): Product | undefined {
  const product = findProductById(id);

  if (!product) {
    return undefined;
  }

  Object.assign(product, updatedData);
  return product;
}

export function deleteProduct(id: string): boolean {
  const index = products.findIndex((product) => product.id === id);

  if (index === -1) {
    return false;
  }

  products.splice(index, 1);
  return true;
}