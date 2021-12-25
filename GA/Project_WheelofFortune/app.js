const main = () => {
  //////////////// Generate words //////////////////
  const wordLibrary = [
    { categories: "MOVIES", name: ["SPIDERMAN", "IRONMAN"] },
    { categories: "CELEBRITY", name: ["TOM HOLLAND", "ROBERT DOWNEY JR"] },
  ];

  const wordGenerator = () => {
    //generate random category
    const randomCategory = Math.floor(Math.random() * wordLibrary.length);
    const wordCategory = wordLibrary[randomCategory].categories;

    ////////////////////display category///////////////////////////////
    const $category = $("#category");
    const $displayCategory = $category.text(`Category is ${wordCategory}`);
    $category.append($displayCategory);
    //////////////////////////////////////////////////////////////////

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

  const word = wordGenerator();
  /////////////////////////////////////////////////////////////////

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

  //////////////////////////////////////////////////////////////

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

  let currentPlayer = "1";

  ////////////////loop square array////////////////////////////
  const loopSquareArray = () => {
    for (let arrayIndex = 0; arrayIndex < $arraySquares.length; arrayIndex++) {
      textArray[arrayIndex] = $arraySquares[arrayIndex].innerHTML;
    }
  };
///////////////////////////////////////////////////////////////

const updateSquareSolved = (solveletter) => {
  for (let arrayIndex = 0; arrayIndex < $arraySquares.length; arrayIndex++) {
    textArray[arrayIndex] = $arraySquares[arrayIndex].innerHTML;
    $("#" + arrayIndex).text(solveletter[arrayIndex]);
  
  };
};





  ///////////////check for win/////////////////////////

  const checkForWin = () => {
    loopSquareArray();
    const $result = $("#result");
    if (textArray.join("") === word.join("")) {
      if (player1.score > player2.score) {
        $result.text("Player 1 wins!");
      } else if (player2.score > player1.score) {
        $result.text("Player 2 wins!");
      } else console.log("Its a tie!");
    }
  };

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
      const $player1input = $("#player1Input");
      const $notallowed = $player1input.text(
        "The letter has already been chosen. Please choose another letter"
      );
      $player1input.append($notallowed);
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

  /////////////////////////////////////////////////////////////////

  /////////////////////player data/////////////////////////////
  const player1 = {
    score: 0,
    input: [
      // {
      //   clickedletter: "nonsense",
      //   correct: false,
      // },
      // {
      //   clickedletter: "nonsense",
      //   correct: true,
      // },
    ],
  };

  const player2 = {
    score: 0,
    input: [
      {
        compLetter: "",
        correct: false,
      },
      {
        compLetter: "",
        correct: true,
      },
      {
        compLetter: "H",
        correct: false,
      },
    ],
  };

  const render = (player1, textArray) => {
    player1Action(player1.input);
    console.log(player1);

    console.log(player2);
    checkForWin(textArray);
  };
  /////////////////////////////////////////////////////////////////////////////////
  const $displayP1Letter = (inputletter) => {
    const $displayP1input = $("#player1letter");
    const $p1Letter = $displayP1input.append(
      `<li>Letter chosen by Player 1 is ${inputletter} </li>`
    );
  };
  const $displayinput = $("#player1Input");
  /////////////////////////////////////////////////////////////////////////////////
  
  const updateP1Score = () => {
    const $displayscorep1 = $(".display-p1score");
    $displayscorep1.removeClass("player1score");
    $displayscorep1.text(player1.score);
  }






  ///////////////////////////player 1 action/////////////////////////
  const player1Action = (input) => {
    const lastItem = player1.input[input.length - 1];
    const inputletter = lastItem.clickedletter;
    const solveinput = lastItem.solveinput;
    loopSquareArray();

    if (isValidAction(inputletter, textArray) && isGameOn(textArray)) {
      /////////display letter chosen////////
      $displayP1Letter(inputletter);

      if (word.includes(inputletter)) {
    
        updateSquares(inputletter);
        lastItem.correct = true;
        player1.score += 1;

        /////////////display score////////////
        updateP1Score();
    

      } else if 
      //////////////solve input correct////////
        (solveinput === word.join('')) {
          const solveletter = solveinput.split("");
          $("#player1letter").empty();
          updateSquareSolved(solveletter);
          player1.score += 5;
          updateP1Score();
          $displayinput.text(
            `You solved it!`
          );

        } else if (solveinput!== word.join('')) {
          $displayinput.text(`Wrong answer. Next player turn`);
          changePlayer();
          player2Action(input);
        }
      } 
      else {
        /////////////////display wrong letter and change player///////////
        
        const $displayinput = $("#player1Input");
        const $displaytext = $displayinput.text(
          `Wrong letter. Next player turn`
        );
        $displayinput.append($displaytext);
        ////////////////////////////////////////////////////////////////////
        changePlayer();
        player2Action(input);
      }
    }
  

  ////////////////////display player 2 letter chosen/////////////

  const $displayP2Letter = () => {
    const $displayP2input = $("#player2letter");
    const $p2Letter = $displayP2input.append(
      `<li>Letter chosen by Player 2 is ${randomletter} </li>`
    );
  };

  const $displayscorep2 = $(".display-p2score");
  ///////////////////////////player 2 action/////////////////////////
  const player2Action = (input) => {
    loopSquareArray();
    randomletter = alphabet[Math.floor(Math.random() * alphabet.length)];
    const item = { compLetter: randomletter, correct: false };
    player2.input.push(item);
    const lastItem = player2.input[input.length - 1];
    /////////display letter chosen////////
    $displayP2Letter();


    if (textArray.includes(randomletter)) {
      player2Action(input);
    }
    if (word.includes(randomletter)) {
      // lastItem.correct = true;

      $displayP2Letter();

      updateSquares(randomletter);
      player2.score += 1;
      /////////////display score////////////
      $displayscorep2.removeClass("player2score");
      $displayscorep2.text(player2.score);
      player2Action(input);
      ///////////////////////////////////////////
    } else {
      changePlayer();
    }
  };

  const handleClickedLetter = (event) => {
    const clickedletter = $(event.target).text();

    const item = { clickedletter: clickedletter, correct: false };
    player1.input.push(item);
    render(player1);
  };


const handleSolveButton = (event) => {
  const solve = $("input").val();
  uppercaseSolve = solve.toUpperCase();
  const item = {solveinput: uppercaseSolve}
  player1.input.push(item);
  render(player1);
}


  $("#alphabetbuttons").on("click", handleClickedLetter);
  $("#solve").on("click", handleSolveButton);
  render(player1);
};

$(main);
