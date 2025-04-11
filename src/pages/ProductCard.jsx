import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`} className="link-card">
      <div className="card h-100 border-0 shadow-sm overflow-hidden transition-all"
          style={{
            borderRadius: '16px',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            ':hover': {
              transform: 'translateY(-5px)',
              boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
            }
          }}>
          <div className="position-relative overflow-hidden" style={{ paddingTop: '100%' }}>
            <img 
              src={product.image} 
              alt={product.title}
              className="position-absolute top-0 start-0 w-100 h-100 object-fit-contain transition-all p-3 p-md-5"
              style={{
                transition: 'transform 0.5s ease',
                ':hover': {
                  transform: 'scale(1.05)'
                }
              }}
            />
            {product.isNew && (
              <span className="position-absolute top-0 end-0 m-2 badge bg-danger">
                New
              </span>
            )}
          </div>
          <div className="card-body p-3">
            <h5 className="card-title mb-1 fw-bold text-truncate">{product.title}</h5>
            <p className="text-muted small mb-2">{product.category}</p>
            <div className="d-flex flex-column justify-content-center align-items-center">
              <span className="fw-bold text-primary mb-2">${product.price.toFixed(2)}</span>
              <button className="btn btn-sm btn-outline-primary rounded-pill px-3">
                <i className="bi bi-cart-plus"></i> Add To Cart
              </button>
            </div>
          </div>
        </div>
    </Link>
  );
};

export default ProductCard;
