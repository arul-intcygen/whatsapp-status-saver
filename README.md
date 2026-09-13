# WA Story Saver (Manual)

<p align="center">
  <img src="https://img.shields.io/badge/Manifest-V3-blue?style=flat-square" alt="Manifest V3">
  <img src="https://img.shields.io/badge/Privacy-100%25%20Local-success?style=flat-square" alt="Privacy First">
  <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="License MIT">
  <img src="https://img.shields.io/badge/Tracking-Zero%20%2F%20No%20Ads-orange?style=flat-square" alt="No Ads">
</p>

Ekstensi browser yang ringan, aman, dan berfokus pada privasi untuk mengunduh status/story WhatsApp Web (video & foto) secara manual dengan satu klik.

---

## ✨ Keunggulan

- ⚡ **Sangat Ringan & Bebas Lag**: Menggunakan *single-instance UI* dan *debounced observer* sehingga tidak membebani CPU, tidak membuat browser freeze, dan bebas dari *layout thrashing*.
- 🎬 **Mendukung Video & Foto**: Otomatis mendeteksi media yang sedang aktif ditonton dan mengunduh format yang sesuai (`.mp4` atau `.jpg`).
- 🔒 **100% Privasi Terjaga**: Tidak ada background scraping, tidak ada analitik pihak ketiga, tidak ada iklan, dan tidak ada data yang dikirim ke server luar. Semua proses berjalan murni di komputer lokal Anda.
- 🎯 **Manual & Terkendali**: Tombol simpan hanya muncul saat Anda sedang menonton story. 1 klik = 1 story tersimpan.

---

## 🚀 Panduan Instalasi (Multi-Browser)

Ekstensi ini berbasis **Manifest V3** dan dapat dipasang secara langsung pada semua browser modern berbasis Chromium serta Firefox.

### 1. Unduh Repositori
1. Klik tombol hijau **Code** di bagian atas halaman GitHub ini, lalu pilih **Download ZIP** (atau clone menggunakan `git clone`).
2. Ekstrak file ZIP tersebut ke folder di komputer Anda.

---

### 2. Pasang di Browser Anda

<details open>
<summary><b>Google Chrome</b></summary>

1. Buka Google Chrome dan ketik pada address bar:
   ```text
   chrome://extensions
   ```
2. Aktifkan tombol **Developer mode** di pojok kanan atas.
3. Klik tombol **Load unpacked** di pojok kiri atas.
4. Pilih folder hasil ekstrak (`wa-story-saver`).
5. Ekstensi berhasil terpasang!
</details>

<details>
<summary><b>Brave Browser</b></summary>

1. Buka Brave Browser dan ketik pada address bar:
   ```text
   brave://extensions
   ```
2. Aktifkan tombol toggle **Developer mode** di pojok kanan atas.
3. Klik tombol **Load unpacked**.
4. Pilih folder hasil ekstrak (`wa-story-saver`).
5. Selesai, ekstensi siap digunakan!
</details>

<details>
<summary><b>Microsoft Edge</b></summary>

1. Buka Microsoft Edge dan ketik pada address bar:
   ```text
   edge://extensions
   ```
2. Aktifkan opsi **Developer mode** pada menu sidebar sebelah kiri (bawah).
3. Klik tombol **Load unpacked**.
4. Pilih folder hasil ekstrak (`wa-story-saver`).
5. Ekstensi berhasil terpasang!
</details>

<details>
<summary><b>Opera / Opera GX</b></summary>

1. Buka Opera atau Opera GX dan ketik pada address bar:
   ```text
   opera://extensions
   ```
2. Aktifkan opsi **Developer mode** di pojok kanan atas.
3. Klik tombol **Load unpacked**.
4. Pilih folder hasil ekstrak (`wa-story-saver`).
5. Ekstensi aktif dan siap digunakan!
</details>

<details>
<summary><b>Mozilla Firefox</b></summary>

> *Catatan: Firefox mewajibkan ekstensi temporary untuk dimuat via menu debugging.*

1. Buka Mozilla Firefox dan ketik pada address bar:
   ```text
   about:debugging#/runtime/this-firefox
   ```
2. Klik tombol **Load Temporary Add-on...**
3. Masuk ke folder ekstensi, lalu pilih file `manifest.json`.
4. Ekstensi akan langsung aktif selama sesi browser berjalan.
</details>

---

## 📖 Cara Penggunaan

1. Buka [web.whatsapp.com](https://web.whatsapp.com) dan login ke akun WhatsApp Anda.
2. Buka status / story kontak mana pun yang ingin Anda simpan.
3. Tombol hijau **"Save Story"** akan muncul secara otomatis di pojok kanan bawah layar.
4. Klik tombol tersebut:
   - Status akan berubah menjadi **"Mengunduh..."**.
   - File video (`.mp4`) atau foto (`.jpg`) akan langsung tersimpan ke folder Download Anda dengan format nama `WA_Story_YYYYMMDD_HHMMSS`.
   - Tombol akan menampilkan **"✓ Tersimpan!"** sebagai konfirmasi.
5. Saat Anda menutup status viewer, tombol akan otomatis menghilang dari layar.

---

## 🔄 Cara Memperbarui (Jika Ada Perubahan Kode)

Jika Anda melakukan perubahan pada kode script:
1. Buka halaman ekstensi browser Anda (misalnya `chrome://extensions`).
2. Cari kartu **WA Story Saver**.
3. Klik ikon **Reload / Perbarui** (panah melingkar).
4. Buka tab WhatsApp Web Anda, lalu tekan **F5 / Refresh**.

---

## 🛡️ Privasi & Keamanan

- Ekstensi ini **TIDAK** menyimpan riwayat chat, nomor telepon, maupun kontak Anda.
- Media diunduh langsung dari memori browser (*decrypted session blob*) yang sudah dibuka oleh Anda secara resmi di WhatsApp Web.
- Tidak membutuhkan login akun tambahan atau token API pihak ketiga.

---

## 📄 Lisensi

Didistribusikan di bawah Lisensi **MIT**. Bebas digunakan, dimodifikasi, dan didistribusikan untuk keperluan pribadi maupun edukasi.
