import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { FaHeart, FaShoppingBag, FaBars, FaTimes } from "react-icons/fa";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";

const Navbar = () => {
  const { cartItems } = useContext(CartContext);
  const { wishlist } = useContext(WishlistContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const totalCartItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const linkClass = ({ isActive }) => 
    `transition pb-1 ${isActive 
      ? "text-[var(--primary)] font-semibold border-b-2 border-[var(--accent)]" 
      : "text-gray-700 hover:text-[var(--primary)]"}`;

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* LOGO */}
        <NavLink to="/" className="text-4xl font-bold tracking-tight">
          <span className="text-[var(--primary)]">Shop</span>
          <span className="text-[var(--accent)]">Easy</span>
        </NavLink>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-8 text-lg">
          <NavLink to="/" end className={linkClass}>Home</NavLink>
          <NavLink to="/products" className={linkClass}>Shop</NavLink>

          {/* Wishlist Icon */}
          <NavLink to="/wishlist" className={linkClass}>
            <div className="relative">
              <FaHeart size={20} />
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-3 min-w-[18px] h-[18px] px-1 text-[10px] rounded-full bg-[var(--accent)] text-white flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </div>
          </NavLink>

          {/* Cart Icon */}
          <NavLink to="/cart" className={linkClass}>
            <div className="relative">
              <FaShoppingBag size={20} />
              {totalCartItems > 0 && (
                <span className="absolute -top-2 -right-3 min-w-[18px] h-[18px] px-1 text-[10px] rounded-full bg-[var(--primary)] text-white flex items-center justify-center">
                  {totalCartItems}
                </span>
              )}
            </div>
          </NavLink>
        </div>

        {/* MOBILE TOGGLE */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-2xl text-[var(--primary)]">
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t px-6 py-5">
          <div className="flex flex-col gap-5 text-lg">
            <NavLink to="/" end className={linkClass} onClick={() => setMenuOpen(false)}>Home</NavLink>
            <NavLink to="/products" className={linkClass} onClick={() => setMenuOpen(false)}>Shop</NavLink>
            <NavLink to="/wishlist" className={linkClass} onClick={() => setMenuOpen(false)}>
              Wishlist ({wishlist.length})
            </NavLink>
            <NavLink to="/cart" className={linkClass} onClick={() => setMenuOpen(false)}>
              Cart ({totalCartItems})
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;