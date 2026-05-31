(function () {
  var root = document.documentElement;
  var STORAGE_KEY = "portfolio-theme";
  var themeToggle = document.getElementById("theme-toggle");

  function getStoredTheme() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function setStoredTheme(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {}
  }

  function applyTheme(theme) {
    var isDark = theme === "dark";
    if (isDark) {
      root.setAttribute("data-theme", "dark");
    } else {
      root.removeAttribute("data-theme");
    }
    if (themeToggle) {
      themeToggle.setAttribute("aria-pressed", isDark ? "true" : "false");
      var icon = document.getElementById("theme-toggle-icon");
      if (icon) {
        icon.className = isDark ? "fa-solid fa-sun" : "fa-solid fa-moon";
      }
      themeToggle.setAttribute(
        "aria-label",
        isDark ? "Switch to light mode" : "Switch to dark mode"
      );
    }
  }

  function initTheme() {
    var stored = getStoredTheme();
    if (stored === "dark" || stored === "light") {
      applyTheme(stored);
    } else {
      applyTheme("light");
    }
  }

  initTheme();

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      var next =
        root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      setStoredTheme(next);
      applyTheme(next);
    });
  }

  var HASH_ENGINEER = "software-engineer";
  var HASH_ADVOCATE = "developer-advocate";

  var roleLinks = document.querySelectorAll(".role-btn");
  var panels = {
    engineer: document.getElementById("panel-engineer"),
    advocate: document.getElementById("panel-advocate"),
  };

  function roleFromHash() {
    var h = window.location.hash.replace(/^#/, "");
    if (h === HASH_ENGINEER) return "engineer";
    if (h === HASH_ADVOCATE || h === "developer-relations") return "advocate";
    return null;
  }

  function setRole(role) {
    var isEngineer = role === "engineer";

    roleLinks.forEach(function (link) {
      var linkRole = link.getAttribute("data-role");
      var active = linkRole === role;
      link.classList.toggle("is-active", active);
      if (active) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    });

    if (panels.engineer) {
      panels.engineer.hidden = !isEngineer;
    }
    if (panels.advocate) {
      panels.advocate.hidden = isEngineer;
    }
  }

  function applyRoleFromHash() {
    var raw = window.location.hash.replace(/^#/, "");
    var role = roleFromHash();
    if (role === "engineer" || role === "advocate") {
      setRole(role);
      if (raw === "developer-relations" && history.replaceState) {
        history.replaceState(
          null,
          "",
          window.location.pathname +
            window.location.search +
            "#" +
            HASH_ADVOCATE
        );
      }
      return;
    }
    setRole("engineer");
    if (
      raw &&
      raw !== HASH_ENGINEER &&
      raw !== HASH_ADVOCATE &&
      raw !== "developer-relations" &&
      history.replaceState
    ) {
      history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search + "#" + HASH_ENGINEER
      );
    }
  }

  applyRoleFromHash();

  window.addEventListener("hashchange", function () {
    applyRoleFromHash();
  });

  var videoTabBtns = document.querySelectorAll(".video-tab-btn");
  videoTabBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var tab = btn.getAttribute("data-video-tab");
      videoTabBtns.forEach(function (b) {
        var active = b.getAttribute("data-video-tab") === tab;
        b.classList.toggle("is-active", active);
        b.setAttribute("aria-selected", active ? "true" : "false");
      });
      var longPanel = document.getElementById("video-panel-long");
      var shortPanel = document.getElementById("video-panel-short");
      if (longPanel) longPanel.hidden = tab !== "long";
      if (shortPanel) shortPanel.hidden = tab !== "short";
    });
  });
})();
