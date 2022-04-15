const SCREEN = { w : 720, h: 480 }

const game = {
    id : document.getElementById("game"),
    itens: 7,
    settings: {
        reels : {
            size : {  w: 720, h: 480 },
            itens_size : { w: 80, h: 80 },
        }
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
            game.reels.reels_r.className = "anim"
        }, 1000)
        setTimeout(()=>{
            game.reels.reels_r.className = ""
        }, 4000)
    }
}
function createReels(){
	let reels = document.createElement("div")
    let reels_r = document.createElement("div")
    let reels_itens = []

    /** REELS */
    reels.id = "reels"
    reels_r.id = "reels-r"

    styleDiv(reels,  game.settings.reels.size.w,  game.settings.reels.size.h)

    /** Row */
    for (var j = 1; j <= game.itens; j++) {
        /**Reds*/
        let itens = document.createElement("div")
        let id = 'reels'+j

        styleDiv(itens, game.settings.reels.itens_size.w, game.settings.reels.itens_size.h)
        itens.id = id
        itens.style.background = "#ff0841"
        itens.innerHTML = "<p>"+j+"</p>"
        reels_itens.push(itens)
        reels_r.appendChild(itens)

        /**White*/
        if( j == 4 ){
            itens = document.createElement("div")
            id = 'reels'+(15-j)

            styleDiv(itens, game.settings.reels.itens_size.w, game.settings.reels.itens_size.h)
            itens.id = id
            itens.style.background = "#ebdfcc"
            itens.innerHTML = "<p>C</p>"

            reels_itens.push(itens)
            reels_r.appendChild(itens)
        }
        /**Blacks*/
        itens = document.createElement("div")
        id = 'reels'+(15-j)

        styleDiv(itens, game.settings.reels.itens_size.w, game.settings.reels.itens_size.h)
        itens.id = id
        itens.style.background = "#021b2b"
        itens.innerHTML = "<p>"+(15-j)+"</p>"

        reels_itens.push(itens)
        reels_r.appendChild(itens)
    }


    reels.appendChild(reels_r)
    game.id.appendChild(reels)
    game.reels = {
        id : reels,
        reels_r : reels_r,  
        reels_itens : reels_itens
    } 
}
function swap_itens(){
    let max = 14
    let min = 1
    move = Math.trunc(Math.random() * (max - min) + min)
	
    /*
        swaps = document.createElement("span")

        reels_img[img_1].parentNode.insertBefore(swaps, reels_img[img_1])
        reels_img[img_2].parentNode.insertBefore(reels_img[img_1], reels_img[img_2])
        swaps.parentNode.insertBefore(reels_img[img_2], swaps)
        swaps.remove()
    */
}
function styleDiv(div, width, height){
    div.style.width = width+'px';
    div.style.height = height+'px';
}
slotMachine.init()

/*

1 14 2 13 3 12 4
11 5 10 6 9 7 8 

*/