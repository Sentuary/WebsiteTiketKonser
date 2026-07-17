"use client";

import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import ConcertCard, { Concert } from "./ConcertCard";
import TicketList, { DBTicket } from "./TicketList";
import { Search, Calendar, MapPin, Tag, Info, AlertCircle, Sparkles } from "lucide-react";

interface UserPayload {
  id: string;
  name: string;
  email: string;
}

interface DashboardContentProps {
  user: UserPayload;
}

// 10 Dummy Concerts Data
const DUMMY_CONCERTS: Concert[] = [
  {
    id: "c1",
    name: "Coldplay: Music of the Spheres",
    location: "Stadion Utama Gelora Bung Karno, Jakarta",
    date: "15 November 2026",
    price: 1250000,
    description: "Konser spektakuler global 'Music of the Spheres World Tour' yang menyajikan pertunjukan lampu LED, kembang api, dan melodi legendaris.",
    image: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=600&auto=format&fit=crop&q=80",
    category: "Rock",
  },
 {
  id: "c2",
  name: "CORTIS: COLOR OUTSIDE THE LINES",
  location: "ICE BSD City, Tangerang",
  date: "20 Desember 2026",
  price: 1800000,
  description:
    "Saksikan penampilan perdana CORTIS, boy group terbaru dari BIGHIT MUSIC. Nikmati lagu-lagu dari mini album debut 'COLOR OUTSIDE THE LINES' dalam konser spektakuler yang penuh energi.",
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4V68U25GFaxqB2LsKoqGdrve3OIVYNTgzabZ6KW_Nkw&s=10",
  category: "Pop",
},
  {
    id: "c3",
    name: "Hindia: Lagipula Hidup Akan Berakhir",
    location: "Tennis Indoor Senayan, Jakarta",
    date: "12 Oktober 2026",
    price: 250000,
    description: "Pertunjukan teaterikal penuh emosi membawakan materi album ganda terbarunya yang kritis dan menyentuh hati para pendengarnya.",
    image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=600&auto=format&fit=crop&q=80",
    category: "Indie",
  },
  {
    id: "c4",
    name: "Tulus: Konser Monokrom",
    location: "Sabuga, Bandung",
    date: "05 September 2026",
    price: 450000,
    description: "Harmoni suara merdu Tulus diiringi aransemen orkestra megah yang membuai jiwa, menyanyikan lagu hits seperti 'Hati-Hati di Jalan'.",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80",
    category: "Jazz",
  },
  {
    id: "c5",
    name: "Noah: The Great Journey",
    location: "Ancol Beach City, Jakarta",
    date: "18 Januari 2027",
    price: 500000,
    description: "Konser megah pamungkas Noah sebelum melakukan masa hiatus panjang dari industri musik. Nikmati aksi panggung magis terakhir dari Ariel dkk.",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&auto=format&fit=crop&q=80",
    category: "Rock",
  },
  {
    id: "c6",
    name: "Dewa 19: 30 Tahun Berkarya",
    location: "Stadion Manahan, Solo",
    date: "08 November 2026",
    price: 600000,
    description: "Perayaan perjalanan legendaris Dewa 19 selama tiga dekade bersama vokalis-vokalis ternama Ari Lasso, Once Mekel, Ello, dan Virzha.",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/1e/Dewa_19.jpg?_=20231208075950",
    category: "Rock",
  },
  {
    id: "c7",
    name: "Pamungkas: Solipsism Tour",
    location: "Grand City Hall, Surabaya",
    date: "22 September 2026",
    price: 300000,
    description: "Senandung romantis nan syahdu dari Pamungkas membawakan lagu-lagu hits andalannya 'To The Bone' secara langsung bersama The PeoplePeople.",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&auto=format&fit=crop&q=80",
    category: "Pop",
  },
  {
    id: "c8",
    name: "Raisa: Live in Concert",
    location: "Jatim Park 3, Batu",
    date: "04 Oktober 2026",
    price: 400000,
    description: "Nikmati malam penuh keindahan suara Raisa di bawah gemerlap bintang pegunungan, menyanyikan lagu cinta terpopulernya.",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80",
    category: "R&B",
  },
  {
    id: "c9",
    name: "Nadin Amizah: Selamat Ulang Tahun",
    location: "Salihara Arts Center, Jakarta",
    date: "19 Agustus 2026",
    price: 275000,
    description: "Pertunjukan konser teatrikal yang hangat dan puitis dari Nadin Amizah, merayakan fase kehidupan dewasa mudanya dalam harmoni folk.",
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=600&auto=format&fit=crop&q=80",
    category: "Folk",
  },
  {
    id: "c10",
    name: "Fourtwnty: Nalar Tour",
    location: "Lapangan Koni, Denpasar",
    date: "30 Oktober 2026",
    price: 180000,
    description: "Menyanyi santai penuh nuansa alam bersama Ari Lesmana membawakan lagu-lagu syahdu 'Zona Nyaman' dan 'Fana Merah Jambu'.",
    image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&auto=format&fit=crop&q=80",
    category: "Indie",
  },
];

