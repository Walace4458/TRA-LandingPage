import { useEffect, useRef, useState } from "react";
import logo from "../assets/tra-logo.png";
import palmeira from "../assets/tra-palmeiras.png";

const SITE = "https://www.seusite.com.br"; // TROQUE pelo domínio real

const schema = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: "T.R.A",
  url: SITE,
  logo: `${SITE}/assets/tra-logo.png`,
  image: `${SITE}/assets/tra-logo.png`,
  description:
    "Agência de passeios e viagens com mais de 10 anos de experiência e roteiros por todo o estado do Rio de Janeiro.",
  areaServed: { "@type": "State", name: "Rio de Janeiro" },
  // Preencha quando tiver: telephone, address, sameAs (Instagram, etc.)
};

/* ---------- Palmeiras (tier 0 = sempre, 1 = a partir de sm, 2 = a partir de md) ---------- */
const base = [
  { h: 300, x: -60, op: 1, tier: 0 },
  { h: 200, x: 40, op: 0.85, tier: 1 },
  { h: 260, x: 110, op: 0.7, tier: 2 },
  { h: 150, x: 190, op: 0.5, tier: 2 },
  { h: 210, x: 260, op: 0.4, tier: 2 },
];
const tierClass = ["", "hidden sm:block", "hidden md:block"];
// ini = quando começa a crescer (t); sai = quando começa a sumir (some por completo em t = 1)
const palmeiras = ["left", "right"].flatMap((lado, l) =>
  base.map((b, i) => ({
    ...b,
    lado,
    sway: `-${(i * 1.3 + l * 0.7).toFixed(1)}s`,
    ini: 0.05 + i * 0.035 + l * 0.015,
    sai: 0.8 + (base.length - 1 - i) * 0.02 + l * 0.01,
  }))
);

const destaques = [
  { n: "+10 anos", t: "de experiência em passeios e viagens" },
  { n: "Todo o RJ", t: "roteiros do litoral à serra" },
  { n: "Sob medida", t: "para famílias, casais e grupos" },
];

const destinos = ["Rio de Janeiro", "Paraty", "Arraial do Cabo", "Búzios", "Ilha Grande", "Petrópolis"];

/* ---------- Reveal: anima quando o elemento entra na tela ---------- */
const escondido = {
  up: "translate-y-8",
  left: "-translate-x-10",
  right: "translate-x-10",
  zoom: "scale-90",
};

