import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../ui/Alert";

import api from "../../lib/axios/api";

import ArrowLeft from "../icons/ArrowLeftIcon";
import User from "../icons/UserIcon";
import Key from "../icons/KeyIcon";

import lupulusImg from "../../assets/lupu-square.svg";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(false);
    setSuccess(false);

    try {
      const response = await api.post("/api/auth/local", {
        identifier: username,
        password: password,
      });

      if (response.status === 200) {
        setSuccess(true);
        localStorage.setItem("jwt", response.data.jwt);
        setTimeout(() => {
          setSuccess(false);
          navigate("/perfil");
        }, 1000);
      }
    } catch (err) {
      setError(true);
      setErrorMessage(
        err.response.data.error.message ||
          "Não foi possível entrar. Verifique seus dados e tente novamente."
      );
      console.log(err.response.data.error.message);

      setTimeout(() => {
        setError(false);
      }, 4000);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      localStorage.removeItem("jwt");
    }
  }, []);

  return (
    <section className="grid h-[90vh] place-items-center">
      <div className="relative flex h-auto w-full max-w-200 flex-col items-center justify-between overflow-hidden rounded-lg bg-lime-900/25 shadow-lg backdrop-blur-lg md:h-137.5 md:flex-row">
        <Link className="absolute top-4 left-4" to="/">
          <ArrowLeft dark />
        </Link>

        <Link className="absolute top-4 left-4 md:hidden" to="/">
          <ArrowLeft />
        </Link>

        <div className="hidden md:block">
          <img src={lupulusImg} alt="Office" className="h-auto w-full" />
        </div>

        <div className="m-auto flex flex-col items-center justify-center gap-4 py-5 md:p-0">
          <div className="mx-auto mb-5 text-center text-white">
            <h1 className="font-regular mb-2 px-6 text-2xl text-white">
              Seja bem-vindo 👋
            </h1>
            <p className="text-lg font-semibold text-white">
              {" "}
              Entre com seus dados para continuar.
            </p>
          </div>

          {error && (
            <Alert type="error" message="E-mail ou senha incorretos." />
          )}

          {success && (
            <Alert type="success" message="Login realizado com sucesso!" />
          )}

          <form
            onSubmit={handleSubmit}
            className="m-auto flex flex-col items-center justify-center gap-4"
          >
            <label className="input bg-base-200 flex w-full max-w-xs items-center gap-2 border-2">
              <User />
              <input
                type="text"
                className="grow bg-transparent"
                placeholder="Seu e-mail ou usuário"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
            <label className="input bg-base-200 flex w-full max-w-xs items-center gap-2 border-2">
              <Key />
              <input
                type="password"
                className="grow bg-transparent"
                placeholder="Sua senha"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <button
              type="submit"
              className="btn btn-ghost btn-block bg-base-300 hover:text-neutral max-w-xs self-center rounded-3xl transition-all hover:border hover:border-white"
            >
              Entrar
            </button>
          </form>

          <Link
            className="w-full rounded-3xl text-center text-sm text-gray-400 hover:underline"
            to="/cadastrar"
          >
            Crie sua conta
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Login;
