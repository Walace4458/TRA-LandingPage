import { useEffect, useRef, useState } from 'react'
import AgendaWhatsApp from './AgendaWhatsApp'

// ============================================================
// IMAGENS
// ============================================================

const imagens = import.meta.glob('../assets/*/*.{jpg,jpeg,png,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
})

// ============================================================
// ROTEIROS
// ============================================================

const roteiros = [
  { id: 1, nome: 'Arraial do Cabo', pasta: 'Arraial do cabo', prefixo: 'arraial', descricao: 'Conheça as belezas de Arraial do Cabo em uma experiência inesquecível pelo litoral do Rio de Janeiro.', tempo: 'Aproximadamente 3h', distancia: '165 km' },
  { id: 2, nome: 'Campos do Jordão', pasta: 'Campos do jordão', prefixo: 'campos', descricao: 'Um destino encantador cercado por natureza, clima agradável e experiências especiais.', tempo: 'Aproximadamente 4h', distancia: '330 km' },
  { id: 3, nome: 'Conservatória', pasta: 'Conservatoria', prefixo: 'conservatoria', descricao: 'Conheça o charme de Conservatória e aproveite uma experiência tranquila e cheia de história.', tempo: 'Aproximadamente 2h', distancia: '140 km' },
  { id: 4, nome: 'Nova Friburgo', pasta: 'Nova friburgo', prefixo: 'nova', descricao: 'Descubra as montanhas de Nova Friburgo e aproveite momentos cercados pela natureza.', tempo: 'Aproximadamente 2h', distancia: '140 km' },
  { id: 5, nome: 'Paraty', pasta: 'Paraty', prefixo: 'paraty', descricao: 'Conheça Paraty, seus cenários históricos, natureza exuberante e experiências inesquecíveis.', tempo: 'Aproximadamente 4h', distancia: '250 km' },
  { id: 6, nome: 'Penedo', pasta: 'Penedo', prefixo: 'penedo', descricao: 'Um destino charmoso cercado por natureza, gastronomia e paisagens encantadoras.', tempo: 'Aproximadamente 2h', distancia: '170 km' },
  { id: 7, nome: 'Petrópolis', pasta: 'Petropolis', prefixo: 'petropolis', descricao: 'Explore a história, arquitetura e beleza natural da Cidade Imperial.', tempo: 'Aproximadamente 1h30', distancia: '70 km' },
  { id: 8, nome: 'Região do Cabo', pasta: 'Região do cabo', prefixo: 'regiao', descricao: 'Descubra algumas das paisagens mais bonitas do litoral da Região dos Lagos.', tempo: 'Aproximadamente 3h', distancia: '160 km' },
  { id: 9, nome: 'Rio de Janeiro', pasta: 'Rio de Janeiro', prefixo: 'rj', descricao: 'Viva o Rio de Janeiro e conheça alguns dos lugares mais marcantes da cidade maravilhosa.', tempo: 'Aproximadamente 1h', distancia: 'Centro do Rio' },
  { id: 10, nome: 'Vassouras', pasta: 'Vassouras', prefixo: 'vassouras', descricao: 'Conheça Vassouras e suas paisagens, história e tranquilidade no interior do Rio de Janeiro.', tempo: 'Aproximadamente 2h', distancia: '120 km' },
  { id: 11, nome: 'Visconde de Mauá', pasta: 'Visconde de Maua', prefixo: 'visconde', descricao: 'Uma experiência cercada por montanhas, cachoeiras e muita natureza.', tempo: 'Aproximadamente 3h', distancia: '190 km' },
]

// ============================================================
// ENCONTRA IMAGENS
// ============================================================

function pegarImagem(pasta, prefixo, nome) {
  const caminho = Object.keys(imagens).find((caminho) => {
    return (
      caminho.includes(`assets/${pasta}/`) &&
      caminho.toLowerCase().includes(`tra-${prefixo}-${nome}`)
    )
  })

  return caminho ? imagens[caminho] : ''
}

const roteirosComImagens = roteiros.map((roteiro) => ({
  ...roteiro,
  capa: pegarImagem(roteiro.pasta, roteiro.prefixo, 'capa'),
  fotos: [
    pegarImagem(roteiro.pasta, roteiro.prefixo, '1'),
    pegarImagem(roteiro.pasta, roteiro.prefixo, '2'),
    pegarImagem(roteiro.pasta, roteiro.prefixo, '3'),
  ],
}))

