/**
 * WA Story Saver (Manual) - Optimized & Lag-Free
 * ----------------------------------------------
 * Mengunduh WhatsApp Story (video / foto) yang sedang aktif ditonton secara manual.
 * Berjalan di execution context MAIN (sama seperti console DevTools) sehingga
 * memiliki akses penuh ke Blob store WhatsApp Web.
 *
 * Seluruh kode dibungkus IIFE agar tidak mencemari scope global halaman
 * dan terhindar dari tabrakan identifier dengan script WhatsApp Web.
 */
(() => {
"use strict";

const BUTTON_ID = "wa-story-saver-btn";

// Selector container status viewer WhatsApp Web
const STATUS_CONTAINER_SEL =
  'div[data-animate-status-viewer="true"], [data-testid="status-viewer"], div[role="dialog"]';
let saveButton = null;
let debounceTimer = null;
let currentActiveMedia = null;

// Template ikon SVG
const DOWNLOAD_ICON_SVG = `
<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
  <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM17 13l-5 5-5-5h3V9h4v4h3z"/>
</svg>`;

const CHECK_ICON_SVG = `
<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
</svg>`;

/**
 * Mencari elemen media story (video / gambar) yang sedang aktif di layar.
 */
function findActiveMedia() {
  // 1. Cek container status viewer overlay WhatsApp Web jika ada
  const statusContainer = document.querySelector(STATUS_CONTAINER_SEL);

  if (statusContainer) {
    const vid = statusContainer.querySelector("video");
    if (vid && (vid.currentSrc || vid.src)) {
      return { el: vid, type: "video" };
    }

    const img = statusContainer.querySelector('img[src^="blob:"]') || statusContainer.querySelector("img");
    if (img && (img.currentSrc || img.src) && !img.src.includes("pps.whatsapp.net")) {
      return { el: img, type: "image" };
    }
  }

  // 2. Fallback: video besar yang berada DI DALAM container status viewer saja,
  //    dan bukan stream live (duration = Infinity, mis. saat video call)
  const videos = document.querySelectorAll("video");
  for (let i = 0; i < videos.length; i++) {
    const vid = videos[i];
    const src = vid.currentSrc || vid.src;
    if (!src || vid.offsetWidth <= 100 || vid.offsetHeight <= 100) continue;
    if (!vid.closest(STATUS_CONTAINER_SEL)) continue;
    if (vid.readyState >= 1 && !Number.isFinite(vid.duration)) continue;
    return { el: vid, type: "video" };
  }

  // 3. Fallback foto: HANYA cari gambar dengan blob: URL
  const blobImgs = document.querySelectorAll('img[src^="blob:"]');
  for (let i = 0; i < blobImgs.length; i++) {
    const img = blobImgs[i];
    if (img.offsetWidth > 150 && img.offsetHeight > 150) {
      return { el: img, type: "image" };
    }
  }

  return null;
}

/**
 * Inisialisasi tombol tunggal ke dalam DOM.
 */
function ensureButtonExists() {
  if (saveButton && document.getElementById(BUTTON_ID)) {
    return saveButton;
  }

  const existing = document.getElementById(BUTTON_ID);
  if (existing) existing.remove();

  const btn = document.createElement("button");
  btn.id = BUTTON_ID;
  btn.innerHTML = `${DOWNLOAD_ICON_SVG}<span>Save Story</span>`;
  btn.title = "Klik untuk mengunduh status/story ini";
  btn.style.display = "none";

  btn.addEventListener("click", handleSaveClick);

  document.body.appendChild(btn);
  saveButton = btn;
  return btn;
}

/**
 * Memperbarui tampilan tombol berdasarkan status media saat ini.
 */
function updateButtonVisibility() {
  const media = findActiveMedia();
  currentActiveMedia = media;

  const btn = ensureButtonExists();
  if (media) {
    if (btn.style.display !== "inline-flex") {
      btn.style.display = "inline-flex";
      btn.classList.add("wa-story-visible");
      btn.title = media.type === "video" ? "Unduh Video Story ini" : "Unduh Foto Story ini";
    }
  } else {
    if (btn.style.display !== "none") {
      btn.style.display = "none";
      btn.classList.remove("wa-story-visible");
    }
  }
}

/**
 * Handler klik tombol download
 */
async function handleSaveClick(e) {
  e.stopPropagation();
  e.preventDefault();

  const media = findActiveMedia() || currentActiveMedia;
  if (!media || !media.el) {
    alert("Media story tidak ditemukan atau sudah tertutup.");
    return;
  }

  const btn = ensureButtonExists();
  btn.disabled = true;
  const originalHtml = btn.innerHTML;
  btn.innerHTML = `<span>Mengunduh...</span>`;

  try {
    await saveMedia(media);
    btn.innerHTML = `${CHECK_ICON_SVG}<span>Tersimpan!</span>`;
  } catch (err) {
    console.error("[WA Story Saver] Gagal mengunduh:", err);
    btn.innerHTML = `<span>✗ Gagal Unduh</span>`;
  } finally {
    setTimeout(() => {
      btn.disabled = false;
      btn.innerHTML = originalHtml;
    }, 2000);
  }
}

/**
 * Format timestamp untuk penamaan file
 */
function getFormattedTimestamp() {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  const yyyy = now.getFullYear();
  const mm = pad(now.getMonth() + 1);
  const dd = pad(now.getDate());
  const hh = pad(now.getHours());
  const min = pad(now.getMinutes());
  const ss = pad(now.getSeconds());
  return `${yyyy}${mm}${dd}_${hh}${min}${ss}`;
}

/**
 * Unduh media ke komputer
 * Menggunakan pendekatan yang sama persis seperti script console user yang berhasil
 */
async function saveMedia({ el, type }) {
  const src = el.currentSrc || el.src;
  if (!src) {
    throw new Error("Tidak ada URL media (src kosong)");
  }

  const res = await fetch(src);
  if (!res.ok) throw new Error(`HTTP error status ${res.status}`);
  const blob = await res.blob();

  let fileExt = type === "video" ? "mp4" : "jpg";
  if (blob.type.includes("video/mp4")) fileExt = "mp4";
  else if (blob.type.includes("image/png")) fileExt = "png";
  else if (blob.type.includes("image/webp")) fileExt = "webp";
  else if (blob.type.includes("image/jpeg")) fileExt = "jpg";

  const blobUrl = URL.createObjectURL(blob);
  const filename = `WA_Story_${getFormattedTimestamp()}.${fileExt}`;

  const a = document.createElement("a");
  a.href = blobUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();

  // Berikan waktu tunda yang cukup (60 detik) sebelum revoke agar download selesai di disk
  setTimeout(() => {
    URL.revokeObjectURL(blobUrl);
  }, 60000);
}

/**
 * MutationObserver dengan debounce — satu-satunya mekanisme polling.
 * Interval 1 detik yang lama dihapus untuk mengurangi beban DOM query
 * berulang di halaman yang sangat aktif seperti WhatsApp Web.
 */
const observer = new MutationObserver(() => {
  if (debounceTimer) return;
  debounceTimer = setTimeout(() => {
    debounceTimer = null;
    updateButtonVisibility();
  }, 300);
});

// Inisialisasi
ensureButtonExists();
updateButtonVisibility();

observer.observe(document.body, {
  childList: true,
  subtree: true
});

})();
