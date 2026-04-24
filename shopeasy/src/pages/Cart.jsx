import { useContext } from "react";
import { Link } from "react-router-dom";
import { FaTrash, FaMinus, FaPlus, FaShoppingBag } from "react-icons/fa";
import { CartContext } from "../context/CartContext";

const Cart = () => {
  const { cartItems, removeFromCart, increaseQty, decreaseQty, clearCart } = useContext(CartContext);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="max-w-xl mx-auto rounded-3xl border border-[var(--accent)]/15 bg-gradient-to-b from-white to-[var(--accent)]/5 p-10 text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[var(--accent)]/15 flex items-center justify-center">
            <FaShoppingBag className="text-3xl text-[var(--primary)]" />
          </div>
          <h1 className="text-3xl font-bold text-[var(--primary)] mb-3">Your Cart is Empty</h1>
          <p className="text-gray-600 leading-7 mb-8 max-w-md mx-auto">
            Looks like you haven’t added anything yet. Discover premium picks and add your favorites to cart.
          </p>
          <Link to="/products" className="inline-block px-7 py-3 rounded-xl bg-[var(--primary)] text-white font-medium hover:bg-black transition">
            Explore Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[0.25em] text-[var(--accent)] mb-2">Your Basket</p>
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--primary)]">Shopping Cart</h1>
        <p className="text-gray-500 mt-2">Review your items and proceed to checkout.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT SIDE: ITEMS */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="bg-white border border-gray-100 rounded-3xl p-4 md:p-5 flex flex-col md:flex-row gap-5 hover:shadow-lg transition">
              <img src={item.thumbnail} alt={item.title} className="w-full md:w-32 h-32 object-cover rounded-2xl bg-gray-50" />
              
              <div className="flex-1">
                <p className="text-xs uppercase tracking-widest text-[var(--accent)] mb-1">{item.category}</p>
                <h2 className="text-lg font-semibold text-[var(--primary)] line-clamp-2 mb-2">{item.title}</h2>
                <p className="text-xl font-bold text-[var(--primary)] mb-4">${item.price}</p>
                
                <div className="flex items-center gap-3">
                  <button onClick={() => decreaseQty(item.id)} className="w-9 h-9 rounded-xl border border-gray-200 hover:bg-gray-50 flex items-center justify-center transition">
                    <FaMinus size={12} />
                  </button>
                  <span className="w-8 text-center font-semibold text-[var(--primary)]">{item.quantity}</span>
                  <button onClick={() => increaseQty(item.id)} className="w-9 h-9 rounded-xl bg-[var(--primary)] text-white hover:bg-black flex items-center justify-center transition">
                    <FaPlus size={12} />
                  </button>
                </div>
              </div>

              <div className="flex md:flex-col justify-between items-end gap-4">
                <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700">
                  <FaTrash />
                </button>
                <p className="text-lg font-bold text-[var(--primary)]">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT SIDE: SUMMARY */}
        <div className="bg-white border border-gray-100 rounded-3xl p-6 h-fit sticky top-24">
          <p className="text-sm uppercase tracking-[0.25em] text-[var(--accent)] mb-2">Summary</p>
          <h2 className="text-2xl font-bold text-[var(--primary)] mb-6">Order Summary</h2>
          
          <div className="space-y-4 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Total Items</span>
              <span className="font-semibold text-[var(--primary)]">{totalItems}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="font-semibold text-green-600">Free</span>
            </div>
            <div className="border-t border-gray-100 pt-4 flex justify-between text-lg font-bold text-[var(--primary)]">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>

          <Link to="/checkout">
            <button className="w-full mt-6 py-3 rounded-xl bg-[var(--primary)] text-white hover:bg-black transition">
              Proceed to Checkout
            </button>
          </Link>
          <button onClick={clearCart} className="w-full mt-3 py-3 rounded-xl border border-gray-200 text-[var(--primary)] hover:bg-gray-50 transition">
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;