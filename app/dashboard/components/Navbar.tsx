"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Ticket, LogOut, Menu, X, User } from "lucide-react";

interface NavbarProps {
  userName: string;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Navbar({ userName, activeTab, setActiveTab }: NavbarProps) {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const menuItems = [
    { id: "beranda", name: "Beranda" },
    { id: "tiket-saya", name: "Tiket Saya" },
    { id: "tentang", name: "Tentang" },
  ];

  async function handleLogout() {
    if (isLoggingOut) return;
    setIsLoggingOut(true);

    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (response.ok) {
        router.refresh();
        router.push("/login");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoggingOut(false);
    }
  }

  return (
    <header className="sticky top-0 z-50 h-[70px] w-full border-b border-slate-100 bg-white/80 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Left Section: Logo */}
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/25">
            <Ticket className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold text-slate-900 tracking-tight">
           KonserYuk
          </span>
        </div>

        {/* Middle Section: Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                activeTab === item.id
                  ? "bg-blue-50 text-blue-600"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              {item.name}
            </button>
          ))}
        </nav>

        {/* Right Section: User & Logout */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 border border-slate-200">
              <User className="h-5 w-5" />
            </div>
            <div className="text-left leading-tight">
              <p className="text-xs text-slate-400 font-medium">Halo,</p>
              <p className="text-sm font-semibold text-slate-800">{userName}</p>
            </div>
          </div>

          <div className="h-6 w-px bg-slate-200" />

          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex items-center gap-2 rounded-lg border border-slate-200 px-3.5 py-2 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 disabled:opacity-50"
          >
            <LogOut className="h-4 w-4" />
            <span>{isLoggingOut ? "Keluar..." : "Logout"}</span>
          </button>
        </div>

        {/* Mobile Hamburger Trigger */}
        <div className="flex md:hidden items-center gap-3">
          {/* Small Avatar for Mobile */}
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600">
            <User className="h-4 w-4" />
          </div>
          
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="rounded-lg p-1.5 text-slate-600 hover:bg-slate-50 hover:text-slate-950"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-slate-100 bg-white px-4 py-4 shadow-inner space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-left rounded-lg px-4 py-2.5 text-sm font-semibold transition-all ${
                  activeTab === item.id
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600">
                <User className="h-4.5 w-4.5" />
              </div>
              <div className="leading-tight">
                <p className="text-[10px] text-slate-400">Halo,</p>
                <p className="text-xs font-semibold text-slate-800">{userName}</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition-all hover:bg-red-50 hover:text-red-600 hover:border-red-100 disabled:opacity-50"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
