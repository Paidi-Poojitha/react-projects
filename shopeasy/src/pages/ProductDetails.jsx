// src/pages/ProductDetails.jsx
import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSingleProduct, getProductsByCategory } from "../api/products";
import ProductCard from "../components/ProductCard";
import { FaHeart, FaRegHeart, FaBolt, FaShoppingCart } from "react-icons/fa";
import { WishlistContext } from "../context/WishlistContext";
import { CartContext } from "../context/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [mainImage, setMainImage] = useState("");
  const [loading, setLoading] = useState(true);

  const { addToWishlist, removeFromWishlist, isInWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const data = await getSingleProduct(id);
      setProduct(data);
      setMainImage(data.images?.[0] || data.thumbnail);
      fetchRelatedProducts(data.category, data.id);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedProducts = async (category, currentId) => {
    try {
      const data = await getProductsByCategory(category, 8, 0);
      const filtered = data.products.filter((item) => item.id !== currentId);
      setRelatedProducts(filtered.slice(0, 4));
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return <div className="max-w-7xl mx-auto px-6 py-10">Loading product...</div>;
  if (!product) return <div className="max-w-7xl mx-auto px-6 py-10">Product not found.</div>;

  const added = isInWishlist(product.id);
  const { 
    title, brand, price, discountPercentage, rating, stock, category, 
    description, sku, weight, dimensions, warrantyInformation, 
    shippingInformation, returnPolicy, availabilityStatus, reviews, images 
  } = product;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* TOP */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* LEFT IMAGE */}
        <div>
          <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden">
            <img src={mainImage} alt={title} className="w-full h-[520px] object-cover" />
          </div>

          {images?.length > 1 && (
            <div className="grid grid-cols-4 gap-3 mt-4">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setMainImage(image)}
                  className={`rounded-2xl overflow-hidden border transition ${
                    mainImage === image ? "border-[var(--accent)] ring-2 ring-[var(--accent)]/20" : "border-gray-200 hover:border-gray-400"
                  }`}
                >
                  <img src={image} alt="thumb" className="h-24 w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT CONTENT */}
        <div className="lg:pt-2">
          <p className="text-sm uppercase tracking-[0.24em] text-[var(--accent)] mb-2">{category}</p>
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--primary)] leading-tight mb-3">{title}</h1>
          {brand && <p className="text-gray-500 mb-3">by {brand}</p>}

          <div className="flex items-center gap-3 mb-5">
            <span className="text-yellow-400 text-lg">★★★★★</span>
            <span className="text-sm text-gray-500">{rating} rating</span>
          </div>

          <div className="flex items-end gap-3 mb-2">
            <h2 className="text-4xl font-bold text-[var(--primary)]">${price}</h2>
            <span className="bg-red-50 text-red-500 text-sm px-3 py-1 rounded-full font-medium">
              {Math.round(discountPercentage)}% OFF
            </span>
          </div>

          <p className="text-sm text-green-600 font-medium mb-6">{stock} items available</p>
          <p className="text-gray-600 leading-7 mb-8">{description}</p>

          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            <button onClick={() => addToCart(product)} className="py-3 rounded-xl bg-[var(--primary)] text-white font-medium hover:bg-black transition flex items-center justify-center gap-2">
              <FaShoppingCart /> Add Cart
            </button>
            <button onClick={() => { addToCart(product); navigate("/cart"); }} className="py-3 rounded-xl bg-[var(--accent)] text-black font-medium hover:opacity-90 transition flex items-center justify-center gap-2">
              <FaBolt /> Buy Now
            </button>
            <button onClick={() => added ? removeFromWishlist(product.id) : addToWishlist(product)} className="py-3 rounded-xl border border-gray-200 hover:border-[var(--accent)] hover:bg-gray-50 transition flex items-center justify-center gap-2">
              {added ? <FaHeart className="text-red-500" /> : <FaRegHeart />} {added ? "Saved" : "Wishlist"}
            </button>
          </div>

          <div className="border-t border-gray-100 pt-6 space-y-3 text-sm text-gray-600">
            {sku && <p>SKU: {sku}</p>}
            {weight && <p>Weight: {weight} kg</p>}
            {dimensions && <p>Size: {dimensions.width} × {dimensions.height} × {dimensions.depth}</p>}
            {shippingInformation && <p>Shipping: {shippingInformation}</p>}
            {warrantyInformation && <p>Warranty: {warrantyInformation}</p>}
            {returnPolicy && <p>Return: {returnPolicy}</p>}
            <p>Status: {availabilityStatus}</p>
          </div>
        </div>
      </div>

      {/* REVIEWS */}
      {reviews?.length > 0 && (
        <section className="mt-20">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.25em] text-[var(--accent)] mb-2">Trusted Feedback</p>
            <h2 className="text-3xl font-bold text-[var(--primary)]">Customer Reviews</h2>
            <p className="text-gray-500 mt-3 max-w-2xl mx-auto">Real opinions from customers who purchased this product.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((item, index) => (
              <div key={index} className="bg-white border border-gray-100 rounded-3xl p-6 hover:shadow-xl hover:-translate-y-1 transition duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${item.reviewerName}`} alt={item.reviewerName} className="w-12 h-12 rounded-full bg-gray-100 p-1" />
                    <div>
                      <h3 className="font-semibold text-[var(--primary)]">{item.reviewerName}</h3>
                      <p className="text-xs text-gray-500">Verified Buyer</p>
                    </div>
                  </div>
                  <span className="text-yellow-400 text-sm font-medium">★ {item.rating}</span>
                </div>
                <p className="text-gray-600 leading-7 text-sm">{item.comment}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* RELATED */}
      {relatedProducts.length > 0 && (
        <section className="mt-20">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.25em] text-[var(--accent)] mb-2">You May Also Like</p>
            <h2 className="text-3xl font-bold text-[var(--primary)]">Related Products</h2>
            <p className="text-gray-500 mt-3 max-w-2xl mx-auto">Similar picks selected based on your current choice.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
            {relatedProducts.map((item) => (
              <div key={item.id} className="transition duration-300 hover:-translate-y-2">
                <ProductCard product={item} />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetails;