// document.getElementById("myButton").addEventListener("click", function () {
//   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//     chrome.scripting.executeScript({
//       target: { tabId: tabs[0].id },
//       files: ["content.js"],
//     });
//   });
// });

document.getElementById("myButton").addEventListener("click", () => {
  chrome.runtime.sendMessage({ action: "doSomething" }, (response) => {
    console.log(response); // handle the response from the background script
  });
});
