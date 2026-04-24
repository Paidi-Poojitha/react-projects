// src/pages/OrderSuccess.jsx
import { Link } from "react-router-dom";
import { FaCheckCircle, FaTruck, FaHome } from "react-icons/fa";

const OrderSuccess = () => {
  const orderId = "ORD" + Math.floor(100000 + Math.random() * 900000);

  return (
    <div className="min-h-screen bg-[var(--light-bg)] flex items-center justify-center px-6 py-12">
      <div className="max-w-2xl w-full bg-white border border-gray-100 rounded-3xl shadow-sm p-8 md:p-10 text-center">
        
        {/* Icon */}
        <div className="w-20 h-20 mx-auto rounded-full bg-green-50 flex items-center justify-center mb-6">
          <FaCheckCircle className="text-5xl text-green-500" />
        </div>

        {/* Tag */}
        <p className="text-xs uppercase tracking-[0.28em] text-[var(--accent)] mb-3">Order Confirmed</p>

        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--primary)] mb-4">Order Placed Successfully</h1>

        {/* Text */}
        <p className="text-gray-500 leading-7 max-w-lg mx-auto mb-8">
          Thank you for shopping with us. Your order has been received and will be packed for delivery soon.
        </p>

        {/* Order ID */}
        <div className="bg-[var(--light-bg)] border border-gray-100 rounded-2xl p-5 mb-8">
          <p className="text-sm text-gray-500 mb-2">Order ID</p>
          <h2 className="text-2xl font-bold tracking-wider text-[var(--primary)]">{orderId}</h2>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link to="/products" className="py-3 rounded-2xl bg-[var(--primary)] text-white hover:bg-black transition">
            Shop More
          </Link>

          <Link to={`/trackorder/${orderId}`} className="py-3 rounded-2xl bg-[var(--accent)] text-white hover:opacity-90 transition flex items-center justify-center gap-2">
            <FaTruck /> Track Order
          </Link>

          <Link to="/" className="py-3 rounded-2xl border border-gray-200 text-[var(--primary)] hover:bg-[var(--light-bg)] transition flex items-center justify-center gap-2">
            <FaHome /> Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;