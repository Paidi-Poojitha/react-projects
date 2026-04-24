import { useContext } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart, FaShoppingCart, FaStar } from "react-icons/fa";
import { WishlistContext } from "../context/WishlistContext";
import { CartContext } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { id, title, price, thumbnail, category, rating, discountPercentage } = product;
  const { addToWishlist, removeFromWishlist, isInWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);
  const added = isInWishlist(id);

  return (
    <div className="group bg-white rounded-3xl border border-gray-100 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* IMAGE SECTION */}
      <div className="relative bg-gray-50 overflow-hidden">
        <Link to={`/products/${id}`}>
          <img src={thumbnail} alt={title} className="w-full h-64 object-contain p-5 group-hover:scale-105 transition duration-500" />
        </Link>

        <button 
          onClick={() => added ? removeFromWishlist(id) : addToWishlist(product)}
          className="absolute top-4 right-4 text-lg text-[var(--primary)] hover:scale-110 transition"
        >
          {added ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
        </button>

        <span className="absolute top-4 left-4 bg-[var(--accent)] text-white text-xs px-3 py-1 rounded-full font-medium">
          {Math.round(discountPercentage)}% OFF
        </span>
      </div>

      {/* CONTENT SECTION */}
      <div className="p-5">
        <p className="text-xs uppercase tracking-widest text-[var(--accent)] mb-1">{category}</p>
        <h2 className="text-lg font-semibold text-[var(--primary)] leading-6 line-clamp-2 min-h-[48px]">{title}</h2>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar key={star} className={`text-xs ${star <= Math.round(rating) ? "text-yellow-400" : "text-gray-200"}`} />
          ))}
          <span className="text-sm text-gray-500 ml-1">{rating}</span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mt-4 mb-4">
          <span className="text-2xl font-bold text-[var(--primary)]">${price}</span>
          <span className="text-sm text-green-600 font-medium">Save {Math.round(discountPercentage)}%</span>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Link to={`/products/${id}`} className="text-center py-2.5 rounded-xl border border-gray-200 text-sm font-medium hover:border-[var(--primary)] hover:text-[var(--primary)] transition">
            View Details
          </Link>
          <button 
            onClick={() => addToCart(product)}
            className="py-2.5 rounded-xl bg-[var(--primary)] text-white text-sm font-medium hover:bg-black transition flex items-center justify-center gap-2"
          >
            <FaShoppingCart className="text-xs" /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;