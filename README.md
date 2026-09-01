# Buku Pendampingan Guru Wali

Aplikasi web statis untuk administrasi Guru Wali SMP.

## Fitur
- Identitas sekolah/guru/kelas/tahun ajaran/semester
- Data murid dampingan
- Perkembangan bulanan
- Rekap pendampingan
- Laporan semester
- Simpan otomatis di browser (LocalStorage)
- Backup dan Restore JSON
- Cetak laporan semester
- Responsive untuk komputer dan HP

## Upload ke GitHub Pages
1. Buat repository baru di GitHub, misalnya `guru-wali`.
2. Upload `index.html`, `style.css`, dan `script.js` ke repository.
3. Buka **Settings → Pages**.
4. Pada **Build and deployment**, pilih **Deploy from a branch**.
5. Pilih branch `main` dan folder `/ (root)`, lalu **Save**.
6. Tunggu proses deployment selesai. URL biasanya:
   `https://USERNAME.github.io/guru-wali/`

## Catatan
Data yang dimasukkan tersimpan di browser/perangkat masing-masing melalui LocalStorage. Jika ganti perangkat/browser, gunakan menu **Backup data** lalu **Restore data**.
