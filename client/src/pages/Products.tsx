import { useEffect, useState } from "react";

type Product = {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  imageUrl: string;
  tags: string[];
  createdBy: string;
};

function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("http://localhost:3000/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        console.log("PRODUCTS FROM BACKEND:", data);
        setProducts(data);
      } catch (err) {
        console.error(err);
        setError("Could not load products.");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) return <p style={{ color: "white" }}>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "2rem", color: "white", background: "#111", minHeight: "100vh" }}>
      <h1>UPAKUT Products</h1>

      <pre style={{ background: "#222", padding: "1rem", borderRadius: "8px", overflow: "auto" }}>
        {JSON.stringify(products, null, 2)}
      </pre>

      {products.map((product) => (
        <div
          key={product.id}
          style={{
            marginTop: "1rem",
            padding: "1rem",
            border: "1px solid #444",
            borderRadius: "12px",
            background: "#1a1a1a",
          }}
        >
          <p><strong>Title:</strong> {product.title}</p>
          <p><strong>Description:</strong> {product.description}</p>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Price:</strong> ${product.price}</p>
          <p><strong>Image URL:</strong> {product.imageUrl}</p>
        </div>
      ))}
    </div>
  );
}

export default Products;