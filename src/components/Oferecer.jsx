import React, { useEffect, useRef, useState } from "react";
import {
  ShieldCheck,
  CarFront,
  Award,
  CreditCard,
} from "lucide-react";

const beneficios = [
  {
    icon: ShieldCheck,
    titulo: (
      <>
        Conforto e
        <br />
        segurança
      </>
    ),
    descricao:
      "Viaje com tranquilidade, conforto e segurança em todos os momentos.",
  },
  {
    icon: CarFront,
    titulo: (
      <>
        Até 4 pessoas por
        <br />
        carro
      </>
    ),
    descricao:
      "Transporte confortável para até 4 pessoas, com praticidade durante todo o trajeto.",
  },
  {
    icon: Award,
    titulo: (
      <>
        10 Anos de
        <br />
        experiência
      </>
    ),
    descricao:
      "São 10 anos de experiência oferecendo um atendimento de confiança e qualidade.",
  },
  {
    icon: CreditCard,
    titulo: (
      <>
        Aceitamos todos os
        <br />
        cartões e pix
      </>
    ),
    descricao:
      "Facilitamos o pagamento com cartões e Pix para tornar sua experiência ainda mais prática.",
  },
];

export default function Oferecer() {
  const sectionRef = useRef(null);

  const [visivel, setVisivel] = useState(false);
  const [ativo, setAtivo] = useState(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisivel(entry.isIntersecting);
      },
      {
        threshold: 0.2,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const selecionarBeneficio = (index) => {
    setAtivo((atual) => (atual === index ? null : index));
  };

  return (
    <section
      ref={sectionRef}
      className={`oferecer ${
        visivel ? "oferecer-visivel" : ""
      }`}
    >
      <div className="oferecer-container">

        {/* =========================================
            TÍTULO
        ========================================= */}

        <h2 className="oferecer-titulo">
          O que oferecemos
        </h2>


        {/* =========================================
            ÁREA DOS BENEFÍCIOS
        ========================================= */}

        <div className="oferecer-beneficios">

          {/* Linha horizontal */}
          <div className="oferecer-linha" />

          {beneficios.map((beneficio, index) => {
            const Icon = beneficio.icon;

            const itemAtivo = ativo === index;

            return (
              <div
                key={index}
                className={`
                  oferecer-item
                  ${itemAtivo ? "item-ativo" : ""}
                `}
                style={{
                  "--delay": `${index * 180}ms`,
                }}
                onClick={() =>
                  selecionarBeneficio(index)
                }
              >

                {/* =====================================
                    ÍCONE
                ===================================== */}

                <div className="oferecer-icone">

                  <Icon
                    size={39}
                    strokeWidth={1.8}
                  />

                </div>


                {/* =====================================
                    TEXTO
                ===================================== */}

                <p className="oferecer-texto">
                  {beneficio.titulo}
                </p>

              </div>
            );
          })}
        </div>


        {/* =========================================
            DESCRIÇÃO
            FICA ABAIXO DA LINHA
        ========================================= */}

        <div
          className={`
            oferecer-descricao-area
            ${
              ativo !== null
                ? "descricao-aberta"
                : ""
            }
          `}
        >

          {ativo !== null && (
            <div
              className="oferecer-descricao"
              key={ativo}
            >

              <div className="descricao-indicador" />

              <p>
                {beneficios[ativo].descricao}
              </p>

            </div>
          )}

        </div>

      </div>


      {/* =============================================
          CSS
      ============================================= */}

      <style>{`

        /* =====================================================
           PALETA
        ===================================================== */

        .oferecer {

          --color-areia: #F8F1DF;
          --color-ferrugem: #E4572E;
          --color-mata: #0E6B54;
          --color-noite: #062A3D;
          --color-laranja: #FFA630;
          --color-mar: #19B5C4;

          width: 100%;

          background:
            var(--color-areia);

          padding:
            75px 20px 85px;

          box-sizing: border-box;

          overflow: hidden;
        }


        /* =====================================================
           CONTAINER
        ===================================================== */

        .oferecer-container {

          width: 100%;

          max-width: 1100px;

          margin: 0 auto;
        }


        /* =====================================================
           TÍTULO
        ===================================================== */

        .oferecer-titulo {

          margin: 0;

          text-align: center;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size:
            clamp(38px, 5vw, 52px);

          font-weight: 400;

          line-height: 1.15;

          color:
            var(--color-ferrugem);

          opacity: 0;

          transform:
            translateY(22px);

          transition:
            opacity 700ms ease,
            transform 700ms
            cubic-bezier(
              .22,
              .61,
              .36,
              1
            );
        }


        .oferecer-visivel
        .oferecer-titulo {

          opacity: 1;

          transform:
            translateY(0);
        }


        /* =====================================================
           BENEFÍCIOS
           
           IMPORTANTE:
           Tudo aqui fica ACIMA da linha.
        ===================================================== */

        .oferecer-beneficios {

          position: relative;

          display: grid;

          grid-template-columns:
            repeat(4, 1fr);

          gap: 30px;

          margin-top:
            105px;

          /*
           * Espaço até a linha.
           */
          padding-bottom:
            22px;
        }


        /* =====================================================
           LINHA
           
           A linha fica DEPOIS dos textos.
        ===================================================== */

        .oferecer-linha {

          position: absolute;

          left: 3%;
          right: 3%;

          bottom: 0;

          height: 2px;

          background:
            var(--color-ferrugem);

          transform-origin:
            left center;

          transform:
            scaleX(0);

          transition:
            transform 1200ms
            cubic-bezier(
              .22,
              .61,
              .36,
              1
            );

          transition-delay:
            300ms;

          z-index: 0;
        }


        .oferecer-visivel
        .oferecer-linha {

          transform:
            scaleX(1);
        }


        /* =====================================================
           ITEM
        ===================================================== */

        .oferecer-item {

          position: relative;

          z-index: 1;

          display: flex;

          flex-direction: column;

          align-items: center;

          text-align: center;

          cursor: pointer;

          opacity: 0;

          transform:
            translateX(-55px)
            translateY(15px);

          transition:
            opacity 700ms ease,
            transform 800ms
            cubic-bezier(
              .22,
              .61,
              .36,
              1
            );

          transition-delay:
            var(--delay);

          /*
           * Evita seleção de texto ao clicar.
           */
          user-select: none;
        }


        .oferecer-visivel
        .oferecer-item {

          opacity: 1;

          transform:
            translateX(0)
            translateY(0);
        }


        /* =====================================================
           ÍCONE
        ===================================================== */

        .oferecer-icone {

          width: 82px;
          height: 82px;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 50%;

          background:
            var(--color-ferrugem);

          color:
            var(--color-areia);

          border:
            3px solid
            var(--color-areia);

          outline:
            2px solid
            var(--color-ferrugem);

          box-sizing:
            border-box;

          margin-bottom:
            17px;

          transition:
            transform 350ms ease,
            box-shadow 350ms ease;
        }


        /* =====================================================
           HOVER
        ===================================================== */

        .oferecer-item:hover
        .oferecer-icone {

          transform:
            translateY(-5px)
            scale(1.04);

          box-shadow:
            0 10px 25px
            rgba(
              228,
              87,
              46,
              0.22
            );
        }


        /* =====================================================
           ITEM SELECIONADO
        ===================================================== */

        .oferecer-item.item-ativo
        .oferecer-icone {

          transform:
            translateY(-6px)
            scale(1.07);

          box-shadow:
            0 12px 30px
            rgba(
              228,
              87,
              46,
              0.28
            );
        }


        /* =====================================================
           TEXTO
        ===================================================== */

        .oferecer-texto {

          margin: 0;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size:
            21px;

          line-height:
            1.18;

          font-weight:
            400;

          color:
            var(--color-noite);

          transition:
            color 250ms ease,
            transform 250ms ease;
        }


        .oferecer-item:hover
        .oferecer-texto,

        .oferecer-item.item-ativo
        .oferecer-texto {

          color:
            var(--color-ferrugem);

          transform:
            translateY(-2px);
        }


        /* =====================================================
           ÁREA DA DESCRIÇÃO
           
           ESTA ÁREA FICA ABAIXO DA LINHA.
        ===================================================== */

        .oferecer-descricao-area {

          position: relative;

          min-height: 0;

          display: flex;

          justify-content: center;

          align-items: flex-start;

          transition:
            min-height 450ms
            cubic-bezier(
              .22,
              .61,
              .36,
              1
            );
        }


        /*
         * Quando alguma opção está aberta,
         * criamos espaço abaixo da linha.
         */

        .oferecer-descricao-area.descricao-aberta {

          min-height:
            125px;
        }


        /* =====================================================
           DESCRIÇÃO
        ===================================================== */

        .oferecer-descricao {

          width:
            min(
              100%,
              560px
            );

          text-align:
            center;

          padding-top:
            22px;

          opacity: 0;

          transform:
            translateY(-10px);

          animation:
            descricaoEntrada
            450ms
            cubic-bezier(
              .22,
              .61,
              .36,
              1
            )
            forwards;
        }


        @keyframes descricaoEntrada {

          0% {

            opacity: 0;

            transform:
              translateY(-10px);
          }

          100% {

            opacity: 1;

            transform:
              translateY(0);
          }
        }


        /* =====================================================
           PEQUENO INDICADOR
           
           Ele conecta visualmente a linha
           com a descrição.
        ===================================================== */

        .descricao-indicador {

          width:
            34px;

          height:
            2px;

          background:
            var(--color-ferrugem);

          margin:
            0 auto 12px;

          animation:
            indicadorEntrada
            450ms
            ease
            forwards;

          transform:
            scaleX(0);

          transform-origin:
            center;
        }


        @keyframes indicadorEntrada {

          0% {

            transform:
              scaleX(0);
          }

          100% {

            transform:
              scaleX(1);
          }
        }


        /* =====================================================
           TEXTO DA DESCRIÇÃO
        ===================================================== */

        .oferecer-descricao p {

          margin:
            0 auto;

          max-width:
            540px;

          font-family:
            Arial,
            Helvetica,
            sans-serif;

          font-size:
            15px;

          line-height:
            1.6;

          font-weight:
            400;

          color:
            var(--color-noite);

          opacity:
            0.82;
        }


        /* =====================================================
           TABLET
        ===================================================== */

        @media (max-width: 800px) {

          .oferecer {

            padding:
              60px 20px 75px;
          }


          .oferecer-beneficios {

            grid-template-columns:
              repeat(2, 1fr);

            row-gap:
              55px;

            margin-top:
              75px;
          }


          .oferecer-linha {

            left:
              2%;

            right:
              2%;
          }


          .oferecer-texto {

            font-size:
              19px;
          }


          .oferecer-descricao-area.descricao-aberta {

            min-height:
              140px;
          }


          .oferecer-descricao p {

            font-size:
              14px;

            max-width:
              500px;
          }
        }


        /* =====================================================
           CELULAR
        ===================================================== */

        @media (max-width: 500px) {

          .oferecer {

            padding:
              50px 18px 65px;
          }


          .oferecer-titulo {

            font-size:
              36px;
          }


          .oferecer-beneficios {

            grid-template-columns:
              repeat(2, 1fr);

            gap:
              55px 20px;

            margin-top:
              60px;

            padding-bottom:
              18px;
          }


          .oferecer-linha {

            left:
              0;

            right:
              0;
          }


          .oferecer-icone {

            width:
              70px;

            height:
              70px;
          }


          .oferecer-texto {

            font-size:
              17px;
          }


          .oferecer-descricao-area.descricao-aberta {

            min-height:
              135px;
          }


          .oferecer-descricao {

            padding:
              20px 10px 0;
          }


          .oferecer-descricao p {

            font-size:
              13px;

            line-height:
              1.5;
          }
        }


        /* =====================================================
           ACESSIBILIDADE
        ===================================================== */

        @media (prefers-reduced-motion: reduce) {

          .oferecer-titulo,
          .oferecer-item,
          .oferecer-linha,
          .oferecer-descricao,
          .descricao-indicador,
          .oferecer-icone {

            animation:
              none !important;

            transition:
              none !important;
          }


          .oferecer-titulo,
          .oferecer-item,
          .oferecer-linha {

            opacity:
              1 !important;

            transform:
              none !important;
          }
        }

      `}</style>
    </section>
  );
}