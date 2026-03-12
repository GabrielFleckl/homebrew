import { NumberTicker } from "@/components/ui/number-ticker";

function Enjoy() {
  return (
    <>
      <section className="px-6 py-12 md:py-24 text-white">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h1 className="mb-4 text-xl font-bold md:text-5xl">
              Faça Parte da Nossa Comunidade
            </h1>
            <p className="mx-auto max-w-2xl text-lg md:text-xl">
              Mais que um clube, somos um grupo de apaixonados por cerveja
              artesanal, troca de conhecimento e boas experiências.
            </p>
          </div>

          <div className="grid items-center gap-16 md:grid-cols-2">
            <div>
              <h3 className="mb-6 text-2xl font-semibold text-lime-500">
                Por que participar?
              </h3>

              <ul className="space-y-4 text-zinc-300">
                <li className="flex items-start gap-3">
                  <span className="text-lime-500">✔</span>
                  Troca de experiências com cervejeiros da região
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-lime-500">✔</span>
                  Brassagens coletivas e eventos exclusivos
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-lime-500">✔</span>
                  Aprendizado técnico sobre estilos, lúpulo e fermentação
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-lime-500">✔</span>
                  Networking e crescimento na cultura cervejeira
                </li>
              </ul>
            </div>

            <div className="">
              <div className="rounded-2xl border border-lime-700/30 bg-lime-900/10 p-10 text-left text-white shadow-lg backdrop-blur-sm transition duration-200 ease-in-out hover:shadow-xl hover:shadow-lime-950/40">
                <div className="mb-6 text-center">
                  <h4 className="text-3xl font-bold text-lime-500">
                    <span className="mr-1">+</span>
                    <NumberTicker
                      value={50}
                      startValue={20}
                      className="text-3xl font-bold text-lime-500"
                    />
                  </h4>
                  <p className="text-zinc-400">Membros ativos</p>
                </div>

                <div className="mb-6 text-center">
                  <h4 className="text-3xl font-bold text-lime-500">
                    <span className="mr-1">+</span>
                    <NumberTicker
                      value={35}
                      startValue={0}
                      className="text-3xl font-bold text-lime-500"
                    />
                  </h4>
                  <p className="text-zinc-400">Eventos realizados</p>
                </div>

                <div className="text-center">
                  <h4 className="text-3xl font-bold text-lime-500">
                    <NumberTicker
                      value={5}
                      startValue={0}
                      className="text-3xl font-bold text-lime-500"
                    />{" "}
                    anos
                  </h4>
                  <p className="text-zinc-400">Fortalecendo a cultura cervejeira</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Enjoy;
