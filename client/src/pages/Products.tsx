import { useEffect, useState } from "react";
import "./Products.css";

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

  if (loading) {
    return <p className="products-message">Loading products...</p>;
  }

  if (error) {
    return <p className="products-error">{error}</p>;
  }

  return (
   <section id="products" className="products-section">
      <div className="products-header">
        <p className="eyebrow">Upakut Clothing</p>
        <h2>Selected Pieces</h2>
        <p>
          Product concepts connected to Manic’s graffiti identity and the visual
          language of authentic street art.
        </p>
      </div>

      <div className="products-grid">
        {products.length === 0 ? (
          <p className="products-message">No products yet.</p>
        ) : (
          products.map((product) => (
            <article key={product.id} className="product-card">
              <div className="product-image">
                {product.imageUrl ? (
                 <img src={`/assets/${product.imageUrl}`} alt={product.title} />
                ) : (
                  <span>No image</span>
                )}
              </div>

              <div className="product-info">
                <div className="product-top">
                  <span>{product.category}</span>
                  <span>${product.price}</span>
                </div>

                <h3>{product.title}</h3>
                <p>{product.description}</p>

                <div className="product-tags">
                  {product.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
}

export default Products;