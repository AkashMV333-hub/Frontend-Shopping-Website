import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";

function ProductsList() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError("");
      try {
        const url =
          selectedCategory !== "all"
            ? `https://fakestoreapi.com/products/category/${selectedCategory}`
            : "https://fakestoreapi.com/products";
        const res = await axios.get(url);
        setProducts(res.data);
      } catch (err) {
        setError("Something went wrong while fetching products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await axios.get("https://fakestoreapi.com/products/categories");
      setCategories(res.data);
    };
    fetchCategories();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  return (
    
  <div className="homepage-wrapper">
    {/* Background Video */}
    <div className="background-video-container">
    <video 
      autoPlay 
      loop 
      muted 
      playsInline 
      className="background-video"
      onError={(e) => console.error("Video failed to load", e)}
    >
    <source src="/BackgroundVideo-optimized.webm" type="video/webm"></source>
      Your browser does not support the video tag.
    </video>
      <div className="video-overlay"></div>
    </div>
  
    {/* Content Container */}
    <div className="container py-5 content-overlay">

    {/* Enhanced Header with Gradient Background */}
    <div className="filter mb-5 p-4 rounded-4 shadow-sm" style={{
      border: '1px solid rgba(255,255,255,0.3)',
    }}>
      <h2 className="text-center mb-4 fw-bold display-6" style={{
        background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>
        Discover Premium Products
      </h2>
      
      {/* Enhanced Filter Controls */}
      <div className="row g-3 justify-content-center">
        <div className="col-md-5">
          <div className="input-group input-group-lg shadow-sm">
            <span className="input-group-text bg-white border-end-0">
              <i className="bi bi-funnel text-primary"></i>
            </span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="form-select border-start-0 ps-0"
              style={{
                borderColor: '#dee2e6',
                cursor: 'pointer'
              }}
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat[0].toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="col-md-5">
          <div className="input-group input-group-lg shadow-sm">
            <span className="input-group-text bg-white border-end-0">
              <i className="bi bi-search text-primary"></i>
            </span>
            <input
              type="text"
              placeholder="Search premium products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-control border-start-0 ps-0"
              style={{
                borderColor: '#dee2e6'
              }}
              />
            </div>
          </div>
        </div>
      </div>

    {/* Loading Skeleton with Animation */}
    {loading && (
      <div className="row g-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div className="col-6 col-md-4 col-lg-3" key={i}>
            <div className="card h-100 border-0 shadow-sm overflow-hidden position-relative" 
              style={{
                animation: 'pulse 1.5s ease-in-out infinite',
                borderRadius: '16px'
              }}>
              <div className="placeholder-glow">
                <div className="placeholder bg-light" style={{ height: '200px' }}></div>
                <div className="p-3">
                  <span className="placeholder col-8 bg-light mb-2"></span>
                  <span className="placeholder col-5 bg-light mb-3"></span>
                  <span className="placeholder col-12 bg-light" style={{ height: '38px' }}></span>
                </div>
              </div>
              <div className="position-absolute top-0 start-0 w-100 h-100" style={{
                background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%)',
                animation: 'shimmer 2s infinite'
              }}></div>
            </div>
          </div>
        ))}
      </div>
    )}

    {/* Error State */}
    {error && (
      <div className="alert alert-danger alert-dismissible fade show d-flex align-items-center" role="alert">
        <i className="bi bi-exclamation-triangle-fill me-2"></i>
        <div>{error}</div>
        <button type="button" className="btn-close" onClick={() => setError(null)}></button>
      </div>
    )}

    {/* Product Grid with Hover Effects */}
    <div className="row g-4">
      {filteredProducts.map((product) => (
        <div className="col-6 col-md-4 col-lg-3" key={product.id}>
          <ProductCard product={product}/>
        </div>
      ))}
    </div>

    {/* Empty State */}
    {!loading && !error && filteredProducts.length === 0 && (
      <div className="text-center py-5 my-5">
        <div className="mb-4" style={{ fontSize: '4rem' }}>
          <i className="bi bi-search-heart text-muted"></i>
        </div>
        <h4 className="fw-bold mb-2">No products found</h4>
        <p className="text-muted mb-4">Try adjusting your search or filter criteria</p>
        <button 
          className="btn btn-primary rounded-pill px-4"
          onClick={() => {
            setSearchTerm('');
            setSelectedCategory('all');
          }}>
          Reset Filters
        </button>
      </div>
    )}
   </div>
  </div>
)}

export default ProductsList;
