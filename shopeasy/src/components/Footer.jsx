import { NavLink } from "react-router-dom";
import { FaInstagram, FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/products" },
  { name: "Cart", path: "/cart" },
  { name: "Wishlist", path: "/wishlist" },
];

const socialLinks = [
  { icon: <FaInstagram />, href: "#" },
  { icon: <FaFacebookF />, href: "#" },
  { icon: <FaLinkedinIn />, href: "#" },
  { icon: <FaTwitter />, href: "#" },
];

export default function Footer() {
  const linkClass = ({ isActive }) => 
    `transition ${isActive ? "text-[var(--accent)] font-semibold" : "text-gray-300 hover:text-white"}`;

  return (
    <footer className="bg-[var(--primary)] text-white mt-16">
      <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-4 gap-10">
        {/* BRAND */}
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Shop<span className="text-[var(--accent)]">Easy</span>
          </h2>
          <p className="text-gray-300 mt-4 leading-7">
            Premium products, seamless shopping, fast delivery and trusted experience.
          </p>
        </div>

        {/* LINKS */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-3">
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink to={link.path} className={linkClass} end={link.path === "/"}>
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <div className="space-y-3 text-gray-300">
            <p>📧 support@shopeasy.com</p>
            <p>📞 +91 9876543210</p>
            <p>📍 India</p>
          </div>
        </div>

        {/* SOCIAL */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex gap-4">
            {socialLinks.map((social, index) => (
              <a key={index} href={social.href} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--accent)] transition">
                {social.icon}
              </a>
            ))}
          </div>
          <p className="text-gray-300 mt-5 text-sm leading-6">
            Stay connected for offers, updates and latest launches.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10 text-center py-5 text-sm text-gray-300">
        © 2026 ShopEasy. All Rights Reserved.
      </div>
    </footer>
  );
}