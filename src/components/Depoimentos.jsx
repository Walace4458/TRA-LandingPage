import React, { useEffect, useRef, useState } from "react";

const depoimentos = [
  {
    nome: "Mariana Oliveira",
    cargo: "Família atendida",
    inicial: "M",
    texto:
      "Fomos recebidos com muito carinho e atenção desde o primeiro contato. É muito bom encontrar um lugar onde realmente se preocupam com as pessoas.",
  },
  {
    nome: "Carlos Henrique",
    cargo: "Responsável familiar",
    inicial: "C",
    texto:
      "O atendimento é acolhedor, humano e muito cuidadoso. Toda a equipe demonstra respeito e dedicação em cada etapa.",
  },
  {
    nome: "Juliana Martins",
    cargo: "Pessoa atendida",
    inicial: "J",
    texto:
      "Me senti ouvida e respeitada desde o início. O trabalho realizado aqui faz diferença de verdade na vida das pessoas.",
  },
  {
    nome: "Renato Alves",
    cargo: "Família atendida",
    inicial: "R",
    texto:
      "A equipe sempre esteve disponível para conversar e orientar. O atendimento transmite muita confiança e segurança.",
  },
  {
    nome: "Fernanda Costa",
    cargo: "Responsável familiar",
    inicial: "F",
    texto:
      "Um espaço onde o cuidado vai muito além do atendimento. Existe acolhimento, empatia e uma verdadeira preocupação com cada pessoa.",
  },
  {
    nome: "Patrícia Souza",
    cargo: "Pessoa atendida",
    inicial: "P",
    texto:
      "Desde o primeiro dia percebi que estava em um ambiente diferente. Fui tratada com respeito, carinho e muita compreensão.",
  },
];

// Duplica os cards para o loop infinito
const depoimentosLoop = [...depoimentos, ...depoimentos];

