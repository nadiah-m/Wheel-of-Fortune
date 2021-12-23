//////////////// Generate words //////////////////
const wordLibrary = [
  { categories: "MOVIES", name: ["SPIDERMAN", "IRONMAN"] },
  { categories: "CELEBRITY", name: ["TOM HOLLAND", "ROBERT DOWNEY JR"] },
];

const wordGenerator = () => {
  //generate random category
  const randomCategory = Math.floor(Math.random() * wordLibrary.length);
  const wordCategory = wordLibrary[randomCategory].categories;

  //generate random words within category
  const wordGenerator =
    wordLibrary[randomCategory].name[
      Math.floor(Math.random() * wordLibrary.length)
    ];

  //get individual letters of words
  const charWords = wordGenerator.split("");

  //word & category generated
  return charWords;
};

// console.log(wordGenerator());

const word = wordGenerator();
//////////////////////////////////////////////////

//////////////// alphabet into buttons/////////////
const alphabet = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

//////////////////////////////////////////////////

const main = () => {
  ////////////////////create alhpabet ul//////////////////////////
  const createAlphabet = () => {
    alphabet.forEach((item) => {
      const letter = $("#alphabetbuttons").append(
        "<button>" + item + "</button>"
      );
    });
  };
  createAlphabet();

  ////////////////////create empty boxes for words/////////////////////
  const createSquares = () => {
    for (let j = 0; j < word.length; j++) {
      if (word[j] === " ") {
        //white square with text for space " "
        const $emptySpace = $("<li>").addClass("white square").attr("id", j);
        const $createSpace = $("#answerletter").append($emptySpace);
        $("#" + j).text(word[j]);
      } else {
        //green squares for letters
        const $squareLetter = $("<li>").addClass("green square").attr("id", j);
        const $createSquare = $("#answerletter").append($squareLetter);
      }
    }
  };

  createSquares();
  /////////////////////////////////////////////////////////////////////

  ///////////////////convert squares to array//////////////////////////
  const $squares = $(".square");
  const $arraySquares = $squares.toArray();
  const textArray = [];
  let letter;
  // console.log($arraySquares);

  ///////////////////update squares with correct letter if clicked////////////
  const updateSquares = (letter) => {
    //on click of alphabet button, check if its the correct letter
    for (let i = 0; i < word.length; i++) {
      if (letter === word[i]) {
        // console.log(word);
        $("#" + i).text(word[i]);
      }
    }
  };

  let player1Score = 0;
  let player2Score = 0;
  let currentPlayer = "1";
      
  // const isGameOn = (textArray) => {
  //   if (textArray.includes("")) {
  //     console.log("The game is still on");
  //     return true;
  //   } else {
  //     console.log("GAME OVER");
  //     return false;
  //   }
  // };




  const playGame = () => {
    const checkPlayer = () => {
      if (currentPlayer === "1") {
        $("#alphabetbuttons").on("click", (event) => {
          const $clickedLetter = $(event.target).text();
          player1Action($clickedLetter);
        });
        
      } else if (currentPlayer === "2") {
        compAction();
      }
    }; 
    console.log(currentPlayer);
    checkPlayer();
  };

  // do {
  //   playGame();
  // } while (isGameOn(textArray));

  //////////////////what user can do///////////////////////
  const player1Action = ($clickedLetter) => {
    for (let arrayIndex = 0; arrayIndex < $arraySquares.length; arrayIndex++) {
      textArray[arrayIndex] = $arraySquares[arrayIndex].innerHTML;
    }   letter = $clickedLetter;
    if (isValidAction(letter, textArray) && isGameOn(textArray)) {
      if (word.includes(letter)) {
        updateSquares(letter);
        player1Score += 1;
      } else {
        changePlayer();
        console.log("Wrong letter. Next player turn");
      }
    } 
  };


  ////////////////computer action////////////////////
  const compAction = () => {
    for (let arrayIndex = 0; arrayIndex < $arraySquares.length; arrayIndex++) {
      textArray[arrayIndex] = $arraySquares[arrayIndex].innerHTML;
    }
    const randomAlphabet =
      alphabet[Math.floor(Math.random() * alphabet.length)];
      letter = randomAlphabet;
      console.log(letter);
    if (isValidAction(letter, textArray) && isGameOn(textArray)) {
      if (word.includes(letter)) {
        updateSquares(letter);
        player2Score += 1;
      } else {
        changePlayer();
      }
    } 
  };

  /////////////////update score/////////////////////////

  ///////////////check for win/////////////////////////

  ///////////change player turn///////////////
  const $playerDisplay = $(".display-player");
  console.log($playerDisplay.classList);


  const changePlayer = () => {
    $playerDisplay.removeClass(`player ${currentPlayer}`);
    currentPlayer = currentPlayer === "1" ? "2" : "1";
    $playerDisplay.text(currentPlayer);
    $playerDisplay.addClass(`player ${currentPlayer}`);
  };

  ////////////check if letter has already been chosed previously///////////
  const isValidAction = (letter, textArray) => {
    if (textArray.includes(letter)) {
      console.log("YOU CANT DO THAT!!!");
      return false;
      // console.log("The game is still on");
    }
    return true;
    // }
  };

  /////////////check for empty string in squares///////////////////
  const isGameOn = (textArray) => {
    if (textArray.includes("")) {
      console.log("The game is still on");
      return true;
    } else {
      console.log("GAME OVER");
      return false;
    }
  };

  // $("#alphabetbuttons").on("click", (event) => {
  
  //   const $clickedLetter = $(event.target).text();
  //   playGame($clickedLetter);
  // });




};

$(main);
