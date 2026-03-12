import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../ui/Loading";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";

import "react-photo-view/dist/react-photo-view.css";
import { PhotoProvider, PhotoView } from "react-photo-view";

import remarkBreaks from "remark-breaks";

import apiPublic from "../../lib/axios/apiPublic";

import ReactMarkdown from "react-markdown";

import React from "react";
import UserNavBar from "../layout/UserNavBar";

function BlogPost() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { slug } = useParams();

  const token = localStorage.getItem("jwt");

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await apiPublic.get(
          `/api/posts?filters[slug][$eq]=${slug}&populate=*`
        );
        const data = res.data.data[0];
        if (!data) setError("Post não encontrado");
        setPost(data);
      } catch (err) {
        setError("Erro ao carregar post");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) return <Loading />;
  if (error) return <p>{error}</p>;
  if (!post) return <Loading />;

  const { Titulo, Conteudo, Capa } = post.attributes;

  return (
    <main className=" text-white ">
      {token ? <UserNavBar /> : <Navbar />}

      <article className="m-auto my-3 flex min-h-screen max-w-(--breakpoint-xl) flex-col px-8 md:my-10">
        {Capa?.data?.attributes?.url && (
          <div className="flex flex-col items-center justify-center">
            <img
              className="aspect-2/1 w-full rounded-xl object-cover md:aspect-4/1"
              src={Capa.data.attributes.url}
              alt="Capa do post"
            />
          </div>
        )}

        <article className="mt-2 w-full">
          <h1 className="my-4 max-w-prose text-center text-2xl font-semibold tracking-wide text-white capitalize sm:text-3xl md:text-4xl">
            {Titulo}
          </h1>
          <PhotoProvider>
            <ReactMarkdown
              remarkPlugins={[remarkBreaks]}
              components={{
                p: ({ children }) => {
                  const childrenArray = React.Children.toArray(children);

                  const images = childrenArray.filter(
                    (child) => typeof child === "object" && child?.props?.src
                  );

                  // galeria (2+ imagens)
                  if (images.length > 1) {
                    return (
                      <div className="my-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                        {images.map((img, index) => (
                          <PhotoView key={index} src={img.props.src}>
                            <div className="aspect-square overflow-hidden rounded-xl">
                              <img
                                {...img.props}
                                className="h-full w-full cursor-pointer object-cover shadow-md transition duration-300 ease-in-out hover:scale-105 hover:opacity-80"
                                loading="lazy"
                                alt={img.props.alt || "Imagem do post"}
                              />
                            </div>
                          </PhotoView>
                        ))}
                      </div>
                    );
                  }

                  return (
                    <p className="my-4 text-justify text-base leading-7 tracking-normal text-white/90">
                      {children}
                    </p>
                  );
                },

                // imagem única
                img: (props) => (
                  <PhotoView src={props.src}>
                    <img
                      {...props}
                      className="mx-auto my-6 aspect-2/1 w-full cursor-pointer rounded-xl object-cover object-[50%_35%] shadow-lg transition duration-300 ease-in-out hover:scale-101 hover:opacity-80 md:h-[70vh]"
                      loading="lazy"
                      alt={props.alt || "Imagem do post"}
                    />
                  </PhotoView>
                ),
              }}
            >
              {Conteudo}
            </ReactMarkdown>
          </PhotoProvider>
        </article>
      </article>
      <Footer />
    </main>
  );
}

export default BlogPost;
