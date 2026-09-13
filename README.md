# WA Story Saver

Ekstensi browser berbasis Manifest V3 untuk mengunduh status/story WhatsApp Web (video dan foto) secara manual langsung dari browser.

## Fitur Utama

- **Unduh Manual**: Tombol simpan hanya muncul saat status aktif ditonton (1 klik = 1 media).
- **Dukungan Video dan Foto**: Mendeteksi media secara dinamis dan mengunduh format yang sesuai (`.mp4` atau `.jpg`).
- **Performa Ringan**: Menggunakan debounced observer dan manipulasi DOM minimal untuk mencegah lonjakan CPU dan browser freeze.
- **Privasi Penuh**: Berjalan murni di sisi klien (lokal). Tidak ada pengumpulan data, analitik, ataupun koneksi ke server eksternal.

## Panduan Instalasi

### 1. Unduh Kode Sumber
1. Unduh repositori ini melalui tombol **Code** > **Download ZIP**, atau clone menggunakan git:
   ```bash
   git clone https://github.com/<username>/<repo-name>.git
   ```
2. Ekstrak file ZIP ke direktori lokal di komputer Anda.

### 2. Pemasangan di Browser

#### Google Chrome / Brave / Microsoft Edge / Opera (Chromium-based)
1. Buka halaman manajemen ekstensi pada browser:
   - Chrome: `chrome://extensions`
   - Brave: `brave://extensions`
   - Edge: `edge://extensions`
   - Opera: `opera://extensions`
2. Aktifkan **Developer mode** (Mode Pengembang) di bagian kanan atas atau sidebar.
3. Klik **Load unpacked** (Muat yang belum dibongkar).
4. Pilih folder `wa-story-saver` hasil ekstraksi.

#### Mozilla Firefox
1. Buka `about:debugging#/runtime/this-firefox` pada address bar.
2. Klik tombol **Load Temporary Add-on...**
3. Pilih file `manifest.json` yang ada di dalam folder proyek.

## Cara Penggunaan

1. Buka [web.whatsapp.com](https://web.whatsapp.com) dan login ke akun Anda.
2. Buka status/story kontak yang ingin Anda simpan.
3. Tombol **Save Story** akan muncul di sudut kanan bawah layar.
4. Klik tombol untuk mengunduh file media yang sedang aktif.
5. File akan otomatis tersimpan ke folder Download dengan format nama `WA_Story_YYYYMMDD_HHMMSS`.

## Pembaruan Ekstensi

Jika Anda melakukan modifikasi pada kode sumber:
1. Buka halaman ekstensi browser (misal: `chrome://extensions`).
2. Cari kartu **WA Story Saver (Manual)**.
3. Klik tombol **Reload** (panah melingkar).
4. Muat ulang tab WhatsApp Web (tekan `F5`).

## Privasi dan Keamanan

Ekstensi ini tidak menyimpan, merekam, ataupun mentransmisikan data obrolan, kontak, maupun media ke pihak mana pun. Pengunduhan media dilakukan langsung dari memory blob lokal yang telah didekripsi oleh WhatsApp Web di sesi peramban Anda.

## Lisensi

Didistribusikan di bawah lisensi [MIT](LICENSE). Bebas digunakan, dimodifikasi, dan didistribusikan.
