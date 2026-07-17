"use client";

import { MapPin, Calendar, Tag } from "lucide-react";

export interface Concert {
  id: string;
  name: string;
  location: string;
  date: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

interface ConcertCardProps {
  concert: Concert;
  onBuyTicket: (name: string) => void;
  isBought: boolean;
  onShowDetail: (concert: Concert) => void;
}

export default function ConcertCard({ concert, onBuyTicket, isBought, onShowDetail }: ConcertCardProps) {
  // Format price to IDR Currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
      {/* Concert Image Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={concert.image}
          alt={concert.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Category tag */}
        <span className="absolute left-3 top-3 rounded-full bg-slate-900/70 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-sm uppercase tracking-wider">
          {concert.category}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold text-slate-800 line-clamp-1 group-hover:text-blue-600 transition-colors duration-200">
          {concert.name}
        </h3>

        {/* Date and Location */}
        <div className="mt-3.5 space-y-2 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 shrink-0 text-slate-400" />
            <time dateTime={concert.date}>{concert.date}</time>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 shrink-0 text-slate-400" />
            <span className="line-clamp-1">{concert.location}</span>
          </div>
        </div>

        {/* Description */}
        <p className="mt-3 text-xs leading-relaxed text-slate-400 line-clamp-2">
          {concert.description}
        </p>

        {/* Divider */}
        <div className="my-4 h-px bg-slate-100" />

        {/* Price & Action Row */}
        <div className="mt-auto space-y-3.5">
          <div className="flex flex-col">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Harga Mulai</span>
            <span className="text-base font-extrabold text-blue-600">{formatPrice(concert.price)}</span>
          </div>

          <div className="grid grid-cols-2 gap-2 w-full">
            <button
              onClick={() => onShowDetail(concert)}
              className="w-full rounded-xl border border-slate-200 py-2.5 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-800 flex items-center justify-center"
            >
              Detail
            </button>
            <button
              onClick={() => onBuyTicket(concert.name)}
              className={`w-full flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-xs font-bold transition-all ${
                isBought
                  ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
                  : "bg-blue-600 text-white shadow-md shadow-blue-500/20 hover:bg-blue-500 hover:shadow-blue-500/30"
              }`}
            >
              <Tag className="h-3.5 w-3.5" />
              <span className="whitespace-nowrap">{isBought ? "Dimiliki" : "Beli Tiket"}</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
