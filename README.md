This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Jawaban

## A. Topik: Komunikasi dengan Manajer Produk

1. Apakah foto bisa di preview atau hanya statis seperti aplikasi Instagram?
2. Apakah fitur "Read More" bisa dilakukan di halaman feeds/home? Tanpa harus membuat user membuka detail post terlebih dahulu.
3. Apakah user bisa melakukan kedua aksi (upvote dan downvote) dalam satu konten?

## C1

### 1. Struktur yang akan digunakan.

#### Dapatkan melalui API kontak.

a. Pada saat pengguna melakukan registrasi kita akan mengambil/meminta no handphone mereka yang dimana ini adalah tugas UI/UX untuk bisa menghandle pengalaman di aplikasi tanpa harus membuat user takut atau tidak ingin memberikan no handphoe tersebut.
b. Kita juga akan mendapatkan email dari pengguna pada saat registrasi (sudah pasti).

Kedua data diatas yang sudah didapatkan (no handphone dan email) akan kita sinkronisasi dengan API contact yang ada di native aplikasi (Android/iOS). Ketika

#### Berdasarkan followings user.

Kalau semisal kita membutuhkan sugesti "Orang yang mungkin dikenal" berdasarkan followers. Kita akan melakukan pendekatan dari kolom "followings" orang yang kita(pengguna) follows. Dan di function database kita akan menerapkan ini secara acak per request yang dilakukan ke aplikasi. Semisal, pada saat open-app 1st(pertama), kita ambil followings dari user A, dan open-app 2nd(kedua) kita ambil dari followings user B, dan seterusnya.

Sedangkan untuk data yang ditampilkan akan di limitasi berdasarkan relevansi kesukaan atau tags yang sama. Ini bisa di handle melalui firestore saya pikir, saya pernah melakukan ini. Dan salah satu query yang digunakan adalah "pengguna **BELUM** mengikuti orang-orang yang disuggestikan tsb".

#### Merge data

Data yang didapatkan dari kontak (berdasarkan referensi email dan no handphone) array nya akan kita gabungkan dengan data yang didapatkan dari query "followings user" atau "minat yang sama" atau "tags yang sama".

### 2. Struktur yang akan digunakan.

#### Tidak ada yang terkait

Buat call to action agar user melakukan follow seseorang atau siapapun. Tapi jika dari kontak API kita mendapatkan sugesti, tampilkan sugesti ini untuk pertama kali di halaman utama.

#### Terlalu banyak yang terkait.

Saya merasa jika data banyak akan lebih mudah di implementasikan. Karena sugesti yang bersifat random dan acak (berdasarkan parameter tertentu dari query) akan lebih menarik ditampilkan di UI. Query akan disimpan di database servis yang dinamis seperti MongoDB atau firestore. Query ini bersifat temporary dan bisa berubah sewaktu-waktu atau tidak digunakan lagi. Query ini yang akan kita update setiap pengguna membuka aplikasi, sampai data "people" di query tersebut benar-benar habis (tidak ada yang bisa di sugestikan lagi) maka kita akan regenerate query baru untuk kedepannya. Begitu terus-menerus.

### 3. Pengujian Fitur

1. Saya generate 100 pengguna berbeda untuk data mockup.
2. Login di 3 device berbeda.
3. Masing-masing 3 user ini akan mengikuti orang-orang berbeda dari 100 orang tersebut.
4. 3 user akan saling follow, atau bisa kita korbankan 1 yang tidak follow siapapun.
5. Buat Query seperti penjelasan diatas.
6. Fetch data berdasarkan query yang sudah dibuat pada masing-masing user.
7. Yang kita harapkan adalah query berfungsi dengan baik pada masing-masing user dengan menampilkan orang-orang yang user A follow dan lain-lain.

## C2

1. Pengguna mendaftar ke aplikasi menggunakaan email/no handphone.
2. Request "allow contacts" kepada user.
3. Jika disetujui, segera dapatkan data dari kontak dan sinkronasi data tersebut dari database kita menggunakan metode "includes"(karena bentuk data akan array of emails/phone_numbers).
4. Merge data yang dikembalikan dari database di suatu state (global state).
5. Ajak user untuk mengikuti orang-orang yang didapatkan dari kontak tersebut.
6. Ketika pengguna sudah follow salah satu pengguna dari sugesti kontak, maka akan kita cek followings dari "pengguna yang difollow".
7. Cari relevansi berdasarkan tags yang sama dari followings yang pengguna follows.
8. Jika ada, beberapa pengguna tersebut akan digabungkan (merge) ke global state yang sudah di jelaskan di no 4.
9. Store semua hasil query dari global state tadi ke database dinamis (NoSQL).
10. Kedepannya user hanya akan mengambil dari database dinamis tersebut, bersifat seperti cache namun di cloud.
11. Limitasi data yang ditampilkan apabila sudah terlalu banyak.
