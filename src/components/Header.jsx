import { useState, useEffect } from 'react'
import logo from '../assets/tra-logo.png'

const links = [
  { href: '#inicio', label: 'Início' },
  { href: '#roteiros', label: 'Roteiros' },
  { href: '#sobre', label: 'Sobre' },
  { href: '#contato', label: 'Contato' },
]

/*
  MOBILE-FIRST: as classes sem prefixo valem para o celular.
  sm: / md: / lg: só ADICIONAM ou AJUSTAM em telas maiores.

  - Celular: logo + botão Agendar + botão de menu (☰).
    O menu abre um painel com Início, Roteiros, Sobre e Contato.
  - A partir de md (tablet/desktop): links aparecem direto na barra.
*/

export default function Header() {
  const [aberto, setAberto] = useState(false)

  // Fecha o menu com ESC
  useEffect(() => {
    if (!aberto) return
    const onKey = (e) => e.key === 'Escape' && setAberto(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [aberto])

  // Se a tela crescer pra desktop, garante o menu fechado
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const onChange = (e) => e.matches && setAberto(false)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return (
    <header
      className="
        header-entrada
        fixed inset-x-0 z-50 mx-auto
        top-[max(0.75rem,env(safe-area-inset-top))] sm:top-4
        flex items-center justify-between gap-3
        w-[min(92%,1000px)] md:w-[min(88%,1000px)]
        rounded-full border border-white/10
        bg-noite/80 backdrop-blur-lg
        px-4 py-2 sm:px-5 sm:py-2.5
        shadow-lg shadow-black/20
        opacity-0
      "
    >

      {/* LOGO */}
      <a
        href="#inicio"
        className="group flex shrink-0 items-center"
        aria-label="T.R.A Passeios e Viagens"
        onClick={() => setAberto(false)}
      >
        <img
          src={logo}
          alt="T.R.A Passeios e Viagens"
          className="
            h-10 w-auto object-contain
            transition-transform duration-300 ease-out
            group-hover:scale-105
            sm:h-12 md:h-14
          "
        />
      </a>

      {/* MENU DESKTOP / TABLET (a partir de md) */}
      <nav className="hidden items-center gap-5 text-sm md:flex lg:gap-8">
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="
              relative text-areia/80
              transition-all duration-300
              hover:-translate-y-0.5 hover:text-areia
            "
          >
            {l.label}
          </a>
        ))}
      </nav>

      {/* LADO DIREITO: BOTÃO + HAMBÚRGUER */}
      <div className="flex shrink-0 items-center gap-2 sm:gap-3">

        <a
          href="#contato"
          onClick={() => setAberto(false)}
          className="
            rounded-full bg-laranja
            px-5 py-2.5 sm:px-6
            text-sm font-semibold text-[#1a0f02]
            shadow-md shadow-laranja/20
            transition-all duration-300 ease-out
            hover:scale-105 hover:bg-[#ffad24] hover:shadow-lg hover:shadow-laranja/40
            active:scale-95
          "
        >
          Agendar
        </a>

        {/* Botão do menu: só no celular */}
        <button
          type="button"
          onClick={() => setAberto((v) => !v)}
          aria-label={aberto ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={aberto}
          aria-controls="menu-mobile"
          className="
            flex h-11 w-11 items-center justify-center
            rounded-full border border-white/10 bg-white/5
            text-areia
            transition-all duration-300
            hover:bg-white/10 active:scale-95
            md:hidden
          "
        >
          <span className="relative block h-3.5 w-5">
            <span
              className={`absolute left-0 h-0.5 w-5 rounded bg-current transition-all duration-300 ${
                aberto ? 'top-1.5 rotate-45' : 'top-0'
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 h-0.5 w-5 rounded bg-current transition-all duration-300 ${
                aberto ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`absolute left-0 h-0.5 w-5 rounded bg-current transition-all duration-300 ${
                aberto ? 'top-1.5 -rotate-45' : 'top-3'
              }`}
            />
          </span>
        </button>

      </div>

      {/* PAINEL DO MENU MOBILE */}
      <nav
        id="menu-mobile"
        aria-hidden={!aberto}
        className={`
          absolute inset-x-0 top-[calc(100%+0.5rem)]
          flex flex-col gap-1 p-3
          rounded-3xl border border-white/10
          bg-noite/90 backdrop-blur-lg
          shadow-lg shadow-black/30
          origin-top transition-all duration-300 ease-out
          md:hidden
          ${aberto
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none -translate-y-2 opacity-0'}
        `}
      >
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            tabIndex={aberto ? 0 : -1}
            onClick={() => setAberto(false)}
            className="
              rounded-2xl px-4 py-3
              text-base text-areia/90
              transition-colors duration-200
              hover:bg-white/5 hover:text-areia
              active:bg-white/10
            "
          >
            {l.label}
          </a>
        ))}
      </nav>

      {/* ANIMAÇÃO */}
      <style>{`
        @keyframes headerEntrada {
          from {
            opacity: 0;
            transform: translateY(-35px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .header-entrada {
          animation: headerEntrada 1.8s ease-out 9s forwards;
        }

        /* Quem prefere menos movimento vê o header direto */
        @media (prefers-reduced-motion: reduce) {
          .header-entrada {
            animation: none;
            opacity: 1 !important;
          }
        }
      `}</style>

    </header>
  )
}