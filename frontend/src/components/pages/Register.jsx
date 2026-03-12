import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Alert from "../ui/Alert";
import api from "../../lib/axios/api";

import ArrowLeft from "../icons/ArrowLeftIcon";
import User from "../icons/UserIcon";
import Key from "../icons/KeyIcon";
import EmailIcon from "../icons/EmailIcon";

import lupulusImg from "../../assets/lupu-square.svg";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [formErrors, setFormErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;
    const errors = { username: "", email: "", password: "" };

    const cleanUsername = username.trim();

    if (!cleanUsername) {
      errors.username = "Por favor, informe um nome de usuário.";
      isValid = false;
    } else if (
      !/^(?=(?:.*[a-zA-Z0-9]){3,})[a-zA-Z0-9 ]+$/.test(cleanUsername)
    ) {
      errors.username =
        "Deve ter pelo menos 3 letras ou números (espaços são permitidos).";
      isValid = false;
    }

    if (!email) {
      errors.email = "Informe seu e-mail.";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Digite um e-mail válido.";
      isValid = false;
    }

    if (!password) {
      errors.password = "Crie uma senha para continuar.";
      isValid = false;
    } else if (password.length < 8) {
      errors.password = "A senha deve ter pelo menos 8 caracteres.";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(false);
    setSuccess(false);

    if (!validateForm()) {
      return;
    }

    const normalizedUsername = username.trim().replace(/\s+/g, "_");

    try {
      const response = await api.post("/api/auth/local/register", {
        username: normalizedUsername,
        email,
        password,
      });

      if (response.status === 200) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          navigate("/entrar");
        }, 2000);
      }
    } catch (err) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
      setErrorMessage(
        err.response?.data?.error?.message ||
          "Não foi possível concluir o cadastro. Tente novamente."
      );
    }
  };

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      localStorage.removeItem("jwt");
    }
  }, []);

  return (
    <section className="grid h-[90vh] place-items-center">
      <div className="relative flex h-auto w-full max-w-200 flex-col items-center justify-between overflow-hidden rounded-lg bg-lime-900/25 shadow-sm backdrop-blur-lg md:h-137.5 md:flex-row-reverse">
        <Link className="absolute top-4 left-4" to="/">
          <ArrowLeft />
        </Link>

        <div className="hidden md:block">
          <img src={lupulusImg} alt="Office" className="h-auto w-full" />
        </div>

        <div className="m-auto flex flex-col items-center justify-center gap-4 p-4 md:p-0">
          <div className="mx-auto mb-5 text-center text-white">
            <h1 className="font-regular mb-2 text-2xl text-white">
              Seja bem-vindo 👋
            </h1>
            <p className="px-6 text-lg font-semibold text-white">
              {" "}
              Crie sua conta e faça parte da comunidade.
            </p>
          </div>

          {error && <Alert type="error" message={errorMessage} />}
          {success && (
            <Alert
              type="success"
              message="Conta criada com sucesso! Redirecionando..."
            />
          )}

          <form
            onSubmit={handleSubmit}
            className="m-auto flex flex-col items-center justify-center gap-4"
          >
            <label
              className={`input bg-base-200 flex w-full max-w-xs items-center gap-2 border-2 ${
                formErrors.username ? "input-error" : ""
              }`}
            >
              <User />
              <input
                type="text"
                className="grow bg-transparent"
                placeholder="Seu nome de usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
            {formErrors.username && (
              <p className="max-w-64 text-center text-sm text-red-500">
                {formErrors.username}
              </p>
            )}

            <label
              className={`input bg-base-200 flex w-full max-w-xs items-center gap-2 border-2 ${
                formErrors.email ? "input-error" : ""
              }`}
            >
              <EmailIcon />
              <input
                type="text"
                className="grow bg-transparent"
                placeholder="Seu melhor e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            {formErrors.email && (
              <p className="text-center text-sm text-red-500">
                {formErrors.email}
              </p>
            )}

            <label
              className={`input bg-base-200 flex w-full max-w-xs items-center gap-2 border-2 ${
                formErrors.password ? "input-error" : ""
              }`}
            >
              <Key />
              <input
                type="password"
                className="grow bg-transparent"
                placeholder="Crie uma senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            {formErrors.password && (
              <p className="text-center text-sm text-red-500">
                {formErrors.password}
              </p>
            )}

            <button
              type="submit"
              className="btn btn-ghost btn-block bg-base-300 hover:text-neutral max-w-xs self-center rounded-3xl transition-all hover:border hover:border-white"
            >
              Criar minha conta
            </button>
          </form>
          <Link
            className="w-full rounded-3xl text-center text-sm text-gray-400 hover:underline"
            to="/entrar"
          >
            Ja tem conta? Entre aqui!
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Register;