export default function DashboardContent({ user }: DashboardContentProps) {
  const [activeTab, setActiveTab] = useState("beranda");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  
  // Fetch tickets from database dynamically
  const [myTickets, setMyTickets] = useState<DBTicket[]>([]);

  useEffect(() => {
    async function fetchTickets() {
      try {
        const res = await fetch("/api/tickets");
        if (res.ok) {
          const data = await res.json();
          setMyTickets(data);
        }
      } catch (err) {
        console.error("Failed to fetch tickets:", err);
      }
    }
    fetchTickets();
  }, []);

  const [selectedConcert, setSelectedConcert] = useState<Concert | null>(null);

  // Buy Ticket Handler
  async function handleBuyTicket(name: string) {
    const existing = myTickets.find((t) => t.concertName === name);
    if (existing) {
      if (existing.status === "PAID") {
        alert("Tiket ini sudah lunas (PAID) dan tidak dapat dibatalkan.");
        return;
      }
      await handleRefundTicket(existing.id);
    } else {
      const concert = DUMMY_CONCERTS.find((c) => c.name === name);
      if (!concert) return;

      try {
        const res = await fetch("/api/tickets", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            concertId: concert.id,
            concertName: concert.name,
            price: concert.price,
          }),
        });

        if (res.ok) {
          const newTicket = await res.json();
          setMyTickets((prev) => [newTicket, ...prev]);
        }
      } catch (err) {
        console.error("Failed to buy ticket:", err);
      }
    }
  }

  // Refund Ticket Handler
  async function handleRefundTicket(id: string) {
    try {
      const res = await fetch(`/api/tickets/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setMyTickets((prev) => prev.filter((t) => t.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete ticket:", err);
    }
  }

  // Filter concerts based on search & category tabs
  const filteredConcerts = DUMMY_CONCERTS.filter((concert) => {
    const matchesSearch =
      concert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      concert.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory =
      selectedCategory === "Semua" || concert.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const categories = ["Semua", "Pop", "Rock", "Indie", "Jazz", "Folk", "R&B"];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* Reusable Navbar */}
      <Navbar
        userName={user.name}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Body */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* TAB 1 & 2: BERANDA & KONSER */}
        {(activeTab === "beranda" || activeTab === "konser") && (
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            
            {/* Column Left (70%) */}
            <div className="w-full lg:w-[70%] space-y-6">
              
              {/* Hero / Filter Bar */}
              <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Daftar Konser</h2>
                    <p className="text-sm text-slate-500">Temukan dan amankan tiket konser favorit Anda sekarang</p>
                  </div>
                  
                  {/* Search Bar */}
                  <div className="relative w-full sm:max-w-xs">
                    <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Cari konser atau lokasi..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Category Toggles */}
                <div className="flex flex-wrap items-center gap-1.5 pt-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                        selectedCategory === cat
                          ? "bg-blue-600 text-white shadow-sm"
                          : "bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Concerts Grid */}
              {filteredConcerts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {filteredConcerts.map((concert) => (
                    <ConcertCard
                      key={concert.id}
                      concert={concert}
                      onBuyTicket={handleBuyTicket}
                      isBought={myTickets.some((t) => t.concertName === concert.name)}
                      onShowDetail={setSelectedConcert}
                    />
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-slate-100 bg-white p-12 text-center shadow-sm">
                  <AlertCircle className="mx-auto h-12 w-12 text-slate-300 stroke-[1.5]" />
                  <h3 className="mt-4 text-base font-bold text-slate-800">Konser tidak ditemukan</h3>
                  <p className="mt-1 text-sm text-slate-500">Coba ganti kata kunci pencarian atau kategori filter Anda.</p>
                </div>
              )}
            </div>

            {/* Column Right (30%) */}
            <aside className="w-full lg:w-[30%] shrink-0">
              <TicketList
                tickets={myTickets}
                onRefundTicket={handleRefundTicket}
              />
            </aside>

          </div>
        )}

        {/* TAB 3: TIKET SAYA (DEDICATED FULL VIEW) */}
        {activeTab === "tiket-saya" && (
          <div className="max-w-2xl mx-auto">
            <TicketList
              tickets={myTickets}
              onRefundTicket={handleRefundTicket}
            />
          </div>
        )}

        {/* TAB 4: TENTANG KAMI */}
        {activeTab === "tentang" && (
          <div className="max-w-3xl mx-auto rounded-2xl border border-slate-100 bg-white p-8 shadow-sm space-y-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Info className="h-6 w-6" />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-slate-900">Tentang Aplikasi Tiket Konser</h2>
              <p className="text-sm text-slate-500 leading-relaxed">
                Aplikasi ini dikembangkan sebagai tugas kuliah menggunakan teknologi modern Next.js 15, Tailwind CSS, Prisma, PostgreSQL, dan JWT (JSON Web Tokens). Dirancang dengan fokus pada kegunaan, performa cepat, dan tampilan yang modern/minimalis.
              </p>
            </div>

            <div className="border-t border-slate-100 pt-6">
              <h3 className="text-sm font-bold text-slate-800 mb-3">Fitur Utama Aplikasi:</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600 font-medium">
                <li className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-blue-500" />
                  <span>Autentikasi Aman dengan JWT</span>
                </li>
                <li className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-blue-500" />
                  <span>Database Relasional (PostgreSQL & Prisma)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-blue-500" />
                  <span>Pencarian dan Filter Konser Interaktif</span>
                </li>
                <li className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-blue-500" />
                  <span>Beli dan Batalkan Tiket (Simulasi State)</span>
                </li>
              </ul>
            </div>

            <div className="border-t border-slate-100 pt-6 flex items-center justify-between text-xs text-slate-400">
              <span>Mata Kuliah: Pemrograman Web</span>
              <span>Dibuat oleh: Aulia Nurul Husna</span>
            </div>
          </div>
        )}

      </main>

      {/* Detail Concert Modal */}
      {selectedConcert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm transition-opacity duration-300">
          <div className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl animate-in zoom-in-95 duration-200">
            
            {/* Modal Image */}
            <div className="relative aspect-[16/9] w-full bg-slate-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedConcert.image}
                alt={selectedConcert.name}
                className="h-full w-full object-cover"
              />
              <button
                onClick={() => setSelectedConcert(null)}
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-slate-950/60 text-white backdrop-blur-sm transition-transform hover:scale-105"
              >
                &times;
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-slate-900">{selectedConcert.name}</h3>
              
              <div className="mt-4 space-y-2.5 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4.5 w-4.5 text-slate-400" />
                  <span>{selectedConcert.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4.5 w-4.5 text-slate-400" />
                  <span>{selectedConcert.location}</span>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wide">Deskripsi Lengkap</h4>
                <p className="mt-1 text-sm leading-relaxed text-slate-500">{selectedConcert.description}</p>
              </div>

              {/* Action Row */}
              <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                <div>
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Harga Tiket</span>
                  <p className="text-lg font-extrabold text-slate-900">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      maximumFractionDigits: 0,
                    }).format(selectedConcert.price)}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedConcert(null)}
                    className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                  >
                    Tutup
                  </button>
                  {(() => {
                    const hasTicket = myTickets.find(t => t.concertName === selectedConcert.name);
                    const isPaid = hasTicket?.status === "PAID";
                    return (
                      <button
                        onClick={() => {
                          if (isPaid) return;
                          handleBuyTicket(selectedConcert.name);
                          setSelectedConcert(null);
                        }}
                        disabled={isPaid}
                        className={`flex items-center gap-1.5 rounded-xl px-5 py-2.5 text-sm font-bold text-white transition-all ${
                          isPaid
                            ? "bg-emerald-600 opacity-90 cursor-not-allowed"
                            : hasTicket
                            ? "bg-red-500 hover:bg-red-600 shadow-md shadow-red-500/20"
                            : "bg-blue-600 shadow-md shadow-blue-500/20 hover:bg-blue-500"
                        }`}
                      >
                        <Tag className="h-4 w-4" />
                        <span>
                          {isPaid
                            ? "Lunas (Dimiliki)"
                            : hasTicket
                            ? "Batalkan Tiket"
                            : "Beli Tiket"}
                        </span>
                      </button>
                    );
                  })()}
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* Page Footer */}
      <footer className="border-t border-slate-100 bg-white py-6">
        <div className="mx-auto max-w-7xl px-4 text-center text-xs text-slate-400">
          &copy; {new Date().getFullYear()} Tiket Konser Dashboard. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
