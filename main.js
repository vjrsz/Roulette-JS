const SCREEN = { w : 720, h: 480 }

const game = {
    id : document.getElementById("game"),
    itens: 18,
    reels : {
        size : {  w: 720, h: 480 },
        itens_size : { w: 80, h: 80 },
            
    },
    colors: {
        white: "#ebdfcc",
        black: "#021b2b",
        red: "#ff0841",
    },
    rgb: {
        white: "rgb(235 223 204)",
        black: "rgb(2 27 43)",
        red: "rgb(255 8 65)",
    }
}
const slotMachine = {
    init : function(){
        styleDiv(game.id, SCREEN.w, SCREEN.h)
        createReels()
        
        /** init swap */
        document.getElementById("lever").onclick = () => {
            game.money -= 5
            slotMachine.swap()
        }

    },
    swap : function(){
        setTimeout(()=>{
            game.reels.reels_row.className = "anim"
            swap_itens()
        }, 1000)
        setTimeout(()=>{
            game.reels.reels_row.className = ""
            win()
        }, 4000)
    }
}
function createReels(){
	let reels = document.createElement("div")
    let reels_row = document.createElement("div")
    let reels_line = document.createElement("div")
    let line = document.createElement("div")
    let reels_itens = []

    /** REELS */
    reels.id = "reels"
    reels_row.id = "reels-row"
    reels_line.id = "reels-line"

    styleDiv(reels,  game.reels.size.w,  game.reels.size.h)
    styleDiv(reels_line, game.reels.size.w,  game.reels.size.h)
    styleDiv(line, (game.reels.itens_size.w/20), game.reels.itens_size.h*2)
    reels_line.appendChild(line)

    let itens;
    let id;

    /** Row */
    for (var j = 1; j <= game.itens; j++) {
        /**White*/
        if( j == ((game.itens)/2)+1 ){
            itens = document.createElement("div")
            id = 'reelsC'

            styleDiv(itens, game.reels.itens_size.w, game.reels.itens_size.h)
            itens.id = id
            itens.style.background = game.colors.white
            itens.innerHTML = "<p>C</p>"

            reels_itens.push(itens)
            reels_row.appendChild(itens)
        }

        /**Reds*/
        itens = document.createElement("div")
        id = 'reels'+j

        styleDiv(itens, game.reels.itens_size.w, game.reels.itens_size.h)
        itens.id = id
        itens.style.background = game.colors.red
        itens.innerHTML = "<p>"+j+"</p>"
        reels_itens.push(itens)
        reels_row.appendChild(itens)

        /**Blacks*/
        let id_number = (game.itens*2)+1-j
        itens = document.createElement("div")
        id = 'reels'+(id_number)

        styleDiv(itens, game.reels.itens_size.w, game.reels.itens_size.h)
        itens.id = id
        itens.style.background = game.colors.black
        itens.innerHTML = "<p>"+(id_number)+"</p>"

        reels_itens.push(itens)
        reels_row.appendChild(itens)
    }

    reels.appendChild(reels_line)
    reels.appendChild(reels_row)
    game.id.appendChild(reels)
    game.reels = {
        id : reels,
        reels_row : reels_row,  
        reels_itens : reels_itens
    } 
}
function styleDiv(div, width, height){
    div.style.width = width+'px';
    div.style.height = height+'px';
}
function swap_itens(){
    let max = game.itens*2
    let min = 1
    let reels_row = game.reels.reels_row
    let move = Math.trunc(Math.random() * (max - min) + min)

	for (var i = 0; i < move; i++) {
        reels_row.firstChild.parentNode.insertBefore(reels_row.lastChild, reels_row.firstChild)

        //console.log(reels_row.lastChild, reels_row.firstChild, move)
    }
}
function win(){
    let pos = game.reels.reels_row.childNodes[game.itens] 
    let item_win = {
        number : pos.firstChild.innerHTML,
        color : ''
    }

    /** rgbToHex */
    let color = pos.style.background.replace(',', '').replace(',', '')

    /** colors */
    if(color == game.rgb.white){
        item_win.color = "white"
    }else if(color == game.rgb.red){
        item_win.color = "red"
    }else if(color == game.rgb.black){
        item_win.color = "black"
    }

    console.log(item_win)    
}

slotMachine.init()

/*

1 14 2 13 3 12 4
11 5 10 6 9 7 8 

*/