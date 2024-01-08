import LandingPageNav from "./LandingPageNav";
import { useState, useEffect } from "react";
import "./Header.css";

export default function Header() {
  const [addClass, setAddClass] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAddClass(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <header>
      <LandingPageNav />
      <div id="landing-page-main">
        <div id="landing-page-main-left">
          <h1>CREATE YOUR RECIPE</h1>
          <h1>SAVE IT</h1>
          <h1>USE LATER</h1>
          <button id="create-recipe-btn">CREATE YOUR OWN RECIPE</button>
        </div>

        <div id="landing-page-main-right">
          <h3>WITH</h3>
          <div id="landing-page-title-container">
            <h1>KOOKIS.COM</h1>
            <h1 className={addClass ? "landing-page-title-h1-2" : ""}>
              KOOKIS.COM
            </h1>
            <h1 className={addClass ? "landing-page-title-h1-3" : ""}>
              KOOKIS.COM
            </h1>
            <h1 className={addClass ? "landing-page-title-ch1-4" : ""}>
              KOOKIS.COM
            </h1>
            <h1 className={addClass ? "landing-page-title-h1-5" : ""}>
              KOOKIS.COM
            </h1>
          </div>

          <p>Keep Your Favorite Recipes Organized!</p>
          <button>Read more +</button>
        </div>
      </div>
    </header>
  );
}
