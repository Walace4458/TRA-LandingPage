import React, { useEffect, useRef, useState } from "react";

export default function Contato() {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [assunto, setAssunto] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [perguntaAberta, setPerguntaAberta] = useState(null);
  const [visivel, setVisivel] = useState(false);

  const contatoRef = useRef(null);

  // =========================================================
  // OBSERVA A SEÇÃO QUANDO ELA ENTRA NA TELA
  // =========================================================

  useEffect(() => {
    const elemento = contatoRef.current;

    if (!elemento) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisivel(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -70px 0px",
      }
    );

    observer.observe(elemento);

    return () => observer.disconnect();
  }, []);

  // =========================================================
  // WHATSAPP DO T.R.A.
  //
  // TROQUE PELO NÚMERO REAL.
  //
  // Exemplo:
  // 5521999999999
  //
  // Sem +, espaços ou traços.
  // =========================================================

  const whatsappTRA = "5521979824885";

  // =========================================================
  // ENVIA O FORMULÁRIO PARA O WHATSAPP
  // =========================================================

  const enviarWhatsApp = (e) => {
    e.preventDefault();

    if (!nome || !telefone || !assunto || !mensagem) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const texto = `
Olá, T.R.A.! Tudo bem?

Meu nome é ${nome}.
Meu telefone é ${telefone}.

Assunto: ${assunto}

Mensagem:
${mensagem}

Enviado através do site do T.R.A.
    `.trim();

    const url = `https://wa.me/${whatsappTRA}?text=${encodeURIComponent(
      texto
    )}`;

    window.open(url, "_blank");
  };

  // =========================================================
  // PERGUNTAS FREQUENTES
  // =========================================================

  const perguntas = [
    {
      pergunta: "Como posso solicitar uma cotação de roteiro?",
      resposta:
        "Preencha o formulário escolhendo a opção de cotação e conte um pouco sobre o que você procura. Nossa equipe poderá continuar o atendimento pelo WhatsApp.",
    },
    {
      pergunta: "Posso tirar dúvidas pelo WhatsApp?",
      resposta:
        "Sim. Você pode enviar sua dúvida pelo formulário e nossa equipe dará continuidade ao atendimento diretamente pelo WhatsApp.",
    },
    {
      pergunta: "Posso montar um roteiro personalizado?",
      resposta:
        "Sim. Conte para nós o que você gostaria de conhecer, suas preferências e o tipo de experiência que procura. A equipe poderá orientar você.",
    },
    {
      pergunta: "Como funciona o atendimento do T.R.A.?",
      resposta:
        "O atendimento começa entendendo o que você procura. A partir disso, nossa equipe conversa com você e ajuda a encontrar a melhor opção.",
    },
  ];

  return (
    <section
      id="contato"
      ref={contatoRef}
      className="
        relative
        w-full
        overflow-hidden
        bg-white
      "
    >
      {/* =====================================================
          TRANSIÇÃO DA SEÇÃO ANTERIOR

          Em vez de uma faixa artificial, aqui fazemos uma
          transição curta de areia para branco.
      ====================================================== */}

      <div className="relative h-[100px] overflow-hidden bg-areia md:h-[130px]">
        <div
          className="
            absolute
            inset-x-0
            bottom-0
            h-[100px]
            rounded-t-[50%]
            bg-white
            md:h-[130px]
          "
        />

        <div
          className="
            absolute
            bottom-[-45px]
            left-[-5%]
            h-[90px]
            w-[110%]
            rounded-[50%]
            bg-noite/[0.025]
          "
        />
      </div>

      {/* =====================================================
          FUNDO DA CALÇADA

          Aqui fica o verdadeiro fundo preto e branco.

          As formas são grandes e irregulares para lembrar
          mais a calçada de Copacabana da referência.
      ====================================================== */}

      <div className="absolute inset-x-0 bottom-0 top-[100px] z-0 overflow-hidden md:top-[130px]">
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 1600 1200"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Base branca */}

          <rect
            width="1600"
            height="1200"
            fill="#FFFFFF"
          />

          {/* =================================================
              ONDA 1
          ================================================== */}

          <path
            d="
              M-260 120
              C-120 30 20 15 150 80
              C300 155 390 220 535 185
              C650 158 690 65 805 45
              C925 25 1000 110 1095 155
              C1215 212 1330 190 1410 105
              C1480 30 1580 30 1770 125
            "
            fill="none"
            stroke="#111111"
            strokeWidth="135"
            strokeLinecap="round"
          />

          {/* =================================================
              ONDA 2
          ================================================== */}

          <path
            d="
              M-300 375
              C-170 285 -40 260 90 320
              C235 388 330 475 465 445
              C590 417 640 300 765 300
              C890 300 950 395 1060 430
              C1180 468 1300 445 1395 350
              C1485 260 1600 280 1790 390
            "
            fill="none"
            stroke="#111111"
            strokeWidth="145"
            strokeLinecap="round"
          />

          {/* =================================================
              ONDA 3
          ================================================== */}

          <path
            d="
              M-300 650
              C-160 555 -25 540 105 610
              C245 685 340 750 475 715
              C600 682 650 575 770 565
              C900 555 960 650 1070 690
              C1195 735 1305 705 1400 620
              C1500 530 1615 545 1800 665
            "
            fill="none"
            stroke="#111111"
            strokeWidth="150"
            strokeLinecap="round"
          />

          {/* =================================================
              ONDA 4
          ================================================== */}

          <path
            d="
              M-310 925
              C-170 830 -35 810 105 880
              C245 950 350 1035 485 995
              C610 960 660 855 790 845
              C915 835 980 925 1090 970
              C1210 1018 1325 990 1420 900
              C1515 810 1630 830 1810 940
            "
            fill="none"
            stroke="#111111"
            strokeWidth="145"
            strokeLinecap="round"
          />

          {/* =================================================
              PEQUENAS IMPERFEIÇÕES / TEXTURA
          ================================================== */}

          <g opacity="0.10" fill="#FFFFFF">
            {Array.from({ length: 220 }).map((_, i) => {
              const x = (i * 113 + 37) % 1600;
              const y = (i * 71 + 19) % 1200;

              return (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r={i % 3 === 0 ? "2" : "1.2"}
                />
              );
            })}
          </g>
        </svg>

        {/* =================================================
            LEVE SOMBRA PARA O CONTEÚDO
        ================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-gradient-to-b
            from-white/5
            via-transparent
            to-white/5
          "
        />
      </div>

      {/* =====================================================
          CONTEÚDO
      ====================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          w-[90%]
          max-w-[1250px]
          pb-24
          pt-20
          md:pb-32
          md:pt-28
        "
      >
        {/* =====================================================
            CONTATO + FORMULÁRIO
        ====================================================== */}

        <div
          className="
            grid
            grid-cols-1
            gap-10
            lg:grid-cols-[0.85fr_1.15fr]
            lg:gap-16
            xl:gap-24
          "
        >
          {/* =================================================
              ESQUERDA
              ENTRA DA ESQUERDA
          ================================================== */}

          <div
            className={`
              flex
              flex-col
              justify-center
              rounded-[28px]
              border
              border-white
              bg-white/[0.94]
              p-8
              shadow-[0_20px_70px_rgba(0,0,0,0.16)]
              backdrop-blur-sm
              transition-all
              duration-[1000ms]
              ease-[cubic-bezier(0.22,1,0.36,1)]
              sm:p-10

              ${
                visivel
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-16 opacity-0"
              }
            `}
          >
            <span
              className="
                mb-5
                font-texto
                text-[11px]
                font-semibold
                tracking-[0.28em]
                text-mata
              "
            >
              FALE COM A GENTE
            </span>

            <h2
              className="
                font-titulo
                text-[48px]
                font-normal
                leading-[0.98]
                tracking-[-0.04em]
                text-noite
                sm:text-[56px]
                md:text-[64px]
              "
            >
              Vamos
              <br />

              <span className="italic text-mata">
                conversar?
              </span>
            </h2>

            <p
              className="
                mt-7
                max-w-[470px]
                font-texto
                text-base
                leading-7
                text-noite/70
              "
            >
              Tem uma dúvida, quer saber mais sobre nossos
              roteiros ou gostaria de conversar sobre uma
              experiência?
            </p>

            <p
              className="
                mt-4
                max-w-[470px]
                font-texto
                text-base
                leading-7
                text-noite/70
              "
            >
              Envie uma mensagem e continue o atendimento
              diretamente pelo WhatsApp.
            </p>

            {/* Linha decorativa */}

            <div className="mt-9 flex items-center gap-4">
              <span className="h-px w-16 bg-noite/20" />

              <span className="h-2 w-2 rounded-full bg-ferrugem" />

              <span className="h-px w-8 bg-noite/20" />
            </div>

            {/* Informações */}

            <div className="mt-10 space-y-5">
              {/* WhatsApp */}

              <div className="flex items-center gap-4">
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
                    text-white
                  "
                >
                  <svg
                    width="19"
                    height="19"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path d="M21 11.5a8.5 8.5 0 0 1-12.8 7.36L4 20l1.14-3.98A8.5 8.5 0 1 1 21 11.5Z" />
                    <path d="M8.5 9.5c.3 1.6 2.4 3.8 4 4.3.7.2 1.2-.1 1.6-.7l.5-.7" />
                  </svg>
                </div>

                <div>
                  <span className="block font-texto text-xs text-noite/45">
                    WhatsApp
                  </span>

                  <span className="font-texto text-sm font-semibold text-noite">
                    Fale diretamente com o T.R.A.
                  </span>
                </div>
              </div>

              {/* Localização */}

              <div className="flex items-center gap-4">
                <div
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-noite
                    text-white
                  "
                >
                  <svg
                    width="19"
                    height="19"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path d="M21 10c0 7-9 12-9 12S3 17 3 10a9 9 0 1 1 18 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>

                <div>
                  <span className="block font-texto text-xs text-noite/45">
                    Localização
                  </span>

                  <span className="font-texto text-sm font-semibold text-noite">
                    Rio de Janeiro, RJ
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* =================================================
              DIREITA
              ENTRA DA DIREITA
          ================================================== */}

          <div
            className={`
              rounded-[28px]
              border
              border-white
              bg-white/[0.96]
              p-7
              shadow-[0_25px_80px_rgba(0,0,0,0.18)]
              backdrop-blur-sm
              transition-all
              delay-150
              duration-[1000ms]
              ease-[cubic-bezier(0.22,1,0.36,1)]
              sm:p-9
              md:p-11

              ${
                visivel
                  ? "translate-x-0 opacity-100"
                  : "translate-x-16 opacity-0"
              }
            `}
          >
            <div className="mb-8">
              <span
                className="
                  font-texto
                  text-xs
                  font-semibold
                  tracking-[0.18em]
                  text-ferrugem
                "
              >
                ENVIE UMA MENSAGEM
              </span>

              <h3
                className="
                  mt-3
                  font-titulo
                  text-3xl
                  font-normal
                  text-noite
                  md:text-4xl
                "
              >
                Como podemos ajudar?
              </h3>

              <p
                className="
                  mt-3
                  font-texto
                  text-sm
                  leading-6
                  text-noite/60
                "
              >
                Preencha os campos abaixo e continue a conversa
                pelo WhatsApp.
              </p>
            </div>

            {/* =================================================
                FORMULÁRIO
            ================================================== */}

            <form
              onSubmit={enviarWhatsApp}
              className="space-y-5"
            >
              {/* Nome */}

              <div>
                <label
                  htmlFor="nome"
                  className="
                    mb-2
                    block
                    font-texto
                    text-xs
                    font-semibold
                    text-noite
                  "
                >
                  Seu nome
                </label>

                <input
                  id="nome"
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Como podemos chamar você?"
                  required
                  className="
                    w-full
                    rounded-xl
                    border
                    border-noite/10
                    bg-areia/30
                    px-4
                    py-3.5
                    font-texto
                    text-sm
                    text-noite
                    outline-none
                    transition-all
                    placeholder:text-noite/35
                    focus:border-mata/50
                    focus:bg-white
                    focus:ring-2
                    focus:ring-mata/10
                  "
                />
              </div>

              {/* Telefone */}

              <div>
                <label
                  htmlFor="telefone"
                  className="
                    mb-2
                    block
                    font-texto
                    text-xs
                    font-semibold
                    text-noite
                  "
                >
                  Seu telefone
                </label>

                <input
                  id="telefone"
                  type="tel"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  placeholder="(21) 99999-9999"
                  required
                  className="
                    w-full
                    rounded-xl
                    border
                    border-noite/10
                    bg-areia/30
                    px-4
                    py-3.5
                    font-texto
                    text-sm
                    text-noite
                    outline-none
                    transition-all
                    placeholder:text-noite/35
                    focus:border-mata/50
                    focus:bg-white
                    focus:ring-2
                    focus:ring-mata/10
                  "
                />
              </div>

              {/* Assunto */}

              <div>
                <label
                  htmlFor="assunto"
                  className="
                    mb-2
                    block
                    font-texto
                    text-xs
                    font-semibold
                    text-noite
                  "
                >
                  O que você procura?
                </label>

                <select
                  id="assunto"
                  value={assunto}
                  onChange={(e) => setAssunto(e.target.value)}
                  required
                  className="
                    w-full
                    rounded-xl
                    border
                    border-noite/10
                    bg-areia/30
                    px-4
                    py-3.5
                    font-texto
                    text-sm
                    text-noite
                    outline-none
                    transition-all
                    focus:border-mata/50
                    focus:bg-white
                    focus:ring-2
                    focus:ring-mata/10
                  "
                >
                  <option value="">
                    Selecione uma opção
                  </option>

                  <option value="Cotação de roteiro">
                    Cotação de roteiro
                  </option>

                  <option value="Dúvida sobre roteiro">
                    Dúvida sobre roteiro
                  </option>

                  <option value="Roteiro personalizado">
                    Roteiro personalizado
                  </option>

                  <option value="Informações">
                    Informações
                  </option>

                  <option value="Outro assunto">
                    Outro assunto
                  </option>
                </select>
              </div>

              {/* Mensagem */}

              <div>
                <label
                  htmlFor="mensagem"
                  className="
                    mb-2
                    block
                    font-texto
                    text-xs
                    font-semibold
                    text-noite
                  "
                >
                  Sua pergunta
                </label>

                <textarea
                  id="mensagem"
                  value={mensagem}
                  onChange={(e) => setMensagem(e.target.value)}
                  placeholder="Conte um pouco sobre o que você precisa..."
                  rows={5}
                  required
                  className="
                    w-full
                    resize-none
                    rounded-xl
                    border
                    border-noite/10
                    bg-areia/30
                    px-4
                    py-3.5
                    font-texto
                    text-sm
                    leading-6
                    text-noite
                    outline-none
                    transition-all
                    placeholder:text-noite/35
                    focus:border-mata/50
                    focus:bg-white
                    focus:ring-2
                    focus:ring-mata/10
                  "
                />
              </div>

              {/* Botão */}

              <button
                type="submit"
                className="
                  group
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-3
                  rounded-xl
                  bg-mata
                  px-6
                  py-4
                  font-texto
                  text-sm
                  font-semibold
                  text-white
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-noite
                  hover:shadow-[0_15px_35px_rgba(14,107,84,0.25)]
                  active:translate-y-0
                "
              >
                <span>Enviar pelo WhatsApp</span>

                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path d="M5 12h14" />
                  <path d="m13 6 6 6-6 6" />
                </svg>
              </button>

              <p
                className="
                  text-center
                  font-texto
                  text-[10px]
                  leading-5
                  text-noite/45
                "
              >
                Ao enviar, você será direcionado para o WhatsApp
                para continuar o atendimento.
              </p>
            </form>
          </div>
        </div>

        {/* =====================================================
            FAQ
        ====================================================== */}

        <div
          className={`
            mx-auto
            mt-28
            max-w-[950px]
            rounded-[28px]
            border
            border-white
            bg-white/[0.96]
            p-7
            shadow-[0_25px_70px_rgba(0,0,0,0.18)]
            backdrop-blur-sm
            transition-all
            delay-300
            duration-[1000ms]
            ease-[cubic-bezier(0.22,1,0.36,1)]
            sm:p-10
            md:p-12

            ${
              visivel
                ? "translate-y-0 opacity-100"
                : "translate-y-14 opacity-0"
            }
          `}
        >
          {/* Cabeçalho */}

          <div className="mb-10 text-center">
            <span
              className="
                font-texto
                text-[11px]
                font-semibold
                tracking-[0.3em]
                text-mata
              "
            >
              DÚVIDAS FREQUENTES
            </span>

            <h2
              className="
                mt-4
                font-titulo
                text-4xl
                font-normal
                tracking-[-0.03em]
                text-noite
                md:text-5xl
              "
            >
              Perguntas que podem
              <br />

              <span className="italic text-ferrugem">
                ajudar você
              </span>
            </h2>
          </div>

          {/* Perguntas */}

          <div className="border-t border-noite/10">
            {perguntas.map((item, index) => {
              const aberta = perguntaAberta === index;

              return (
                <div
                  key={item.pergunta}
                  className="border-b border-noite/10"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setPerguntaAberta(
                        aberta ? null : index
                      )
                    }
                    className="
                      flex
                      w-full
                      items-center
                      justify-between
                      gap-6
                      py-6
                      text-left
                      outline-none
                    "
                  >
                    <span
                      className={`
                        font-texto
                        text-sm
                        font-semibold
                        transition-colors
                        duration-300
                        md:text-base
                        ${
                          aberta
                            ? "text-mata"
                            : "text-noite"
                        }
                      `}
                    >
                      {item.pergunta}
                    </span>

                    <span
                      className={`
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-noite/10
                        transition-all
                        duration-300

                        ${
                          aberta
                            ? "rotate-45 bg-mata text-white"
                            : "bg-white text-noite"
                        }
                      `}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <path d="M12 5v14" />
                        <path d="M5 12h14" />
                      </svg>
                    </span>
                  </button>

                  {/* Resposta */}

                  <div
                    className={`
                      grid
                      transition-all
                      duration-500
                      ease-in-out

                      ${
                        aberta
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }
                    `}
                  >
                    <div className="overflow-hidden">
                      <p
                        className="
                          max-w-[780px]
                          pb-6
                          pr-14
                          font-texto
                          text-sm
                          leading-7
                          text-noite/60
                        "
                      >
                        {item.resposta}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* =====================================================
            FINAL
        ====================================================== */}

        <div
          className={`
            mt-20
            flex
            items-center
            justify-center
            gap-4
            transition-all
            delay-500
            duration-1000

            ${
              visivel
                ? "translate-y-0 opacity-100"
                : "translate-y-6 opacity-0"
            }
          `}
        >
          <span className="h-px w-16 bg-white" />

          <span className="h-2 w-2 rounded-full bg-ferrugem" />

          <span className="h-px w-16 bg-white" />
        </div>
      </div>
    </section>
  );
}