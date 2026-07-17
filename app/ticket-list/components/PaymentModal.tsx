"use client";

import React, { useState } from "react";
import PaymentMethodCard from "./PaymentMethodCard";
import { Loader2, CreditCard, Wallet, Smartphone, ShieldCheck, QrCode } from "lucide-react";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess: () => void;
  totalPrice: number;
}

export default function PaymentModal({
  isOpen,
  onClose,
  onPaymentSuccess,
  totalPrice,
}: PaymentModalProps) {
  const [selectedMethod, setSelectedMethod] = useState("qris");
  const [isPaying, setIsPaying] = useState(false);

  if (!isOpen) return null;

  const paymentMethods = [
    {
      id: "qris",
      name: "QRIS",
      icon: <QrCode className="h-6 w-6 text-indigo-600" />,
    },
    {
      id: "bca",
      name: "Transfer Bank BCA",
      icon: <CreditCard className="h-6 w-6 text-blue-600" />,
    },
    {
      id: "bni",
      name: "Transfer Bank BNI",
      icon: <CreditCard className="h-6 w-6 text-amber-600" />,
    },
    {
      id: "mandiri",
      name: "Transfer Bank Mandiri",
      icon: <CreditCard className="h-6 w-6 text-blue-700" />,
    },
    {
      id: "gopay",
      name: "GoPay",
      icon: <Wallet className="h-6 w-6 text-emerald-500" />,
    },
    {
      id: "ovo",
      name: "OVO",
      icon: <Wallet className="h-6 w-6 text-purple-600" />,
    },
    {
      id: "dana",
      name: "DANA",
      icon: <Smartphone className="h-6 w-6 text-sky-500" />,
    },
  ];

  async function handlePaymentSubmit() {
    setIsPaying(true);
    // Simulasi loading 2 detik seperti Midtrans
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsPaying(false);
    onPaymentSuccess();
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl animate-in zoom-in-95 duration-200">
        
        {/* Header Modal */}
        <div className="border-b border-slate-100 bg-slate-50/50 p-5 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-950">Pilih Metode Pembayaran</h3>
            <p className="text-xs text-slate-500 mt-0.5">Silakan pilih metode pembayaran.</p>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Total Tagihan</span>
            <span className="text-base font-extrabold text-blue-600">{formatPrice(totalPrice)}</span>
          </div>
        </div>

        {/* List Metode Pembayaran */}
        <div className="p-5 max-h-[350px] overflow-y-auto space-y-2.5">
          {paymentMethods.map((method) => (
            <PaymentMethodCard
              key={method.id}
              id={method.id}
              name={method.name}
              icon={method.icon}
              selected={selectedMethod === method.id}
              onSelect={() => setSelectedMethod(method.id)}
            />
          ))}
        </div>

        {/* Footer Modal */}
        <div className="border-t border-slate-100 bg-slate-50/50 p-5">
          <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-medium justify-center mb-4">
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
            <span>Pembayaran terenkripsi dan aman (Simulasi)</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isPaying}
              className="w-full rounded-xl border border-slate-200 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors disabled:opacity-50"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={handlePaymentSubmit}
              disabled={isPaying}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-bold text-white shadow-md shadow-blue-500/20 hover:bg-blue-500 transition-colors disabled:opacity-80 disabled:cursor-not-allowed"
            >
              {isPaying ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Memproses...</span>
                </>
              ) : (
                <span>Bayar Sekarang</span>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
