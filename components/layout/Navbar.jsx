"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/Button";

const NAV_LINKS = [
{ href: "/", label: "Home" },
{ href: "/booking", label: "Book a Service" },
{ href: "/about", label: "About" },
];

export function Navbar() {
const [open, setOpen] = useState(false);
const pathname = usePathname();
const router = useRouter();

// Next.js <Link> only triggers a navigation when the target route
// differs from the current one. If we're already on "/" and scrolled
// down, clicking "Home" does nothing, so we scroll to the top manually.
const handleNavClick = (href) => (e) => {
setOpen(false);

```
if (href === "/" && pathname === "/") {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
} else if (href === "/") {
  // Navigating to home from another page.
  e.preventDefault();
  router.push(href);

  requestAnimationFrame(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  });
}
```

};

return ( <header className="sticky top-0 z-40 border-b border-border bg-surface/80 backdrop-blur"> <div className="mx-auto flex h-16 max-w-6xl items-center justify-between pl-4 pr-6 sm:pl-6">
<Link
href="/"
onClick={handleNavClick("/")}
className="rounded-[--radius-md] border border-brand-100 bg-brand-50 px-3 py-1.5 font-display text-lg font-bold text-ink"
>
Service<span className="text-brand-600">Hub</span> </Link>

```
    <nav className="hidden items-center gap-1 md:flex">
      {NAV_LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={handleNavClick(link.href)}
          className="rounded-full px-4 py-2 text-sm font-medium text-ink-muted transition-colors hover:bg-brand-50 hover:text-brand-700"
        >
          {link.label}
        </Link>
      ))}
    </nav>

    <div className="hidden items-center gap-3 md:flex">
      <Link
        href="/login"
        className="text-sm font-medium text-ink-muted hover:text-ink"
      >
        Log in
      </Link>

      <Link href="/booking">
        <Button size="md">Book Now</Button>
      </Link>
    </div>

    <button
      type="button"
      onClick={() => setOpen((v) => !v)}
      className="flex size-10 items-center justify-center rounded-full border border-border text-ink md:hidden"
      aria-label="Toggle menu"
    >
      {open ? <X className="size-5" /> : <Menu className="size-5" />}
    </button>
  </div>

  {open && (
    <div className="border-t border-border bg-surface px-4 py-4 md:hidden">
      <nav className="flex flex-col gap-1">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={handleNavClick(link.href)}
            className="rounded-[--radius-md] px-3 py-2.5 text-sm font-medium text-ink-muted hover:bg-brand-50 hover:text-brand-700"
          >
            {link.label}
          </Link>
        ))}

        <Link
          href="/login"
          onClick={() => setOpen(false)}
          className="rounded-[--radius-md] px-3 py-2.5 text-sm font-medium text-ink-muted hover:bg-brand-50 hover:text-brand-700"
        >
          Log in
        </Link>
      </nav>

      <Link
        href="/booking"
        onClick={() => setOpen(false)}
        className="mt-3 block"
      >
        <Button size="md" className="w-full">
          Book Now
        </Button>
      </Link>
    </div>
  )}
</header>


);
}
