(function () {
  "use strict";

  var storageKey = "letsdiy-theme";
  var themes = ["light", "dark", "reading"];
  var labels = {
    light: "روشن",
    dark: "تاریک",
    reading: "مطالعه"
  };

  function applyTheme(theme) {
    if (themes.indexOf(theme) === -1) {
      theme = "dark";
    }

    document.documentElement.setAttribute("data-theme", theme);

    try {
      localStorage.setItem(storageKey, theme);
    } catch (e) {
      // localStorage may be unavailable in private/restricted browsing modes.
    }

    var buttons = document.querySelectorAll(".theme-switcher button");
    buttons.forEach(function (button) {
      var active = button.getAttribute("data-theme") === theme;
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });
  }

  function getStoredTheme() {
    try {
      var stored = localStorage.getItem(storageKey);
      return themes.indexOf(stored) !== -1 ? stored : "dark";
    } catch (e) {
      return "dark";
    }
  }

  function createSwitcher() {
    var container = document.createElement("div");
    container.className = "theme-switcher";
    container.setAttribute("role", "group");
    container.setAttribute("aria-label", "حالت نمایش");

    themes.forEach(function (theme) {
      var button = document.createElement("button");
      button.type = "button";
      button.setAttribute("data-theme", theme);
      button.setAttribute("aria-label", "حالت " + labels[theme]);
      button.setAttribute("aria-pressed", "false");
      button.textContent = labels[theme];

      button.addEventListener("click", function () {
        applyTheme(theme);
      });

      container.appendChild(button);
    });

    document.body.appendChild(container);
    applyTheme(getStoredTheme());
  }

  document.addEventListener("DOMContentLoaded", createSwitcher);
})();
