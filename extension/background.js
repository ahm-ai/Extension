let ctx = {
  client_id: "client_id",
};

chrome.webRequest.onBeforeSendHeaders.addListener(
  async function (details) {
    console.log(details);
    if (!details.url.includes("cloudfront.net")) return;

    for (var i = 0; i < details.requestHeaders.length; ++i) {
      if (details.requestHeaders[i].name === "Authorization") {
        try {
          const response = await fetch(
            `http://localhost:9090/your-endpoint?client=${ctx.client_id}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ v8: true }),
            }
          );

          const data = await response.json();
          console.log("Success:", data);
          details.requestHeaders[i].value = "Bearer " + data.token;
        } catch (error) {
          console.error("Error:", error);
        }

        break;
      }
    }

    return { requestHeaders: details.requestHeaders };
  },
  { urls: ["<all_urls>"] },
  ["blocking", "requestHeaders", "extraHeaders"]
);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("Message received!", request);
  if (request.action === "doSomething") {
    const result = "Some result";

    ctx.client_id = result;

    sendResponse({ result: result });
  }
});
