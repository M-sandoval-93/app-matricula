if (
  sessionStorage.theme === "dark" ||
  (!("theme" in sessionStorage) &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  document.documentElement.classList.add("dark");
  sessionStorage.theme = "dark";
} else {
  document.documentElement.classList.remove("dark");
  sessionStorage.theme = "light";
}
