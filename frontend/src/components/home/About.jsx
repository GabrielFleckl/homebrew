import { TestTubeDiagonal, Beer, GraduationCap } from "lucide-react";

function About() {
  return (
    <section className="mx-auto my-12 flex w-full flex-col items-center justify-center gap-4 rounded-sm mask-b-from-99% text-white md:my-24 md:gap-6">
      <h2 className="text-center text-xl font-bold md:text-5xl">
        Sobre o Sinos Homebrew Club
      </h2>

      <p className="text-md mb-8 max-w-4xl px-4 text-center md:px-0 md:text-2xl">
        Com o objetivo de promover integração e evolução técnica entre os
        cervejeiros caseiros do Vale dos Sinos, surge o Sinos Homebrew Club!
      </p>

      <div className="flex w-full flex-col items-center justify-center gap-10 md:flex-row md:gap-50">
        <div className="flex cursor-pointer flex-col items-center justify-center gap-3">
          <div className="group flex size-30 items-center justify-center rounded-2xl border border-lime-700/30 bg-lime-900/40 p-9 text-center text-amber-500 backdrop-blur-sm transition duration-300 ease-out hover:scale-105 hover:border-lime-500/40 hover:shadow-xl hover:shadow-lime-900/40 md:size-37">
            <TestTubeDiagonal className="size-22 text-amber-400 transition duration-300 ease-out group-hover:scale-110 group-hover:text-amber-500" />
          </div>
          <p className="text-2xl font-normal">Encontros técnicos</p>
        </div>
        <div className="flex cursor-pointer flex-col items-center justify-center gap-3">
          <div className="group flex size-30 items-center justify-center rounded-2xl border border-lime-700/30 bg-lime-900/40 p-9 text-center text-amber-500 backdrop-blur-sm transition duration-300 ease-out hover:scale-105 hover:border-lime-500/40 hover:shadow-xl hover:shadow-lime-900/40 md:size-37">
            <Beer className="size-22 text-amber-400 transition duration-300 ease-out group-hover:scale-110 group-hover:text-amber-500" />
          </div>
          <p className="text-2xl font-normal">Brassagem coletiva</p>
        </div>
        <div className="flex cursor-pointer flex-col items-center justify-center gap-3">
          <div className="group flex size-30 items-center justify-center rounded-2xl border border-lime-700/30 bg-lime-900/40 p-9 text-center text-amber-500 backdrop-blur-sm transition duration-300 ease-out hover:scale-105 hover:border-lime-500/40 hover:shadow-xl hover:shadow-lime-900/40 md:size-37">
            <GraduationCap className="size-22 text-amber-400 transition duration-300 ease-out group-hover:scale-110 group-hover:text-amber-500" />
          </div>
          <p className="text-2xl font-normal">Palestras e cursos</p>
        </div>
      </div>
    </section>
  );
}

export default About;
