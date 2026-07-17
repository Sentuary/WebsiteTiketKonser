"use client";

import React from "react";

interface PaymentMethodCardProps {
  id: string;
  name: string;
  icon: React.ReactNode;
  selected: boolean;
  onSelect: () => void;
}

export default function PaymentMethodCard({
  id,
  name,
  icon,
  selected,
  onSelect,
}: PaymentMethodCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all text-left ${
        selected
          ? "border-blue-600 bg-blue-50/40 ring-1 ring-blue-600/30"
          : "border-slate-200 bg-white hover:bg-slate-50/50 hover:border-slate-300"
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-12 items-center justify-center rounded-lg bg-slate-50 border border-slate-100 p-1">
          {icon}
        </div>
        <span className="text-sm font-semibold text-slate-800">{name}</span>
      </div>

      <div className="flex items-center">
        <input
          type="radio"
          id={id}
          name="payment-method"
          checked={selected}
          onChange={onSelect}
          className="h-4.5 w-4.5 text-blue-600 focus:ring-blue-500 border-slate-300 cursor-pointer"
        />
      </div>
    </button>
  );
}
