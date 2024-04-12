import { FormEvent, useEffect, useState } from "react";
import "./App.css";
import { createRoot } from "react-dom/client";

interface MatomoTracker {
  push: (...args: any[]) => void;
}

// Initialize _mtm as a global variable with the correct type
declare global {
  interface Window {
    _paq?: MatomoTracker[];
  }
}

function App() {
  const [visitId, setVisitId] = useState("");

  // Add Matomo tracker
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

    // get the current visit id
    _paq.push([
      function (this: any) {
        setVisitId(
          this.getCrossDomainLinkingUrlParameter().replace("pk_vid=", "")
        );
      },
    ]);
  }, []);

  // Add a shadow DOM
  useEffect(() => {
    const shadowHost = document.getElementById("shadow-host");

    // check if a shadow DOM is already attached
    if (shadowHost && !shadowHost?.shadowRoot) {
      const shadowRoot = shadowHost.attachShadow({ mode: "open" });
      const reactRoot = createRoot(shadowRoot);

      const button = (
        <button onClick={sendEventFromShadowDOM}>Send shadow DOM event</button>
      );

      reactRoot.render(button);
    }

    function sendEventFromShadowDOM() {
      if (window._paq) {
        window._paq.push([
          "trackEvent",
          "userInteraction",
          "buttonClick",
          "sendtFraShadowDom",
        ]);
      }
    }
  }, []);

  function submitForm(e: FormEvent) {
    e.preventDefault();
    if (window._paq) {
      window._paq.push([
        "trackEvent",
        "userInteraction",
        "buttonClick",
        "sendtInnSkjema",
      ]);
    }
  }

  return (
    <div className="App">
      <h1>Annet domene</h1>
      <p>
        <strong>Domenenavn: </strong>
        {window.location.origin}
      </p>
      <p>
        <strong>Besøks ID:</strong>
        {visitId}
      </p>
      <form className="actions" onSubmit={submitForm}>
        <input placeholder="Fyll ut skjema" required></input>
        <button type="submit">Send inn</button>
      </form>
      <div className="spacer"></div>
      <div id="shadow-host"></div>
      <a href="https://skvisli.github.io/matomo-site1/">
        Gå tilbake til min side
      </a>
    </div>
  );
}

export default App;
