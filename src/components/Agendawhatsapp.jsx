// ============================================================
// AgendaWhatsApp.jsx
// Verso do card: agenda com navegação entre meses.
// Dias que já passaram ficam bloqueados. Clicou no dia -> WhatsApp.
// ============================================================

import { useState } from 'react'

// TROQUE pelo número da T.R.A:
// código do país (55) + DDD + número, só dígitos. Ex.: 5521999999999
const NUMERO_WHATSAPP = '5521979824885'

// Quantos meses à frente (a partir do mês atual) dá para agendar
const MESES_A_FRENTE = 24

// Quantos meses para trás dá para apenas visualizar (dias passados não clicam)
const MESES_PARA_TRAS = 12

const DIAS_SEMANA = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

export default function AgendaWhatsApp({ roteiro, onVoltar }) {

  // Hoje, à meia-noite, para comparar só a data (sem horas)
  const agora = new Date()
  const hoje = new Date(
    agora.getFullYear(),
    agora.getMonth(),
    agora.getDate()
  )

  // Quantos meses estamos do mês atual (0 = mês atual, negativo = passado)
  const [deslocamento, setDeslocamento] = useState(0)

  // Mês e ano exibidos (o JS acerta a virada de ano sozinho)
  const dataBase = new Date(
    hoje.getFullYear(),
    hoje.getMonth() + deslocamento,
    1
  )

  const ano = dataBase.getFullYear()
  const mes = dataBase.getMonth()

  const primeiroDiaSemana = dataBase.getDay()
  const totalDias = new Date(ano, mes + 1, 0).getDate()

  const celulas = [
    ...Array(primeiroDiaSemana).fill(null),
    ...Array.from({ length: totalDias }, (_, i) => i + 1),
  ]

  const nomeMes = dataBase.toLocaleDateString('pt-BR', {
    month: 'long',
  })

  const podeVoltarMes = deslocamento > -MESES_PARA_TRAS
  const podeAvancarMes = deslocamento < MESES_A_FRENTE

  function escolherDia(dia) {

    const data = new Date(ano, mes, dia).toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })

    const texto =
      `Olá! Gostaria de agendar o roteiro *${roteiro.nome}* ` +
      `para ${data}.`

    window.open(
      `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(texto)}`,
      '_blank',
      'noopener,noreferrer'
    )

  }

  return (

    <div className="flex h-full w-full flex-col rounded-[2rem] border border-white/10 bg-[#081321]/90 p-7 shadow-2xl shadow-black/30 backdrop-blur-xl md:p-10">

      {/* CABEÇALHO */}

      <div className="mb-6 flex items-start justify-between gap-4">

        <div>

          <p className="text-sm font-semibold text-[#1FC0CF]">
            Escolha o dia
          </p>

          <h3 className="mt-1 text-2xl font-bold text-[#F1EEE8]">
            {roteiro.nome}
          </h3>

        </div>

        <button
          type="button"
          onClick={onVoltar}
          className="rounded-full border border-white/15 px-4 py-2 text-sm text-[#F1EEE8]/80 transition hover:border-[#E8801A] hover:text-[#E8801A]"
        >
          Voltar
        </button>

      </div>


      {/* NAVEGAÇÃO ENTRE MESES */}

      <div className="mb-4 flex items-center justify-between gap-3">

        <button
          type="button"
          onClick={() => setDeslocamento((d) => d - 1)}
          disabled={!podeVoltarMes}
          aria-label="Mês anterior"
          className={`flex h-10 w-10 items-center justify-center rounded-full border text-lg transition duration-200 ${
            podeVoltarMes
              ? 'border-white/15 text-[#F1EEE8] hover:border-[#E8801A] hover:text-[#E8801A]'
              : 'cursor-not-allowed border-white/5 text-[#F1EEE8]/20'
          }`}
        >
          ←
        </button>


        <p className="text-center text-lg font-semibold text-[#F1EEE8]">

          <span className="capitalize">{nomeMes}</span>

          <span className="ml-2 text-[#F1EEE8]/50">{ano}</span>

        </p>


        <button
          type="button"
          onClick={() => setDeslocamento((d) => d + 1)}
          disabled={!podeAvancarMes}
          aria-label="Próximo mês"
          className={`flex h-10 w-10 items-center justify-center rounded-full border text-lg transition duration-200 ${
            podeAvancarMes
              ? 'border-white/15 text-[#F1EEE8] hover:border-[#E8801A] hover:text-[#E8801A]'
              : 'cursor-not-allowed border-white/5 text-[#F1EEE8]/20'
          }`}
        >
          →
        </button>

      </div>


      {/* CALENDÁRIO */}

      <div className="grid grid-cols-7 gap-1.5 text-center">

        {DIAS_SEMANA.map((d, i) => (
          <span
            key={i}
            className="pb-2 text-xs text-[#F1EEE8]/40"
          >
            {d}
          </span>
        ))}

        {celulas.map((dia, i) => {

          if (dia === null) return <span key={`vazio-${i}`} />

          const dataDia = new Date(ano, mes, dia)

          // Dias anteriores a hoje (em qualquer mês) ficam bloqueados
          const passado = dataDia < hoje

          const ehHoje = dataDia.getTime() === hoje.getTime()

          return (

            <button
              key={dia}
              type="button"
              disabled={passado}
              onClick={() => escolherDia(dia)}
              aria-label={`Agendar para ${dia} de ${nomeMes} de ${ano}`}
              className={`aspect-square rounded-xl text-sm font-semibold transition duration-200 ${
                passado
                  ? 'cursor-not-allowed text-[#F1EEE8]/20'
                  : 'text-[#F1EEE8] hover:scale-110 hover:bg-[#E8801A] hover:text-[#081321]'
              } ${ehHoje ? 'ring-1 ring-[#1FC0CF]' : ''}`}
            >
              {dia}
            </button>

          )

        })}

      </div>


      <p className="mt-6 text-sm text-[#F1EEE8]/50">
        Ao escolher o dia, abrimos o WhatsApp com a mensagem pronta.
      </p>

    </div>

  )

}