// ============================================================
// LINHAS DO MAPA DE FUNDO
// Cada destino tem seu próprio conjunto de linhas, geradas de
// forma determinística (o mesmo destino sempre gera o mesmo
// desenho).
// ============================================================

function criarRandom(semente) {
  let a = (semente * 2654435761) >>> 0

  return function () {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// Converte pontos em curva suave (Catmull-Rom para Bezier)

function suavizar(pts) {
  let d = `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`

  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[i + 2] || p2

    const c1x = p1[0] + (p2[0] - p0[0]) / 6
    const c1y = p1[1] + (p2[1] - p0[1]) / 6
    const c2x = p2[0] - (p3[0] - p1[0]) / 6
    const c2y = p2[1] - (p3[1] - p1[1]) / 6

    d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`
  }

  return d
}

const estilosLinhas = [
  { cor: '#E8801A', largura: 4, opacidade: 1, dash: '12 10', fluxo: 'dash 18s linear infinite', faixa: 560, variacao: 150 },
  { cor: '#1FC0CF', largura: 3, opacidade: 1, dash: '9 14', fluxo: 'dashReverse 20s linear infinite', faixa: 680, variacao: 130 },
  { cor: '#1B4FD1', largura: 2, opacidade: 1, dash: '6 16', fluxo: 'none', faixa: 170, variacao: 110 },
  { cor: '#F1EEE8', largura: 1.5, opacidade: 0.35, dash: '4 18', fluxo: 'none', faixa: 800, variacao: 90 },
]

const XS = [-150, 330, 780, 1230, 1680, 1950]

const cacheLinhas = {}

function gerarLinhas(id) {
  if (cacheLinhas[id]) return cacheLinhas[id]

  const random = criarRandom(id * 7919 + 13)

  const linhas = estilosLinhas.map((estilo, k) => {
    let pts = XS.map((x) => [
      x,
      estilo.faixa + (random() * 2 - 1) * estilo.variacao,
    ])

    // Algumas linhas entram pela direita, outras pela esquerda
    if (random() > 0.5) pts = pts.reverse()

    return { ...estilo, d: suavizar(pts), ponto: pts[2 + (k % 2)] }
  })

  cacheLinhas[id] = linhas

  return linhas
}

// ============================================================
// CAMADA DE LINHAS DO FUNDO
// Entrando: as linhas se desenham. Saindo: as linhas se apagam.
// ============================================================

function CamadaFundo({ id, saindo = false }) {
  const linhas = gerarLinhas(id)

  return (
    <svg
      viewBox="0 0 1800 900"
      preserveAspectRatio="none"
      className="absolute inset-0 h-full w-full"
      fill="none"
    >
      {linhas.map((linha, k) => {
        const idMascara = `mascara-${id}-${k}-${saindo ? 's' : 'e'}`
        const atraso = 0.15 + k * 0.18

        const animacaoTraco = saindo
          ? `rotaSai 0.9s ease-in ${(k * 0.05).toFixed(2)}s both`
          : `rotaEntra 1.9s ease-in-out ${atraso.toFixed(2)}s both`

        const animacaoPonto = saindo
          ? 'sumir 0.5s ease-in both'
          : `aparecer 0.6s ease-out ${(atraso + 1.1).toFixed(2)}s both`

        return (
          <g key={k}>
            {/* A máscara "desenha" a linha pontilhada aos poucos */}
            <mask id={idMascara} maskUnits="userSpaceOnUse" x="-400" y="-400" width="2600" height="1700">
              <path
                d={linha.d}
                pathLength="1"
                stroke="#fff"
                strokeWidth="40"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="1 1"
                style={{ animation: animacaoTraco }}
              />
            </mask>

            {/* LINHA PONTILHADA */}
            <g mask={`url(#${idMascara})`}>
              <path
                d={linha.d}
                stroke={linha.cor}
                strokeOpacity={linha.opacidade}
                strokeWidth={linha.largura}
                strokeLinecap="round"
                strokeDasharray={linha.dash}
                style={{ animation: linha.fluxo }}
              />
            </g>

            {/* PONTO NA LINHA */}
            <g style={{ animation: animacaoPonto }}>
              <circle cx={linha.ponto[0]} cy={linha.ponto[1]} r={k === 0 ? 7 : 5} fill={linha.cor} />

              {k === 0 && (
                <>
                  <circle cx={linha.ponto[0]} cy={linha.ponto[1]} r="18" stroke="#E8801A" strokeOpacity="0.25" strokeWidth="1" />
                  <circle cx={linha.ponto[0]} cy={linha.ponto[1]} r="30" stroke="#E8801A" strokeOpacity="0.1" strokeWidth="1" />
                </>
              )}
            </g>
          </g>
        )
      })}
    </svg>
  )
}

