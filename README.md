# 🎫 Website Pemesanan Tiket Konser

Tugas akhir mata kuliah **Pemrograman Web** berupa platform pemesanan tiket konser full-stack modern. Aplikasi ini dibangun menggunakan **Next.js 16**, **Prisma ORM**, **Tailwind CSS v4**, dan **TypeScript**, serta dideploy menggunakan **Vercel** untuk web server/frontend dan **Neon Database** untuk PostgreSQL serverless database.

---

## ✨ Fitur Utama

- **Sistem Autentikasi Aman**: Registrasi akun baru, login, dan logout menggunakan **JWT (JSON Web Tokens)** yang disimpan secara aman di HTTP-Only Cookies.
- **Proteksi Halaman (Middleware)**: Pembatasan akses halaman `/dashboard` dan `/ticket-list` menggunakan server-side Next.js Middleware. Pengguna yang belum login otomatis diarahkan ke halaman `/login`.
- **Katalog Konser & Booking**: Menampilkan berbagai pilihan konser aktif (e.g., Coldplay, Taylor Swift) lengkap dengan detail harga. Pengguna dapat memesan tiket dengan satu klik.
- **Riwayat Tiket & Proses Pembayaran**:
  - Halaman khusus untuk melihat daftar tiket yang dipesan.
  - Simulasi checkout dengan berbagai metode pembayaran (Virtual Account, E-Wallet, Kartu Kredit).
  - Mengubah status tiket dari `PENDING` (Belum Bayar) menjadi `PAID` (Lunas) secara real-time.
  - Pembatalan/refund pemesanan tiket (`DELETE /api/tickets/[id]`).
- **Antarmuka Modern**: UI adaptif dan responsif dengan performa tinggi menggunakan **Tailwind CSS v4** dan ikon **Lucide React**.

---

## 🛠️ Stack Teknologi & Dependensi

