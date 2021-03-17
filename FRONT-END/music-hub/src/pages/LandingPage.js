import "../styles.css";
import "./LandingPage.css";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import ArtistSample from "../components/ArtistSample";
import CoverBrowser from "../components/CoverBrowser";
import CompaniesSlider from "../components/CompaniesSlider";
import PageInfo from "../components/PageInfo";

function LandingPage() {
  return (
    <div className="container">
      <NavBar />

      <section className="cover">
        <h1 className="cover-title">ENCUENTRA MÚSICOS</h1>
        <p className="cover-text">
          “Después del silencio, lo que más se acerca a expresar lo inexpresable
          es la música.”
        </p>
        <p className="cover-text-2">Aldous Huxley</p>
        <CoverBrowser />
      </section>

      <PageInfo />

      <ArtistSample />

      <CompaniesSlider />

      <Footer />
    </div>
  );
}

export default LandingPage;
