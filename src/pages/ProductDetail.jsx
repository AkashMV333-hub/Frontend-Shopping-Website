import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        setError("Something went wrong. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    console.log("Adding to cart:", product);
    addToCart(product);
  };

  if (loading) return (
    <div className="p-4 max-w-xl mx-auto animate-pulse">
      <div className="w-full h-64 bg-gray-300 rounded" />
      <div className="h-6 bg-gray-300 mt-4 rounded w-3/4" />
      <div className="h-4 bg-gray-300 mt-2 rounded w-full" />
      <div className="h-4 bg-gray-300 mt-2 rounded w-5/6" />
      <div className="h-6 bg-gray-300 mt-4 rounded w-1/4" />
      <div className="h-10 bg-gray-300 mt-4 rounded w-1/2" />
    </div>
  );
  if (error) return <p className="text-red-600 text-center mt-10">{error}</p>;
  if (!product) return <p className="text-center mt-10">Product not found</p>;

  return (
    <div className="w-100 w-md-calc product-detail-bg">
      <div className="container py-5">
        <div className="product-card mx-auto" style={{ maxWidth: '600px' }}>
          <div className="product-image-container">
            <img
              src={product.image}
              alt={product.title}
              className="product-image"
            />
            <div className="product-badge">New Arrival</div>
          </div>
          <div className="card-body p-4">
            <div className="d-flex justify-content-between align-items-start">
              <h5 className="card-title fw-bold text-gradient">{product.title}</h5>
            </div>
            <p className="card-text text-muted mt-3 mb-4">{product.description}</p>
            
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <p className="text-primary fw-bold mb-0 price-tag">
                  ${product.price}
                  {product.originalPrice && (
                    <span className="original-price ms-2">${product.originalPrice}</span>
                  )}
                </p>
                {product.shipping && (
                  <p className="text-success small mb-0">Free Shipping</p>
                )}
              </div>
              
              <Link to="/cart" className="btn-animate">
                <button
                  onClick={handleAddToCart}
                  className="btn btn-primary add-to-cart-btn"
                >
                  <span className="btn-text">Add to Cart</span>
                  <span className="cart-icon ms-2">🛒</span>
                </button>
              </Link>
            </div>
            
            <div className="product-meta mt-4 pt-3 border-top">
              <div className="d-flex">
                <div className="meta-item me-4">
                  <span className="meta-icon">🔒</span>
                  <span className="meta-text">Secure Checkout</span>
                </div>
                <div className="meta-item">
                  <span className="meta-icon">🔄</span>
                  <span className="meta-text">30-Day Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

