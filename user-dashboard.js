
document.addEventListener("DOMContentLoaded", () => {

  /* USER INFORMATION */

  let user = null;

  try {
    user = JSON.parse(
      sessionStorage.getItem("findtypeUser") || "null"
    );
  } catch (error) {
    user = null;
  }

  const userName = user?.name || "Researcher";

  document.getElementById("welcomeName")
    .textContent = userName.split(" ")[0];

  document.getElementById("userAvatar")
    .textContent = userName.charAt(0).toUpperCase();


  /* PAGE NAVIGATION */

  const pageTitles = {
    overview: "Dashboard",
    detector: "Blood Group Detector",
    reports: "My Reports",
    sessions: "Sessions"
  };

  const pages = document.querySelectorAll(".page");

  const navItems = document.querySelectorAll(
    ".nav-item"
  );

  const sidebar = document.getElementById(
    "sidebar"
  );

  function navigate(pageId) {

    if (!pageTitles[pageId]) return;

    pages.forEach(page => {

      page.classList.toggle(
        "active",
        page.id === pageId
      );

    });

    navItems.forEach(item => {

      item.classList.toggle(
        "active",
        item.dataset.page === pageId
      );

    });

    document.getElementById("currentPage")
      .textContent = pageTitles[pageId];

    sidebar.classList.remove("open");

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  }

  navItems.forEach(item => {

    item.addEventListener("click", () => {

      navigate(item.dataset.page);

    });

  });

  document.querySelectorAll("[data-go]")
    .forEach(button => {

      button.addEventListener("click", () => {

        navigate(button.dataset.go);

      });

    });


  /* MOBILE MENU */

  document.getElementById("menuBtn")
    .addEventListener("click", () => {

      sidebar.classList.toggle("open");

    });


  /* DEMO DATA */

  const reports = [];

  const activities = [
    {
      title: "Dashboard opened",
      time: new Date().toLocaleString()
    }
  ];


  function updateCounters() {

    document.getElementById("reportCount")
      .textContent = reports.length;

    document.getElementById("sessionCount")
      .textContent = activities.length;

  }


  function addActivity(title) {

    activities.unshift({
      title: title,
      time: new Date().toLocaleString()
    });

    updateCounters();
    renderSessions();

  }


  /* TOAST NOTIFICATION */

  let toastTimer;

  function showToast(text) {

    const toast = document.getElementById(
      "toast"
    );

    toast.textContent = text;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {

      toast.classList.remove("show");

    }, 3500);

  }


  /* FINGERPRINT UPLOAD */

  const dropZone = document.getElementById(
    "dropZone"
  );

  const fileInput = document.getElementById(
    "fingerprintInput"
  );

  const previewContainer = document.getElementById(
    "previewContainer"
  );

  const previewImage = document.getElementById(
    "fingerprintPreview"
  );

  const fileName = document.getElementById(
    "fileName"
  );

  const fileSize = document.getElementById(
    "fileSize"
  );

  const saveRecordBtn = document.getElementById(
    "saveRecordBtn"
  );

  let selectedFile = null;

  let previewUrl = null;


  function openFilePicker() {

    fileInput.click();

  }


  dropZone.addEventListener("click", () => {

    openFilePicker();

  });


  dropZone.addEventListener("keydown", event => {

    if (
      event.key === "Enter" ||
      event.key === " "
    ) {

      event.preventDefault();

      openFilePicker();

    }

  });


  ["dragenter", "dragover"].forEach(type => {

    dropZone.addEventListener(type, event => {

      event.preventDefault();

      dropZone.classList.add("dragging");

    });

  });


  ["dragleave", "drop"].forEach(type => {

    dropZone.addEventListener(type, event => {

      event.preventDefault();

      dropZone.classList.remove("dragging");

    });

  });


  dropZone.addEventListener("drop", event => {

    const file = event.dataTransfer.files[0];

    if (file) {
      selectFile(file);
    }

  });


  fileInput.addEventListener("change", () => {

    const file = fileInput.files[0];

    if (file) {
      selectFile(file);
    }

  });


  function selectFile(file) {

    const allowedTypes = [
      "image/png",
      "image/jpeg",
      "image/webp"
    ];

    if (!allowedTypes.includes(file.type)) {

      showToast(
        "Please upload a PNG, JPG or WEBP image."
      );

      return;

    }

    if (file.size > 5 * 1024 * 1024) {

      showToast(
        "Image size must be below 5 MB."
      );

      return;

    }

    if (previewUrl) {

      URL.revokeObjectURL(previewUrl);

    }

    selectedFile = file;

    previewUrl = URL.createObjectURL(file);

    previewImage.src = previewUrl;

    fileName.textContent = file.name;

    fileSize.textContent =
      (file.size / 1024).toFixed(1) + " KB";

    previewContainer.hidden = false;

    saveRecordBtn.disabled = false;

    showToast(
      "Fingerprint image selected successfully."
    );

  }


  /* REMOVE IMAGE */

  document.getElementById("removeImage")
    .addEventListener("click", () => {

      selectedFile = null;

      fileInput.value = "";

      previewContainer.hidden = true;

      previewImage.removeAttribute("src");

      saveRecordBtn.disabled = true;

      if (previewUrl) {

        URL.revokeObjectURL(previewUrl);

        previewUrl = null;

      }

    });


  /* SAVE DEMO REPORT */

  saveRecordBtn.addEventListener("click", () => {

    if (!selectedFile) return;

    reports.unshift({

      name: selectedFile.name,

      size: (
        selectedFile.size / 1024
      ).toFixed(1) + " KB",

      time: new Date().toLocaleString()

    });

    addActivity(
      "Fingerprint image demo uploaded"
    );

    renderReports();

    showToast(
      "Demo record saved. No blood group was determined."
    );

    navigate("reports");

  });


  /* RENDER REPORTS */

  function renderReports() {

    const container = document.getElementById(
      "reportsList"
    );

    container.replaceChildren();

    if (reports.length === 0) {

      const empty = document.createElement("div");

      empty.className = "empty-state";

      empty.innerHTML = `
        <div>▤</div>
        <h3>No reports yet</h3>
        <p>
          Your fingerprint upload demo records
          will appear here.
        </p>
      `;

      container.appendChild(empty);

      updateCounters();

      return;

    }

    reports.forEach(report => {

      const row = document.createElement("div");

      row.className = "record-row";

      const icon = document.createElement("div");

      icon.className = "record-icon";

      icon.textContent = "▤";

      const details = document.createElement("div");

      details.className = "record-details";

      const title = document.createElement("strong");

      title.textContent = report.name;

      const meta = document.createElement("small");

      meta.textContent =
        report.size + " · " + report.time;

      details.append(title, meta);

      const status = document.createElement("span");

      status.className = "record-status";

      status.textContent = "Demo saved";

      row.append(icon, details, status);

      container.appendChild(row);

    });

    updateCounters();

  }


  /* RENDER SESSION HISTORY */

  function renderSessions() {

    const container = document.getElementById(
      "sessionsList"
    );

    container.replaceChildren();

    activities.forEach(activity => {

      const row = document.createElement("div");

      row.className = "record-row";

      const icon = document.createElement("div");

      icon.className = "record-icon";

      icon.textContent = "◷";

      const details = document.createElement("div");

      details.className = "record-details";

      const title = document.createElement("strong");

      title.textContent = activity.title;

      const time = document.createElement("small");

      time.textContent = activity.time;

      details.append(title, time);

      row.append(icon, details);

      container.appendChild(row);

    });

  }


  /* LOGOUT */

  document.getElementById("logoutBtn")
    .addEventListener("click", () => {

      sessionStorage.removeItem(
        "findtypeLoggedIn"
      );

      window.location.href = "register.html";

    });


  /* INITIALIZE */

  renderReports();

  renderSessions();

  updateCounters();

});

/* FINGERS DASHBOARD LOGOUT */

document.addEventListener("DOMContentLoaded", () => {
  const logoutButton = document.getElementById("logoutBtn");

  if (!logoutButton) {
    console.error("Logout button not found");
    return;
  }

  logoutButton.addEventListener("click", (event) => {
    event.preventDefault();

    // Remove demo session
    sessionStorage.removeItem("findtypeUser");
    sessionStorage.removeItem("findtypeLoggedIn");

    // Return to registration page
    window.location.replace("./register.html");
  });
});
