import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getProducts, getCategories, getProductsByCategory } from "../api/products";
import ProductCard from "../components/ProductCard";

const Products = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter & UI State
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [discount, setDiscount] = useState([]);
  const [maxPrice, setMaxPrice] = useState(0);
  const [priceLimit, setPriceLimit] = useState(0);

  // Pagination State
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 12;

  useEffect(() => {
    if (location.state?.selectedCategory) {
      setCategory(location.state.selectedCategory);
      setPage(1);
    }
  }, [location.state]);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [page, category]);

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const skip = (page - 1) * limit;
      let data = (category === "all") 
        ? await getProducts(limit, skip) 
        : await getProductsByCategory(category, limit, skip);

      setProducts(data.products);
      setTotalPages(Math.ceil(data.total / limit));

      const highest = Math.max(...data.products.map((item) => item.price), 0);
      setPriceLimit(highest);
      setMaxPrice(highest);
      setSelectedBrands([]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategory = (value) => {
    setCategory(value);
    setPage(1);
  };

  const brands = [...new Set(products.map((item) => item.brand).filter(Boolean))];

  // Client-side Filtering
  let filteredProducts = products.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()) &&
    item.price <= maxPrice
  );

  if (selectedBrands.length > 0) {
    filteredProducts = filteredProducts.filter((item) => selectedBrands.includes(item.brand));
  }

  if (discount.length > 0) {
    filteredProducts = filteredProducts.filter((item) =>
      discount.some((value) => item.discountPercentage >= value)
    );
  }

  if (sort === "low-high") filteredProducts.sort((a, b) => a.price - b.price);
  if (sort === "high-low") filteredProducts.sort((a, b) => b.price - a.price);

  const resetFilters = () => {
    setSearch("");
    setCategory("all");
    setSort("");
    setSelectedBrands([]);
    setDiscount([]);
    setPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* LEFT SIDEBAR */}
        <div className="bg-white border border-gray-100 rounded-3xl p-6 h-fit sticky top-24">
          <div className="mb-7 border-b border-gray-100 pb-4">
            <p className="text-xs uppercase tracking-[0.28em] text-[var(--accent)] mb-2">Refine Search</p>
            <h2 className="text-2xl font-bold text-[var(--primary)]">Filters</h2>
          </div>

          {/* Price Range */}
          <div className="mb-7">
            <h3 className="font-semibold text-[var(--primary)] mb-3">Max Price</h3>
            <input
              type="range"
              min="0"
              max={priceLimit}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[var(--accent)] cursor-pointer"
            />
            <p className="text-sm text-gray-500 mt-2">Up to <span className="font-semibold text-[var(--primary)]">${maxPrice}</span></p>
          </div>

          {/* Brand Filter */}
          {brands.length > 0 && (
            <div className="mb-7">
              <h3 className="font-semibold text-[var(--primary)] mb-3">Brands</h3>
              <div className="space-y-3 max-h-52 overflow-y-auto pr-1">
                {brands.map((brand) => (
                  <label key={brand} className="flex items-center gap-3 text-sm text-gray-600 cursor-pointer hover:text-[var(--primary)] transition">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={(e) => e.target.checked 
                        ? setSelectedBrands([...selectedBrands, brand]) 
                        : setSelectedBrands(selectedBrands.filter((item) => item !== brand))}
                      className="accent-[var(--accent)]"
                    />
                    {brand}
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Discount Filter */}
          <div className="mb-8">
            <h3 className="font-semibold text-[var(--primary)] mb-3">Discount</h3>
            <div className="space-y-3">
              {[10, 25, 50].map((value) => (
                <label key={value} className="flex items-center gap-3 text-sm text-gray-600 cursor-pointer hover:text-[var(--primary)] transition">
                  <input
                    type="checkbox"
                    checked={discount.includes(value)}
                    onChange={(e) => e.target.checked 
                      ? setDiscount([...discount, value]) 
                      : setDiscount(discount.filter((item) => item !== value))}
                    className="accent-[var(--accent)]"
                  />
                  {value}% Off or more
                </label>
              ))}
            </div>
          </div>

          <button onClick={resetFilters} className="w-full py-3 rounded-xl bg-[var(--primary)] text-white font-medium hover:bg-black transition">
            Reset Filters
          </button>
        </div>

        {/* RIGHT CONTENT */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {/* Category Select */}
            <div className="relative md:col-span-1">
              <select
                value={category}
                onChange={(e) => handleCategory(e.target.value)}
                className="w-full h-12 px-4 pr-12 rounded-2xl border border-gray-200 bg-white text-[var(--primary)] outline-none appearance-none focus:border-[var(--accent)] focus:ring-2 focus:ring-yellow-100 transition"
              >
                <option value="all">All Categories</option>
                {categories.map((item) => (
                  <option key={item.slug} value={item.slug}>{item.name}</option>
                ))}
              </select>
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-sm">▼</span>
            </div>

            {/* Search Input */}
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-12 px-5 rounded-2xl border border-gray-200 bg-white text-[var(--primary)] placeholder:text-gray-400 outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-yellow-100 transition md:col-span-2"
            />

            {/* Sort Select */}
            <div className="relative md:col-span-1">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="w-full h-12 px-4 pr-12 rounded-2xl border border-gray-200 bg-white text-[var(--primary)] outline-none appearance-none focus:border-[var(--accent)] focus:ring-2 focus:ring-yellow-100 transition"
              >
                <option value="">Sort By</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
              </select>
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-sm">▼</span>
            </div>
          </div>

          {loading ? (
            <p className="text-center py-20 text-gray-500">Loading products...</p>
          ) : (
            <>
              <p className="text-sm text-gray-500 mb-6">
                Showing <span className="font-semibold text-[var(--primary)]">{filteredProducts.length}</span> products
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-7">
                {filteredProducts.map((item) => (
                  <div key={item.id} className="transition duration-300 hover:-translate-y-1">
                    <ProductCard product={item} />
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center items-center gap-2 mt-12 flex-wrap">
                <button
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  className="px-4 h-11 rounded-xl border border-gray-200 bg-white text-[var(--primary)] hover:border-[var(--accent)] transition disabled:opacity-40"
                >
                  Prev
                </button>

                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setPage(index + 1)}
                    className={`w-11 h-11 rounded-xl border transition ${
                      page === index + 1
                        ? "bg-[var(--primary)] text-white border-[var(--primary)]"
                        : "bg-white text-[var(--primary)] border-gray-200 hover:border-[var(--accent)]"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                  className="px-4 h-11 rounded-xl border border-gray-200 bg-white text-[var(--primary)] hover:border-[var(--accent)] transition disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;