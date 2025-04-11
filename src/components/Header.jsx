import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Header = () => {
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky-top" style={{
      backdropFilter: 'blur(10px)',
      backgroundColor: 'rgba(0, 0, 0)',
      boxShadow: '0 2px 30px rgba(0, 0, 0, 0.08)',
      borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
      zIndex: 1030
    }}>
      <div className="container">
        <div className="d-flex justify-content-between align-items-center py-3">
          {/* Logo with Animation */}
          <Link 
            to="/" 
            className="d-flex align-items-center text-decoration-none"
            style={{
              transition: 'all 0.3s ease'
            }}
          >
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '12px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}>
              <span className="fs-4 text-white">🛍️</span>
            </div>
            <span className="fs-3 fw-bold" style={{
              background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.5px'
            }}>
              ShopEase
            </span>
          </Link>
    
          {/* Navigation with Hover Effects */}
          <nav className="d-flex align-items-center gap-4">
            <Link 
              to="/home" 
              className="position-relative text-decoration-none text-dark fw-medium"
              style={{
                padding: '8px 0',
                transition: 'all 0.3s ease'
              }}
            >
              <span className="d-flex align-items-center gap-2" style={{color: "white"}}>
                <i className="bi bi-house" style={{ fontSize: '1.1rem' }}></i>
                Home
              </span>
              <span className="position-absolute bottom-0 start-0 w-100 bg-primary"
                style={{
                  height: '2px',
                  transform: 'scaleX(0)',
                  transformOrigin: 'right',
                  transition: 'transform 0.3s ease',
                }}></span>
              <style jsx>{`
                a:hover span:last-child {
                  transform: scaleX(1);
                  transform-origin: left;
                }
                a:hover {
                  color: #667eea !important;
                }
              `}</style>
            </Link>
    
            <Link 
              to="/cart" 
              className="position-relative text-decoration-none text-dark fw-medium"
              style={{
                padding: '8px 0',
                transition: 'all 0.3s ease'
              }}
            >
              <span className="d-flex align-items-center gap-2 position-relative" style={{color: "white"}}>
                <i className="bi bi-cart3" style={{ fontSize: '1.1rem' }}></i>
                Cart
                {cartCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill d-flex align-items-center justify-content-center"
                    style={{
                      background: 'linear-gradient(135deg, #ff6b6b 0%, #ff8e8e 100%)',
                      minWidth: '22px',
                      height: '22px',
                      fontSize: '0.65rem',
                      padding: '0 6px',
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                      animation: 'pulse 1.5s infinite'
                    }}>
                    {cartCount}
                  </span>
                )}
              </span>
              <span className="position-absolute bottom-0 start-0 w-100 bg-primary"
                style={{
                  height: '2px',
                  transform: 'scaleX(0)',
                  transformOrigin: 'right',
                  transition: 'transform 0.3s ease',
                }}></span>
            </Link>
    
            <button
              onClick={handleLogout}
              className="btn btn-link text-decoration-none p-0 d-flex align-items-center gap-2"
              style={{
                color: '#ff6b6b',
                transition: 'all 0.3s ease'
              }}
            >
              <i className="bi bi-box-arrow-right" style={{ fontSize: '1.1rem' }}></i>
              <span className="fw-medium">Logout</span>
            </button>
          </nav>
        </div>
      </div>

    </header>
  );
};

export default Header;
