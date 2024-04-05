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

    // Matomo tracker has already been set up
    if (_paq.length) return;

    /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
    _paq.push([
      "setDomains",
      [
        "*.skvisli.github.io",
        "*.matomo-site2-aa9e74583c58.herokuapp.com",
        "*.skvisli.github.io/matomo-site1",
      ],
    ]);
    _paq.push(["enableCrossDomainLinking"]);
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
    window._paq.push([
      "trackEvent",
      "userInteraction",
      "buttonClick",
      "sendtInnSkjema",
    ]);
  }

  return (
    <div className="App">
      <form onSubmit={submitForm}>
        <input placeholder="Skriv inn noe her" required></input>
        <button type="submit">Send inn</button>
      </form>
      <a href="https://skvisli.github.io/matomo-site1/">
        Gå tilbake til side 1
      </a>
    </div>
  );
}

export default App;
