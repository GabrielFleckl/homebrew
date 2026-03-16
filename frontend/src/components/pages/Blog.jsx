import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import useBlogPosts from "../../hooks/useBlogPosts";
import Loading from "../ui/Loading";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import UserNavBar from "../layout/UserNavBar";
import { removeMarkdownImages } from "@/lib/utils";

import { getStrapiUrl } from "@/lib/utils";

function Blog() {
  const token = localStorage.getItem("jwt");

  const { error, loading, post, refetch, pagination } = useBlogPosts();

  const mainPost = post && post.length > 0 ? post.at(-1) : null; // Ultimo post
  const remainingPosts =
    post && post.length > 1 ? post.slice(0, -1).reverse() : []; // Resto dos posts

  return (
    <main className="text-white">
      {token ? <UserNavBar /> : <Navbar />}

      <div className="m-auto min-h-screen max-w-(--breakpoint-2xl) px-8">
        <div className="mb-10">
          <h1 className="mt-10 mb-2 text-center text-xl font-bold tracking-tight text-white md:text-4xl">
            Sinos Homebrew Blog
          </h1>
          <p className="text-center text-sm text-emerald-100/50 md:text-base">
            Ultimas noticias e atualizações do nosso Club.
          </p>
        </div>
        <section>
          {/* Main Card Post */}
          {mainPost ? (
            <a
              href={`/post/${mainPost.attributes.slug}`}
              className="mx-auto mb-6 flex max-w-(--breakpoint-2xl) cursor-pointer flex-col items-center gap-6 rounded-sm bg-[#21331f]/50 p-4 text-white duration-200 hover:shadow-2xl md:flex-row"
            >
              <figure className="w-full md:w-1/2">
                <img
                  className="aspect-video h-auto w-full rounded-sm object-cover"
                  src={getStrapiUrl(
                    mainPost.attributes.Capa.data.attributes.url
                  )}
                  alt="Capa do post"
                />
              </figure>
              <aside className="flex w-full flex-col justify-center gap-3 px-2 md:w-1/2 md:px-4">
                <span className="badge rounded-sm border-0 bg-emerald-900 p-4 font-semibold tracking-wide text-white capitalize">
                  Último post
                </span>
                <span className="text-sm text-emerald-100/50">
                  {format(
                    new Date(mainPost.attributes.createdAt),
                    "dd/MM/yyyy",
                    {
                      locale: ptBR,
                    }
                  )}
                </span>
                <h1 className="max-w-prose text-xl font-semibold tracking-wide capitalize sm:text-2xl md:text-4xl">
                  {mainPost.attributes.Titulo}
                </h1>
                <p className="line-clamp-5 max-w-prose text-base leading-6 text-white/80 sm:text-lg md:text-xl">
                  {removeMarkdownImages(mainPost.attributes.Conteudo)}
                </p>
              </aside>
            </a>
          ) : (
            <div className="flex min-h-screen items-center justify-center">
              <span className="text-2xl font-semibold text-white">
                Ops, nenhum post encontrado 😢
              </span>
            </div>
          )}
        </section>
        <section className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Card posts */}
          {loading ? (
            <Loading />
          ) : (
            <>
              {remainingPosts.map((posts) => (
                <a
                  href={`/post/${posts.attributes.slug}`}
                  key={posts.id}
                  className="flex cursor-pointer flex-col gap-4 rounded-sm bg-[#21331f]/50 p-5 text-white shadow-sm duration-200 hover:shadow-2xl"
                >
                  <figure>
                    <img
                      className="aspect-video h-auto w-full rounded-sm object-cover"
                      src={getStrapiUrl(
                        posts.attributes.Capa.data.attributes.url
                      )}
                      alt="capa do post"
                    />
                  </figure>
                  <div className="flex flex-col justify-between gap-2">
                    <span className="text-sm text-emerald-100/50">
                      {format(
                        new Date(posts.attributes.createdAt),
                        "dd/MM/yyyy",
                        { locale: ptBR }
                      )}
                    </span>
                    <h2 className="line-clamp-2 max-w-prose text-2xl font-semibold capitalize">
                      {posts.attributes.Titulo}
                    </h2>
                    <p className="line-clamp-2 max-w-prose text-justify text-base leading-6 text-white/80">
                      {posts.attributes.Conteudo}
                    </p>
                  </div>
                  <a
                    href={`/post/${posts.attributes.slug}`}
                    className="btn mt-auto"
                  >
                    Ler mais
                  </a>
                </a>
              ))}
            </>
          )}
        </section>
      </div>
      <Footer />
    </main>
  );
}

export default Blog;
