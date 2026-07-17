"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DBTicket } from "../../dashboard/components/TicketList";
import TicketCard from "./TicketCard";
import PaymentModal from "./PaymentModal";
import PaymentSuccessModal from "./PaymentSuccessModal";
import { Ticket, ArrowLeft, Loader2, CreditCard } from "lucide-react";
import Link from "next/link";

interface CheckoutShellProps {
  userName: string;
}

export default function CheckoutShell({ userName }: CheckoutShellProps) {
  const router = useRouter();
  const [tickets, setTickets] = useState<DBTicket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Modals state
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  // Fetch pending tickets on mount
  useEffect(() => {
    async function fetchPendingTickets() {
      try {
        const res = await fetch("/api/tickets");
        if (res.ok) {
          const data = await res.json();
          // Hanya tampilkan tiket yang belum dibayar (PENDING)
          const pending = data.filter((t: DBTicket) => t.status === "PENDING");
          setTickets(pending);
        }
      } catch (err) {
        console.error("Failed to load tickets:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPendingTickets();
  }, []);

  // Total price calculation
  const totalPrice = tickets.reduce((sum, ticket) => sum + ticket.price, 0);

  // Function to finalize purchase in Database (calling bulk checkout API)
  async function finalizePayment() {
    try {
      const res = await fetch("/api/tickets/checkout", {
        method: "POST",
      });
      if (res.ok) {
        setIsSuccessModalOpen(true);
      } else {
        alert("Gagal memproses checkout. Silakan coba kembali.");
      }
    } catch (err) {
      console.error("Checkout submission failed:", err);
    }
  }

  // Redirect to dashboard handler
  function handleGoToDashboard() {
    setIsSuccessModalOpen(false);
    router.refresh();
    router.push("/dashboard");
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center space-y-2">
          <Loader2 className="h-10 w-10 animate-spin text-blue-600 mx-auto" />
          <p className="text-sm font-semibold text-slate-500">Memuat rincian pesanan...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-12">
      {/* Mini-Header */}
      <header className="sticky top-0 z-10 h-[70px] w-full border-b border-slate-100 bg-white shadow-sm flex items-center">
        <div className="mx-auto w-full max-w-3xl px-4 flex items-center justify-between">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors text-sm font-semibold"
          >
            <ArrowLeft className="h-4.5 w-4.5" />
            <span>Kembali</span>
          </Link>
          <span className="text-sm text-slate-500 font-semibold">
            Halo, <strong className="text-slate-800">{userName}</strong>
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 mt-8 space-y-6">
        
        {/* Title */}
        <div className="flex items-center gap-2">
          <Ticket className="h-6 w-6 text-blue-600" />
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Tiket Saya</h1>
        </div>

        {tickets.length === 0 ? (
          <div className="rounded-2xl border border-slate-100 bg-white p-12 text-center shadow-sm">
            <Ticket className="mx-auto h-12 w-12 text-slate-300 stroke-[1.5] mb-3" />
            <h3 className="text-base font-bold text-slate-800">Tidak ada pesanan pending</h3>
            <p className="mt-1 text-sm text-slate-500">Semua tiket Anda sudah lunas atau Anda belum memilih konser apa pun.</p>
            <Link
              href="/dashboard"
              className="mt-6 inline-flex rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-blue-500 transition-all"
            >
              Cari Konser
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {/* List of checkout items */}
            <div className="space-y-3.5">
              {tickets.map((ticket) => (
                <TicketCard key={ticket.id} ticket={ticket} />
              ))}
            </div>

            {/* Price Calculations */}
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm space-y-4">
              <h2 className="text-base font-bold text-slate-950">Ringkasan Pembayaran</h2>
              
              <div className="space-y-2.5 text-sm font-semibold text-slate-500">
                <div className="flex items-center justify-between">
                  <span>Total Item</span>
                  <span className="text-slate-800">{tickets.length} Tiket</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Biaya Layanan</span>
                  <span className="text-slate-800 text-emerald-500 font-bold">Rp 0 (FREE)</span>
                </div>
              </div>

              <div className="h-px bg-slate-100 my-4" />

              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-800">Total Harga</span>
                <span className="text-lg font-extrabold text-blue-600">{formatPrice(totalPrice)}</span>
              </div>

              <button
                type="button"
                onClick={() => setIsPaymentModalOpen(true)}
                className="w-full mt-4 flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/25 hover:bg-blue-500 hover:shadow-blue-500/35 transition-all active:scale-[0.98]"
              >
                <CreditCard className="h-4.5 w-4.5" />
                <span>Checkout Pesanan</span>
              </button>
            </div>
          </div>
        )}

      </main>

      {/* Simulated Payment Gateway Drawer/Popup */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onPaymentSuccess={() => {
          setIsPaymentModalOpen(false);
          finalizePayment();
        }}
        totalPrice={totalPrice}
      />

      {/* Payment Success Confirmed Popup */}
      <PaymentSuccessModal
        isOpen={isSuccessModalOpen}
        onConfirm={handleGoToDashboard}
      />
    </div>
  );
}
