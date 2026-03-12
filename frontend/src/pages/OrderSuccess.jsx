import { useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-3xl font-bold mb-4">🎉 Payment Successful!</h1>
      <p className="text-lg mb-6">
        Your order has been placed successfully.
      </p>

      <div className="flex gap-4">
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-black text-white rounded"
        >
          Go to Home
        </button>

        <button
          onClick={() => navigate("/orders")}
          className="px-6 py-2 border border-black rounded"
        >
          View My Orders
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;