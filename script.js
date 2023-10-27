const elements = (function(){
    const markSelection = document.querySelector('.markSelection');
    const x = document.querySelector('.x');
    const o = document.querySelector('.o');
    const selectOpponent = document.querySelector('.selectOpponent');
    const human = document.querySelector('.human');
    const ai = document.querySelector('.ai');
    const difficultyEl = document.querySelector('.difficulty');
    const easy = document.querySelector('.easy');
    const moderate = document.querySelector('.moderate');
    const hard = document.querySelector('.hard');
    const impossible = document.querySelector('.impossible');
    const showResultEl = document.querySelector('.showResult');
    const winnerEl = document.querySelector('#winner');
    const playAgain = document.querySelector('.playAgain');
    const tiles = document.querySelectorAll('.boardTile');
    return {
        markSelection,
        x,
        o,
        selectOpponent,
        human,
        ai,
        difficultyEl,
        easy,
        moderate,
        hard,
        impossible,
        showResultEl,
        winnerEl,
        playAgain,
        tiles,
    }
})();

userInputs = function userInputs(){
    let opponent = '';
    let difficulty = '';
    let activeMark = '';

    function selectdifficulty(e){
        if(e.target == elements.easy){
            difficulty = 'easy';
        }
        else if(e.target == elements.moderate){
            difficulty = 'moderate';
        }
        else if(e.target == elements.hard){
            difficulty = 'hard';
        }
        else if(e.target == elements.impossible){
            difficulty = 'impossible'
        }
        console.log(difficulty)
    }

    function selectOpponent(e){
        if(e.target == elements.human){
            opponent = 'human';
        }
        else if(e.target == elements.ai){
            opponent = 'ai'
        }
        else{
            return
        }
        console.log(opponent)
    }

    function selectMark(e){
        if(e.target == elements.x){
            activeMark = 'X';
        }
        else if(e.target == elements.o){
            activeMark = 'O'
        }
        console.log(activeMark)
      
    }
   
    function addMark(e){
        let blankTiles = [];
        // add solution for the last move because after that computer has no move
        // check for winning combinations
        if(difficulty == 'easy' && opponent == 'ai'){
            if(blankTiles.length ==1){
                e.target.textContent = activeMark; 
                return
            }
            e.target.textContent = activeMark;
            if(activeMark == 'X'){
                activeMark = 'O'
            }
            else{
                activeMark = 'X'
            }
        }
        findBlankTile()
        aiTurn()
        function findBlankTile(){
            for(let i = 0; i<=elements.tiles.length-1; i++){
                if(elements.tiles[i].textContent == ""){
                    blankTiles.push(i)
                }
            }
            console.log(blankTiles)
            return blankTiles;
            }
            function aiTurn(){
                // select a random index from blankTiles array
                const blankTileIndex = blankTiles[Math.floor(Math.random()*blankTiles.length)];
                console.log(blankTileIndex)
                if(blankTiles.length == 0){
                    return
                }
                else{

                    elements.tiles[blankTileIndex].textContent = activeMark;
                }
                if(activeMark == 'X'){
                    activeMark = 'O'
                }
                else{
                    activeMark = 'X'
                }
        
            }
            checkForWin()
            function checkForWin(){
                let winCombos = [
                    [0,1,2],
                    [3,4,5],
                    [6,7,8],
                    [0,3,6],
                    [1,4,7],
                    [2,5,8],
                    [0,4,8],
                    [2,4,6]
                ]
                for (const win of winCombos) {
                    if(elements.tiles[win[0]].textContent == elements.tiles[win[1]].textContent && elements.tiles[win[0]].textContent == elements.tiles[win[2]].textContent && elements.tiles[win[0]].textContent !== ''){
                        elements.showResultEl.classList.remove('hide');
                        // elements.winnerEl.textContent = elements.tiles[win[0]].textContent;
                    }
                    
                }
            }
    }
        elements.difficultyEl.addEventListener('click', selectdifficulty,{once:true});
        elements.selectOpponent.addEventListener('click', selectOpponent,{once:true});
        elements.markSelection.addEventListener('click', selectMark,{once:true});
        
        elements.tiles.forEach(tile =>{
            tile.addEventListener('click', addMark,{once:true})
        })
        
    }


userInputs()

 