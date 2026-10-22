
document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  // =========================================
  // 1. DATA & DOM
  // =========================================

  const allDestinations =
    typeof destinations !== "undefined" && Array.isArray(destinations)
      ? destinations
      : [];

  const $ = (selector, parent = document) =>
    parent.querySelector(selector);

  const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];

  const el = {
    grid: $("#destinationGrid"),
    empty: $("#emptyState"),
    resultCount: $("#resultCount"),
    destinationInput: $("#destinationInput"),
    typeInput: $("#typeInput"),
    budgetInput: $("#budgetInput"),
    searchForm: $("#searchForm"),
    filterTabs: $("#filterTabs"),
    showAllButton: $("#showAllButton"),
    resetFiltersButton: $("#resetFiltersButton"),
    savedShortcut: $("#savedShortcut"),
    footerSavedButton: $("#footerSavedButton"),
    savedCount: $("#savedCount"),
    toast: $("#toast"),

    dialog: $("#destinationDialog"),
    dialogContent: $("#dialogContent"),
    dialogClose: $("#dialogClose"),
    dialogPlan: $("#dialogPlan"),

    planner: $("#planner"),
    tripForm: $("#tripForm"),
    tripId: $("#tripId"),
    tripName: $("#tripName"),
    tripDestination: $("#tripDestination"),
    tripStartDate: $("#tripStartDate"),
    tripEndDate: $("#tripEndDate"),
    tripBudget: $("#tripBudget"),
    tripNotes: $("#tripNotes"),
    plannerFormTitle: $("#plannerFormTitle"),
    saveTripButton: $("#saveTripButton"),
    cancelTripButton: $("#cancelTripButton"),
    tripFormMessage: $("#tripFormMessage"),
    tripTotalCount: $("#tripTotalCount"),
    tripTotalBudget: $("#tripTotalBudget"),
    tripList: $("#tripList"),
    emptyTripsState: $("#emptyTripsState"),

    newsletterForm: $("#newsletterForm"),
    newsletterMessage: $("#newsletterMessage"),
    mobileMenu: $("#mobileMenu"),
    nav: $("#nav"),

    searchStartDate: $("#searchStartDate"),
    searchEndDate: $("#searchEndDate"),
    searchGuestCount: $("#searchGuestCount")
  };

  // =========================================
  // 2. STATE & LOCAL STORAGE
  // =========================================

  const STORAGE = {
    favorites: "wanderly-saved",
    trips: "wanderly-trips"
  };

  function readStorage(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw === null ? fallback : JSON.parse(raw);
    } catch {
      return fallback;
    }
  }

  function writeStorage(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      showToast("Không thể lưu dữ liệu trong trình duyệt.", "error");
      return false;
    }
  }

  const initialFavorites = readStorage(STORAGE.favorites, []);
  let favorites = new Set(
    Array.isArray(initialFavorites)
      ? initialFavorites.map(Number).filter(Number.isFinite)
      : []
  );

  const initialTrips = readStorage(STORAGE.trips, []);
  let trips = Array.isArray(initialTrips) ? initialTrips : [];

  let activeRegion = "all";
  let activeType = "all";
  let searchText = "";
  let showAll = false;
  let savedOnly = false;
  let selectedDestinationId = null;
  let toastTimer;

  // =========================================
  // 3. HELPERS
  // =========================================

  function escapeHTML(value = "") {
    return String(value).replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    })[char]);
  }

  function formatPrice(value) {
    const number = Number(value);
    return Number.isFinite(number)
      ? `${number.toLocaleString("vi-VN")} đ`
      : "Chưa xác định";
  }

  function getToday() {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, "0");
    const d = String(now.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }

  function formatDate(value) {
    if (!value) return "Chưa chọn";
    const date = new Date(`${value}T00:00:00`);
    return Number.isNaN(date.getTime())
      ? value
      : date.toLocaleDateString("vi-VN");
  }

  function getDestination(id) {
    return allDestinations.find(
      (item) => Number(item.id) === Number(id)
    );
  }

  function getDestinationName(id) {
    return getDestination(id)?.name || "Điểm đến không xác định";
  }

  function showToast(message, type = "success") {
    if (!el.toast) return;

    clearTimeout(toastTimer);
    el.toast.textContent = message;
    el.toast.className = `toast show ${type}`;

    toastTimer = setTimeout(() => {
      el.toast.className = "toast";
    }, 3000);
  }

  function setTripMessage(message = "", type = "") {
    if (!el.tripFormMessage) return;
    el.tripFormMessage.textContent = message;
    el.tripFormMessage.className = `form-message ${type}`;
  }

  function saveFavorites() {
    return writeStorage(STORAGE.favorites, [...favorites]);
  }

  function saveTrips() {
    return writeStorage(STORAGE.trips, trips);
  }

  // =========================================
  // 4. SEARCH OPTIONS
  // =========================================

  function populateDestinationSelect() {
    if (!el.tripDestination) return;

    el.tripDestination.innerHTML = `
      <option value="">-- Chọn điểm đến --</option>
      ${allDestinations.map((item) => `
        <option value="${Number(item.id)}">
          ${escapeHTML(item.name)} — ${escapeHTML(item.location || "")}
        </option>
      `).join("")}
    `;
  }

  function getSearchBudget() {
    const raw = el.budgetInput?.value.trim() || "";
    if (!raw) return Infinity;

    const amount = Number(raw);
    return Number.isFinite(amount) && amount >= 0
      ? amount
      : Infinity;
  }

  // =========================================
  // 5. FILTER DESTINATIONS
  // =========================================

  function getFilteredDestinations() {
    const keyword = searchText.toLocaleLowerCase("vi");
    const maxBudget = getSearchBudget();

    return allDestinations.filter((item) => {
      const matchesRegion =
        activeRegion === "all" || item.region === activeRegion;

      const matchesType =
        activeType === "all" || item.type === activeType;

      const searchable = [
        item.name,
        item.location,
        item.description,
        item.tag,
        item.region,
        item.type
      ].filter(Boolean).join(" ").toLocaleLowerCase("vi");

      const matchesSearch =
        !keyword || searchable.includes(keyword);

      const matchesBudget =
        !Number.isFinite(maxBudget) ||
        Number(item.price) <= maxBudget;

      const matchesFavorite =
        !savedOnly || favorites.has(Number(item.id));

      return (
        matchesRegion &&
        matchesType &&
        matchesSearch &&
        matchesBudget &&
        matchesFavorite
      );
    });
  }

  function updateFilterButtons() {
    $$(".filter-tab", el.filterTabs || document).forEach((button) => {
      const active = button.dataset.region === activeRegion;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
  }

  // =========================================
  // 6. DESTINATION CARDS
  // =========================================

  function createDestinationCard(item) {
    const id = Number(item.id);
    const isFavorite = favorites.has(id);
    const rating = Number(item.rating);
    const safeName = escapeHTML(item.name || "Điểm đến");

    return `
      <article class="destination-card">
        <div class="destination-image-wrap">
          <img
            class="destination-image"
            src="${escapeHTML(item.image || "")}"
            alt="${safeName}"
            loading="lazy"
            onerror="this.onerror=null;this.src='https://placehold.co/800x500/eaf1ff/145dff?text=Wanderly';"
          >

          <span class="image-tag">
            ${escapeHTML(item.tag || "Khám phá")}
          </span>

          <button
            class="favorite-button ${isFavorite ? "saved" : ""}"
            type="button"
            data-action="favorite"
            data-id="${id}"
            aria-label="${isFavorite ? "Bỏ yêu thích" : "Thêm yêu thích"} ${safeName}"
            aria-pressed="${isFavorite}"
          >${isFavorite ? "♥" : "♡"}</button>
        </div>

        <div class="destination-info">
          <div class="destination-topline">
            <h3 class="destination-name">${safeName}</h3>
            <span class="rating">★ ${
              Number.isFinite(rating) ? rating.toFixed(1) : "Mới"
            }</span>
          </div>

          <p class="destination-location">
            <span aria-hidden="true">⌖</span>
            ${escapeHTML(item.location || "")}
          </p>

          <p class="destination-description">
            ${escapeHTML(item.description || "")}
          </p>

          <div class="destination-bottom">
            <div class="trip-length">
              <span>Thời gian gợi ý</span>
              <strong>${escapeHTML(item.duration || "Linh hoạt")}</strong>
            </div>

            <div>
              <span class="price-label">Ngân sách tham khảo</span>
              <strong class="destination-price">
                ${formatPrice(item.price)}
              </strong>
            </div>
          </div>

          <div class="card-actions">
            <button type="button" data-action="details" data-id="${id}">
              Chi tiết
            </button>

            <button
              class="primary"
              type="button"
              data-action="plan"
              data-id="${id}"
            >
              Lên kế hoạch
            </button>
          </div>
        </div>
      </article>
    `;
  }

  function renderDestinations() {
    if (!el.grid) return;

    const filtered = getFilteredDestinations();
    const displayed = showAll ? filtered : filtered.slice(0, 6);

    el.grid.innerHTML = displayed.map(createDestinationCard).join("");

    if (el.empty) {
      el.empty.hidden = filtered.length > 0;
    }

    if (el.resultCount) {
      el.resultCount.innerHTML = `
        Tìm thấy <strong>${filtered.length}</strong> điểm đến
        ${savedOnly ? "trong danh sách yêu thích" : ""}
      `;
    }

    if (el.showAllButton) {
      el.showAllButton.hidden = filtered.length <= 6;
      el.showAllButton.textContent =
        showAll ? "Thu gọn" : "Xem tất cả";
    }

    updateFilterButtons();
    updateFavoriteUI();
  }

  // =========================================
  // 7. FAVORITES
  // =========================================

  function updateFavoriteUI() {
    if (el.savedCount) {
      el.savedCount.textContent = String(favorites.size);
    }

    [el.savedShortcut, el.footerSavedButton].forEach((button) => {
      if (!button) return;
      button.setAttribute("aria-pressed", String(savedOnly));
      button.classList.toggle("active", savedOnly);
    });
  }

  function toggleFavorite(id) {
    const item = getDestination(id);
    if (!item) return;

    const numericId = Number(id);

    if (favorites.has(numericId)) {
      favorites.delete(numericId);
      showToast(`Đã bỏ yêu thích ${item.name}.`);
    } else {
      favorites.add(numericId);
      showToast(`Đã lưu ${item.name} vào yêu thích.`);
    }

    if (saveFavorites()) {
      renderDestinations();

      if (el.dialog?.open && selectedDestinationId === numericId) {
        openDetails(item);
      }
    }
  }

  function toggleFavoriteView() {
    savedOnly = !savedOnly;
    showAll = true;
    renderDestinations();

    $("#destinations")?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

    showToast(
      savedOnly
        ? "Đang hiển thị địa điểm yêu thích."
        : "Đang hiển thị tất cả địa điểm."
    );
  }

  // =========================================
  // 8. DESTINATION DETAILS
  // =========================================

  function openDetails(item) {
    if (!item || !el.dialog || !el.dialogContent) return;

    selectedDestinationId = Number(item.id);
    const favorite = favorites.has(Number(item.id));

    el.dialogContent.innerHTML = `
      <img
        class="dialog-image"
        src="${escapeHTML(item.image || "")}"
        alt="${escapeHTML(item.name)}"
        onerror="this.onerror=null;this.src='https://placehold.co/800x500/eaf1ff/145dff?text=Wanderly';"
      >

      <div class="dialog-body">
        <span class="section-kicker">
          ${escapeHTML(item.tag || "Khám phá")}
        </span>

        <h2>${escapeHTML(item.name)}</h2>

        <p class="destination-location">
          ⌖ ${escapeHTML(item.location || "")}
        </p>

        <div class="dialog-details">
          <span>★ ${Number(item.rating || 0).toFixed(1)} / 5</span>
          <span>${escapeHTML(item.duration || "Linh hoạt")}</span>
          <span>${formatPrice(item.price)}</span>
        </div>

        <p>${escapeHTML(item.description || "Chưa có mô tả.")}</p>

        <div class="divider"></div>

        <div class="dialog-actions">
          <button
            class="button button-outline"
            type="button"
            data-action="dialog-favorite"
            data-id="${Number(item.id)}"
          >
            ${favorite ? "♥ Đã yêu thích" : "♡ Thêm yêu thích"}
          </button>

          <button
            class="button button-primary"
            type="button"
            data-action="dialog-plan"
            data-id="${Number(item.id)}"
          >
            Lên kế hoạch →
          </button>
        </div>
      </div>
    `;

    if (typeof el.dialog.showModal === "function") {
      if (!el.dialog.open) el.dialog.showModal();
    } else {
      el.dialog.setAttribute("open", "");
    }
  }

  function closeDetails() {
    if (!el.dialog) return;

    if (typeof el.dialog.close === "function") {
      if (el.dialog.open) el.dialog.close();
    } else {
      el.dialog.removeAttribute("open");
    }
  }

  // =========================================
  // 9. TRIP FORM
  // =========================================

  function resetTripForm() {
    if (!el.tripForm) return;

    el.tripForm.reset();
    if (el.tripId) el.tripId.value = "";

    if (el.plannerFormTitle) {
      el.plannerFormTitle.textContent = "Tạo chuyến đi mới";
    }

    if (el.saveTripButton) {
      el.saveTripButton.textContent = "LƯU CHUYẾN ĐI";
    }

    if (el.cancelTripButton) {
      el.cancelTripButton.hidden = true;
    }

    setTripMessage("");

    if (el.tripStartDate) {
      el.tripStartDate.min = getToday();
    }

    if (el.tripEndDate) {
      el.tripEndDate.min = getToday();
    }
  }

  function prepareTripPlan(item) {
    if (!item) return;

    closeDetails();
    resetTripForm();

    if (el.tripDestination) {
      el.tripDestination.value = String(item.id);
    }

    if (el.tripName) {
      el.tripName.value = `Khám phá ${item.name}`;
    }

    if (el.tripBudget) {
      el.tripBudget.value = item.price || "";
    }

    // Transfer search dates and guest count to the trip notes.
    const startDate = el.searchStartDate?.value || "";
    const endDate = el.searchEndDate?.value || "";
    const guests = el.searchGuestCount?.value || "2";

    if (startDate && el.tripStartDate) {
      el.tripStartDate.value = startDate;
    }

    if (endDate && el.tripEndDate) {
      el.tripEndDate.value = endDate;
    }

    if (el.tripNotes) {
      const guestNote = `Số khách dự kiến: ${guests}`;
      el.tripNotes.value = guestNote;
    }

    if (el.planner) {
      el.planner.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }

    showToast(`Đã chuẩn bị kế hoạch cho ${item.name}.`);
  }

  function getTripFormData() {
    const name = el.tripName?.value.trim() || "";
    const destinationId = Number(el.tripDestination?.value);
    const startDate = el.tripStartDate?.value || "";
    const endDate = el.tripEndDate?.value || "";
    const budgetText = el.tripBudget?.value.trim() || "";
    const notes = el.tripNotes?.value.trim() || "";

    const destination = getDestination(destinationId);

    if (!name) return { error: "Bạn hãy nhập tên chuyến đi." };

    if (!destination) {
      return { error: "Bạn hãy chọn một điểm đến." };
    }

    if (!startDate || !endDate) {
      return { error: "Bạn hãy chọn ngày đi và ngày về." };
    }

    if (startDate < getToday()) {
      return { error: "Ngày đi không thể nằm trong quá khứ." };
    }

    if (endDate < startDate) {
      return { error: "Ngày về phải bằng hoặc sau ngày đi." };
    }

    const budget = budgetText === ""
      ? Number(destination.price || 0)
      : Number(budgetText);

    if (!Number.isFinite(budget) || budget < 0) {
      return { error: "Ngân sách phải là số không âm hợp lệ." };
    }

    return {
      data: {
        name,
        destinationId,
        startDate,
        endDate,
        budget,
        notes,
        updatedAt: new Date().toISOString()
      }
    };
  }

  function submitTrip(event) {
    event.preventDefault();

    const result = getTripFormData();

    if (result.error) {
      setTripMessage(result.error, "error");
      return;
    }

    const editingId = el.tripId?.value || "";
    const previousTrips = [...trips];

    if (editingId) {
      const index = trips.findIndex(
        (trip) => String(trip.id) === String(editingId)
      );

      if (index < 0) {
        setTripMessage("Không tìm thấy chuyến đi cần chỉnh sửa.", "error");
        return;
      }

      trips[index] = {
        ...trips[index],
        ...result.data
      };

      if (!saveTrips()) {
        trips = previousTrips;
        return;
      }

      renderTrips();
      resetTripForm();
      showToast("Đã cập nhật chuyến đi.");
      return;
    }

    const newTrip = {
      id: (
        window.crypto &&
        typeof window.crypto.randomUUID === "function"
      )
        ? window.crypto.randomUUID()
        : `trip-${Date.now()}`,
      ...result.data,
      createdAt: new Date().toISOString()
    };

    trips.unshift(newTrip);

    if (!saveTrips()) {
      trips = previousTrips;
      return;
    }

    renderTrips();
    resetTripForm();
    showToast("Đã lưu chuyến đi thành công.");
  }

  function editTrip(id) {
    const trip = trips.find(
      (item) => String(item.id) === String(id)
    );

    if (!trip) {
      showToast("Không tìm thấy chuyến đi.", "error");
      return;
    }

    el.tripId.value = trip.id;
    el.tripName.value = trip.name || "";
    el.tripDestination.value = String(trip.destinationId);
    el.tripStartDate.value = trip.startDate || "";
    el.tripEndDate.value = trip.endDate || "";
    el.tripBudget.value = trip.budget ?? "";
    el.tripNotes.value = trip.notes || "";

    if (el.tripStartDate) {
      el.tripStartDate.min = getToday();
    }

    if (el.tripEndDate) {
      el.tripEndDate.min = trip.startDate || getToday();
    }

    if (el.plannerFormTitle) {
      el.plannerFormTitle.textContent = "Chỉnh sửa chuyến đi";
    }

    if (el.saveTripButton) {
      el.saveTripButton.textContent = "CẬP NHẬT CHUYẾN ĐI";
    }

    if (el.cancelTripButton) {
      el.cancelTripButton.hidden = false;
    }

    setTripMessage("Bạn đang chỉnh sửa chuyến đi.");

    el.planner?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }

  function deleteTrip(id) {
    const trip = trips.find(
      (item) => String(item.id) === String(id)
    );

    if (!trip) return;

    if (!window.confirm(`Xóa chuyến đi "${trip.name}"?`)) {
      return;
    }

    const previousTrips = [...trips];

    trips = trips.filter(
      (item) => String(item.id) !== String(id)
    );

    if (!saveTrips()) {
      trips = previousTrips;
      return;
    }

    if (String(el.tripId?.value) === String(id)) {
      resetTripForm();
    }

    renderTrips();
    showToast("Đã xóa chuyến đi.");
  }

  // =========================================
  // 10. RENDER TRIPS
  // =========================================

  function tripDays(start, end) {
    if (!start || !end) return 0;

    const a = new Date(`${start}T00:00:00`);
    const b = new Date(`${end}T00:00:00`);
    const difference = b.getTime() - a.getTime();

    return difference < 0
      ? 0
      : Math.floor(difference / 86400000) + 1;
  }

  function createTripCard(trip) {
    return `
      <article class="trip-item">
        <div class="trip-item-top">
          <div>
            <h4>${escapeHTML(trip.name || "Chuyến đi")}</h4>
            <p>${escapeHTML(getDestinationName(trip.destinationId))}</p>
          </div>
        </div>

        <div class="trip-item-meta">
          <span>📅 ${formatDate(trip.startDate)}</span>
          <span>↗ ${formatDate(trip.endDate)}</span>
          <span>${tripDays(trip.startDate, trip.endDate)} ngày</span>
          <span>${formatPrice(trip.budget)}</span>
        </div>

        ${trip.notes
          ? `<p>${escapeHTML(trip.notes)}</p>`
          : ""}

        <div class="trip-item-actions">
          <button type="button" data-action="edit-trip" data-id="${escapeHTML(trip.id)}">
            Chỉnh sửa
          </button>

          <button class="danger" type="button" data-action="delete-trip" data-id="${escapeHTML(trip.id)}">
            Xóa chuyến đi
          </button>
        </div>
      </article>
    `;
  }

  function renderTrips() {
    if (el.tripList) {
      el.tripList.innerHTML = trips.map(createTripCard).join("");
    }

    if (el.emptyTripsState) {
      el.emptyTripsState.hidden = trips.length > 0;
    }

    if (el.tripTotalCount) {
      el.tripTotalCount.textContent = String(trips.length);
    }

    if (el.tripTotalBudget) {
      const total = trips.reduce((sum, trip) => {
        const value = Number(trip.budget);
        return sum + (Number.isFinite(value) ? value : 0);
      }, 0);

      el.tripTotalBudget.textContent = formatPrice(total);
    }
  }

  // =========================================
  // 11. RESET FILTERS
  // =========================================

  function resetFilters() {
    activeRegion = "all";
    activeType = "all";
    searchText = "";
    showAll = false;
    savedOnly = false;

    if (el.destinationInput) el.destinationInput.value = "";
    if (el.typeInput) el.typeInput.value = "all";
    if (el.budgetInput) el.budgetInput.value = "";

    renderDestinations();
    showToast("Đã đặt lại bộ lọc.");
  }

  // =========================================
  // 12. EVENT DELEGATION
  // =========================================

  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-action]");
    if (!button) return;

    const { action, id } = button.dataset;

    if (action === "favorite") {
      toggleFavorite(id);
      return;
    }

    if (action === "details") {
      openDetails(getDestination(id));
      return;
    }

    if (action === "plan" || action === "dialog-plan") {
      prepareTripPlan(getDestination(id));
      return;
    }

    if (action === "dialog-favorite") {
      toggleFavorite(id);
      return;
    }

    if (action === "edit-trip") {
      editTrip(id);
      return;
    }

    if (action === "delete-trip") {
      deleteTrip(id);
    }
  });

  // =========================================
  // 13. SEARCH & FILTER EVENTS
  // =========================================

  if (el.searchForm) {
    el.searchForm.addEventListener("submit", (event) => {
      event.preventDefault();

      searchText = el.destinationInput?.value.trim() || "";
      activeType = el.typeInput?.value || "all";
      savedOnly = false;
      showAll = true;

      renderDestinations();

      $("#destinations")?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  }

  if (el.destinationInput) {
    el.destinationInput.addEventListener("input", () => {
      searchText = el.destinationInput.value.trim();
      savedOnly = false;
      showAll = false;
      renderDestinations();
    });
  }

  if (el.typeInput) {
    el.typeInput.addEventListener("change", () => {
      activeType = el.typeInput.value || "all";
      savedOnly = false;
      showAll = false;
      renderDestinations();
    });
  }

  if (el.budgetInput) {
    el.budgetInput.addEventListener("input", () => {
      savedOnly = false;
      showAll = false;
      renderDestinations();
    });
  }

  if (el.filterTabs) {
    el.filterTabs.addEventListener("click", (event) => {
      const button = event.target.closest("[data-region]");
      if (!button) return;

      activeRegion = button.dataset.region || "all";
      savedOnly = false;
      showAll = false;
      renderDestinations();
    });
  }

  $$(".category-card").forEach((button) => {
    button.addEventListener("click", () => {
      activeType = button.dataset.type || "all";
      savedOnly = false;
      showAll = false;

      if (el.typeInput) {
        el.typeInput.value = activeType;
      }

      renderDestinations();

      $("#destinations")?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });

  if (el.showAllButton) {
    el.showAllButton.addEventListener("click", () => {
      showAll = !showAll;
      renderDestinations();
    });
  }

  if (el.resetFiltersButton) {
    el.resetFiltersButton.addEventListener("click", resetFilters);
  }

  [el.savedShortcut, el.footerSavedButton].forEach((button) => {
    button?.addEventListener("click", (event) => {
      event.preventDefault();
      toggleFavoriteView();
    });
  });

  // =========================================
  // 14. DIALOG
  // =========================================

  el.dialogClose?.addEventListener("click", closeDetails);

  el.dialog?.addEventListener("click", (event) => {
    if (event.target === el.dialog) closeDetails();
  });

  el.dialog?.addEventListener("close", () => {
    selectedDestinationId = null;
  });

  if (el.dialogPlan) {
    el.dialogPlan.addEventListener("click", () => {
      prepareTripPlan(getDestination(selectedDestinationId));
    });
  }

  // =========================================
  // 15. TRIP FORM EVENTS
  // =========================================

  el.tripForm?.addEventListener("submit", submitTrip);

  el.cancelTripButton?.addEventListener("click", () => {
    resetTripForm();
    showToast("Đã hủy thao tác chỉnh sửa.");
  });

  el.tripStartDate?.addEventListener("change", () => {
    if (!el.tripEndDate) return;

    const start = el.tripStartDate.value || getToday();
    el.tripEndDate.min = start;

    if (el.tripEndDate.value && el.tripEndDate.value < start) {
      el.tripEndDate.value = start;
    }
  });

  // =========================================
  // 16. MOBILE MENU
  // =========================================

  if (el.mobileMenu && el.nav) {
    el.mobileMenu.addEventListener("click", () => {
      const open = el.nav.classList.toggle("open");

      el.mobileMenu.setAttribute("aria-expanded", String(open));
      el.mobileMenu.setAttribute(
        "aria-label",
        open ? "Đóng menu" : "Mở menu"
      );

      el.mobileMenu.textContent = open ? "×" : "☰";
    });

    $$(".nav-link", el.nav).forEach((link) => {
      link.addEventListener("click", () => {
        el.nav.classList.remove("open");
        el.mobileMenu.setAttribute("aria-expanded", "false");
        el.mobileMenu.textContent = "☰";
      });
    });
  }

  // =========================================
  // 17. NEWSLETTER DEMO
  // =========================================

  if (el.newsletterForm) {
    el.newsletterForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const emailInput = $("#emailInput", el.newsletterForm);
      const email = emailInput?.value.trim() || "";

      const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (!validEmail) {
        if (el.newsletterMessage) {
          el.newsletterMessage.textContent =
            "Bạn hãy nhập địa chỉ email hợp lệ.";
          el.newsletterMessage.className =
            "newsletter-message error";
        }
        return;
      }

      if (el.newsletterMessage) {
        el.newsletterMessage.textContent =
          "Đăng ký thành công! Đây là bản demo, email chưa được gửi lên máy chủ.";
        el.newsletterMessage.className =
          "newsletter-message success";
      }

      el.newsletterForm.reset();
    });
  }

  // =========================================
  // 18. INITIALIZE
  // =========================================

  function initialize() {
    populateDestinationSelect();

    if (el.tripStartDate) {
      el.tripStartDate.min = getToday();
    }

    if (el.tripEndDate) {
      el.tripEndDate.min = getToday();
    }

    renderDestinations();
    renderTrips();

    if (!allDestinations.length) {
      console.error(
        "Wanderly: Không có dữ liệu. Hãy kiểm tra thứ tự tải data.js và app.js."
      );
    } else {
      console.log(
        `Wanderly ready: ${allDestinations.length} điểm đến, ${trips.length} chuyến đi.`
      );
    }
  }

  initialize();
});
