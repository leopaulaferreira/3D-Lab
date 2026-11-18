"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import { Search, Menu, X } from "lucide-react";
import { brand, navigation } from "@/lib/config";
export function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);
  return (
    <header>
      <Link className="logo" href="/">
        {brand.shortName}
        <span>3D</span>
      </Link>
      <nav
        id="primary-navigation"
        aria-label="Principal"
        className={open ? "open" : ""}
      >
        {navigation.map(([label, url]) => (
          <Link
            aria-current={
              path === url || (url !== "/" && path.startsWith(url + "/"))
                ? "page"
                : undefined
            }
            onClick={() => setOpen(false)}
            key={url}
            href={url}
          >
            {label}
          </Link>
        ))}
      </nav>
      <div className="header-actions">
        <button
          aria-label="Buscar produtos"
          onClick={() => dialog.current?.showModal()}
        >
          <Search size={20} />
        </button>
        <Link className="button small" href="/personalizados">
          Solicitar orçamento
        </Link>
        <button
          className="menu-toggle"
          ref={menuButton}
          aria-controls="primary-navigation"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <dialog ref={dialog} aria-labelledby="search-title">
        <button
          className="close"
          aria-label="Fechar busca"
          onClick={() => dialog.current?.close()}
        >
          <X />
        </button>
        <h2 id="search-title">Encontre sua próxima ideia.</h2>
        <form action="/produtos" onSubmit={() => dialog.current?.close()}>
          <label htmlFor="search">Nome ou categoria</label>
          <input
            id="search"
            name="q"
            placeholder="O que você procura?"
            autoFocus
          />
          <button className="button">Buscar</button>
        </form>
      </dialog>
    </header>
  );
}
