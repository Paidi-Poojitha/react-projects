// src/pages/Home.jsx
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCategories, getProductsByCategory } from "../api/products";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    fetchCategories();
    fetchFeaturedProducts();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchFeaturedProducts = async () => {
    try {
      const topCategories = ["smartphones", "laptops", "beauty", "fragrances", "furniture", "groceries"];
      let finalProducts = [];

      for (let category of topCategories) {
        const data = await getProductsByCategory(category, 10, 0);
        const sorted = data.products.sort((a, b) => b.rating - a.rating);
        finalProducts.push(sorted[0]);
      }
      setFeaturedProducts(finalProducts);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategory = (slug) => {
    navigate("/products", { state: { selectedCategory: slug } });
  };

  const categoryImages = {
    beauty: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=900",
    fragrances: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=900",
    furniture: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=900",
    groceries: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=900",
    smartphones: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=900",
    laptops: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=900",
  };

  return (
    <div>
      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-[var(--accent)] font-medium text-sm mb-3 tracking-wide">New Collection 2026</p>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-5">Shop Smart.<br />Live Better.</h1>
            <p className="text-gray-300 leading-7 max-w-lg mb-7">Explore premium fashion, gadgets and lifestyle essentials designed for modern living.</p>
            <div className="flex gap-4 flex-wrap mb-8">
              <Link to="/products" className="bg-[var(--accent)] text-black px-6 py-3 rounded-xl font-semibold hover:scale-105 transition">Shop Now</Link>
              <Link to="/wishlist" className="border border-white/20 px-6 py-3 rounded-xl hover:bg-white hover:text-black transition">Wishlist</Link>
            </div>
            <div className="flex gap-8 text-sm">
              <div><h3 className="text-xl font-bold text-[var(--accent)]">10K+</h3><p className="text-gray-400">Customers</p></div>
              <div><h3 className="text-xl font-bold text-[var(--accent)]">500+</h3><p className="text-gray-400">Products</p></div>
              <div><h3 className="text-xl font-bold text-[var(--accent)]">24/7</h3><p className="text-gray-400">Support</p></div>
            </div>
          </div>
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1400&q=80" alt="Ecommerce Shopping" className="rounded-3xl h-[430px] w-full object-cover shadow-2xl" />
            <div className="absolute bottom-5 left-5 bg-white text-black px-4 py-2 rounded-xl shadow-lg">
              <p className="text-xs text-gray-500">Trending Sale</p>
              <h4 className="font-semibold text-sm">Up to 50% Off</h4>
            </div>
          </div>
        </div>
      </section>

      {/* POPULAR CATEGORIES */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-[0.25em] text-[var(--accent)] mb-2">Curated Collections</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--primary)]">Explore Our Popular Categories</h2>
          <p className="text-gray-500 mt-3 text-sm md:text-base max-w-2xl mx-auto leading-7">Discover stylish essentials and premium picks chosen for modern everyday living.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {categories.filter((item) => ["beauty", "fragrances", "furniture", "groceries", "smartphones", "laptops"].includes(item.slug)).map((item) => (
            <div key={item.slug} onClick={() => handleCategory(item.slug)} className="group cursor-pointer bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition duration-300">
              <div className="relative overflow-hidden">
                <img src={categoryImages[item.slug]} alt={item.name} className="h-52 w-full object-cover group-hover:scale-110 transition duration-500" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition"></div>
              </div>
              <div className="p-4 text-center">
                <h3 className="font-semibold text-base capitalize text-[var(--primary)] group-hover:text-[var(--accent)] transition">{item.name}</h3>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <button onClick={() => navigate("/products")} className="bg-[var(--primary)] text-white px-7 py-3 rounded-xl hover:bg-black transition">View All Categories</button>
        </div>
      </section>

      {/* Scrolling Track */}
      <section className="py-10 overflow-hidden bg-[#f8f6f2]">
        <div className="text-center mb-8">
          <p className="text-sm uppercase tracking-[0.25em] text-[var(--accent)]">Why Shop With Us</p>
          <h2 className="text-3xl font-bold text-[var(--primary)] mt-2">Better Shopping Experience</h2>
        </div>
        <div className="ecom-track flex gap-6">
          {[
            { title: "Fast Delivery", text: "Quick shipping to your doorstep", img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=900" },
            { title: "Secure Checkout", text: "Protected & trusted payments", img: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=900" },
            { title: "Premium Products", text: "Top quality picks for you", img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=900" },
            { title: "Easy Returns", text: "Simple hassle free returns", img: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=900" },
            { title: "Happy Customers", text: "Loved by shoppers worldwide", img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900" },
            { title: "Fast Delivery", text: "Quick shipping to your doorstep", img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=900" },
            { title: "Secure Checkout", text: "Protected & trusted payments", img: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=900" },
            { title: "Premium Products", text: "Top quality picks for you", img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=900" },
          ].map((item, index) => (
            <div key={index} className="group min-w-[290px] h-[220px] rounded-3xl overflow-hidden relative shadow-md hover:shadow-2xl transition duration-500 cursor-pointer shrink-0">
              <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
              <div className="absolute inset-0 bg-black/25 group-hover:bg-black/45 transition"></div>
              <div className="absolute bottom-5 left-5 text-white">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-sm opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition duration-500">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <p className="text-sm uppercase tracking-[0.28em] text-[var(--accent)] mb-2">Editor’s Choice</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--primary)]">Featured Products</h2>
          <p className="text-gray-500 mt-3 max-w-2xl mx-auto leading-7">Discover premium essentials, trending picks and customer favorites selected for style, quality and value.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <div key={product.id} className="transition duration-300 hover:-translate-y-2">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        <div className="text-center mt-14">
          <button onClick={() => navigate("/products")} className="px-7 py-3 rounded-xl bg-[var(--primary)] text-white font-medium hover:bg-black transition">Explore All Products</button>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-gradient-to-b from-white to-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-sm uppercase tracking-[0.28em] text-[var(--accent)] mb-2">Trusted Voices</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--primary)]">What Our Customers Say</h2>
            <p className="text-gray-500 mt-3 max-w-2xl mx-auto leading-7">Real experiences from shoppers who trust us for quality products and reliable service.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "Sophia Carter", role: "Verified Buyer", img: "https://randomuser.me/api/portraits/women/44.jpg", text: "Amazing shopping experience. Fast delivery and premium quality products. Highly recommended!" },
              { name: "Daniel Smith", role: "Verified Buyer", img: "https://randomuser.me/api/portraits/men/32.jpg", text: "Best prices I found online. Customer support was quick, helpful and professional." },
              { name: "Emily Johnson", role: "Verified Buyer", img: "https://randomuser.me/api/portraits/women/68.jpg", text: "Loved the clean website design. Smooth checkout and products arrived perfectly packed." },
            ].map((user, index) => (
              <div key={index} className="bg-white rounded-3xl border border-gray-100 p-7 transition duration-300 hover:-translate-y-2 hover:shadow-xl">
                <div className="flex items-center gap-4 mb-5">
                  <img src={user.img} alt={user.name} className="w-14 h-14 rounded-full object-cover" />
                  <div><h3 className="font-semibold text-[var(--primary)]">{user.name}</h3><p className="text-sm text-gray-500">{user.role}</p></div>
                </div>
                <p className="text-yellow-400 text-sm mb-4 tracking-wider">★★★★★</p>
                <p className="text-gray-600 leading-7 text-sm">{user.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;