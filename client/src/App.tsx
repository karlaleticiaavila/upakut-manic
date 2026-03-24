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

function ArrowLogoIcon() {
  return (
    <svg viewBox="0 0 120 120" style={leftLogoSvg} aria-hidden="true">
      <path
        d="M78 8 L38 34 L58 36 L28 62 L52 64 L18 104 L68 78 L52 74 L88 48 L66 44 L104 18 Z"
        fill="none"
        stroke="#3ddad7"
        strokeWidth="5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path
        d="M46 83 L40 102"
        fill="none"
        stroke="#3ddad7"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" style={iconSvg} aria-hidden="true">
      <circle cx="12" cy="8" r="4" fill="none" stroke="#3ddad7" strokeWidth="2" />
      <path d="M4 20c0-4 4-6 8-6s8 2 8 6" fill="none" stroke="#3ddad7" strokeWidth="2" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" style={iconSvg} aria-hidden="true">
      <path
        d="M3 4h2l1.5 9h10.8l1.7-6.2H7.1"
        fill="none"
        stroke="#3ddad7"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="19" r="1.5" fill="#3ddad7" />
      <circle cx="17" cy="19" r="1.5" fill="#3ddad7" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" style={iconSvg} aria-hidden="true">
      <circle cx="11" cy="11" r="6" fill="none" stroke="#3ddad7" strokeWidth="2" />
      <line x1="16" y1="16" x2="21" y2="21" stroke="#3ddad7" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentUser, setCurrentUser] = useState<{
    id: string;
    username: string;
    email: string;
  } | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [tags, setTags] = useState("");

  async function fetchProducts() {
    const response = await fetch("http://localhost:3000/products");
    const data = await response.json();
    setProducts(data);
  }

  useEffect(() => {
    fetchProducts();
    fetchCurrentUser();
  }, []);

  function handleEdit(product: Product) {
    setEditingId(product.id);
    setTitle(product.title);
    setDescription(product.description);
    setCategory(product.category);
    setPrice(product.price.toString());
    setImageUrl(product.imageUrl);
    setTags(product.tags.join(", "));
  }

  async function handleDelete(id: string) {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    const response = await fetch(`http://localhost:3000/products/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!response.ok) {
      alert("Error deleting product");
      return;
    }

    if (editingId === id) {
      setEditingId(null);
      setTitle("");
      setDescription("");
      setCategory("");
      setPrice("");
      setImageUrl("");
      setTags("");
    }

    fetchProducts();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const productData = {
      title,
      description,
      category,
      price: Number(price),
      imageUrl,
      tags: tags.split(",").map((tag) => tag.trim()).filter(Boolean),
      createdBy: "karla",
    };

    const url = editingId
      ? `http://localhost:3000/products/${editingId}`
      : "http://localhost:3000/products";

    const method = editingId ? "PUT" : "POST";

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      alert("Error saving product");
      return;
    }

    setTitle("");
    setDescription("");
    setCategory("");
    setPrice("");
    setImageUrl("");
    setTags("");
    setEditingId(null);

    fetchProducts();
  }

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Error registering user");
      return;
    }

    setCurrentUser(data.user);
    setUsername("");
    setEmail("");
    setPassword("");
  }

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Error logging in");
      return;
    }

    setCurrentUser(data.user);
    setEmail("");
    setPassword("");
  }

  async function handleLogout() {
    const response = await fetch("http://localhost:3000/users/logout", {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) {
      alert("Error logging out");
      return;
    }

    setCurrentUser(null);
  }

  async function fetchCurrentUser() {
    const response = await fetch("http://localhost:3000/users/me", {
      credentials: "include",
    });

    if (!response.ok) {
      setCurrentUser(null);
      return;
    }

    const data = await response.json();
    setCurrentUser(data.user);
  }

  async function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!searchQuery.trim()) {
      setIsSearching(false);
      fetchProducts();
      return;
    }

    const response = await fetch(
      `http://localhost:3000/products/search?q=${encodeURIComponent(searchQuery)}`
    );

    if (!response.ok) {
      alert("Error searching products");
      return;
    }

    const data = await response.json();
    setProducts(data);
    setIsSearching(true);
  }

  function handleClearSearch() {
    setSearchQuery("");
    setIsSearching(false);
    fetchProducts();
  }

  return (
    <div style={page}>
      <section style={heroSection}>
        <div style={heroImage}></div>
        <div style={heroOverlay}></div>

        <div style={heroHeader}>
          <div style={heroLeft}>
            <img src="/assets/logo.png" style={realLogo} />
          </div>

          <div style={heroCenter}>
            <div style={brandName}>UPAKUT</div>
            <div style={brandSub}>AUTHENTIC STREET ART</div>
          </div>

          <div style={heroRight}>
            <button
              type="button"
              style={iconButton}
              onClick={() => {
                document.getElementById("products-section")?.scrollIntoView({ behavior: "smooth" });
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.filter = "drop-shadow(0 0 10px #3ddad7)")
              }
              onMouseLeave={(e) => (e.currentTarget.style.filter = "none")}
              aria-label="Products"
            >
              <CartIcon />
            </button>

            <button
              type="button"
              style={iconButton}
              onClick={() => {
                document.getElementById("auth-section")?.scrollIntoView({ behavior: "smooth" });
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.filter = "drop-shadow(0 0 10px #3ddad7)")
              }
              onMouseLeave={(e) => (e.currentTarget.style.filter = "none")}
              aria-label="Account"
            >
              <UserIcon />
            </button>

            <button
              type="button"
              style={iconButton}
              onClick={() => {
                document.getElementById("search-section")?.scrollIntoView({ behavior: "smooth" });
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.filter = "drop-shadow(0 0 10px #3ddad7)")
              }
              onMouseLeave={(e) => (e.currentTarget.style.filter = "none")}
              aria-label="Search"
            >
              <SearchIcon />
            </button>
          </div>
        </div>

        <div style={headerLine}></div>

        <div style={heroContent}>
          <div style={heroTagline}>REAL GRAFFITI. REAL ART.</div>

          <button
            style={heroButton}
            onClick={() => {
              document.getElementById("products-section")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.boxShadow = "0 0 20px #3ddad7")
            }
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 0 8px #3ddad7")}
          >
            SHOP ONLINE
          </button>
        </div>
      </section>

      <div style={container}>
        <h1 style={heading}>UPAKUT</h1>

        <div
          id="auth-section"
          style={{
            display: "grid",
            gap: "1rem",
            maxWidth: "500px",
            marginBottom: "2rem",
          }}
        >
          <form onSubmit={handleRegister} style={form}>
            <h2>Signup</h2>

            <input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={inputStyle}
            />

            <input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
            />

            <button
              type="submit"
              style={button}
              onMouseEnter={(e) =>
                (e.currentTarget.style.boxShadow = "0 0 20px #3ddad7")
              }
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
            >
              SIGN UP
            </button>
          </form>

          <form onSubmit={handleLogin} style={form}>
            <h2>Login</h2>

            <input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
            />

            <button
              type="submit"
              style={button}
              onMouseEnter={(e) =>
                (e.currentTarget.style.boxShadow = "0 0 20px #3ddad7")
              }
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
            >
              LOG IN
            </button>
          </form>

          <div>
            {currentUser ? (
              <>
                <p>
                  Logged in as <strong>{currentUser.username}</strong>
                </p>
                <button
                  type="button"
                  onClick={handleLogout}
                  style={button}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.boxShadow = "0 0 20px #3ddad7")
                  }
                  onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
                >
                  LOG OUT
                </button>
              </>
            ) : (
              <p>Not logged in</p>
            )}
          </div>
        </div>

        <form
          id="search-section"
          onSubmit={handleSearch}
          style={{ ...form, marginTop: "2rem" }}
        >
          <h2>Search Products</h2>

          <input
            placeholder="Search by title, description, category, or tags"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={inputStyle}
          />

          <div style={{ display: "flex", gap: "0.75rem" }}>
            <button
              type="submit"
              style={button}
              onMouseEnter={(e) =>
                (e.currentTarget.style.boxShadow = "0 0 20px #3ddad7")
              }
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
            >
              SEARCH
            </button>

            <button type="button" onClick={handleClearSearch} style={editBtn}>
              CLEAR
            </button>
          </div>
        </form>

        <form onSubmit={handleSubmit} style={form}>
          <h2 style={{ margin: 0 }}>
            {editingId ? "Edit Product" : "Add Product"}
          </h2>

          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={inputStyle}
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={textareaStyle}
          />

          <input
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={inputStyle}
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            style={inputStyle}
          />

    <select
  value={imageUrl}
  onChange={(e) => setImageUrl(e.target.value)}
  style={inputStyle}
