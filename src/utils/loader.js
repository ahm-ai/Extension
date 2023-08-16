function loadMfe(app, id, css = false) {
  // Create div with id "interceptor" at the bottom of the screen
  let botDiv = document.getElementById("interceptor");
  if (!botDiv) {
    botDiv = document.createElement("div");
    botDiv.id = "interceptor";
    document.body.appendChild(botDiv);
  }

  const baseUrl = "";

  const jsUrl = `${baseUrl}/index.js`;
  const cssURL = `${baseUrl}/index.css`;

  const loadCss = () => {
    const link = document.createElement("link");
    link.href = cssURL;
    link.rel = "stylesheet";
    document.head.appendChild(link);
  };

  const loadJs = async () => {
    try {
      const response = await fetch(jsUrl);
      let scriptContents = await response.text();

      if (scriptContents.includes("404 page not found")) return;

      const encapsulatedScriptContents = `(function() {
          ${scriptContents}
        })();`;

      const scriptElement = document.createElement("script");
      scriptElement.textContent = encapsulatedScriptContents;
      scriptElement.id = id || "";

      scriptElement.onload = () => {
        scriptElement.remove();
      };

      if (!scriptElement.toString().startsWith("<")) {
        try {
          document.body.appendChild(scriptElement);
        } catch (error) {
          console.error("Script is not valid:", error);
        }
      }
    } catch (error) {
      console.log("ERROR TO LOAD", error);
    }
  };

  loadJs();
  if (css) loadCss();

  let appDiv = document.getElementById(app);
  if (!appDiv) {
    appDiv = document.createElement("div");
    appDiv.id = app;
    document.body.appendChild(appDiv);
  }
}

loadMfe("interceptor", "interceptor", true);
