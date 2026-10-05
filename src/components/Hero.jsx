import React from 'react';

import Header from './Header'

import bgPraia from '../assets/tra-praia.png';
import imgSol from '../assets/tra-sol.png';
import imgCristo from '../assets/tra-cristo.png';
import imgPaoDeAcucar from '../assets/tra-pao-de-acucar.png';
import imgBondinho from '../assets/tra-bondinho.png';
import imgPalmeiras from '../assets/tra-palmeiras.png';

/*
  =========================================================
  COMO FUNCIONA

  1) PALCO (.hs-stage): todos os elementos da cena ficam dentro dele,
     ancorado embaixo e centralizado. A praia (fundo) fica fora e
     sempre preenche a tela.

     - Celular / tela em pé  -> palco 4:5, ocupa 100% da largura e os
       elementos têm tamanho/posição próprios (Cristo, Pão de Açúcar
       e sol maiores, TUDO visível).
     - Tablet deitado / desktop / ultrawide -> palco 2:1 que "cobre"
       a tela (como object-cover). É a composição original.

  2) TELEFÉRICO (.hs-tele): o Pão de Açúcar e os CABOS (com o bondinho)
     ficam no MESMO grupo. Os cabos usam medidas relativas ao Pão de
     Açúcar, então escalam e se movem junto com ele em qualquer tela.
     Os cabos NÃO ficam mais soltos.

  Ajustes finos: procure os blocos "MOBILE" e "DESKTOP" no <style>.
  =========================================================
*/

