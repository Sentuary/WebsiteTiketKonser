"use client";

import React from "react";
import { CheckCircle } from "lucide-react";

interface PaymentSuccessModalProps {
  isOpen: boolean;
  onConfirm: () => void;
}

export default function PaymentSuccessModal({
  isOpen,
  onConfirm,
}: PaymentSuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl animate-in zoom-in-95 duration-200 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-4">
          <CheckCircle className="h-10 w-10 stroke-[2]" />
        </div>

        <h3 className="text-xl font-bold text-slate-900">Pembayaran Berhasil</h3>
        <p className="mt-2 text-sm text-slate-500 leading-relaxed">
          Terima kasih telah melakukan pembelian tiket.
        </p>

        <button
          type="button"
          onClick={onConfirm}
          className="mt-6 w-full rounded-xl bg-blue-600 py-3 text-sm font-bold text-white shadow-md shadow-blue-500/20 hover:bg-blue-500 hover:shadow-blue-500/30 transition-all active:scale-[0.98]"
        >
          Kembali ke Dashboard
        </button>
      </div>
    </div>
  );
}
