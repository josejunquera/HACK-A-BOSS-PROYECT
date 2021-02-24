import "../styles.css";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Contact from "../components/Contact";
import ArtistSample from "../components/ArtistSample";
import VenueEventSample from "../components/VenueEventsSample";
import CoverBrowser from "../components/CoverBrowser";
import CompaniesSlider from "../components/CompaniesSlider";
import PageInfo from "../components/PageInfo";

function LandingPage() {
  return (
    <div className="container">
      <NavBar />
      <section className="cover">
        <h1>DISCOVER ARTISTS</h1>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate
          non veniam quod alias, repellat itaque, fugiat illo nostrum cumque quo
          consequuntur provident deserunt neque asperiores! Lorem ipsum dolor,
          sit amet consectetur adipisicing elit. Cupiditate non veniam quod
          alias, repellat itaque, fugiat illo nostrum cumque quo consequuntur
          provident deserunt neque asperiores!
        </p>

        <CoverBrowser />
      </section>

      <PageInfo />

      <ArtistSample />

      <VenueEventSample />

      <CompaniesSlider />

      <Contact />

      <Footer />
    </div>
  );
}

export default LandingPage;
