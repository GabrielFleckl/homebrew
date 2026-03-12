import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";

function Navbar() {
  return (
    <div className="z-50">
      <div className="navbar m-auto my-5 w-[95%] rounded-sm bg-slate-500/10 px-2 text-white shadow-lg backdrop-blur-lg lg:px-8">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost mr-4 border-none lg:hidden"
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
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content menu-sm rounded-box z-10 mt-3 w-52 border-2 border-slate-50/20 bg-slate-50/80 p-2 font-bold text-slate-600 shadow-lg backdrop-blur-lg"
            >
              <Link className="p-2" to="/">
                Home
              </Link>
              <Link
                target="_blank"
                className="p-2"
                to="https://reserva.ink/brewaddicted/products?search_filter=shc"
              >
                Loja
              </Link>
              <Link className="p-2" to="/eventos">
                Eventos
              </Link>
              <Link className="p-2" to="/blog">
                Blog
              </Link>

              <div className="flex items-center justify-center gap-2">
                <Link to="/cadastrar" className="btn btn-ghost bg-base-300">
                  Criar conta
                </Link>
                <Link to="/entrar" className="btn btn-ghost bg-base-300">
                  Entrar
                </Link>
              </div>
            </ul>
          </div>

          <Link
            className="flex items-center justify-center gap-3 duration-350"
            to="/"
          >
            <img className="hidden w-12 md:block" src={logo} alt="logo" />
            <p className="text-lg font-black text-nowrap duration-350 hover:font-light hover:tracking-widest sm:text-xl">
              Sinos Homebrew Club
            </p>
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal place-items-center gap-4 px-1 text-[1em] font-semibold">
            <Link className="btn btn-ghost text-lg" to="/">
              Home
            </Link>
            <Link
              target="_blank"
              className="btn btn-ghost text-lg"
              to="https://reserva.ink/brewaddicted/products?search_filter=shc"
            >
              Loja
            </Link>
            <Link className="btn btn-ghost text-lg" to="/eventos">
              Eventos
            </Link>
            <Link className="btn btn-ghost text-lg" to="/blog">
              Blog
            </Link>
          </ul>
        </div>
        <div className="navbar-end hidden gap-5 lg:flex">
          <Link to="/cadastrar" className="btn w-28">
            Criar conta
          </Link>
          <Link to="/entrar" className="btn w-28">
            Entrar
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
