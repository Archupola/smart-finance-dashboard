import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("user", JSON.stringify(data));

      window.location.href = "/";
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 to-indigo-700 flex justify-center items-center">

      <form
        onSubmit={submitHandler}
        className="bg-white p-10 rounded-2xl shadow-2xl w-[420px]"
      >

        <h1 className="text-4xl font-bold text-center mb-2">
          Welcome Back 👋
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Login to continue
        </p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded-xl p-4 mb-5"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          className="w-full border border-gray-300 rounded-xl p-4 mb-6"
          required
        />

        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold text-lg transition"
        >
          Login
        </button>

        <p className="text-center mt-8">
          Don't have an account?
          <Link
            to="/signup"
            className="text-blue-600 font-bold ml-2 hover:underline"
          >
            Create Account
          </Link>
        </p>

      </form>

    </div>
  );
}

export default Login;