export default function Hero() {
    return (
        <section
            id="inicio"
            data-hero="hero"
            className="hero-root relative w-full overflow-hidden bg-[#071522]"
        >

            <Header />

            {/* 1. PRAIA / ÁGUA (fora do palco: sempre cobre tudo) */}
            <img
                src={bgPraia}
                alt="Fundo Praia"
                className="
                    absolute inset-0 top-[-4%]
                    w-full h-full
                    object-cover object-bottom
                    z-0
                    hero-praia
                "
            />

            {/* =========================================================
                PALCO
            ========================================================= */}
            <div className="hs-stage">

                {/* 2. PALMEIRAS */}
                <img
                    src={imgPalmeiras}
                    alt="Palmeira Trás"
                    className="absolute hs-palm hs-palm-1 z-10 opacity-80 palm palm-1"
                />

                <img
                    src={imgPalmeiras}
                    alt="Palmeira Meio"
                    className="absolute hs-palm hs-palm-2 z-20 palm palm-2"
                />

                <img
                    src={imgPalmeiras}
                    alt="Palmeira Frente"
                    className="absolute hs-palm hs-palm-3 z-30 palm palm-3"
                />

                {/* 3. SOL */}
                <img
                    src={imgSol}
                    alt="Sol"
                    className="absolute hs-sol z-10 opacity-90 mix-blend-screen hero-sol"
                />

                {/* =====================================================
                    4 + 5. TELEFÉRICO = PÃO DE AÇÚCAR + CABOS + BONDINHO
                    Tudo no mesmo grupo: os cabos sempre acompanham
                    a montanha.
                ===================================================== */}
                <div className="absolute hs-tele z-20 hero-pao">

                    <img
                        src={imgPaoDeAcucar}
                        alt="Pão De Açúcar"
                        className="block w-full h-auto"
                    />

                    <svg
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                        className="hs-cabos pointer-events-none hero-cabos"
                    >

                        {/* CABO PRINCIPAL */}
                        <path
                            id="caboPrincipal"
                            d="M 10 33.2 L 43 41 Q 60 45 100 25"
                            stroke="#1a1a1a"
                            strokeWidth="0.3"
                            fill="none"
                        />

                        {/* Segundo cabo */}
                        <path
                            d="M 10 36.6 L 33 40 Q 60 44 100 24"
                            stroke="#1a1a1a"
                            strokeWidth="0.2"
                            fill="none"
                            opacity="0.8"
                        />

                        {/* Terceiro cabo */}
                        <path
                            d="M 10 35.6 L 33 39 Q 60 43 95 23"
                            stroke="#1a1a1a"
                            strokeWidth="0.1"
                            fill="none"
                            opacity="0.6"
                        />

                        {/* Quarto cabo */}
                        <path
                            d="M 10 34.6 L 33 38 Q 60 42 102 22"
                            stroke="#1a1a1a"
                            strokeWidth="0.1"
                            fill="none"
                            opacity="0.4"
                        />

                        {/* BONDINHO
                            0%=esquerda 25%=direita 50%=espera
                            75%=volta 100%=espera */}
                        <g className="bondinho-svg">

                            <image
                                href={imgBondinho}
                                x="-5"
                                y="-3"
                                width="10"
                                height="6"
                                preserveAspectRatio="xMidYMid meet"
                            >

                                {/* 40s: 10s ida, 10s parado, 10s volta, 10s parado */}
                                <animateMotion
                                    dur="40s"
                                    repeatCount="indefinite"
                                    begin="13s"
                                    path="M 10 33.2 L 43 41 Q 60 45 100 25"
                                    keyPoints="0;1;1;0;0"
                                    keyTimes="0;0.25;0.5;0.75;1"
                                    calcMode="linear"
                                    rotate="0"
                                />

                                {/* Entrada suave do bondinho */}
                                <animate
                                    attributeName="opacity"
                                    values="0;1"
                                    dur="2s"
                                    begin="11s"
                                    fill="freeze"
                                />

                            </image>

                        </g>

                    </svg>

                </div>

                {/* 6. CRISTO */}
                <img
                    src={imgCristo}
                    alt="Cristo Redentor"
                    className="absolute hs-cristo z-30 drop-shadow-2xl hero-cristo"
                />

                {/* 7. TRANSIÇÃO PARA O PRETO */}
                <div className="absolute inset-x-0 bottom-0 hs-fade z-40 pointer-events-none">

                    <div
                        className="
                            absolute inset-0
                            bg-gradient-to-t
                            from-[#071522]
                            via-[#071522]/80
                            via-[50%]
                            to-transparent
                        "
                    />

                    <div
                        className="
                            absolute inset-0
                            bg-gradient-to-t
                            from-[#071522]/90
                            via-[#071522]/35
                            via-[65%]
                            to-transparent
                        "
                    />

                    <div
                        className="
                            absolute bottom-0 left-0
                            w-full h-[15%]
                            bg-[#071522]
                        "
                    />

                </div>

            </div>

            {/* =========================================================
                ESTILOS + ANIMAÇÕES
            ========================================================= */}
            <style>{`

                /* =====================================================
                   BASE
                ===================================================== */

                .hero-root {
                    /* MOBILE: a seção acompanha a altura da cena
                       (em vez de esticar a tela toda), assim o mar
                       fica menor e a proporção igual à do desktop.
                       Quer mais mar/céu? aumente o 130vw. */
                    height: 100vh;              /* fallback */
                    height: min(100svh, 130vw);
                    min-height: 420px;
                    container-type: size;       /* libera cqw / cqh */
                }

                .hs-stage {
                    position: absolute;
                    left: 50%;
                    bottom: 0;
                    transform: translateX(-50%);
                    container-type: inline-size;
                }

                .hs-stage img { max-width: none; user-select: none; -webkit-user-drag: none; }

                /* =====================================================
                   MOBILE (padrão, mobile-first)
                   Valores em % do palco; "calc(100% - Xcqw)" = distância
                   do chão do palco, em % da largura dele.
                ===================================================== */

                .hs-stage { width: 100cqw; aspect-ratio: 4 / 5; }

                .hs-palm   { width: 38%; }
                .hs-palm-1 { left: -14%; top: calc(100% - 44cqw); }
                .hs-palm-2 { left: 5%;   top: calc(100% - 45.5cqw); }
                .hs-palm-3 { left: -9%;  top: calc(100% - 49cqw); }

                .hs-sol    { width: 36%; right: 8%; top: calc(100% - 82cqw); }

                .hs-tele   { width: 60%; right: -10%; bottom: -6cqw;
                             container-type: inline-size; transform-origin: bottom right; }

                .hs-cristo { width: 54%; left: -4%; bottom: -8cqw; }

                .hs-fade   { height: 34%; }

                /* =====================================================
                   DESKTOP / TELAS DEITADAS (composição original)
                ===================================================== */

                @media (min-aspect-ratio: 5/4) {

                    .hero-root { height: 100svh; }

                    .hs-stage { aspect-ratio: 2 / 1; width: max(100cqw, 200cqh); }

                    .hs-palm   { width: 28%; }
                    .hs-palm-1 { left: -11%; top: 35%; }
                    .hs-palm-2 { left: 4%;   top: 33%; }
                    .hs-palm-3 { left: -7%;  top: 28%; }

                    .hs-sol    { width: 26%; right: 8%; top: -15%; }

                    .hs-tele   { width: 52%; right: -5%; bottom: -5cqw; }

                    .hs-cristo { width: 45%; left: -5%; bottom: -6cqw; }

                    .hs-fade   { height: 42%; }
                }

                /* =====================================================
                   CABOS: medidas relativas ao Pão de Açúcar (.hs-tele)
                   Assim o fio sempre termina no topo da montanha.
                ===================================================== */

                .hs-cabos {
                    position: absolute;
                    left: -141.8%;
                    bottom: 4.5cqw;
                    width: 181.8%;
                    aspect-ratio: 2 / 1;
                    height: auto;
                    z-index: -1;                /* atrás do Pão de Açúcar */
                    overflow: visible;
                }


                /* =====================================================
                   PRAIA
                ===================================================== */

                @keyframes praiaEntrada {
                    0%   { opacity: 0; transform: scale(1.06) translateY(2%); }
                    100% { opacity: 1; transform: scale(1) translateY(0); }
                }

                @keyframes aguaMovimento {
                    0%, 100% { transform: scale(1) translateX(0); }
                    50%      { transform: scale(1.015) translateX(-0.4%); }
                }

                .hero-praia {
                    opacity: 0;
                    animation:
                        praiaEntrada 2.5s ease-out forwards,
                        aguaMovimento 12s ease-in-out 2.5s infinite;
                }


                /* =====================================================
                   PALMEIRAS
                ===================================================== */

                @keyframes palmeiraEntrada {
                    0%   { opacity: 0; transform: translateX(-100%) rotate(-3deg); }
                    60%  { opacity: 1; }
                    100% { opacity: 1; transform: translateX(0) rotate(0deg); }
                }

                @keyframes folhasMovimento {
                    0%, 100% { transform: rotate(0deg); }
                    50%      { transform: rotate(1.5deg); }
                }

                .palm { opacity: 0; transform-origin: bottom center; }

                .palm-1 {
                    animation:
                        palmeiraEntrada 2s cubic-bezier(.22,1,.36,1) 2.2s forwards,
                        folhasMovimento 5s ease-in-out 4.2s infinite;
                }

                .palm-2 {
                    animation:
                        palmeiraEntrada 2s cubic-bezier(.22,1,.36,1) 2.7s forwards,
                        folhasMovimento 5.5s ease-in-out 4.7s infinite;
                }

                .palm-3 {
                    animation:
                        palmeiraEntrada 2s cubic-bezier(.22,1,.36,1) 3.2s forwards,
                        folhasMovimento 4.8s ease-in-out 5.2s infinite;
                }


                /* =====================================================
                   SOL
                ===================================================== */

                @keyframes solEntrada {
                    0%   { opacity: 0; transform: translateY(-20px) scale(.85); }
                    100% { opacity: .9; transform: translateY(0) scale(1); }
                }

                .hero-sol {
                    opacity: 0;
                    animation: solEntrada 2.5s ease-out 5.2s forwards;
                }


                /* =====================================================
                   TELEFÉRICO (Pão de Açúcar + cabos)
                ===================================================== */

                @keyframes paoEntrada {
                    0%   { opacity: 0; transform: translateX(15%) translateY(8%) scale(.96); }
                    100% { opacity: 1; transform: translateX(0) translateY(0) scale(1); }
                }

                .hero-pao {
                    opacity: 0;
                    animation: paoEntrada 2.2s cubic-bezier(.22,1,.36,1) 6.2s forwards;
                }


                /* =====================================================
                   CRISTO
                ===================================================== */

                @keyframes cristoEntrada {
                    0%   { opacity: 0; transform: translateY(12%) scale(.97); }
                    100% { opacity: 1; transform: translateY(0) scale(1); }
                }

                .hero-cristo {
                    opacity: 0;
                    animation: cristoEntrada 2.2s cubic-bezier(.22,1,.36,1) 8s forwards;
                }


                /* =====================================================
                   CABOS (entrada)
                ===================================================== */

                @keyframes cabosEntrada {
                    0%   { opacity: 0; transform: translateX(-25%); }
                    100% { opacity: 1; transform: translateX(0); }
                }

                .hero-cabos {
                    opacity: 0;
                    animation: cabosEntrada 2.5s cubic-bezier(.22,1,.36,1) 8.8s forwards;
                }

                .bondinho-svg { pointer-events: none; }


                /* =====================================================
                   MENOS MOVIMENTO (acessibilidade)
                ===================================================== */

                @media (prefers-reduced-motion: reduce) {
                    .hero-praia, .palm, .hero-sol, .hero-pao, .hero-cristo, .hero-cabos {
                        animation: none !important;
                        opacity: 1;
                        transform: none;
                    }
                    .palm-1 { opacity: .8; }
                    .hero-sol { opacity: .9; }
                }

            `}</style>

        </section>
    );
}