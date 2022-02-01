import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Pages
import LandingPage from "./Pages/LandingPage";
import NotFound from "./Pages/NotFound/NotFound";
import CreateNft from "./Pages/CreateNft";
import Contact from "./Pages/Contact";
import Portfolio from "./Pages/Portfolio";
import MarketPlace from "./Pages/MarketPlace";
import Explore from "./Components/Explore/Explore";
import Auctions from "./Pages/Auctions";
import NFTById from "./Components/NFTById/NFTById";
import Asset from "./Pages/Asset";
import Artists from "./Pages/Artists";
import Activity from "./Pages/Activity";

// Artiststwo copy of Market place
import Artiststwo from "./Pages/Artiststwo";

//
import About from "./Pages/About";
import UnicusToken from "./Pages/UnicusToken";
import Community from "./Pages/Community";

// components
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import ArrowUp from "./Components/ArrowUp/ArrowUp";
import NFTdetails from "./Pages/NFTdetails";
import Help from "./Pages/Help";
import Login from "./Pages/Login";
import Register from "./Pages/Register";

function App() {
  return (
    <div className="app">
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact component={LandingPage} />
          <Route path="/market-place" component={MarketPlace} />
          <Route path="/explore" component={Explore} />
          <Route path="/auctions" component={Auctions} />
          <Route path="/create-nft" component={CreateNft} />
          <Route path="/nft/:id" component={NFTById} />
          <Route path="/auction/:id" component={NFTById} />
          <Route path="/openToBids/:id" component={NFTById} />
          <Route path="/contact" component={Contact} />
          <Route path="/asset" component={Asset} />
          <Route path="/portfolio" component={Portfolio} />
          <Route path="/artists" component={Artists} />
          {/* artists twoooo */}
          <Route path="/opentobids" component={Artiststwo} />
          {/* ENDDD */}

          <Route path="/help" component={Help} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/contact" component={Contact} />
          <Route path="/activity" component={Activity} />

          <Route path="/nft-details" component={NFTdetails} />
          <Route path="/about" component={About} />
          <Route path="/community" component={Community} />
          <Route path="/token" component={UnicusToken} />
          <Route path="*" component={NotFound} />
        </Switch>
        <ArrowUp />
        <Footer />
      </Router>
    </div>
  );
}
export default App;
