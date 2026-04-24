// src/pages/Wishlist.jsx
import { useContext } from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { WishlistContext } from "../context/WishlistContext";
import ProductCard from "../components/ProductCard";

const Wishlist = () => {
  const { wishlist } = useContext(WishlistContext);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Empty Wishlist */}
      {wishlist.length === 0 ? (
        <div className="max-w-xl mx-auto rounded-3xl border border-[var(--accent)]/15 bg-gradient-to-b from-white to-[var(--accent)]/5 p-10 text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[var(--accent)]/15 flex items-center justify-center">
            <FaHeart className="text-3xl text-[var(--primary)]" />
          </div>

          <h1 className="text-3xl font-bold text-[var(--primary)] mb-3">Nothing Saved Yet</h1>
          <p className="text-gray-600 leading-7 mb-8 max-w-md mx-auto">
            Save products you love and shop them anytime. Your favorite picks will appear here.
          </p>

          <Link
            to="/products"
            className="inline-block px-7 py-3 rounded-xl bg-[var(--primary)] text-white font-medium hover:bg-black transition"
          >
            Explore Products
          </Link>
        </div>
      ) : (
        <>
          {/* Heading */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-[var(--accent)] mb-2">Saved Collection</p>
              <h1 className="text-3xl md:text-4xl font-bold text-[var(--primary)]">My Wishlist</h1>
              <p className="text-gray-500 mt-2">
                {wishlist.length} item{wishlist.length > 1 ? "s" : ""} saved for later.
              </p>
            </div>

            <Link
              to="/products"
              className="px-6 py-3 rounded-xl border border-gray-200 text-[var(--primary)] hover:bg-gray-50 transition"
            >
              Continue Shopping
            </Link>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlist.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Wishlist;