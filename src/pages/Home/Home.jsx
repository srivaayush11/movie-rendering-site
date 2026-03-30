import "./Home.css";
import Navbar from "../../components/Navbar/Navbar";
import hero_banner from "../../assets/hero_banner.jpg";
import hero_title from "../../assets/hero_title.png";
import TitleCards from "../../components/TitleCards/TitleCards";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";
import { logOut } from "../../firebase";
import { useConfirmNavigation } from "../../services/useConfirmNavigation";

function Home() {
  const { showModal, handleConfirm, handleCancel } = useConfirmNavigation({
    shouldBlock: true,
    onConfirm: async () => {
      console.log("Logging out...");
      logOut();
    },
  });

  return (
    <div className="home">
      <ConfirmModal
        open={showModal}
        title="Logout"
        message="Are you sure you want to logout?"
        confirmText="Logout"
        cancelText="Stay"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
      <Navbar />
      <div className="hero">
        <img src={hero_banner} alt="" className="banner-img" />
        <div className="hero-caption">
          <img src={hero_title} alt="" className="caption-img" />
          <p>
            Discovering his ties to a secret ancient order, a young man living
            in modern area embarks on a quest to save the city
          </p>
          <TitleCards />
        </div>
      </div>
      <div className="more-cards">
        <TitleCards
          title={"Blockbuster Movies"}
          category={"BlockBusterMovie"}
        />
        <TitleCards title={"Only on Netflix"} category={"OnlyOnNetflix"} />
        <TitleCards title={"Upcoming"} category={"UpcomingMovie"} />
        <TitleCards title={"Top pics for you"} category={"TopicForYou"} />
      </div>
    </div>
  );
}

export default Home;