| Komponen | Teknologi | Deskripsi |
| :--- | :--- | :--- |
| **Framework** | [Next.js 16 (App Router)](https://nextjs.org/) | Framework React untuk pengembangan full-stack. |
| **Library UI** | [React 19](https://react.dev/) & [Lucide React](https://lucide.dev/) | Rendering UI dinamis dan set ikon modern. |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | Framework utility-first CSS modern. |
| **Database** | [PostgreSQL (Neon)](https://neon.tech/) | Database PostgreSQL cloud berbasis serverless. |
| **ORM** | [Prisma v6](https://www.prisma.io/) | Object-Relational Mapping (ORM) untuk interaksi database yang aman. |
| **Autentikasi** | [Jose](https://github.com/panva/jose) & [BcryptJS](https://github.com/dcodeIO/bcrypt.js) | Pengamanan token JWT di edge runtime & hashing password. |
| **Hosting** | [Vercel](https://vercel.com/) | Platform deployment cloud khusus Next.js. |

---

## 📂 Struktur Direktori Proyek

```bash
WebsiteTiketKonser/
├── app/                      # Next.js App Router Pages & API
│   ├── api/                  # Backend API Routes
│   │   ├── auth/             # API Autentikasi (login, register, logout)
│   │   └── tickets/          # API Tiket (CRUD, checkout, refund)
│   ├── auth/                 # Folder pembungkus routing auth
│   ├── dashboard/            # Halaman utama user setelah login
│   ├── ticket-list/          # Halaman daftar tiket, pembayaran & refund
│   ├── login/                # Tampilan halaman Login
│   ├── register/             # Tampilan halaman Register
│   ├── globals.css           # Styling global (Tailwind CSS v4)
│   ├── layout.tsx            # Layout utama aplikasi
│   └── page.tsx              # Landing page publik
├── lib/                      # Helper & Utility Functions
│   ├── jwt.ts                # Logika enkripsi, verifikasi JWT, & cookie handling
│   ├── password.ts           # Logika enkripsi & komparasi password dengan bcryptjs
│   └── prisma.ts             # Inisialisasi Prisma Client (Singleton Pattern)
├── prisma/                   # Konfigurasi Database
│   └── schema.prisma         # Skema database & definisi model tabel
├── middleware.ts             # Middleware pelindung rute sisi server (Next.js Edge)
├── package.json              # Manajemen dependensi dan script aplikasi
└── tsconfig.json             # Konfigurasi TypeScript
```

---

## 🗄️ Skema Database (Prisma Models)

Berikut adalah relasi satu-ke-banyak (One-to-Many) antara tabel **User** dan **Ticket** yang didefinisikan pada [schema.prisma](file:///c:/Users/Pongo/Documents/1.Kuliah/1.%20Rashif%20Workspace/WebsiteTiketKonser/prisma/schema.prisma):

```prisma
model User {
  id        String   @id @default(cuid())
  name      String
  email     String   @unique
  password  String
  tickets   Ticket[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Ticket {
  id          String   @id @default(cuid())
  concertId   String
  concertName String
  price       Int
  status      String   @default("PENDING") // PENDING (Belum Lunas) / PAID (Lunas)
  userId      String
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

---

## 💻 Panduan Menjalankan Secara Lokal

### 1. Prasyarat Sistem
Pastikan perangkat Anda telah terinstal:
- [Node.js](https://nodejs.org/) (versi 18.x atau yang lebih baru)
- Aplikasi database PostgreSQL lokal (seperti pgAdmin/Postgres App) atau akses akun cloud [Neon DB](https://neon.tech/).

### 2. Kloning & Instal Dependensi
Buka terminal Anda dan jalankan perintah berikut:
```bash
# Pindah ke folder proyek
cd WebsiteTiketKonser

# Instal package pendukung
npm install
```

### 3. Konfigurasi Environment Variables
Buat file baru bernama `.env` di root direktori proyek, lalu masukkan variabel berikut:
```env
# URL Koneksi PostgreSQL (Sesuaikan user, password, host, port, dan dbname Anda)
DATABASE_URL="postgresql://postgres:root@localhost:5432/db_tiket_konser"

# Kunci Rahasia untuk tanda tangan token JWT (Ganti dengan string acak dan kuat)
JWT_SECRET="ganti-dengan-kunci-rahasia-sangat-kuat-anda-123456"
```

### 4. Sinkronisasi Database (Prisma Migrations)
Gunakan Prisma CLI untuk menerapkan skema tabel langsung ke database Anda:
```bash
# Push skema tabel ke database tanpa file migrasi berulang (cocok untuk development)
npx prisma db push

# Generate client typescript untuk Prisma
npx prisma generate
```

### 5. Jalankan Aplikasi
Jalankan server pengembangan lokal:
```bash
npm run dev
```
Buka browser Anda dan kunjungi halaman [http://localhost:3000](http://localhost:3000).

---

## 🚀 Panduan Hosting (Production)

Proyek ini dirancang agar mudah di-hosting menggunakan layanan gratis cloud **Vercel** dan **Neon**.

### Langkah 1: Setup Database Serverless di Neon
1. Registrasi/Login ke [Neon Console](https://console.neon.tech/).
2. Buat proyek baru (misalnya: `website-tiket-konser`).
3. Pilih dialek **PostgreSQL**, kemudian salin tautan koneksi (**Connection String**) yang disediakan. Contoh format:
   `postgresql://neondb_owner:npg_xxx@ep-xxx.ap-southeast-1.aws.neon.tech/neondb?sslmode=require`

### Langkah 2: Deploy Frontend di Vercel
1. Unggah source code proyek Anda ke repositori Git pribadi (GitHub / GitLab).
2. Masuk ke dashboard [Vercel](https://vercel.com/) dan impor proyek Git tersebut.
3. Di tab **Environment Variables**, tambahkan dua variabel lingkungan yang telah disalin sebelumnya:
   - `DATABASE_URL` = `<URL_KONEKSI_NEON_ANDA>`
   - `JWT_SECRET` = `<KODE_RAHASIA_JWT_PRODUKSI>`
4. Di bagian **Build Settings**, Next.js secara otomatis mendeteksi Prisma Client. Namun, demi memastikan type safety saat build, direkomendasikan menambahkan perintah generate pada script build di `package.json` Anda:
   ```json
   "build": "prisma generate && next build"
   ```
5. Klik tombol **Deploy** dan tunggu proses hingga selesai. Vercel akan memberikan domain publik aktif untuk aplikasi Anda.

---

## 🔑 Dokumentasi Endpoint API

### 🔐 Autentikasi (`/api/auth`)
| Method | Endpoint | Keterangan | Akses |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Mendaftarkan akun user baru (nama, email, password) | Publik |
| `POST` | `/api/auth/login` | Memverifikasi password dan menyimpan token JWT di cookies | Publik |
| `POST` | `/api/auth/logout` | Menghapus cookie token JWT dari browser | Publik |

### 🎟️ Manajemen Tiket (`/api/tickets`)
| Method | Endpoint | Keterangan | Akses |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/tickets` | Mengambil seluruh riwayat pemesanan milik user yang sedang aktif | Terproteksi (User) |
| `POST` | `/api/tickets` | Membuat order tiket baru dengan status default `"PENDING"` | Terproteksi (User) |
| `POST` | `/api/tickets/checkout` | Mengupdate seluruh tiket berstatus `"PENDING"` milik user menjadi `"PAID"` | Terproteksi (User) |
| `DELETE` | `/api/tickets/[id]` | Menghapus atau membatalkan pesanan tiket berdasarkan ID tiket | Terproteksi (User) |

---

## 🎓 Keterangan Akademik
Proyek aplikasi web ini dibuat guna memenuhi kriteria penilaian ujian/tugas mata kuliah **Pemrograman Web**. Memperlihatkan pemahaman tentang siklus deployment aplikasi modern, integrasi database cloud relasional (Neon), manajemen state di React 19, serta arsitektur backend-frontend terintegrasi Next.js.
