import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";

function UserNavBar() {
  return (
    <>
      <div className="drawer z-50 px-8 py-4">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <div className="navbar m-auto w-full rounded-sm bg-slate-500/10 p-4 text-white shadow-lg backdrop-blur-lg">
            <div className="flex-none lg:hidden">
              <label
                htmlFor="my-drawer-3"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-6 w-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            <div className="flex-1 font-semibold">
              <Link
                className="flex items-center justify-start gap-3 duration-350"
                to="/perfil"
              >
                <img className="hidden w-12 md:block" src={logo} alt="logo" />
                <p className="text-lg font-black text-nowrap duration-350 hover:font-light hover:tracking-widest sm:text-xl">
                  Sinos Homebrew Club
                </p>
              </Link>
            </div>
            <div className="hidden flex-none lg:block">
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-circle btn-ghost"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h7"
                    />
                  </svg>
                </div>
                <ul
                  tabIndex={0}
                  className="menu dropdown-content menu-sm rounded-box z-10 mt-3 w-52 border-2 border-slate-50/20 bg-slate-50/80 p-2 font-bold text-slate-600 shadow-lg backdrop-blur-lg"
                >
                  <li>
                    <Link to="/perfil">Meu perfil</Link>
                  </li>
                  <li>
                    <Link to="/ranking">Ranking</Link>
                  </li>
                  <li>
                    <Link to="/eventos">Eventos</Link>
                  </li>
                  <li>
                    <Link to="/Blog">Blog</Link>
                  </li>
                  <li>
                    <Link
                      target="_blank"
                      to="https://reserva.ink/brewaddicted/products?search_filter=shc"
                    >
                      Loja
                    </Link>
                  </li>

                  <li>
                    <Link to="/" onClick={() => localStorage.removeItem("jwt")}>
                      Sair
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-3"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu min-h-full w-60 bg-slate-950/50 p-4 text-white backdrop-blur-xl">
            <li>
              <Link to="/perfil">Meu perfil</Link>
            </li>
            <li>
              <Link to="/ranking">Ranking</Link>
            </li>
            <li>
              <Link to="/eventos">Eventos</Link>
            </li>
            <li>
              <Link to="/Blog">Blog</Link>
            </li>
            <li>
              <Link
                target="_blank"
                to="https://reserva.ink/brewaddicted/products?search_filter=shc"
              >
                Loja
              </Link>
            </li>

            <li>
              <Link to="/" onClick={() => localStorage.removeItem("jwt")}>
                Sair
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default UserNavBar;
