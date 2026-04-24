import { useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaLock, FaTruck } from "react-icons/fa";
import { CartContext } from "../context/CartContext";

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useContext(CartContext);
  const [formData, setFormData] = useState({ fullName: "", phone: "", address: "", city: "", zip: "" });
  const [errors, setErrors] = useState({});

  const subtotal = useMemo(() => cartItems.reduce((total, item) => total + item.price * item.quantity, 0), [cartItems]);
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.05;
  const total = subtotal + shipping + tax;

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => { if (!formData[key].trim()) newErrors[key] = "Required"; });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = () => {
    if (!validateForm()) return;
    clearCart();
    navigate("/ordersuccess");
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="max-w-2xl mx-auto bg-white border border-gray-100 rounded-3xl p-12 text-center">
          <p className="text-sm uppercase tracking-[0.25em] text-[var(--accent)] mb-2">Checkout</p>
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--primary)] mb-4">Your Cart is Empty</h1>
          <p className="text-gray-500 max-w-md mx-auto leading-7 mb-8">Add products to cart before proceeding to secure checkout.</p>
          <button onClick={() => navigate("/products")} className="px-7 py-3 rounded-xl bg-[var(--primary)] text-white hover:bg-black transition">Continue Shopping</button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="mb-10 text-center lg:text-left">
        <p className="text-sm uppercase tracking-[0.25em] text-[var(--accent)] mb-2">Secure Checkout</p>
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--primary)] flex items-center justify-center lg:justify-start gap-3">
          <span className="w-10 h-10 rounded-xl bg-[var(--primary)] text-white flex items-center justify-center text-sm"><FaLock /></span>
          Checkout
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto items-start">
        {/* SHIPPING FORM */}
        <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-[var(--primary)] mb-6">Shipping Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField name="fullName" label="Full Name" value={formData.fullName} onChange={handleChange} error={errors.fullName} />
            <InputField name="phone" label="Phone" value={formData.phone} onChange={handleChange} error={errors.phone} />
            <InputField name="city" label="City" value={formData.city} onChange={handleChange} error={errors.city} />
            <InputField name="zip" label="ZIP" value={formData.zip} onChange={handleChange} error={errors.zip} />
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-[var(--primary)] block mb-2">Address</label>
              <textarea rows="3" name="address" value={formData.address} onChange={handleChange} className="w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-[var(--accent)] resize-none" />
              {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
            </div>
          </div>
        </div>

        {/* ORDER SUMMARY */}
        <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-[var(--primary)] mb-6">Order Summary</h2>
          <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2">
            {cartItems.map((item) => (
              <div key={item.id} className="flex gap-3 pb-4 border-b border-gray-100">
                <img src={item.thumbnail} alt={item.title} className="w-16 h-16 rounded-xl object-cover bg-gray-50" />
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-[var(--primary)] line-clamp-1">{item.title}</h3>
                  <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                </div>
                <p className="text-sm font-semibold text-[var(--primary)]">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
          <div className="space-y-3 text-sm text-gray-600">
            <Row label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
            <Row label="Shipping" value={shipping === 0 ? "Free" : `$${shipping}`} />
            <Row label="Tax (5%)" value={`$${tax.toFixed(2)}`} />
            <div className="flex justify-between items-center border-t border-gray-100 pt-4 text-lg font-bold text-[var(--primary)]">
              <span>Total</span> <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <button onClick={handlePlaceOrder} className="w-full mt-6 py-4 rounded-2xl bg-[var(--primary)] text-white hover:bg-black transition flex items-center justify-center gap-2 font-bold">
            <FaTruck /> Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

const InputField = ({ name, label, value, onChange, error }) => (
  <div>
    <label className="text-sm font-medium block mb-2">{label}</label>
    <input type="text" name={name} value={value} onChange={onChange} className={`w-full border rounded-xl p-3 outline-none focus:border-[var(--accent)] ${error ? 'border-red-500' : 'border-gray-200'}`} />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

const Row = ({ label, value }) => (
  <div className="flex justify-between py-1"><span>{label}</span><span className="font-medium text-[var(--primary)]">{value}</span></div>
);

export default Checkout;