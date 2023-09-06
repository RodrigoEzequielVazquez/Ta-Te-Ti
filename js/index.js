const bloques = document.getElementsByClassName("bloques")
const spans = document.getElementsByTagName("span")
const contenedorFin = document.getElementById("ocultar")
const ganador = document.getElementById("ganador")
const btnJugarDeNuevo = document.getElementById("jugarDeNuevo")

let movimientosX = 5
let movimientosO = 4
let movimientos = 1

function escribir() {

    for (const bloque of bloques) {
        bloque.addEventListener("click", () => {

            let bloqueId = bloque.id
            let id = bloqueId.slice(6)
            const span = document.getElementById(id)

            if (span.innerHTML != "" || movimientos === 0) {
                return
            }

            else {
                if (movimientosX > movimientosO) {
                    span.innerHTML = "X"
                    span.setAttribute("class", "X")
                    movimientosX--
                    movimientos++

                } else {
                    span.innerHTML = "O"
                    span.setAttribute("class", "O")
                    movimientosO--
                    movimientos++
                }
            }

            let victoria1 = victoria(0, 1, 2) //horizontal
            let victoria2 = victoria(3, 4, 5) //horizontal
            let victoria3 = victoria(6, 7, 8) //horizontal

            let victoria4 = victoria(0, 3, 6) //vertical
            let victoria5 = victoria(1, 4, 7) //vertical
            let victoria6 = victoria(2, 5, 8) //vertical

            let victoria7 = victoria(0, 4, 8) //cruzadas
            let victoria8 = victoria(2, 4, 6) //cruzadas

            if (((!victoria1) || (!victoria2) || (!victoria3) || (!victoria4) || (!victoria5) || (!victoria6) || (!victoria7) || (!victoria8)) && (movimientos === 10)) {

                ganador.innerHTML = "Empate"
                contenedorFin.removeAttribute("id")
            } 
        })
    }
}

escribir()

function victoria(a, b, c) {

    let span1 = spans[a]
    let span2 = spans[b]
    let span3 = spans[c]

    let resultadoGanador = (span1.className === span2.className) && (span2.className === span3.className) && (span3.className === span1.className)

    let distintoDe = (span1.className != "") && (span2.className != "") && (span3.className != "")

    if (resultadoGanador && distintoDe) {

        const bloque1 = document.getElementById("bloque" + span1.id)
        const bloque2 = document.getElementById("bloque" + span2.id)
        const bloque3 = document.getElementById("bloque" + span3.id)

        bloque1.setAttribute("class", "ganador" + span1.className)
        bloque2.setAttribute("class", "ganador" + span1.className)
        bloque3.setAttribute("class", "ganador" + span1.className)

        ganador.innerHTML = "El ganador es " + span1.className

        contenedorFin.removeAttribute("id")

        movimientos = 0

        return true
    }

    return false
}

btnJugarDeNuevo.addEventListener("click", () => {

    for (let index = 1; index <= 9; index++) {
        const bloques = document.getElementById("bloque" + index).setAttribute("class", "bloques")
    }

    for (const span of spans) {
        span.removeAttribute("class")
        span.innerHTML = ""
    }
    contenedorFin.setAttribute("id", "ocultar")
    movimientosX = 5
    movimientosO = 4
    movimientos = 1
})
