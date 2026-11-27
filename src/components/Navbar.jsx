"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Avatar, Dropdown, Label } from "@heroui/react";
import { LuMenu, LuX, LuLogOut, LuUser, LuTicket, LuLayoutDashboard } from "react-icons/lu";
import { signOut, useSession } from "@/lib/auth-client";

const links = [
  { href: "/", label: "Home" },
  { href: "/destinations", label: "Destinations" },
  { href: "/my-bookings", label: "My Bookings" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const user = session?.user;
  // Menu auto-closes on navigation: it's only "open" for the path it was opened on
  const [openOn, setOpenOn] = useState(null);
  const open = openOn === pathname;
  const setOpen = (fn) => setOpenOn((cur) => (fn(cur === pathname) ? pathname : null));
  const [scrolled, setScrolled] = useState(false);

  // Transparent over the home hero, solid elsewhere / once scrolled
  const overHero = pathname === "/" && !scrolled && !open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const navLinks = user?.role === "admin" ? [...links, { href: "/admin", label: "Admin" }] : links;

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        overHero ? "bg-transparent text-white" : "border-b border-line bg-white/90 text-ink shadow-sm backdrop-blur-lg"
      }`}
    >
      <nav className="container-x flex h-18 items-center justify-between gap-6">
        <Link href="/" aria-label="Wanderlust home" className="shrink-0">
          <Image
            src="/assets/Wanderlast.png"
            alt="Wanderlust"
            width={150}
            height={22}
            priority
            className={`h-auto w-[132px] transition ${overHero ? "brightness-0 invert" : ""}`}
          />
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition ${
                  isActive(l.href)
                    ? overHero
                      ? "bg-white/20"
                      : "bg-brand-light text-brand"
                    : overHero
                      ? "hover:bg-white/10"
                      : "text-muted hover:text-ink"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          {isPending ? (
            <div className="h-9 w-24 animate-pulse rounded-full bg-black/10" />
          ) : user ? (
            <Dropdown>
              <Dropdown.Trigger className="flex items-center gap-2 rounded-full p-1 pr-3 outline-none transition hover:bg-black/5">
                <Avatar size="sm">
                  {user.image && <Avatar.Image src={user.image} alt={user.name} />}
                  <Avatar.Fallback className="bg-brand text-white">{user.name?.[0]?.toUpperCase()}</Avatar.Fallback>
                </Avatar>
                <span className="max-w-28 truncate text-sm font-medium">{user.name}</span>
              </Dropdown.Trigger>
              <Dropdown.Popover placement="bottom end" className="min-w-52">
                <Dropdown.Menu
                  onAction={(key) => (key === "logout" ? handleSignOut() : router.push(String(key)))}
                >
                  <Dropdown.Item id="/profile" textValue="Profile">
                    <LuUser /> <Label>My Profile</Label>
                  </Dropdown.Item>
                  <Dropdown.Item id="/my-bookings" textValue="My Bookings">
                    <LuTicket /> <Label>My Bookings</Label>
                  </Dropdown.Item>
                  {user.role === "admin" && (
                    <Dropdown.Item id="/admin" textValue="Admin">
                      <LuLayoutDashboard /> <Label>Admin Dashboard</Label>
                    </Dropdown.Item>
                  )}
                  <Dropdown.Item id="logout" textValue="Log out" variant="danger">
                    <LuLogOut /> <Label>Log out</Label>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown>
          ) : (
            <>
              <Link href="/login" className="px-3 py-2 text-sm font-medium">
                Login
              </Link>
              <Link href="/signup" className="btn-brand !px-5 !py-2.5">
                Sign Up
              </Link>
            </>
          )}
        </div>

        <button
          className="rounded-lg p-2 md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <LuX size={24} /> : <LuMenu size={24} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-line bg-white px-5 pb-6 pt-2 text-ink md:hidden">
          <ul className="flex flex-col">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`block border-b border-line py-3 ${isActive(l.href) ? "font-semibold text-brand" : ""}`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
            {user && (
              <li>
                <Link href="/profile" className="block border-b border-line py-3">
                  My Profile
                </Link>
              </li>
            )}
          </ul>
          <div className="mt-4 flex gap-3">
            {user ? (
              <button onClick={handleSignOut} className="btn-brand w-full">
                Log out
              </button>
            ) : (
              <>
                <Link href="/login" className="flex-1 rounded-lg border border-line py-3 text-center text-sm font-semibold">
                  Login
                </Link>
                <Link href="/signup" className="btn-brand flex-1">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
