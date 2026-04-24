import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-[var(--bg)]">
      <h1 className="text-7xl font-bold text-[var(--accent)]">404</h1>

      <p className="text-xl font-semibold mt-4">Page Not Found</p>

      <p className="text-gray-500 mt-2 mb-8">
        The page you are looking for does not exist.
      </p>

      <Link to="/" className="bg-[var(--primary)] text-white px-6 py-3 rounded-xl">
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;