export default function Depoimento() {
  const sectionRef = useRef(null);
  const [visivel, setVisivel] = useState(false);

  /*
   * Detecta quando a seção entra na tela.
   * A animação acontece uma vez quando o usuário chega nela.
   */
  useEffect(() => {
    const elemento = sectionRef.current;

    if (!elemento) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisivel(true);
          observer.unobserve(elemento);
        }
      },
      {
        threshold: 0.15,
      }
    );

    observer.observe(elemento);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="depoimentos"
      className="
        relative
        w-full
        overflow-hidden
        bg-areia
        py-24
        md:py-32
      "
    >
      {/* =====================================================
          DETALHE DECORATIVO SUPERIOR
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-0
          h-px
          w-[85%]
          -translate-x-1/2
          bg-mata/15
        "
      />

      {/* =====================================================
          CONTAINER
      ====================================================== */}

      <div className="mx-auto w-full max-w-[1500px]">

        {/* ===================================================
            CABEÇALHO
            ENTRA DA ESQUERDA
        ==================================================== */}

        <div
          className={`
            mx-auto
            mb-16
            w-[90%]
            max-w-[760px]
            text-center

            transition-all
            duration-[1100ms]
            ease-[cubic-bezier(0.22,1,0.36,1)]

            ${
              visivel
                ? "translate-x-0 opacity-100"
                : "-translate-x-24 opacity-0"
            }
          `}
        >
          {/* Pequeno título */}

          <span
            className="
              mb-5
              inline-block
              text-[11px]
              font-semibold
              tracking-[0.3em]
              text-mata
              md:text-xs
            "
          >
            DEPOIMENTOS
          </span>

          {/* Título */}

          <h2
            className="
              m-0
              font-titulo
              text-[46px]
              font-normal
              leading-[0.98]
              tracking-[-0.04em]
              text-noite
              sm:text-[54px]
              md:text-[68px]
            "
          >
            O que falam
            <br />

            <span className="italic text-mata">
              sobre nós
            </span>
          </h2>

          {/* Texto */}

          <p
            className="
              mx-auto
              mt-7
              max-w-[600px]
              font-texto
              text-sm
              leading-7
              text-noite/70
              md:text-base
            "
          >
            Cada história importa. Veja algumas palavras de quem já
            vivenciou nosso trabalho e nosso acolhimento.
          </p>
        </div>

        {/* ===================================================
            DEPOIMENTOS
            ENTRAM DA DIREITA
        ==================================================== */}

        <div
          className={`
            relative
            w-full

            transition-all
            duration-[1200ms]
            delay-[150ms]
            ease-[cubic-bezier(0.22,1,0.36,1)]

            ${
              visivel
                ? "translate-x-0 opacity-100"
                : "translate-x-32 opacity-0"
            }
          `}
        >

          {/* Máscara nas laterais */}

          <div
            className="
              relative
              w-full
              overflow-hidden

              [mask-image:linear-gradient(to_right,transparent,black_7%,black_93%,transparent)]
              [-webkit-mask-image:linear-gradient(to_right,transparent,black_7%,black_93%,transparent)]
            "
          >

            {/* =================================================
                TRACK
            ================================================== */}

            <div
              className="
                flex
                w-max
                gap-5

                animate-[depoimentosLoop_42s_linear_infinite]

                md:gap-6

                hover:[animation-play-state:paused]
              "
            >
              {depoimentosLoop.map((depoimento, index) => (
                <article
                  key={`${depoimento.nome}-${index}`}
                  className="
                    group

                    flex
                    min-h-[330px]
                    w-[310px]
                    min-w-[310px]
                    flex-col
                    justify-between

                    rounded-2xl

                    border
                    border-mata/15

                    bg-white/45

                    p-6

                    shadow-[0_8px_30px_rgba(6,42,61,0.04)]

                    backdrop-blur-sm

                    transition-all
                    duration-500

                    hover:-translate-y-2
                    hover:border-mata/25
                    hover:bg-white/70
                    hover:shadow-[0_20px_50px_rgba(6,42,61,0.10)]

                    sm:w-[350px]
                    sm:min-w-[350px]
                    sm:p-7

                    md:w-[390px]
                    md:min-w-[390px]
                    md:p-8
                  "
                >

                  {/* =========================================
                      TOPO
                  ========================================== */}

                  <div>

                    <div
                      className="
                        mb-6
                        flex
                        items-start
                        justify-between
                      "
                    >

                      {/* Aspas */}

                      <div
                        className="
                          font-serif
                          text-[68px]
                          leading-[0.65]
                          text-ferrugem
                          opacity-80

                          transition-transform
                          duration-500

                          group-hover:scale-110
                        "
                      >
                        “
                      </div>

                      {/* Estrelas */}

                      <div
                        className="
                          pt-1
                          text-[12px]
                          tracking-[0.18em]
                          text-laranja
                        "
                      >
                        ★ ★ ★ ★ ★
                      </div>
                    </div>

                    {/* =======================================
                        TEXTO DO DEPOIMENTO
                    ======================================== */}

                    <p
                      className="
                        m-0
                        font-texto
                        text-[14px]
                        leading-[1.75]
                        text-noite/75
                        md:text-base
                      "
                    >
                      {depoimento.texto}
                    </p>
                  </div>

                  {/* =========================================
                      AUTOR
                  ========================================== */}

                  <div
                    className="
                      mt-7
                      flex
                      items-center
                      gap-3.5

                      border-t
                      border-mata/10

                      pt-5
                    "
                  >

                    {/* Avatar */}

                    <div
                      className="
                        flex
                        h-11
                        w-11
                        shrink-0
                        items-center
                        justify-center

                        rounded-full

                        bg-mata

                        font-titulo
                        text-lg
                        text-areia

                        transition-transform
                        duration-500

                        group-hover:rotate-3
                      "
                    >
                      {depoimento.inicial}
                    </div>

                    {/* Nome */}

                    <div>
                      <strong
                        className="
                          block
                          font-texto
                          text-sm
                          font-semibold
                          text-noite
                        "
                      >
                        {depoimento.nome}
                      </strong>

                      <span
                        className="
                          mt-1
                          block
                          font-texto
                          text-xs
                          text-noite/55
                        "
                      >
                        {depoimento.cargo}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        {/* =====================================================
            FRASE FINAL
        ====================================================== */}

        <div
          className={`
            mx-auto
            mt-16
            flex
            w-[88%]
            max-w-[850px]
            items-center
            gap-5

            transition-all
            duration-1000
            delay-[350ms]

            ${
              visivel
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }
          `}
        >

          <span className="h-px flex-1 bg-mata/20" />

          <p
            className="
              m-0
              text-center
              font-texto
              text-[10px]
              tracking-[0.08em]
              text-noite/50
              sm:text-xs
            "
          >
            Histórias que nos inspiram a continuar acolhendo.
          </p>

          <span className="h-px flex-1 bg-mata/20" />
        </div>
      </div>

      {/* =====================================================
          ANIMAÇÕES
      ====================================================== */}

      <style>{`
        @keyframes depoimentosLoop {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-\\[depoimentosLoop_42s_linear_infinite\\] {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}