function Reveal({ as: Tag = "div", from = "up", delay = 0, className = "", children }) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOn(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        on ? "translate-x-0 translate-y-0 scale-100 opacity-100" : `opacity-0 ${escondido[from]}`
      } ${className}`}
    >
      {children}
    </Tag>
  );
}

/* ---------- Carro (SVG) ---------- */
function Carro() {
  return (
    <svg viewBox="0 0 200 80" className="h-auto w-24 animate-balanco motion-reduce:animate-none md:w-32" aria-hidden="true">
      <rect x="8" y="34" width="184" height="24" rx="8" className="fill-ferrugem" />
      <path d="M50 34 L66 12 H128 L152 34 Z" className="fill-ferrugem" />
      <path d="M60 34 L72 17 H96 V34 Z" fill="#BFEFF5" />
      <path d="M102 34 V17 H126 L142 34 Z" fill="#BFEFF5" />
      <rect x="8" y="46" width="184" height="4" className="fill-laranja" />
      <circle cx="188" cy="42" r="3.5" className="fill-laranja" />
      {[50, 150].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="58" r="14" className="fill-noite" />
          <circle cx={cx} cy="58" r="7" className="fill-areia" />
          <line
            x1={cx - 6} y1="58" x2={cx + 6} y2="58"
            className="animate-roda stroke-noite motion-reduce:animate-none"
            strokeWidth="2"
            style={{ transformOrigin: `${cx}px 58px`, animationDuration: "var(--roda, 0.5s)" }}
          />
        </g>
      ))}
    </svg>
  );
}

/* ---------- Matemática da cena (t vai de 0 a 1 conforme o scroll) ---------- */
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a, b, k) => a + (b - a) * k;

const suave = (k) => k * k * (3 - 2 * k); // smoothstep: começa e termina devagar

function estadoDaCena(t) {
  let carX, roadR, roadL = "0%", vel = 0.7, roda = 0.5;

  if (t < 0.32) {
    // 1) estrada nasce da esquerda e o carro vai na ponta dela até o meio
    const k = suave(clamp(t / 0.32));
    carX = lerp(-10, 50, k);
    roadR = `calc(${carX}% + 44px)`;
  } else if (t < 0.8) {
    // 2) carro trava no meio, a estrada se completa até a direita
    const k = suave(clamp((t - 0.32) / 0.26));
    carX = 50;
    roadR = `calc(${50 + 50 * k}% + ${44 * (1 - k)}px)`;
  } else {
    // 3) estrada some da esquerda p/ direita e o carro acelera até sair
    const u = (t - 0.8) / 0.2;
    carX = 50 + 75 * Math.pow(u, 2.2);
    roadR = "100%";
    roadL = `${u * 100}%`;
    vel = lerp(0.7, 0.12, u);
    roda = lerp(0.5, 0.09, u);
  }
  return {
    carX: `${carX}%`, roadR, roadL,
    vel: `${vel}s`, roda: `${roda}s`,
    op: suave(clamp(t / 0.1)), // só um fade, sem deslocamento
  };
}

export default function SobreTRA() {
  const secaoRef = useRef(null);
  const cenaRef = useRef(null);
  const palmRefs = useRef([]);

  useEffect(() => {
    const cena = cenaRef.current;
    const secao = secaoRef.current;
    if (!cena || !secao) return;

    const aplicar = (t) => {
      const s = estadoDaCena(t);
      cena.style.setProperty("--car-x", s.carX);
      cena.style.setProperty("--road-r", s.roadR);
      cena.style.setProperty("--road-l", s.roadL);
      cena.style.setProperty("--vel", s.vel);
      cena.style.setProperty("--roda", s.roda);
      cena.style.setProperty("--op", s.op);
      palmRefs.current.forEach((el, i) => {
        if (!el) return;
        const p = palmeiras[i];
        const entra = suave(clamp((t - p.ini) / 0.14));
        const sai = suave(clamp((t - p.sai) / (1 - p.sai)));
        const v = entra * (1 - sai);
        el.style.opacity = String(p.op * v);
        el.style.transform = `translateX(${(p.lado === "left" ? -1 : 1) * (1 - v) * 50}px) scaleY(${0.15 + 0.85 * v})`;
      });
    };

    // Sem animação para quem prefere movimento reduzido: estrada completa, carro no meio
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      aplicar(0.55);
      return;
    }

    const calcAlvo = () => {
      const vh = window.innerHeight;
      const r = secao.getBoundingClientRect();
      const rolado = vh - r.top;            // quanto da seção já entrou na tela
      const ini = vh * 0.15;                // começa logo que a seção aparece
      const fim = Math.max(r.height, vh * 1.2); // termina quando o fim da seção chega na base
      return clamp((rolado - ini) / (fim - ini));
    };

    let alvo = calcAlvo();
    let atual = alvo;
    let raf = 0;

    // Inércia: o valor mostrado "persegue" o do scroll, deixando tudo mais fluido
    const loop = () => {
      atual += (alvo - atual) * 0.08;
      if (Math.abs(alvo - atual) < 0.0008) atual = alvo;
      aplicar(atual);
      raf = atual === alvo ? 0 : requestAnimationFrame(loop);
    };
    const onScroll = () => {
      alvo = calcAlvo();
      if (!raf) raf = requestAnimationFrame(loop);
    };

    aplicar(atual);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <>
      {/* SEO (React 19 move estas tags para o <head> automaticamente).
          No React 18, envolva em <Helmet> do react-helmet-async. */}
      <title>Sobre a T.R.A | Agência de Passeios e Viagens pelo RJ</title>
      <meta
        name="description"
        content="Há mais de 10 anos a T.R.A cria passeios e roteiros pelo Rio de Janeiro: Paraty, Arraial do Cabo, Búzios, Ilha Grande e mais. Conheça nossa história."
      />
      <link rel="canonical" href={`${SITE}/`} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="pt_BR" />
      <meta property="og:site_name" content="T.R.A" />
      <meta property="og:title" content="Sobre a T.R.A | Agência de Passeios e Viagens pelo RJ" />
      <meta property="og:description" content="Mais de 10 anos criando roteiros inesquecíveis pelo Rio de Janeiro." />
      <meta property="og:url" content={`${SITE}/`} />
      <meta property="og:image" content={`${SITE}/assets/tra-logo.png`} />
      <meta name="twitter:card" content="summary_large_image" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section
        id="sobre"
        aria-labelledby="titulo-sobre"
        ref={secaoRef}
        className="relative isolate scroll-mt-20 overflow-x-clip bg-gradient-to-b from-noite via-noite to-mata/50"
      >
        <div className="relative mx-auto max-w-6xl px-5 pb-20 pt-16 md:pb-24 md:pt-24">
          {/* Topo: texto à esquerda, logo à direita */}
          <div className="grid items-center gap-10 md:grid-cols-[1.2fr_1fr] md:gap-16">
            <div className="order-2 md:order-1">
              <Reveal from="left">
                <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-laranja">Quem somos</p>
              </Reveal>
              <Reveal from="left" delay={100}>
                <h1 id="titulo-sobre" className="mb-6 font-titulo text-4xl font-semibold leading-tight md:text-6xl">
                  Sobre a <span className="text-laranja">T.R.A</span>
                </h1>
              </Reveal>
              <div className="max-w-[58ch] space-y-4 text-lg leading-relaxed text-areia/80">
                <Reveal from="left" delay={200}>
                  <p>
                    A T.R.A é uma agência de passeios e viagens que, há mais de 10 anos,
                    leva pessoas para viver o melhor do Rio de Janeiro, do litoral à serra,
                    com segurança, conforto e atendimento de quem conhece cada caminho.
                  </p>
                </Reveal>
                <Reveal from="left" delay={320}>
                  <p>
                    São muitos roteiros pelo estado, pensados para quem quer relaxar,
                    explorar e voltar com histórias para contar. Nossa experiência
                    faz a diferença do primeiro contato até o último quilômetro.
                  </p>
                </Reveal>
              </div>
              <Reveal delay={450} className="mt-8 flex flex-wrap gap-3">
                <a href="#roteiros" className="rounded-full bg-laranja px-6 py-3 font-medium text-noite transition hover:bg-areia">
                  Ver roteiros
                </a>
                <a href="#contato" className="rounded-full border border-areia/30 px-6 py-3 font-medium transition hover:border-laranja hover:text-laranja">
                  Fale com a gente
                </a>
              </Reveal>
            </div>

            <Reveal from="right" delay={200} className="order-1 flex justify-center md:order-2">
              <div className="animate-flutuar motion-reduce:animate-none">
                <div className="rounded-full bg-areia/10 p-8 ring-1 ring-areia/20 backdrop-blur-sm md:p-12">
                  <img
                    src={logo}
                    alt="Logo da T.R.A, agência de passeios e viagens no Rio de Janeiro"
                    fetchPriority="high"
                    className="h-auto w-40 drop-shadow-2xl md:w-72"
                  />
                </div>
              </div>
            </Reveal>
          </div>

          {/* Destaques */}
          <ul className="mt-14 grid gap-4 sm:grid-cols-3">
            {destaques.map((d, i) => (
              <Reveal
                as="li"
                key={d.n}
                from="zoom"
                delay={i * 130}
                className="rounded-2xl border border-areia/10 bg-noite/60 p-5 backdrop-blur-sm"
              >
                <p className="font-titulo text-2xl text-laranja">{d.n}</p>
                <p className="mt-1 text-sm text-areia/70">{d.t}</p>
              </Reveal>
            ))}
          </ul>

          {/* Texto de SEO */}
          <article className="mt-14 max-w-3xl border-t border-areia/15 pt-10">
            <Reveal>
              <h2 className="mb-4 font-titulo text-2xl md:text-3xl">
                Agência de viagens no Rio de Janeiro: passeios e roteiros pelo RJ
              </h2>
            </Reveal>
            <div className="space-y-4 text-areia/75">
              <Reveal delay={100}>
                <p>
                  A <strong className="font-medium text-areia">T.R.A</strong> é uma{" "}
                  <strong className="font-medium text-areia">agência de passeios e viagens no Rio de Janeiro</strong>{" "}
                  com mais de 10 anos de mercado. Organizamos{" "}
                  <strong className="font-medium text-areia">roteiros pelo RJ</strong> para quem busca praias,
                  história, natureza e gastronomia, seja em um bate-volta ou em uma viagem
                  de vários dias.
                </p>
              </Reveal>
              <Reveal delay={200}>
                <p>
                  Entre os destinos mais procurados estão{" "}
                  {destinos.map((d, i) => (
                    <span key={d}>
                      <a href="#roteiros" className="text-laranja underline-offset-4 hover:underline">
                        {d}
                      </a>
                      {i < destinos.length - 2 ? ", " : i === destinos.length - 2 ? " e " : ""}
                    </span>
                  ))}
                  . Cada passeio é planejado para que você aproveite o melhor de cada lugar,
                  sem preocupação com transporte ou logística.
                </p>
              </Reveal>
              <Reveal delay={300}>
                <h3 className="pt-2 font-titulo text-xl text-areia">Por que viajar com a T.R.A?</h3>
              </Reveal>
              <Reveal delay={380}>
                <p>
                  Experiência de mais de uma década, conhecimento local, roteiros variados e
                  atendimento próximo. Peça seu orçamento e descubra o Rio de Janeiro com
                  quem entende do assunto.
                </p>
              </Reveal>
            </div>
          </article>
        </div>
        {/* Cena fixa na base da tela enquanto a seção está visível (sticky) */}
        <div
          ref={cenaRef}
          aria-hidden="true"
          className="pointer-events-none sticky bottom-0 -z-10 h-10"
        >
          {/* Palmeiras: crescem das laterais logo depois que a estrada aparece */}
          {palmeiras.map((p, i) => (
            <div
              key={i}
              ref={(el) => (palmRefs.current[i] = el)}
              className={`absolute bottom-[34px] ${tierClass[p.tier]}`}
              style={{
                [p.lado]: p.x,
                height: `clamp(${Math.round(p.h * 0.45)}px, ${(p.h / 14).toFixed(1)}vw, ${p.h}px)`,
                opacity: 0,
                transform: "scaleY(0.15)",
                transformOrigin: "bottom",
              }}
            >
              <img
                src={palmeira}
                alt=""
                loading="lazy"
                decoding="async"
                className={`h-full w-auto origin-bottom animate-palma motion-reduce:animate-none max-md:opacity-50 ${
                  p.lado === "right" ? "-scale-x-100" : ""
                }`}
                style={{ animationDelay: p.sway }}
              />
            </div>
          ))}

          {/* Estrada + carro */}
          <div className="absolute inset-0" style={{ opacity: "var(--op, 0)" }}>
            <div
              className="absolute inset-0 border-t-2 border-areia/40 bg-[#13202b]"
              style={{ clipPath: "inset(0 calc(100% - var(--road-r, 0%)) 0 var(--road-l, 0%))" }}
            >
              <div
                className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 animate-estrada motion-reduce:animate-none"
                style={{
                  backgroundImage: "repeating-linear-gradient(90deg, #F8F1DF 0 40px, transparent 40px 80px)",
                  animationDuration: "var(--vel, 0.7s)",
                }}
              />
            </div>
            <div
              className="absolute bottom-1"
              style={{ left: "var(--car-x, -15%)", transform: "translateX(-50%)" }}
            >
              <Carro />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}