import React, { FormEvent, useEffect } from "react";
import "./App.css";

interface MatomoTracker {
  push: (...args: any[]) => void;
}

// Initialize _mtm as a global variable with the correct type
declare global {
  interface Window {
    _paq: MatomoTracker[];
  }
}

function App() {
  useEffect(() => {
    var _paq = (window._paq = window._paq || []);
    /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
    _paq.push(["trackPageView"]);
    _paq.push(["enableLinkTracking"]);
    (function () {
      var u = "https://skvisli.matomo.cloud/";
      _paq.push(["setTrackerUrl", u + "matomo.php"]);
      _paq.push(["setSiteId", "1"]);
      var d = document,
        g = d.createElement("script"),
        s = d.getElementsByTagName("script")[0];
      g.async = true;
      g.src = "https://cdn.matomo.cloud/skvisli.matomo.cloud/matomo.js";
      s.parentNode?.insertBefore(g, s);
    })();
  }, []);

  function submitForm(e: FormEvent) {
    e.preventDefault();
    console.log("submitted");
    window._paq.push([
      "trackEvent",
      "Button Click",
      "Click",
      "Triggered by code",
    ]);
  }

  return (
    <div className="App">
      <form onSubmit={submitForm}>
        <input placeholder="Skriv inn noe her" required></input>
        <button type="submit">Send inn</button>
      </form>
    </div>
  );
}

export default App;
