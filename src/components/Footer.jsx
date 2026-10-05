import React, { useEffect, useRef, useState } from "react";

export default function Footer() {
  const footerRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = footerRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.15,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    const element = document.querySelector(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <footer
      ref={footerRef}
      style={{
        width: "100%",
        background: "#777777",
        color: "#ffffff",
        overflow: "hidden",
      }}
    >
      <style>
        {`
          .footer-wrapper {
            width: 100%;
            max-width: 1250px;
            margin: 0 auto;
            padding: 55px 40px 25px;
            box-sizing: border-box;
          }

          .footer-main {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: 60px;
          }

          .footer-left {
            flex: 1;
            min-width: 260px;
          }

          .footer-brand {
            margin: 0 0 12px;
            font-size: 28px;
            font-weight: 700;
            letter-spacing: -0.5px;
          }

          .footer-copy {
            margin: 0;
            font-size: 14px;
            line-height: 1.6;
            color: rgba(255, 255, 255, 0.8);
          }

          .footer-right {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            gap: 22px;
          }

          .footer-nav {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            flex-wrap: wrap;
            gap: 25px;
          }

          .footer-nav button {
            border: none;
            background: transparent;
            padding: 0;
            color: #ffffff;
            font-family: inherit;
            font-size: 14px;
            cursor: pointer;
            transition:
              opacity 0.25s ease,
              transform 0.25s ease;
          }

          .footer-nav button:hover {
            opacity: 0.65;
            transform: translateY(-2px);
          }

          .footer-contact {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            flex-wrap: wrap;
            gap: 18px;
          }

          .footer-contact a {
            color: rgba(255, 255, 255, 0.9);
            text-decoration: none;
            font-size: 14px;
            transition:
              opacity 0.25s ease,
              transform 0.25s ease;
          }

          .footer-contact a:hover {
            opacity: 0.65;
            transform: translateY(-2px);
          }

          .footer-divider {
            width: 100%;
            height: 1px;
            margin: 38px 0 20px;
            background: rgba(255, 255, 255, 0.18);
          }

          .footer-bottom {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 20px;
          }

          .footer-bottom p {
            margin: 0;
            font-size: 12px;
            color: rgba(255, 255, 255, 0.65);
          }

          /* ANIMAÇÃO DE ENTRADA */

          .footer-animated {
            opacity: 0;
            transform: translateY(35px);
            transition:
              opacity 0.8s ease,
              transform 0.8s ease;
          }

          .footer-animated.visible {
            opacity: 1;
            transform: translateY(0);
          }

          .footer-brand-animation {
            transition-delay: 0.05s;
          }

          .footer-copy-animation {
            transition-delay: 0.15s;
          }

          .footer-nav-animation {
            transition-delay: 0.2s;
          }

          .footer-contact-animation {
            transition-delay: 0.3s;
          }

          .footer-bottom-animation {
            transition-delay: 0.4s;
          }

          @media (max-width: 768px) {
            .footer-wrapper {
              padding: 45px 24px 22px;
            }

            .footer-main {
              flex-direction: column;
              gap: 35px;
            }

            .footer-right {
              width: 100%;
              align-items: flex-start;
            }

            .footer-nav {
              justify-content: flex-start;
            }

            .footer-contact {
              justify-content: flex-start;
            }

            .footer-bottom {
              flex-direction: column;
              align-items: flex-start;
            }

            .footer-brand {
              font-size: 24px;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .footer-animated {
              opacity: 1;
              transform: none;
              transition: none;
            }
          }
        `}
      </style>

      <div className="footer-wrapper">
        <div className="footer-main">
          {/* LADO ESQUERDO */}
          <div
            className={`footer-left footer-animated footer-brand-animation ${
              visible ? "visible" : ""
            }`}
          >
            <h2 className="footer-brand">T.R.A Passeios e Viagens</h2>

            <p
              className={`footer-copy footer-animated footer-copy-animation ${
                visible ? "visible" : ""
              }`}
            >
              Todos os direitos reservados.
            </p>
          </div>

          {/* LADO DIREITO */}
          <div className="footer-right">
            {/* MENU */}
            <nav
              className={`footer-nav footer-animated footer-nav-animation ${
                visible ? "visible" : ""
              }`}
            >
              <button onClick={() => scrollToSection("#inicio")}>
                Início
              </button>

              <button onClick={() => scrollToSection("#sobre")}>
                Sobre
              </button>

              <button onClick={() => scrollToSection("#roteiro")}>
                Roteiro
              </button>

              <button onClick={() => scrollToSection("#contato")}>
                Contato
              </button>
            </nav>

            {/* CONTATOS */}
            <div
              className={`footer-contact footer-animated footer-contact-animation ${
                visible ? "visible" : ""
              }`}
            >
              <a href="tel:+5521979824885">
                (21) 97982-4885
              </a>

              <a href="https://www.instagram.com/tra_passeios_viagens/">
                tra_passeios_viagens
              </a>
            </div>
          </div>
        </div>

        {/* LINHA */}
        <div className="footer-divider" />

        {/* RODAPÉ */}
        <div
          className={`footer-bottom footer-animated footer-bottom-animation ${
            visible ? "visible" : ""
          }`}
        >
          <p>© {new Date().getFullYear()} T.R.A Passeios e Viagens</p>

          <p>Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
