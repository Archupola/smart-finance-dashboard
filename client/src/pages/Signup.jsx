import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await API.post("/auth/register", {
        name,
        email,
        password,
      });

      localStorage.setItem("user", JSON.stringify(data));

      window.location.href = "/";
    } catch (error) {
      alert(error.response?.data?.message || "Signup Failed");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-600 to-emerald-700 flex justify-center items-center">

      <form
        onSubmit={submitHandler}
        className="bg-white p-10 rounded-2xl shadow-2xl w-[420px]"
      >

        <h1 className="text-4xl font-bold text-center mb-2">
          Create Account 🚀
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Join Smart Finance Dashboard
        </p>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          className="w-full border border-gray-300 rounded-xl p-4 mb-5"
          required
        />

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
          className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold text-lg transition"
        >
          Create Account
        </button>

        <p className="text-center mt-8">
          Already have an account?
          <Link
            to="/login"
            className="text-green-600 font-bold ml-2 hover:underline"
          >
            Login
          </Link>
        </p>

      </form>

    </div>
  );
}

export default Signup;