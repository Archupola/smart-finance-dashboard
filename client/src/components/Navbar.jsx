import { useNavigate } from "react-router-dom";

function Navbar({
  darkMode,
  setDarkMode,
}) {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  
  return (
    <nav
      className={
        darkMode
          ? "sticky top-0 z-50 bg-slate-900 border-b border-slate-700 shadow-lg"
          : "sticky top-0 z-50 bg-white border-b border-gray-200 shadow-lg"
      }
    >
      <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">

        {/* Left */}

        <div>

          <h1
            className={
              darkMode
                ? "text-3xl font-bold text-white"
                : "text-3xl font-bold text-slate-800"
            }
          >
            💰 Smart Finance Dashboard
          </h1>

          <p
            className={
              darkMode
                ? "text-gray-400 text-sm"
                : "text-gray-500 text-sm"
            }
          >
            Track • Analyze • Grow
          </p>

        </div>

        {/* Right */}

        <div className="flex items-center gap-4">

          {user && (
            <div
              className={
                darkMode
                  ? "bg-slate-800 px-4 py-2 rounded-xl"
                  : "bg-gray-100 px-4 py-2 rounded-xl"
              }
            >
              <p
                className={
                  darkMode
                    ? "text-gray-300 text-sm"
                    : "text-gray-500 text-sm"
                }
              >
                Welcome
              </p>

              <p
                className={
                  darkMode
                    ? "text-white font-semibold"
                    : "text-black font-semibold"
                }
              >
                {user.user?.name}
              </p>
            </div>
          )}

          <button
            onClick={() =>
              setDarkMode(!darkMode)
            }
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl transition duration-300"
          >
            {darkMode
              ? "☀ Light"
              : "🌙 Dark"}
          </button>

          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl transition duration-300"
          >
            Logout
          </button>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;