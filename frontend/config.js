const API_BASE_URL = (() => {
  if (window.location.hostname === "localhost") {
    return "http://localhost:8000";
  } else if (window.location.hostname === "test.safetycrew.xyz") {
    return "https://test.safetycrew.xyz";
  } else if (window.location.hostname === "safetycrew.xyz") {
    return "https://test.safetycrew.xyz";
  } else {
    return "https://safetycrew.xyz"; // default fallback
  }
})();

window.API_BASE_URL = API_BASE_URL;