>
  <option value="">Select image</option>
  <option value="caronfire.png">Caron Fire</option>
  <option value="hoodie.png">Hoodie</option>
  <option value="stickerupakut.png">Sticker Upakut</option>
</select>

{imageUrl && (
  <img
    src={`/assets/${imageUrl}`}
    style={{ width: "100px", marginTop: "10px", borderRadius: "10px" }}
  />
)}
          <input
            placeholder="Tags (comma separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            style={inputStyle}
          />

          <button
            type="submit"
            style={button}
            onMouseEnter={(e) =>
              (e.currentTarget.style.boxShadow = "0 0 20px #3ddad7")
            }
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
          >
            {editingId ? "UPDATE PRODUCT" : "CREATE PRODUCT"}
          </button>
        </form>

        {isSearching && <p>Showing search results for "{searchQuery}"</p>}

        <div id="products-section" style={productsGrid}>
          {products.map((product) => (
            <div
              key={product.id}
              style={card}
              onMouseEnter={(e) =>
                (e.currentTarget.style.boxShadow = "0 0 20px #3ddad7")
              }
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
            >
              <img
  src={`/assets/${product.imageUrl}`}
  alt={product.title}
  style={img}
/>

              <h2>{product.title}</h2>
              <p>{product.description}</p>
              <p>
                <strong>${product.price}</strong>
              </p>
              <p style={categoryText}>{product.category}</p>

              <div style={buttonRow}>
                <button
                  type="button"
                  onClick={() => handleEdit(product)}
                  style={editBtn}
                >
                  EDIT
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(product.id)}
                  style={deleteBtn}
                >
                  DELETE
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
const realLogo: React.CSSProperties = {
  width: "70px",
  height: "auto",
  objectFit: "contain",
  filter: "drop-shadow(0 0 8px #3ddad7)",
};

const page: React.CSSProperties = {
  minHeight: "100vh",
  background: "#111",
  color: "white",
  fontFamily: "Arial, sans-serif",
};

const container: React.CSSProperties = {
  padding: "2rem",
};

const heading: React.CSSProperties = {
  fontSize: "3rem",
  marginBottom: "2rem",
};

const form: React.CSSProperties = {
  background: "#1a1a1a",
  padding: "1.5rem",
  borderRadius: "20px",
  border: "1px solid #3ddad7",
  display: "grid",
  gap: "1rem",
  maxWidth: "500px",
};

const inputStyle: React.CSSProperties = {
  background: "#111",
  color: "white",
  border: "1px solid #555",
  borderRadius: "12px",
  padding: "0.8rem",
};

const textareaStyle: React.CSSProperties = {
  ...inputStyle,
  minHeight: "100px",
  resize: "vertical",
};

const button: React.CSSProperties = {
  background: "transparent",
  color: "#3ddad7",
  border: "2px solid #3ddad7",
  padding: "0.8rem",
  borderRadius: "12px",
  cursor: "pointer",
  transition: "0.3s",
};

const productsGrid: React.CSSProperties = {
  marginTop: "2rem",
  display: "grid",
  gap: "1rem",
};

const card: React.CSSProperties = {
  background: "#1a1a1a",
  padding: "1rem",
  borderRadius: "20px",
  border: "1px solid #444",
  maxWidth: "400px",
  transition: "0.3s",
};

const img: React.CSSProperties = {
  width: "100%",
  height: "200px",
  objectFit: "cover",
  borderRadius: "12px",
};

const categoryText: React.CSSProperties = {
  opacity: 0.8,
};

const buttonRow: React.CSSProperties = {
  display: "flex",
  gap: "0.75rem",
  marginTop: "1rem",
};

const editBtn: React.CSSProperties = {
  background: "transparent",
  color: "#3ddad7",
  border: "2px solid #3ddad7",
  padding: "0.6rem",
  borderRadius: "10px",
  cursor: "pointer",
};

const deleteBtn: React.CSSProperties = {
  background: "transparent",
  color: "#ff4d4d",
  border: "2px solid #ff4d4d",
  padding: "0.6rem",
  borderRadius: "10px",
  cursor: "pointer",
};

const heroSection: React.CSSProperties = {
  position: "relative",
  width: "100%",
  height: "100vh",
  minHeight: "700px",
  overflow: "hidden",
};

const heroImage: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  backgroundImage: 'url("/assets/hero.png")',
  backgroundSize: "cover",
  backgroundPosition: "center center",
  backgroundRepeat: "no-repeat",
};

const heroOverlay: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  background: "rgba(0,0,0,0.42)",
};

