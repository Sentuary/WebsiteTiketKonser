"use client";

import { CheckCircle2, Ticket, Trash2, ArrowRight } from "lucide-react";
import Link from "next/link";

export interface DBTicket {
  id: string;
  concertId: string;
  concertName: string;
  price: number;
  status: string; // "PENDING" | "PAID"
}

interface TicketListProps {
  tickets: DBTicket[];
  onRefundTicket: (id: string) => void;
}

export default function TicketList({ tickets, onRefundTicket }: TicketListProps) {
  // Hitung jumlah tiket yang berstatus PENDING
  const pendingTicketsCount = tickets.filter(t => t.status === "PENDING").length;

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <Ticket className="h-5 w-5 text-blue-600" />
        <h2 className="text-lg font-bold text-slate-800">Tiket Saya</h2>
      </div>

      {tickets.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-50 text-slate-400 mb-3">
            <Ticket className="h-6 w-6 stroke-[1.5]" />
          </div>
          <p className="text-sm text-slate-400">Belum ada tiket yang dibeli.</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="space-y-3">
            {tickets.map((ticket) => {
              const isPaid = ticket.status === "PAID";
              return (
                <div
                  key={ticket.id}
                  className="group relative flex items-center justify-between overflow-hidden rounded-xl border border-slate-100 bg-slate-50/50 p-4 transition-all hover:bg-slate-50 hover:border-slate-200"
                >
                  {/* Ticket design accents (side notches) */}
                  <div className="absolute -left-1.5 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-white border-r border-slate-200/40" />
                  <div className="absolute -right-1.5 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-white border-l border-slate-200/40" />

                  <div className="flex items-center gap-3 pl-1">
                    <CheckCircle2
                      className={`h-5 w-5 shrink-0 ${
                        isPaid ? "text-emerald-500" : "text-amber-500"
                      }`}
                    />
                    <div className="text-left">
                      <h4 className="text-sm font-bold text-slate-800 line-clamp-1">
                        {ticket.concertName}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] font-semibold text-slate-400 tracking-wide uppercase">
                          E-Ticket
                        </span>
                        <span>&bull;</span>
                        <span
                          className={`rounded px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                            isPaid
                              ? "bg-emerald-50 text-emerald-600"
                              : "bg-amber-50 text-amber-600"
                          }`}
                        >
                          {isPaid ? "Lunas" : "Belum Bayar"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Refund/Hapus Button hanya aktif jika belum bayar (PENDING) */}
                  {!isPaid ? (
                    <button
                      onClick={() => onRefundTicket(ticket.id)}
                      aria-label={`Refund tiket ${ticket.concertName}`}
                      className="rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  ) : (
                    <span className="text-xs font-semibold text-emerald-600 pr-1">Paid</span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Ticket count info */}
          <div className="border-t border-slate-100 pt-3 flex items-center justify-between text-xs font-semibold text-slate-400">
            <span>Total: {tickets.length} Tiket</span>
            {pendingTicketsCount > 0 && (
              <span className="text-amber-600">{pendingTicketsCount} Belum Dibayar</span>
            )}
          </div>

          {/* Checkout Tiket Button - Hanya tampil jika jumlah tiket > 0 dan ada tiket PENDING */}
          {pendingTicketsCount > 0 && (
            <Link
              href="/ticket-list"
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-bold text-white shadow-md shadow-blue-500/20 hover:bg-blue-500 transition-all hover:shadow-blue-500/30 active:scale-[0.98]"
            >
              <span>Checkout Tiket</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
