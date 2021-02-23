import "../styles.css";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Contact from "../components/Contact";
import ArtistSample from "../components/ArtistSample";
import VenueEventSample from "../components/VenueEventsSample";
import CoverBrowser from "../components/CoverBrowser";

function LandingPage() {
  return (
    <div className="container">
      <NavBar />
      <section className="cover">
        <h1>DISCOVER ARTISTS</h1>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate
          non veniam quod alias, repellat itaque, fugiat illo nostrum cumque quo
          consequuntur provident deserunt neque asperiores!
        </p>

        <CoverBrowser />
      </section>

      <section className="info">
        <div className="sectionTitle">
          <h1>¿Qué puedes hacer en musicHub?</h1>
        </div>
        <div className="sectionContent">
          <div>
            <p>Músicos y bandas que buscan actuaciones</p>
          </div>
          <div>
            <p>Bandas que buscan músicos</p>
          </div>
          <div>
            <p>Músicos que buscan banda</p>
          </div>
        </div>
      </section>

      <ArtistSample />

      <VenueEventSample />

      <Contact />

      <Footer />
    </div>
  );
}

export default LandingPage;
