import Banner from "../Components/LandingPage/Banner/Banner";
import HowItWorks from "../Components/LandingPage/HowItWorks/HowItWorks";
import NewsLetter from "../Components/LandingPage/NewsLetter/NewsLetter";
import Wallets from "../Components/LandingPage/Wallets/Wallets.js";

const LandingPage = () => {
  return (
    <div>
      <Banner />
      <HowItWorks />
      <Wallets />
      <NewsLetter />
    </div>
  );
};

export default LandingPage;