// ============================================================
// COMPONENTE
// ============================================================

export default function Roteiro() {

  // ----------------------------------------------------------
  // ESTADOS
  // ----------------------------------------------------------

  const [roteiroSelecionado, setRoteiroSelecionado] = useState(roteirosComImagens[0])
  const [fotoAtual, setFotoAtual] = useState(0)
  const [visivel, setVisivel] = useState(false)

  // Linhas do destino anterior, que ainda estão se apagando
  const [rotaSaindo, setRotaSaindo] = useState(null)

  // Card virado mostrando a agenda
  const [agendando, setAgendando] = useState(false)

  // ----------------------------------------------------------
  // REFS
  // ----------------------------------------------------------

  const carrosselRef = useRef(null)
  const destinoRef = useRef(null)
  const arrastando = useRef(false)
  const inicioX = useRef(0)
  const scrollInicial = useRef(0)
  const moveu = useRef(false)
  const recentering = useRef(false)
  const capturado = useRef(false)
  const timerRota = useRef(null)

  useEffect(() => {
    return () => clearTimeout(timerRota.current)
  }, [])

  // ==========================================================
  // ANIMAÇÃO DE ENTRADA
  // ==========================================================

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisivel(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )

    const elemento = document.getElementById('roteiros')

    if (elemento) observer.observe(elemento)

    return () => observer.disconnect()
  }, [])

  // ==========================================================
  // PREPARA CARROSSEL INFINITO
  // ==========================================================

  useEffect(() => {
    if (!carrosselRef.current) return

    const container = carrosselRef.current

    requestAnimationFrame(() => {
      container.scrollLeft = container.scrollWidth / 3
    })
  }, [])

  // ==========================================================
  // CARROSSEL INFINITO
  // ==========================================================

  function verificarLoop() {
    if (!carrosselRef.current) return

    const container = carrosselRef.current
    const tamanho = container.scrollWidth / 3

    if (container.scrollLeft <= 20) {
      recentering.current = true
      container.scrollLeft += tamanho
      requestAnimationFrame(() => {
        recentering.current = false
      })
    }

    if (container.scrollLeft >= tamanho * 2 - 20) {
      recentering.current = true
      container.scrollLeft -= tamanho
      requestAnimationFrame(() => {
        recentering.current = false
      })
    }
  }

  // ==========================================================
  // ARRASTAR
  // ==========================================================

  function iniciarArraste(e) {
    if (!carrosselRef.current) return

    arrastando.current = true
    moveu.current = false
    capturado.current = false
    inicioX.current = e.clientX
    scrollInicial.current = carrosselRef.current.scrollLeft

    // Sem setPointerCapture aqui: capturar no pointerdown
    // fazia o click ir para o carrossel e não para o card.
  }

  function arrastar(e) {
    if (!arrastando.current || !carrosselRef.current) return

    const distancia = e.clientX - inicioX.current

    if (Math.abs(distancia) > 5) {
      moveu.current = true

      // só captura o ponteiro quando o usuário realmente começou a arrastar
      if (!capturado.current) {
        try {
          carrosselRef.current.setPointerCapture(e.pointerId)
          capturado.current = true
        } catch {
          // ponteiro indisponível
        }
      }
    }

    if (!moveu.current) return

    carrosselRef.current.scrollLeft = scrollInicial.current - distancia

    verificarLoop()
  }

  function finalizarArraste(e) {
    if (!arrastando.current) return

    arrastando.current = false

    if (capturado.current) {
      try {
        e.currentTarget.releasePointerCapture(e.pointerId)
      } catch {
        // pointer já liberado
      }

      capturado.current = false
    }
  }

  // ==========================================================
  // SELECIONAR ROTEIRO
  // ==========================================================

  function selecionarRoteiro(roteiro, elemento) {
    // Evita selecionar quando o usuário estava apenas arrastando
    if (moveu.current) {
      moveu.current = false
      return
    }

    // As linhas atuais se apagam enquanto as novas se desenham
    if (roteiro.id !== roteiroSelecionado.id) {
      setRotaSaindo(roteiroSelecionado.id)

      clearTimeout(timerRota.current)

      timerRota.current = setTimeout(() => {
        setRotaSaindo(null)
      }, 1300)
    }

    setRoteiroSelecionado(roteiro)
    setFotoAtual(0)

    // Desvira o card se estava mostrando a agenda
    setAgendando(false)

    // Centraliza o card clicado
    if (elemento) {
      elemento.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      })
    }

    // Depois leva suavemente para a área do destino.
    // Se a área for mais alta que a tela (celular), alinha pelo topo
    // em vez de centralizar, para não cortar o começo.
    setTimeout(() => {
      const alvo = destinoRef.current

      if (!alvo) return

      alvo.scrollIntoView({
        behavior: 'smooth',
        block: alvo.offsetHeight > window.innerHeight ? 'start' : 'center',
      })
    }, 100)
  }

  // ==========================================================
  // FOTOS
  // ==========================================================

  function proximaFoto() {
    setFotoAtual((atual) =>
      atual === roteiroSelecionado.fotos.length - 1 ? 0 : atual + 1
    )
  }

  function fotoAnterior() {
    setFotoAtual((atual) =>
      atual === 0 ? roteiroSelecionado.fotos.length - 1 : atual - 1
    )
  }

  // ==========================================================
  // RENDER
  // (MOBILE-FIRST: classes sem prefixo = celular;
  //  sm: / md: / lg: = telas maiores)
  // ==========================================================

  return (
    <section
      id="roteiros"
      className={`relative min-h-screen overflow-hidden bg-[#081321] py-16 transition-all duration-1000 md:py-28 ${
        visivel ? 'opacity-100' : 'opacity-0'
      }`}
    >

      {/* ====================================================
          MAPA DE FUNDO DA SEÇÃO
      ==================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.13]">
        <svg viewBox="0 0 1600 1000" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" fill="none">

          {/* LINHAS REGIONAIS */}
          <path d="M-100 180 C180 40 280 300 520 190 S900 50 1160 180 S1420 330 1700 140" stroke="#1FC0CF" strokeWidth="1.2" strokeDasharray="6 14" />
          <path d="M-100 700 C180 520 300 820 580 650 S960 470 1200 650 S1450 820 1700 600" stroke="#1B4FD1" strokeWidth="1.2" strokeDasharray="5 16" />
          <path d="M300 -100 C450 180 260 330 470 500 S760 760 650 1100" stroke="#E8801A" strokeWidth="1" strokeDasharray="4 15" />
          <path d="M1250 -100 C1060 170 1320 310 1110 500 S850 780 1000 1100" stroke="#F1EEE8" strokeWidth="0.8" strokeDasharray="4 18" />

          {/* ROTAS PRINCIPAIS */}
          <path d="M-80 820 C180 680 220 450 470 500 C690 545 710 270 940 340 C1170 410 1240 170 1680 230" stroke="#E8801A" strokeWidth="2" strokeDasharray="8 12" className="animate-[mapRoute_18s_linear_infinite]" />
          <path d="M-100 330 C160 430 280 200 500 300 C730 410 820 620 1050 470 C1270 330 1390 520 1700 390" stroke="#1FC0CF" strokeWidth="1.8" strokeDasharray="7 13" className="animate-[mapRoute_22s_linear_infinite]" />

          {/* PONTOS */}
          <circle cx="470" cy="500" r="5" fill="#1FC0CF" />
          <circle cx="940" cy="340" r="5" fill="#E8801A" />
          <circle cx="1050" cy="470" r="4" fill="#1FC0CF" />
          <circle cx="500" cy="300" r="4" fill="#1B4FD1" />
        </svg>
      </div>

      {/* ====================================================
          CONTEÚDO
      ==================================================== */}

      <div className="relative z-10">

        {/* ==================================================
            TÍTULO
        ================================================== */}

        <div
          className={`mx-auto mb-10 max-w-6xl transform px-5 transition-all duration-[1200ms] ease-out md:mb-16 md:px-6 ${
            visivel ? 'translate-x-0 opacity-100' : '-translate-x-24 opacity-0'
          }`}
        >
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#1FC0CF] sm:text-sm sm:tracking-[0.3em] md:mb-3">
            T.R.A Passeios e Viagens
          </p>

          <h2 className="text-3xl font-bold text-[#F1EEE8] sm:text-4xl md:text-6xl">
            Roteiro Exclusivo
          </h2>

          <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#F1EEE8]/60 sm:text-base md:mt-4">
            Escolha seu próximo destino e descubra experiências preparadas
            especialmente para você.
          </p>
        </div>

        {/* ==================================================
            CARROSSEL
        ================================================== */}

        <div
          className={`relative mb-14 transform transition-all duration-[1400ms] ease-out md:mb-28 ${
            visivel ? 'translate-x-0 opacity-100' : 'translate-x-32 opacity-0'
          }`}
        >

          {/* MAPA DO CARROSSEL */}

          <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-30">
            <svg viewBox="0 0 1600 500" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" fill="none">

              {/* GRID */}
              <path d="M0 100 H1600 M0 250 H1600 M0 400 H1600" stroke="#F1EEE8" strokeOpacity="0.05" />
              <path d="M200 0 V500 M500 0 V500 M800 0 V500 M1100 0 V500 M1400 0 V500" stroke="#F1EEE8" strokeOpacity="0.05" />

              {/* ROTA ESQUERDA */}
              <path d="M-100 380 C120 350 170 120 390 180 S650 420 850 230 S1120 70 1700 170" stroke="#1FC0CF" strokeWidth="2" strokeDasharray="7 13" className="animate-[mapRoute_20s_linear_infinite]" />

              {/* ROTA CENTRAL */}
              <path d="M-100 160 C170 220 280 400 500 290 S780 80 980 220 S1250 410 1700 280" stroke="#E8801A" strokeWidth="2" strokeDasharray="8 15" className="animate-[mapRoute_24s_linear_infinite]" />

              {/* ROTA SECUNDÁRIA */}
              <path d="M0 450 C250 380 330 460 580 400 S850 310 1100 380 S1400 450 1600 350" stroke="#1B4FD1" strokeWidth="1.5" strokeDasharray="5 15" />

              {/* PONTOS DE MAPA */}
              <circle cx="390" cy="180" r="5" fill="#1FC0CF" />
              <circle cx="850" cy="230" r="5" fill="#E8801A" />
              <circle cx="980" cy="220" r="4" fill="#1FC0CF" />
              <circle cx="580" cy="400" r="4" fill="#1B4FD1" />
            </svg>
          </div>

          {/* CARDS */}

          <div
            ref={carrosselRef}
            onPointerDown={iniciarArraste}
            onPointerMove={arrastar}
            onPointerUp={finalizarArraste}
            onPointerCancel={finalizarArraste}
            onScroll={verificarLoop}
            className="relative flex cursor-grab gap-4 overflow-x-auto px-5 py-8 active:cursor-grabbing md:gap-6 md:px-6 md:py-10"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              touchAction: 'pan-y',
            }}
          >
            {[...roteirosComImagens, ...roteirosComImagens, ...roteirosComImagens].map(
              (roteiro, index) => {
                const uniqueKey = `${roteiro.id}-${index}`

                return (
                  <button
                    key={uniqueKey}
                    type="button"
                    onClick={(e) => selecionarRoteiro(roteiro, e.currentTarget)}
                    className="group relative min-w-[230px] flex-shrink-0 overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#081321] text-left shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-[#1FC0CF]/60 hover:shadow-[#1FC0CF]/10 sm:min-w-[260px] sm:rounded-[2rem] md:min-w-[320px] lg:min-w-[350px]"
                  >
                    {/* FOTO NORMAL */}
                    <img
                      src={roteiro.capa}
                      alt={roteiro.nome}
                      draggable="false"
                      className="h-[320px] w-full select-none object-cover transition-transform duration-700 ease-out group-hover:scale-105 sm:h-[390px] md:h-[460px]"
                    />

                    {/* OVERLAY */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#081321] via-[#081321]/20 to-transparent" />

                    {/* BORDA */}
                    <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] border border-white/10 transition duration-500 group-hover:border-[#1FC0CF]/60 sm:rounded-[2rem]" />

                    {/* TEXTO */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1FC0CF]">
                        Destino
                      </span>

                      <h3 className="mt-1 text-xl font-bold text-[#F1EEE8] md:text-2xl">
                        {roteiro.nome}
                      </h3>
                    </div>
                  </button>
                )
              }
            )}
          </div>
        </div>

        {/* ==================================================
            DESTINO SELECIONADO + MAPA DE FUNDO
        ================================================== */}

        <div
          ref={destinoRef}
          className="relative w-full scroll-mt-20 overflow-hidden border-y border-white/10 bg-[#0a1827]"
        >

          {/* =================================================
              MAPA GIGANTE DE FUNDO
              (as linhas mudam conforme o destino escolhido)
          ================================================= */}

          <div className="pointer-events-none absolute inset-0 overflow-hidden">

            {/* GLOW CENTRAL */}
            <div className="absolute left-1/2 top-1/2 h-[300px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1B4FD1]/10 blur-[100px] md:h-[500px] md:w-[700px] md:blur-[120px]" />

            {/* GRID */}
            <svg viewBox="0 0 1800 900" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" fill="none">
              <path d="M0 150 H1800 M0 300 H1800 M0 450 H1800 M0 600 H1800 M0 750 H1800" stroke="#F1EEE8" strokeOpacity="0.035" />
              <path d="M150 0 V900 M400 0 V900 M650 0 V900 M900 0 V900 M1150 0 V900 M1400 0 V900 M1650 0 V900" stroke="#F1EEE8" strokeOpacity="0.035" />
            </svg>

            {/* LINHAS DO DESTINO ANTERIOR (SE APAGANDO) */}
            {rotaSaindo !== null && (
              <CamadaFundo key={`saindo-${rotaSaindo}`} id={rotaSaindo} saindo />
            )}

            {/* LINHAS DO DESTINO ATUAL (SE DESENHANDO) */}
            <CamadaFundo
              key={`entrando-${roteiroSelecionado.id}-${visivel}`}
              id={roteiroSelecionado.id}
            />
          </div>

          {/* =================================================
              CONTEÚDO DO DESTINO
          ================================================= */}

          <div
            className={`relative z-10 mx-auto max-w-7xl px-4 py-10 transition-all duration-[1200ms] sm:px-6 sm:py-14 md:px-10 lg:py-28 ${
              visivel ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`}
          >

            <div className="grid gap-6 sm:gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12">

              {/* =================================================
                  GALERIA
              ================================================= */}

              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#081321]/70 shadow-2xl shadow-black/40 backdrop-blur-sm md:rounded-[2rem]">

                <img
                  src={roteiroSelecionado.fotos[fotoAtual]}
                  alt={`${roteiroSelecionado.nome} - foto ${fotoAtual + 1}`}
                  className="h-[240px] w-full object-cover transition-opacity duration-500 sm:h-[340px] md:h-[440px] lg:h-[540px]"
                />

                {/* OVERLAY */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#081321]/70 via-transparent to-transparent" />

                {/* SETA ESQUERDA */}
                <button
                  type="button"
                  onClick={fotoAnterior}
                  className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-[#081321]/80 text-lg text-[#F1EEE8] backdrop-blur-md transition duration-300 hover:scale-110 hover:bg-[#E8801A] md:left-4 md:h-12 md:w-12 md:text-xl"
                  aria-label="Foto anterior"
                >
                  ←
                </button>

                {/* SETA DIREITA */}
                <button
                  type="button"
                  onClick={proximaFoto}
                  className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-[#081321]/80 text-lg text-[#F1EEE8] backdrop-blur-md transition duration-300 hover:scale-110 hover:bg-[#E8801A] md:right-4 md:h-12 md:w-12 md:text-xl"
                  aria-label="Próxima foto"
                >
                  →
                </button>

                {/* INDICADORES */}
                <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 md:bottom-5">
                  {roteiroSelecionado.fotos.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setFotoAtual(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        fotoAtual === index ? 'w-8 bg-[#E8801A]' : 'w-2 bg-[#F1EEE8]/50'
                      }`}
                      aria-label={`Ir para foto ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* =================================================
                  INFORMAÇÕES (FRENTE) + AGENDA (VERSO)
                  O card vira ao clicar em "Agendar este roteiro"
              ================================================= */}

              <div className="[perspective:1600px]">

                <div
                  className={`grid transition-transform duration-700 ease-in-out [transform-style:preserve-3d] ${
                    agendando ? '[transform:rotateY(180deg)]' : ''
                  }`}
                >

                  {/* ---------- FRENTE ---------- */}

                  <div
                    className={`[grid-area:1/1] [backface-visibility:hidden] rounded-3xl border border-white/10 bg-[#081321]/65 p-5 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-7 md:rounded-[2rem] md:p-10 ${
                      agendando ? 'pointer-events-none' : ''
                    }`}
                  >

                    <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-[#1FC0CF] sm:text-sm sm:tracking-[0.25em] md:mb-3">
                      Destino selecionado
                    </span>

                    <h3 className="mb-3 text-3xl font-bold leading-tight text-[#F1EEE8] sm:text-4xl md:mb-6 md:text-5xl">
                      {roteiroSelecionado.nome}
                    </h3>

                    <p className="mb-5 max-w-lg text-sm leading-relaxed text-[#F1EEE8]/70 sm:text-base md:mb-8 md:text-lg">
                      {roteiroSelecionado.descricao}
                    </p>

                    {/* DADOS DA VIAGEM */}

                    <div className="mb-5 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap md:mb-8">

                      <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 md:px-5 md:py-4">
                        <span className="block text-[11px] uppercase tracking-wider text-[#F1EEE8]/40 md:text-xs">
                          Viagem
                        </span>

                        <span className="mt-1 block text-sm font-semibold text-[#F1EEE8] md:text-base">
                          {roteiroSelecionado.tempo}
                        </span>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 md:px-5 md:py-4">
                        <span className="block text-[11px] uppercase tracking-wider text-[#F1EEE8]/40 md:text-xs">
                          Distância
                        </span>

                        <span className="mt-1 block text-sm font-semibold text-[#F1EEE8] md:text-base">
                          {roteiroSelecionado.distancia}
                        </span>
                      </div>

                    </div>

                    {/* BOTÃO */}

                    <button
                      type="button"
                      onClick={() => setAgendando(true)}
                      className="inline-flex w-full items-center justify-center rounded-full bg-[#E8801A] px-6 py-4 text-base font-bold text-[#081321] shadow-xl shadow-[#E8801A]/20 transition duration-300 hover:scale-[1.02] hover:bg-[#1FC0CF] hover:shadow-[#1FC0CF]/30 md:w-auto md:px-8 md:py-5 md:text-lg"
                    >
                      Agendar este roteiro
                    </button>

                  </div>

                  {/* ---------- VERSO ---------- */}

                  <div
                    className={`flex [grid-area:1/1] [backface-visibility:hidden] [transform:rotateY(180deg)] ${
                      agendando ? '' : 'pointer-events-none'
                    }`}
                  >
                    <AgendaWhatsApp
                      roteiro={roteiroSelecionado}
                      onVoltar={() => setAgendando(false)}
                    />
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* ====================================================
          ANIMAÇÕES
      ==================================================== */}

      <style>{`

        @keyframes dash {
          to { stroke-dashoffset: -120; }
        }

        @keyframes dashReverse {
          to { stroke-dashoffset: 120; }
        }

        @keyframes rotaEntra {
          from { stroke-dashoffset: 1; }
          to   { stroke-dashoffset: 0; }
        }

        @keyframes rotaSai {
          from { stroke-dashoffset: 0; }
          to   { stroke-dashoffset: -1; }
        }

        @keyframes aparecer {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        @keyframes sumir {
          from { opacity: 1; }
          to   { opacity: 0; }
        }

        @keyframes mapRoute {
          to { stroke-dashoffset: -160; }
        }

      `}</style>

    </section>
  )
}