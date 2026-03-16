import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Carousel from "@/components/carousel/Carousel";
import About from "@/components/home/About";
import ForWho from "./ForWho";
import Enjoy from "./Enjoy";
import Gallery from "./Gallery";

function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <section className="flex flex-1 flex-col">
        <Carousel />
        <About />
        <ForWho />
        <Enjoy />
        <Gallery />
      </section>

      <Footer />
    </div>
  );
}

export default Home;
