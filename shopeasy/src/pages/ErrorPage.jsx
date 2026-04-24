import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-[var(--bg)]">
      <h1 className="text-6xl font-bold text-[var(--primary)] mb-4">Oops!</h1>
      <p className="text-lg text-gray-600 mb-3">Something went wrong.</p>
      <p className="text-sm text-gray-500 mb-8">
        {error?.statusText || error?.message}
      </p>
      <Link to="/" className="bg-[var(--primary)] text-white px-6 py-3 rounded-xl">
        Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;