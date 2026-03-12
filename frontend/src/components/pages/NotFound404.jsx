import { useNavigate } from "react-router-dom";

const NotFound404 = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  // bg-linear-to-br from-[#1A2A19] to-[#131A13]

  return (
    <div className="absolute bottom-0 left-0 min-h-screen w-screen overflow-hidden bg-[url('./assets/404-mobile.svg')] bg-cover bg-fixed bg-center bg-no-repeat lg:bg-[url('./assets/404.svg')] lg:p-10">
      <div className="m-auto mt-44 flex w-3/4 flex-col items-center justify-center rounded-xl bg-[#1A2A19] p-10 text-center text-white lg:h-[90vh] lg:w-full lg:items-start lg:bg-transparent lg:pl-24 lg:text-left">
        <h1 className="mb-8 text-3xl leading-normal lg:text-6xl">
          Vá para casa,
          <br /> você esta{" "}
          <span className="font-semibold text-[#3dc434]">bêbado!</span>
        </h1>

        <button
          onClick={handleGoBack}
          className="btn h-[3em] w-full max-w-80 rounded-full border-none bg-[#131A13] text-xl text-white hover:bg-[#131A13ca]"
        >
          Voltar para casa
        </button>
      </div>
    </div>
  );
};

export default NotFound404;
