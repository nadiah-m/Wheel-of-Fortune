const main = () => {
  //<--------------------------INTERFACE-------------------------->//

  //////////////////////////// Word Library ////////////////////////////
  const wordLibrary = [
    { categories: "MOVIES", name: ["SPIDERMAN", "IRONMAN"] },
    { categories: "CELEBRITY", name: ["TOM HOLLAND", "ROBERT DOWNEY JR"] },
  ];

  ////////////////////Display category///////////////////////////////
  const $displayCategory = (wordCategory) => {
    const $category = $("#category");
    const $displayCategory = $category.text(`Category is ${wordCategory}`);
    $category.append($displayCategory);
  };

  ///////////////////Generate random word to guess/////////////////////
  const wordGenerator = () => {
    //generate random category
    const randomCategory = Math.floor(Math.random() * wordLibrary.length);
    const wordCategory = wordLibrary[randomCategory].categories;

    $displayCategory(wordCategory);

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
    "B",
    "C",
    "D",

    "F",
    "G",
    "H",

    "J",
    "K",
    "L",
    "M",
    "N",

    "P",
    "Q",
    "R",
    "S",
    "T",

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
        const $emptySpace = $("<li>")
          .addClass("white square p-2 bd-highlight")
          .attr("id", j);
        const $createSpace = $("#answerletter").append($emptySpace);
        $("#" + j).text(word[j]);
      } else {
        //green squares for letters
        const $squareLetter = $("<li>")
          .addClass("green square p-2 bd-highlight")
          .attr("id", j);
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
  let letterCount;

  ///////////update squares with correct letter if clicked///////////
  const updateSquares = (letter) => {
    //on click of alphabet button, check if its the correct letter
    letterCount = 0;
    for (let i = 0; i < word.length; i++) {
      if (letter === word[i]) {
        $("#" + i).text(letter);
        letterCount += 1;
      }
    }
  };

  ////////////////loop square array////////////////////////////
  const loopSquareArray = () => {
    for (let arrayIndex = 0; arrayIndex < $arraySquares.length; arrayIndex++) {
      textArray[arrayIndex] = $arraySquares[arrayIndex].innerHTML;
    }
  };
  ///////////////////////////////////////////////////////////////

  ////////////////update square with word if solved////////////////////////////
  const updateSquareSolved = (solveletter) => {
    for (let arrayIndex = 0; arrayIndex < $arraySquares.length; arrayIndex++) {
      textArray[arrayIndex] = $arraySquares[arrayIndex].innerHTML;
      $("#" + arrayIndex).text(solveletter[arrayIndex]);
    }
  };

  //<--------------------------GAME LOGIC-------------------------->//

  //////////check if letter already in the squares//////////
  const isValidAction = (letter, textArray) => {
    if (textArray.includes(letter)) {
      const $player1input = $("#player1Input");
      const $notallowed = $player1input.text(
        "The letter has already been chosen. Please choose another letter"
      );
      $player1input.append($notallowed);
      return false;
    }
    return true;
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

  //<===================== WHEEL =====================>//

  const $wheel = $(".wheel");
  const $spinButton = $(".spin-btn");
  const $display = $(".display");
  let deg = 0;
  let zoneSize = 15; //deg

  const valueZones = {
    1: 5000,
    2: "BANKRUPT",
    3: 300,
    4: 500,
    5: 450,
    6: 500,
    7: 800,
    8: "LOSE A TURN",
    9: 700,
    10: "FREE PLAY",
    11: 650,
    12: "BANKRUPT",
    13: 900,
    14: 500,
    15: 350,
    16: 600,
    17: 500,
    18: 400,
    19: 550,
    20: 800,
    21: 300,
    22: 700,
    23: 900,
    24: 500,
  };

  const spinWheel = () => {
    $display.text("-");
    $spinButton.css("pointer-events", "none");
    deg = Math.floor(1000 + Math.random() * 360);
    $wheel.css("transition", "all 10s ease-out");
    $wheel.css({ transform: "rotate(" + deg + "deg)" });

    $(".spin-btn").attr("disabled", true);
    $(".vowel-btn").attr("disabled", false);
    $(".solve-btn").attr("disabled", false);
    $(".choose-letter").attr("disabled", false);
    $displayinput.empty();
  };

  const handleSpinResult = (actualDeg) => {
    const zoneResult = Math.ceil(actualDeg / zoneSize);
    const wheelResult = valueZones[zoneResult];
    $display.text(wheelResult);
    const wheelItem = { wheelResult: wheelResult };
    player1.spinResult.push(wheelItem);
    console.log(player1);
  };
  0;

  const transitionEnd = () => {
    $spinButton.css("pointer-events", "auto");
    $wheel.css("transition", "none");
    const actualDeg = deg % 360;
    $wheel.css({ transform: "rotate(" + actualDeg + "deg)" });
    handleSpinResult(actualDeg);
  };

  /////////////////////player data/////////////////////////////
  const player1 = {
    score: 0,
    input: [
      {
        clickedletter: "",
      },
      // {
      //   clickedletter: "nonsense",
      // },
    ],
    spinResult: [{ wheelResult: 0 }],
  };

  const render = (player1, textArray) => {
    player1Action(player1.input, player1.spinResult);
    console.log(player1);
  };

  /////////////////Display player 1 score//////////////////////
  const updateP1Score = () => {
    const $displayscorep1 = $(".display-p1score");
    // $displayscorep1.removeClass("player1score");
    $displayscorep1.text(player1.score);
  };

  /////////////////Display wrong move player 1//////////////////////

  const $displayinput = $("#player1Input");

  const checkLetter = (input, spinResult) => {
    //input letter into player1 data
    const lastItemInput = player1.input[input.length - 1];
    const inputletter = lastItemInput.clickedletter;

    //solve input into player1 data
    const solveinput = lastItemInput.solveinput;
    const lastItemWheel = player1.spinResult[spinResult.length - 1];

    //wheel score into player1 data
    const wheelScore = lastItemWheel.wheelResult;

    //vowel letter into player1 data
    const vowelLetter = lastItemInput.vowel;

    loopSquareArray();
    if (word.includes(inputletter)) {
      updateSquares(inputletter);
      $displayinput.text(`Correct answer`);
      for (let i = 0; i < letterCount; i++) {
        player1.score += wheelScore;
      }
      /////////////display score////////////
      updateP1Score();
    } else if (word.includes(vowelLetter)) {
      updateSquares(vowelLetter);
      player1.score -= 200;
      updateP1Score();
    } else if (
      //////////////solve input correct////////
      solveinput === word.join("")
    ) {
      const solveletter = solveinput.split("");
      $("#player1letter").empty();
      updateSquareSolved(solveletter);
      player1.score += 1000;
      updateP1Score();
      $displayinput.text(`You solved it!`);

      ////////////solve input wrong//////////
    } else if (solveinput !== word.join("")) {
      // prompt("Wrong answer. Try again")
      $displayinput.text(`Wrong answer`);
    } else {
      /////////////////display wrong letter and change player///////////
      ////////////////////////////////////////////////////////////////////
    }
  };
  let clickedletter;

  //<===================PLAYER 1 ACTION===================>//
  const player1Action = (input, spinResult) => {
    //input letter into player1 data

    const lastItemInput = player1.input[input.length - 1];
    const inputletter = lastItemInput.clickedletter;

    //solve input into player1 data
    const solveinput = lastItemInput.solveinput;
    const lastItemWheel = player1.spinResult[spinResult.length - 1];

    //wheel score into player1 data
    const wheelScore = lastItemWheel.wheelResult;

    //vowel letter into player1 data
    const vowelLetter = lastItemInput.vowel;

    loopSquareArray();

    if (isGameOn(textArray) && isValidAction(letter, textArray)) {
      /////////display letter chosen////////

      //guess correct letter

      if (wheelScore === "BANKRUPT") {
        player1.score = 0;
      } else if (wheelScore === "LOSE A TURN") {
      } else if (wheelScore === "FREE PLAY") {
        alert("Spin the wheel again");
      } else checkLetter(input, spinResult);
    }
  };

  const handleClickedLetter = (event) => {
    const clickedletter = $(event.target).text();

    const item = { clickedletter: clickedletter };
    player1.input.push(item);
    $(event.target).attr("disabled", true);
    $(event.target).css("color", "grey");
    $("#alphabetbuttons").hide();

    $(".spin-btn").attr("disabled", false);
    $(".vowel-btn").attr("disabled", false);
    $(".solve-btn").attr("disabled", false);
    $(".choose-letter").attr("disabled", true);

    render(player1);
  };

  const handleSolveButton = (event) => {
    const solve = $("input").val();
    uppercaseSolve = solve.toUpperCase();
    const item = { solveinput: uppercaseSolve };
    player1.input.push(item);
    $("#solve-word").hide();
    render(player1);
  };

  const createVowel = () => {
    const vowel = ["A", "E", "I", "O", "U"];
    const createVowelBtn = () => {
      vowel.forEach((item) => {
        const $letter = $("<button>" + item + "</button>").attr(
          "id",
          "vowelletter"
        );
        const letter = $("#vowelinput").append($letter);
      });
    };
    createVowelBtn();
  };

  createVowel();

  const handleVowel = () => {
    if (player1.score < 200) {
      alert("You need more than $200 to buy a vowel");
    } else {
      $("#vowelinput").show();

      $(".vowel-btn").attr("disabled", true);
      $(".solve-btn").attr("disabled", true);
      $(".choose-letter").attr("disabled", true);
    }
  };

  const handleClickedVowel = (event) => {
    const clickedVowel = $(event.target).text();
    const buyVowel = { vowel: clickedVowel };
    player1.input.push(buyVowel);
    $(event.target).attr("disabled", true);
    $(event.target).css("color", "grey");
    $("#vowelinput").hide();
    $(".vowel-btn").attr("disabled", false);
    console.log(player1);
    render(player1);
  };

  const $displayConsonant = () => {
    $("#alphabetbuttons").show();
  };

  const $displaySolve = () => {
    $("#solve-word").show();
  };

  $("#alphabetbuttons").on("click", handleClickedLetter);
  $("#solve").on("click", handleSolveButton);
  $(".vowel-btn").on("click", handleVowel);
  $("#vowelinput").on("click", handleClickedVowel);
  $spinButton.on("click", spinWheel);
  $wheel.on("transitionend", transitionEnd);
  $(".choose-letter").on("click", $displayConsonant);
  $(".solve-btn").on("click", $displaySolve);
  render(player1);
};

$(main);
