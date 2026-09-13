# WhatsApp Status Saver

Ekstensi Chrome untuk menyimpan status WhatsApp Web (foto/video) secara manual, satu per satu. Tombol simpan hanya muncul saat kamu sedang menonton status tertentu — tidak ada auto-scraping atau pengunduhan massal di background.

## Cara kerja

WhatsApp Web merender status yang sedang dibuka ke elemen `<video>` atau `<img>` di halaman. Ekstensi ini mendeteksi elemen tersebut lewat `MutationObserver`, lalu menampilkan tombol "Save Story" di pojok layar. Saat diklik, ekstensi mengambil `src` media itu (baik berupa blob URL maupun endpoint stream milik WhatsApp) dan memicu unduhan lewat browser.

Tidak ada permintaan ke server eksternal, tidak ada penyimpanan riwayat, dan tidak ada proses yang berjalan tanpa interaksi pengguna.

## Kompatibilitas

Dikembangkan dan diuji di **Google Chrome**. Karena hanya menggunakan `content_scripts` tanpa background service worker, kemungkinan besar juga berjalan di browser berbasis Chromium lain (Edge, Brave, Opera) dengan cara instalasi yang sama — namun belum diuji secara resmi di browser tersebut.

Firefox mendukung Manifest V3, tapi belum diuji untuk ekstensi ini dan mungkin memerlukan penyesuaian kecil pada `manifest.json` (misalnya menambahkan `browser_specific_settings`).

## Instalasi (Developer Mode)

1. Klik **Code → Download ZIP** di halaman ini, lalu ekstrak.
2. Buka `chrome://extensions` (atau `edge://extensions`, `brave://extensions` untuk browser Chromium lain).
3. Aktifkan **Developer mode** di pojok kanan atas.
4. Klik **Load unpacked**, lalu pilih folder hasil ekstrak.

## Penggunaan

1. Buka [web.whatsapp.com](https://web.whatsapp.com) dan login seperti biasa.
2. Buka status kontak yang ingin disimpan.
3. Klik tombol **"Save Story"** yang muncul di pojok kanan bawah.
4. File akan otomatis tersimpan ke folder Downloads dengan nama `wa-story-<timestamp>.mp4` (video) atau `.jpg` (foto).

Tombol otomatis hilang saat status viewer ditutup, dan hanya muncul kembali saat kamu membuka status berikutnya.

## Memperbarui setelah mengubah kode

1. Buka `chrome://extensions`.
2. Klik ikon reload pada kartu ekstensi ini.
3. Refresh tab WhatsApp Web (`F5`).

## Privasi

- Tidak menyimpan riwayat status, nama kontak, atau nomor telepon siapa pun.
- Tidak ada permintaan jaringan ke luar selain yang memang dilakukan WhatsApp Web itu sendiri.
- Permission yang diminta hanya `activeTab` dan `downloads`.
- Media diambil dari elemen yang sudah kamu buka sendiri di sesi WhatsApp Web milikmu — bukan diakses dari luar sesi.

## Catatan penggunaan

Status WhatsApp bersifat sementara (ephemeral) dan dibagikan dengan asumsi tidak disimpan permanen oleh penonton. Ekstensi ini dirancang untuk penggunaan personal terhadap status yang memang sudah dibagikan kepadamu, bukan untuk mengumpulkan atau mendistribusikan konten milik orang lain tanpa izin.

## Keterbatasan yang diketahui

- Endpoint media WhatsApp bersifat *session-scoped*. Jika WhatsApp mengubah arsitektur pengiriman medianya, selector di `content.js` mungkin perlu disesuaikan.
- Jika `fetch()` gagal karena pembatasan CORS, opsi cadangan adalah klik kanan pada video/foto di halaman → **Save As**.

## Lisensi

MIT — bebas digunakan, dimodifikasi, dan didistribusikan ulang dengan tetap mencantumkan atribusi.
