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
        $("#" + i).text(letter);
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

  const loopSquareArray = () => {
    for (let arrayIndex = 0; arrayIndex < $arraySquares.length; arrayIndex++) {
      textArray[arrayIndex] = $arraySquares[arrayIndex].innerHTML;
    }
  };
  //////////////////what user can do///////////////////////
  // const comparePlayer1Action = ($clickedLetter) => {
  //   getPlayer1Action();
  //   loopSquareArray();
  //   letter = $clickedLetter;
  //   if (isValidAction(letter, textArray) && isGameOn(textArray)) {
  //     if (word.includes(letter)) {
  //       updateSquares(letter);
  //       player1Score += 1;
  //     } else {
  //       changePlayer();
  //       console.log("Wrong letter. Next player turn");
  //     }
  //   }
  // };

  ////////////////computer action////////////////////
  // const compAction = () => {
  //   loopSquareArray();
  //   const randomAlphabet =
  //     alphabet[Math.floor(Math.random() * alphabet.length)];
  //   letter = randomAlphabet;
  //   console.log(letter);
  //   if (isValidAction(letter, textArray) && isGameOn(textArray)) {
  //     if (word.includes(letter)) {
  //       updateSquares(letter);
  //       player2Score += 1;
  //     } else {
  //       changePlayer();
  //     }
  //   }
  // };

  /////////////////update score/////////////////////////
  // const checkForWin = () => {
  //   if (isGameOn === false) {
  //     if (player1Score > player2Score) {
  //       console.log("player 1 wins!");
  //     } else if (player2Score > player1Score) {
  //       console.log("player 2 wins!");
  //     } else console.log("Its a tie!");
  //   }
  // };

  ///////////////check for win/////////////////////////

  // const playerTurn = () => {
  //   if (currentPlayer === "1") {
  //     comparePlayer1Action($clickedLetter);
  //     playGame($clickedLetter);
  //   } else if (currentPlayer === "2") {
  //     compAction();
  //     playGame($clickedLetter);
  //   }
  // };

  // playGame = ($clickedLetter) => {
  //   playerTurn($clickedLetter);
  //   checkForWin();
  // };

  /////////change player turn///////////////
  const $playerDisplay = $(".display-player");
  console.log($playerDisplay.classList);

  const changePlayer = () => {
    $playerDisplay.removeClass(`player ${currentPlayer}`);
    currentPlayer = currentPlayer === "1" ? "2" : "1";
    $playerDisplay.text(currentPlayer);
    $playerDisplay.addClass(`player ${currentPlayer}`);
  };

  //////////check if letter has already been chosed previously///////////
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

  const player1 = {
    score: 0,
    input: [
      {
        clickedletter: "A",
        correct: false,
      },
      {
        clickedletter: "B",
        correct: true,
      },
    ],
  };

  const player2 = {
    score: 0,
    input: [
      {
        clickedletter: "C",
        correct: false,
      },
      {
        clickedletter: "D",
        correct: true,
      },
    ],
  };

  const render = (player1) => {
    player1Action(player1.input);
    console.log(player1);
  };

  const player1Action = (input) => {
    const lastItem = player1.input[input.length - 1];
    const inputletter = lastItem.clickedletter;
    loopSquareArray();
    if (isValidAction(inputletter, textArray) && isGameOn(textArray)) {
      if (word.includes(inputletter)) {
        updateSquares(inputletter);
        lastItem.correct = true;
        player1.score += 1;
      } else {
        changePlayer();
        console.log("wrong letter.next player");
      }
    }
  };

  constplayer2Action = (input) => {
    loopSquareArray();
    randomletter = alphabet[Math.floor(Math.random() * alphabet.length)];
    
    lastItem = player2.input[input.length-1];

  }

  const handleClickedLetter = (event) => {
    const clickedletter = $(event.target).text();

    const item = { clickedletter: clickedletter, correct: false };
    player1.input.push(item);
    render(player1);
  };

  $("#alphabetbuttons").on("click", handleClickedLetter);
  render(player1);
};

$(main);
