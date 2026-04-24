// src/pages/TrackOrder.jsx
import { useParams, Link } from "react-router-dom";
import { FaCheck, FaBoxOpen, FaTruck, FaHome } from "react-icons/fa";

const TrackOrder = () => {
  const { id } = useParams();
  const currentStep = Math.floor(Math.random() * 5);

  const steps = [
    { title: "Confirmed", icon: <FaCheck /> },
    { title: "Packed", icon: <FaBoxOpen /> },
    { title: "Shipped", icon: <FaTruck /> },
    { title: "Out for Delivery", icon: <FaTruck /> },
    { title: "Delivered", icon: <FaHome /> },
  ];

  const randomDays = Math.floor(Math.random() * 5) + 1;
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + randomDays);

  return (
    <div className="min-h-screen bg-[var(--light-bg)] px-6 py-12">
      <div className="max-w-5xl mx-auto bg-white border border-gray-100 rounded-3xl shadow-sm p-8 md:p-10">
        
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.28em] text-[var(--accent)] mb-3">Live Tracking</p>
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--primary)] mb-4">Track Your Order</h1>
          <p className="text-gray-500">
            Order ID: <span className="font-semibold text-[var(--primary)] ml-2">{id}</span>
          </p>
          <p className="text-sm mt-3 text-gray-500">
            Estimated Delivery: <span className="ml-2 font-medium text-[var(--primary)]">{deliveryDate.toDateString()}</span>
          </p>
        </div>

        {/* Stepper */}
        <div className="mb-14 overflow-x-auto">
          <div className="min-w-[700px] flex items-start justify-between relative">
            {steps.map((step, index) => {
              const completed = index < currentStep;
              const active = index === currentStep;

              return (
                <div key={index} className="flex-1 flex flex-col items-center relative">
                  {/* Line */}
                  {index !== steps.length - 1 && (
                    <div className="absolute top-5 left-1/2 w-full h-[2px] bg-gray-200 z-0">
                      <div
                        className={`h-full ${index < currentStep ? "bg-[var(--primary)] w-full" : "w-0"} transition-all duration-500`}
                      />
                    </div>
                  )}

                  {/* Circle */}
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center z-10 text-sm border-2 transition ${
                      completed ? "bg-[var(--primary)] border-[var(--primary)] text-white" : 
                      active ? "border-[var(--accent)] text-[var(--accent)] bg-white" : 
                      "border-gray-300 text-gray-400 bg-white"
                    }`}
                  >
                    {completed ? <FaCheck /> : step.icon}
                  </div>

                  {/* Label */}
                  <p className={`mt-3 text-xs md:text-sm text-center font-medium px-2 ${completed || active ? "text-[var(--primary)]" : "text-gray-400"}`}>
                    {step.title}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Status */}
        <div className="bg-[var(--light-bg)] border border-gray-100 rounded-2xl p-6 text-center mb-8">
          <p className="text-sm text-gray-500 mb-2">Current Status</p>
          <h2 className="text-2xl font-bold text-[var(--primary)]">{steps[currentStep].title}</h2>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link to="/products" className="py-3 rounded-2xl bg-[var(--primary)] text-white text-center hover:bg-black transition">
            Continue Shopping
          </Link>
          <Link to="/" className="py-3 rounded-2xl border border-gray-200 text-[var(--primary)] text-center hover:bg-[var(--light-bg)] transition">
            Home
          </Link>
        </div>

      </div>
    </div>
  );
};

export default TrackOrder;