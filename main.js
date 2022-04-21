const SCREEN = { w : 720, h: 480 }

const game = {
    id : document.getElementById("game"),
    itens: 18,
    reels : {
        size : {  w: 720, h: 480 },
        itens_size : { w: 80, h: 80 },
            
    }
}
const roulette = {
    init : function(){
        styleDiv(game.id, SCREEN.w, SCREEN.h)
        createReels()
        
        roulette.rodadas = 0
        roulette.counter()

    },
    counter: function(){
        game.reels_row.className = ""
        let time = 15.00;
        let count = setInterval(()=>{
            time -= 0.01
            game.reels_counter.innerHTML = "<p> Girando em "+time.toFixed(2).replace(".", ":")+"</p>"
        }, 10)
        setTimeout(()=>{
            game.reels_counter.innerHTML = "<p> Girando ... </p>"
            clearInterval(count)
            roulette.swap()
        }, 15000)
    },
    swap : function(){
        setTimeout(()=>{
            game.reels_itens.className = "anim opacity"
            game.reels_row.className = "opacity"
            swap_itens()
        }, 1000)
        setTimeout(()=>{
            game.reels_itens.className = ""
            win()
            setTimeout(()=>{
                move_itens(game.moveNext)
                roulette.counter()
            }, 3000)
        }, 4000)
    }
}
function createReels(){
	let reels = document.createElement("div")
    //let reels_historic = document.createElement("div")
    let reels_row = document.createElement("div")
    let reels_line = document.createElement("div")
    let reels_itens = document.createElement("div")
    let reels_counter = document.createElement("div")
    let line = document.createElement("div")

    /** REELS */
    reels.id = "reels"
    //reels_historic.id = "reels-historic"
    reels_row.id = "reels-row"
    reels_line.id = "reels-line"
    reels_itens.id = "reels-itens"
    reels_counter.id = "reels-counter"


    styleDiv(reels,  game.reels.size.w,  game.reels.size.h)
    //styleDiv(reels_historic, game.reels.size.w,  20)
    styleDiv(line, (game.reels.itens_size.w/20), game.reels.itens_size.h*2)
    styleDiv(reels_counter, game.reels.size.w, (game.reels.itens_size.h*3))
    reels_line.appendChild(line)
    reels_row.appendChild(reels_line)
    reels_row.appendChild(reels_itens)

    let itens;
    let id;

    /** Row */
    for (var j = 1; j <= game.itens; j++) {
        /**White*/
        if( j == ((game.itens)/2)+1 ){
            itens = document.createElement("div")
            id = 'white'

            styleDiv(itens, game.reels.itens_size.w, game.reels.itens_size.h)
            itens.id = id
            itens.innerHTML = "<p>J</p>"

            reels_itens.appendChild(itens)
        }

        /**Reds*/
        itens = document.createElement("div")
        id = 'red'

        styleDiv(itens, game.reels.itens_size.w, game.reels.itens_size.h)
        itens.id = id
        itens.innerHTML = "<p>"+j+"</p>"
        reels_itens.appendChild(itens)

        /**Blacks*/
        let id_number = (game.itens*2)+1-j
        itens = document.createElement("div")
        id = 'black'
        
        styleDiv(itens, game.reels.itens_size.w, game.reels.itens_size.h)
        itens.id = id
        itens.innerHTML = "<p>"+(id_number)+"</p>"

        reels_itens.appendChild(itens)
    }

    //reels.appendChild(reels_historic)
    reels.appendChild(reels_counter)
    reels.appendChild(reels_row)
    game.id.appendChild(reels)

    game.reels_itens = reels_itens
    //game.reels_historic = reels_historic
    game.reels_counter = reels_counter
    game.reels_row = reels_row
}
function styleDiv(div, width, height){
    div.style.width = width+'px';
    div.style.height = height+'px';
}
function swap_itens(){
    let max = (game.itens*2)+1
    let min = 1
    let move = Math.trunc(Math.random() * (max - min) + min)

    if( roulette.rodadas == 0){
        move = (game.itens*2)+1
        roulette.rodadas = 0
    }
    else{ 
        roulette.rodadas += 1
    }
	move_itens(move)
    game.moveNext = (game.itens*2)-move+1
}
function move_itens(move){
    let reels_itens =  game.reels_itens
    for (var i = 0; i < move; i++) {
        reels_itens.firstChild.parentNode.insertBefore(reels_itens.lastChild, reels_itens.firstChild)
    }
}
function win(){
    let pos = game.reels_itens.childNodes[game.itens] 
    let item_win = {
        number : pos.firstChild.innerHTML,
        color : pos.id
    }
    return item_win
}

roulette.init()

/*

1 14 2 13 3 12 4
11 5 10 6 9 7 8 

*/