"use client";

import React from "react";
import { DBTicket } from "../../dashboard/components/TicketList";
import { Calendar, MapPin, Tag } from "lucide-react";

interface TicketCardProps {
  ticket: DBTicket;
}

// 10 Dummy Concerts Data to match information
const DUMMY_CONCERTS = [
  {
    name: "Coldplay: Music of the Spheres",
    location: "Stadion Utama Gelora Bung Karno, Jakarta",
    date: "15 November 2026",
    image: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=600&auto=format&fit=crop&q=80",
  },
  {
    name: "Sheila On 7: Tunggu Aku Di",
    location: "Stadion Kridosono, Yogyakarta",
    date: "20 Desember 2026",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop&q=80",
  },
  {
    name: "Hindia: Lagipula Hidup Akan Berakhir",
    location: "Tennis Indoor Senayan, Jakarta",
    date: "12 Oktober 2026",
    image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=600&auto=format&fit=crop&q=80",
  },
  {
    name: "Tulus: Konser Monokrom",
    location: "Sabuga, Bandung",
    date: "05 September 2026",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80",
  },
  {
    name: "Noah: The Great Journey",
    location: "Ancol Beach City, Jakarta",
    date: "18 Januari 2027",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&auto=format&fit=crop&q=80",
  },
  {
    name: "Dewa 19: 30 Tahun Berkarya",
    location: "Stadion Manahan, Solo",
    date: "08 November 2026",
    image: "https://images.unsplash.com/photo-1489641499593-95edf2244e31?w=600&auto=format&fit=crop&q=80",
  },
  {
    name: "Pamungkas: Solipsism Tour",
    location: "Grand City Hall, Surabaya",
    date: "22 September 2026",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&auto=format&fit=crop&q=80",
  },
  {
    name: "Raisa: Live in Concert",
    location: "Jatim Park 3, Batu",
    date: "04 Oktober 2026",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80",
  },
  {
    name: "Nadin Amizah: Selamat Ulang Tahun",
    location: "Salihara Arts Center, Jakarta",
    date: "19 Agustus 2026",
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=600&auto=format&fit=crop&q=80",
  },
  {
    name: "Fourtwnty: Nalar Tour",
    location: "Lapangan Koni, Denpasar",
    date: "30 Oktober 2026",
    image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&auto=format&fit=crop&q=80",
  },
];

export default function TicketCard({ ticket }: TicketCardProps) {
  // Temukan relasi konser detail dari nama tiket
  const details = DUMMY_CONCERTS.find((c) => c.name === ticket.concertName) || {
    location: "Lokasi tidak tersedia",
    date: "Tanggal tidak tersedia",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop&q=80",
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <article className="flex gap-4 p-4 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
      {/* Concert Photo */}
      <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded-xl bg-slate-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={details.image}
          alt={ticket.concertName}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Ticket Details */}
      <div className="flex flex-col justify-between flex-1 py-1">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-slate-800 line-clamp-1">
            {ticket.concertName}
          </h3>
          <div className="flex flex-col sm:flex-row gap-1.5 sm:gap-4 mt-2 text-xs text-slate-400 font-semibold">
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              <span>{details.date}</span>
            </span>
            <span className="flex items-center gap-1 line-clamp-1">
              <MapPin className="h-3.5 w-3.5" />
              <span>{details.location}</span>
            </span>
          </div>
        </div>

        {/* Price Tag */}
        <div className="flex items-center justify-between mt-2.5">
          <span className="flex items-center gap-1 text-[10px] font-bold text-slate-400 tracking-wider uppercase">
            <Tag className="h-3.5 w-3.5 text-slate-400" />
            <span>Kategori E-Ticket</span>
          </span>
          <span className="text-sm font-extrabold text-blue-600">
            {formatPrice(ticket.price)}
          </span>
        </div>
      </div>
    </article>
  );
}
