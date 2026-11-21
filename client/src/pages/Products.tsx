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
  const apiUrl = import.meta.env.VITE_API_URL ?? (import.meta.env.DEV ? "http://localhost:3000" : "");
  const [loading, setLoading] = useState(Boolean(apiUrl));
  const [error, setError] = useState("");

  useEffect(() => {
    if (!apiUrl) return;
    async function fetchProducts() {
      try {
        const response = await fetch(`${apiUrl}/products`);

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
  }, [apiUrl]);

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
          <div className="products-coming-soon">
            <span className="products-coming-soon__eyebrow">EST. 2009 · NEXT CHAPTER 2027</span>
            <h3>COMING SOON</h3>
            <p>Authentic streetwear. New collections in development.</p>
            <a href="#gallery">EXPLORE THE MANIC ARCHIVE →</a>
          </div>
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