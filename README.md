# Buku Pendampingan Guru Wali V3
Aplikasi web statis untuk administrasi Guru Wali SMP.

## Fitur V3
- Identitas sekolah, guru wali, kelas, tahun ajaran, semester
- Data murid dampingan
- Jurnal pembinaan lengkap
- Perkembangan bulanan
- Rekap pendampingan
- Laporan bulanan otomatis
- Laporan semester otomatis
- Cetak jurnal/laporan
- Backup dan restore JSON
- Penyimpanan otomatis di browser
- Responsif untuk komputer dan HP

## Upload GitHub Pages
Ganti file `index.html`, `style.css`, dan `script.js` di repository Bapak pada branch `utama`.
Tidak perlu mengubah pengaturan Pages lagi jika Pages sudah aktif.

## Catatan
Data tersimpan pada browser/perangkat. Backup data secara berkala.


## V4
Penyegaran tampilan dashboard, kartu statistik, navigasi tab, tabel, tombol, dan layout responsif tanpa mengubah alur data utama.


## V5
Tema warna SMP: biru, teal, kuning, oranye, hijau, dan ungu dengan gaya modern tetapi tetap formal untuk administrasi sekolah.


## V6
Setiap bagian dapat dicetak sendiri: Identitas Murid, Jurnal Pembinaan, Perkembangan Bulanan, Laporan Bulanan, dan Laporan Semester. Saat mencetak, hanya bagian yang dipilih yang muncul pada hasil cetak.


## V7
Format administrasi resmi A4: kop sekolah, logo sekolah yang dapat diunggah, nomor laporan, tanggal, nama/NIP Kepala Sekolah, tanda tangan Kepala Sekolah dan Guru Wali. Masing-masing laporan tetap dapat dicetak terpisah.


## V8
Logo resmi yang diunggah pengguna (Lambang Kabupaten Kapuas) sudah disertakan sebagai logo bawaan pada KOP. Logo tetap dapat diganti melalui menu Logo Sekolah.


## V9
Sistem cetak diperbaiki dengan membuka lembar cetak khusus untuk bagian yang dipilih. Jadi Cetak Laporan Bulanan hanya mencetak laporan bulanan, dan Cetak Laporan Semester hanya mencetak laporan semester; bagian lain tidak ikut tercetak.


## V10
Perbaikan final cetak: setiap tombol membuka URL mode cetak khusus (`?print=...`) sehingga hanya satu bagian yang ditampilkan pada print preview. Laporan Bulanan dan Laporan Semester tidak lagi dapat ikut tercetak bersama bagian lain.


## V11
Perbaikan utama: semua tombol cetak sekarang memiliki event handler yang aktif dan membuat dokumen cetak terisolasi berisi satu bagian saja. Print Preview tidak menggunakan halaman aplikasi utama.
