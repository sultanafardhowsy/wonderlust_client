"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "@heroui/react";
import { FaXTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa6";
import { LuArrowUpRight, LuPhone, LuMail } from "react-icons/lu";
import { api } from "@/lib/api";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const subscribe = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api("/newsletter", { method: "POST", body: { email } });
      toast.success("You're subscribed! Watch your inbox for deals.");
      setEmail("");
    } catch (err) {
      toast.danger(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="mt-24 bg-ink text-white/60">
      <div className="container-x py-16">
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="font-display text-6xl font-bold tracking-tight text-white md:text-8xl">Wanderlust</p>
            <p className="mt-4 max-w-md">Your gateway to extraordinary travel experiences around the world.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-white">Newsletter</h3>
            <p className="mb-4 text-sm">Subscribe for exclusive travel deals and inspiration.</p>
            <form onSubmit={subscribe} className="flex items-center rounded-lg bg-white/10 pl-4 ring-1 ring-white/10 focus-within:ring-brand">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                aria-label="Email address"
                className="flex-1 bg-transparent py-3 text-sm text-white outline-none placeholder:text-white/40"
              />
              <button
                type="submit"
                disabled={loading}
                aria-label="Subscribe"
                className="m-1 rounded-md bg-brand p-2.5 text-white transition hover:bg-brand-dark disabled:opacity-50"
              >
                <LuArrowUpRight />
              </button>
            </form>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-white">Quick Links</h3>
            <ul className="space-y-2.5 text-sm">
              {[
                ["/", "Home"],
                ["/destinations", "Destinations"],
                ["/my-bookings", "My Bookings"],
                ["/profile", "My Profile"],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="transition hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-white">Support</h3>
            <ul className="space-y-2.5 text-sm">
              <li>Help Center</li>
              <li>Terms of Service</li>
              <li>Privacy Policy</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-white">Contact Us</h3>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center gap-2">
                <LuPhone /> 786 901 1622
              </li>
              <li className="flex items-center gap-2">
                <LuMail /> info@wanderlust.com
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 md:flex-row">
          <p className="text-sm">© {new Date().getFullYear()} Wanderlust. All rights reserved.</p>
          <div className="flex gap-3">
            {[
              [FaXTwitter, "X"],
              [FaLinkedinIn, "LinkedIn"],
              [FaInstagram, "Instagram"],
            ].map(([Icon, label]) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="grid size-9 place-items-center rounded-full bg-white/10 text-white transition hover:bg-brand"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
