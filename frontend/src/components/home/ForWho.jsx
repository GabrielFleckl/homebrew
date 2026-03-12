function ForWho() {
  return (
    <>
      <section className="relative flex min-h-screen items-center justify-center rounded bg-linear-to-tr from-[#172317] via-[#131A13] to-[#172317] mask-y-from-90% px-6 py-12 text-white">
        <div className="z-50 mx-auto max-w-6xl text-center">
          <h1 className="mb-4 text-center text-xl font-bold md:text-5xl">
            Pra Quem é o Club?
          </h1>

          <p className="text-md mx-auto mb-8 hidden max-w-4xl px-4 md:block md:px-0 md:text-2xl md:font-semibold">
            O Sinos Homebrew Club é pra qualquer pessoa que curta cerveja
            artesanal e tenha vontade de aprender, trocar experiências e fazer
            parte de uma comunidade apaixonada.
          </p>

          <p className="text-md mx-auto mb-8 block max-w-4xl px-4 md:hidden md:px-0 md:text-2xl md:font-semibold">
            O Sinos Homebrew Club é pra qualquer pessoa que curta cerveja
            artesanal e tenha vontade de aprender.
          </p>

          <div className="grid gap-8 text-left md:grid-cols-2 lg:grid-cols-4">
            <div className="cursor-pointer rounded-2xl border border-lime-700/30 bg-lime-900/10 p-4 text-left text-white shadow-lg backdrop-blur-sm transition duration-200 ease-in-out hover:shadow-xl hover:shadow-lime-950/40 md:py-8">
              <h3 className="mb-0 text-center text-xl font-semibold text-lime-400 md:mb-3 md:text-left">
                🍺 Iniciantes
              </h3>
              <p className="hidden text-zinc-400 md:block">
                Nunca fez cerveja? Perfeito. Aqui você aprende desde o básico,
                sem pressão e com ajuda da galera.
              </p>
            </div>

            <div className="cursor-pointer rounded-2xl border border-lime-700/30 bg-lime-900/10 p-4 text-left text-white shadow-lg backdrop-blur-sm transition duration-200 ease-in-out hover:shadow-xl hover:shadow-lime-950/40 md:py-8">
              <h3 className="mb-0 text-center text-xl font-semibold text-lime-400 md:mb-3 md:text-left">
                🧪 Homebrewers
              </h3>
              <p className="hidden text-zinc-400 md:block">
                Já faz suas receitas? Troque técnicas, teste estilos novos e
                evolua sua cerveja muito mais rápido.
              </p>
            </div>

            <div className="cursor-pointer rounded-2xl border border-lime-700/30 bg-lime-900/10 p-4 text-left text-white shadow-lg backdrop-blur-sm transition duration-200 ease-in-out hover:shadow-xl hover:shadow-lime-950/40 md:py-8">
              <h3 className="mb-0 text-center text-xl font-semibold text-lime-400 md:mb-3 md:text-left">
                🤓 Curiosos
              </h3>
              <p className="hidden text-zinc-400 md:block">
                Quer entender como a cerveja é feita? Vem acompanhar uma
                brassagem e descobrir o processo na prática.
              </p>
            </div>

            <div className="cursor-pointer rounded-2xl border border-lime-700/30 bg-lime-900/10 p-4 text-left text-white shadow-lg backdrop-blur-sm transition duration-200 ease-in-out hover:shadow-xl hover:shadow-lime-950/40 md:py-8">
              <h3 className="mb-0 text-center text-xl font-semibold text-lime-400 md:mb-3 md:text-left">
                🍻 Profissionais
              </h3>
              <p className="hidden text-zinc-400 md:block">
                Aqui também tem profissionais da cerveja: gente que produz,
                estuda e vive o processo, sempre aberta a trocar ideia e
                conhecimento.
              </p>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 bg-[url(src/assets/hop-pattern.png)] mask-y-from-75% bg-cover bg-center bg-no-repeat"></div>
      </section>
    </>
  );
}

export default ForWho;
