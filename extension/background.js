/**
 *
 *  💡 INTERCEPT RESPONSES - TO LOCAL POXY
 */

const filterUrl = "";
const baseUrl = "http://localhost:4000/graphql";

chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    if (details.url.startsWith(filterUrl)) {
      console.log("Original HTTP Request:", details);
      const newUrl = `${baseUrl}/${details.url.replace(filterUrl, "")}`;
      return { redirectUrl: newUrl };
    }
  },
  { urls: ["<all_urls>"] },
  ["blocking"]
);

/**
 *
 *  💡 INTERCEPT RESPONSES - TO ADD HEADERS;
 */

// let ctx = {
//   client_id: "client_id",
//   access_token: ""
// };

// let token = null;
// fetch(`http://localhost:9090/getToken?client=${ctx.client_id}`, {
//   method: "GET",
//   headers: {
//     "Content-Type": "application/json",
//   },
// })
//   .then((response) => response.json())
//   .then((data) => {
//     if (data?.access_token) {
//       token = "Bearer " + data.access_token;
//     }
//   })
//   .catch((error) => {
//     console.error("Error:", error);
//   });

// chrome.webRequest.onBeforeSendHeaders.addListener(
//   function (details) {
//     if (!details.url.includes("graphql")) return {};

//     const headerIndex = details.requestHeaders.findIndex(
//       (h) => h.name.toLowerCase() === "authorization"
//     );

//     // if (headerIndex > -1 && token) {
//     //   details.requestHeaders[headerIndex].name = "Authorization";
//     //   details.requestHeaders[headerIndex].value = token;
//     // }

//     return { requestHeaders: details.requestHeaders };
//   },
//   { urls: ["<all_urls>"] },
//   ["blocking", "requestHeaders", "extraHeaders"]
// );

/**
 *
 *  💡 Receive messages from content script;
 */

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   console.log("Message received!", request);
//   if (request.action === "doSomething") {
//     const result = "Some result";

//     ctx.client_id = result;

//     sendResponse({ result: result });
//   }
// });
