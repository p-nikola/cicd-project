const API_BASE_URL = (() => {
  console.log("Current hostname:", window.location.hostname); // Debug line
  
  if (window.location.hostname === "localhost") {
    console.log("Using localhost API");
    return "http://localhost:8000";
  } else if (window.location.hostname === "game.local") {
    console.log("Using game.local API");
    return "http://api.local";
  } else if (window.location.hostname === "test.safetycrew.xyz") {
    console.log("Using test.safetycrew.xyz API");
    return "https://test.safetycrew.xyz";
  } else if (window.location.hostname === "safetycrew.xyz") {
    console.log("Using safetycrew.xyz API");
    return "https://test.safetycrew.xyz";
  } else {
    console.log("Using default API, hostname was:", window.location.hostname);
    return "https://safetycrew.xyz"; // default fallback
  }
})();

console.log("Final API_BASE_URL:", API_BASE_URL); // Debug line
window.API_BASE_URL = API_BASE_URL;