const heroHeader: React.CSSProperties = {
  position: "absolute",
  top: "18px",
  left: "24px",
  right: "24px",
  display: "grid",
  gridTemplateColumns: "120px 1fr 120px",
  alignItems: "center",
  zIndex: 3,
};

const heroLeft: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
};

const heroCenter: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "2px",
};

const heroRight: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  gap: "12px",
};

const brandName: React.CSSProperties = {
  color: "white",
  fontSize: "30px",
  fontWeight: 700,
  letterSpacing: "4px",
  textShadow: "0 2px 6px rgba(0,0,0,0.45)",
};

const brandSub: React.CSSProperties = {
  color: "rgba(255,255,255,0.7)",
  fontSize: "18px",
  fontWeight: 700,
  letterSpacing: "1px",
  textShadow: "0 2px 6px rgba(0,0,0,0.45)",
};

const headerLine: React.CSSProperties = {
  position: "absolute",
  top: "72px",
  left: 100,
  width: "85%",
  height: "1px",
  background: "#3ddad7",
  boxShadow: "0 0 12px #3ddad7",
  zIndex: 1,
};

const heroContent: React.CSSProperties = {
  position: "absolute",
  top: "58%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  textAlign: "center",
  zIndex: 3,
};

const heroTagline: React.CSSProperties = {
  color: "white",
  fontWeight: 700,
  fontSize: "18px",
  letterSpacing: "1px",
  marginBottom: "1rem",
  textShadow: "0 2px 8px rgba(0,0,0,0.6)",
};

const heroButton: React.CSSProperties = {
  padding: "12px 24px",
  border: "2px solid #3ddad7",
  color: "white",
  background: "rgba(0,0,0,0.25)",
  borderRadius: "10px",
  cursor: "pointer",
  transition: "0.3s",
  fontWeight: 700,
  boxShadow: "0 0 8px #3ddad7",
};

const leftLogoSvg: React.CSSProperties = {
  width: "68px",
  height: "68px",
  filter: "drop-shadow(0 0 8px #3ddad7)",
};

const iconSvg: React.CSSProperties = {
  width: "24px",
  height: "24px",
  filter: "drop-shadow(0 0 6px #3ddad7)",
};

const iconButton: React.CSSProperties = {
  background: "transparent",
  border: "none",
  padding: 0,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export default App;