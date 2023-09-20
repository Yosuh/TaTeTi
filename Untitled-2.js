
const x = "X";
const o = "O";
let estaJuego = "1" 

const modal = document.querySelector("dialog") 
const texModal = modal.querySelector("h2")



const cuadrados = document.querySelectorAll(".cuadrado");
const tabla = Array.from(cuadrados).map(cuadrado => cuadrado.innerText)

cuadrados.forEach((cuadrado,i)=> { 
    console.log('cli')
    cuadrado.addEventListener("click", ()=>{
        if(estaJuego === "P") return; 
        if(cuadrado.textContent !== "") return; 
        cuadrado.innerText= estaJuego === "1" ? x : o; 
        const ganador = CheckGanador()
        if(typeof ganador === "object") { 
            GanarJugador(ganador);
            return
            }
        if(ganador === "empate"){
            terminarJuego("Empate")
        }
        estaJuego = estaJuego === "1" ? "2" : "1" 
    })

})

function CheckGanador(){
    const tabla = Array.from(cuadrados).map(cuadrado => cuadrado.innerText) 

    for (let i = 0; i <= 9; i += 3) {
        if( tabla[i] &&
            tabla[i] === tabla[i+1] && 
            tabla[i] === tabla[i+2]){
                return [i, i+1, i+2];

        } 
    }
   
    for(let i = 0; i <= 9; i++){
        if( tabla[i] &&
            tabla[i] === tabla[i+3] &&
            tabla[i] === tabla[i+6]){
                return [i, i+3, i+6];
            }
    } 
    if( tabla[0] &&
        tabla[0] === tabla[4] &&
        tabla[0] === tabla[8]){
            return [0, 4, 8];
        }
    if( tabla[2] &&
        tabla[2] === tabla[4] &&
        tabla[2] === tabla[6]){
            return [2, 4, 6];
        }

    if(tabla.includes("")) return false; 
    return "empate";
}

function GanarJugador(posWin){
    posWin.forEach(posicion => { 
        cuadrados[posicion].classList.toggle("ganador", true);
    })
    terminarJuego("Ganó el Jugador " + estaJuego);
    estaJuego = "P"
    
}

function terminarJuego(texto){
    texModal.innerText =texto;
    modal.showModal();
}

modal.querySelector("button").addEventListener("click",() =>{
    cuadrados.forEach(cuadrado => {
        cuadrado.textContent = "";
        cuadrado.classList.toggle("ganador", false) 
        modal.close();
        estaJuego = "1"
    })
})