const main = () => {
  const wordLibrary = [
    { categories: "MOVIES", name: ["IRONMAN", 
    "SPIDERMAN"
  ] 
  },
    { categories: "CELEBRITY", name: ["TOM HOLLAND", "ROBERT DOWNEY JR"] },
  ];

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

  const randomCategory = Math.floor(Math.random() * wordLibrary.length);
  const wordCategory = wordLibrary[randomCategory].categories;


  const $wheel = $(".wheel");
  const $spinButton = $(".spin-btn");
  const $display = $(".display");
  let deg = 0;
  let zoneSize = 15; //deg

  const $displayinput = $("#player1Input");


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

  const $displayCategory = () => {
    const $category = $("#category");
    const $displayCategory = $category.text(`Category is ${wordCategory}`);
    $category.append($displayCategory);
  };
  $displayCategory(wordCategory);

  const wordGenerator = () => {
    const randomWord =
      wordLibrary[randomCategory].name[
        Math.floor(Math.random() * wordLibrary.length)
      ];

    const charWords = randomWord.split("");

    return charWords;
  };

  const word = wordGenerator();
  console.log(word);

  const createAlphabet = () => {
    alphabet.forEach((item) => {
      const letter = $("#alphabetbuttons").append(
        "<button>" + item + "</button>"
      );
    });
  };
  createAlphabet();

  const createSquares = () => {
    for (let j = 0; j < word.length; j++) {
      if (word[j] === " ") {
        const $emptySpace = $("<li>")
          .addClass("white square p-2 bd-highlight")
          .attr("id", j);
        const $createSpace = $("#answerletter").append($emptySpace);
        $("#" + j).text(word[j]);
      } else {
        const $squareLetter = $("<li>")
          .addClass("green square p-2 bd-highlight")
          .attr("id", j);
        const $createSquare = $("#answerletter").append($squareLetter);
      }
    }
  };

  createSquares();

  const $squares = $(".square");
  const $arraySquares = $squares.toArray();
  const textArray = [];
  let letterCount;

  const updateSquares = (letter) => {
    letterCount = 0;
    for (let i = 0; i < word.length; i++) {
      if (letter === word[i]) {
        $("#" + i).text(letter);
        letterCount += 1;
      }
    }
  };

  const loopSquareArray = () => {
    for (let arrayIndex = 0; arrayIndex < $arraySquares.length; arrayIndex++) {
      textArray[arrayIndex] = $arraySquares[arrayIndex].innerHTML;
    }
  };

  const updateSquareSolved = (solveletter) => {
    for (let arrayIndex = 0; arrayIndex < $arraySquares.length; arrayIndex++) {
      textArray[arrayIndex] = $arraySquares[arrayIndex].innerHTML;
      $("#" + arrayIndex).text(solveletter[arrayIndex]);
    }
  };

  const $disableAllBtn = () => {
    $(".spin-btn").attr("disabled", true);
    $(".vowel-btn").attr("disabled", true);
    $(".solve-btn").attr("disabled", true);
    $(".choose-letter").attr("disabled", true);
  };

  const checkWin = () => {
    loopSquareArray();

    if (textArray.filter((x) => x).length === textArray.length)
    //https://stackoverflow.com/a/63143841
     {
      $displayinput.text(`Solve the word`);    

    } else {

    }
  };

 

  const spinWheel = () => {
    //https://github.com/weibenfalk/wheel-of-fortune-part2/blob/main/vanilla-js-wheel-of-fortune-part2-FINISHED/script.js
    $display.text("-");
    $spinButton.css("pointer-events", "none");
    deg = Math.floor(1000 + Math.random() * 360);
    $wheel.css({ transition: "all 5s ease-out" });
    $wheel.css({ transform: "rotate(" + deg + "deg)" });
    $wheel.css({ transition: "transform 3s" });

    $disableAllBtn();

    $displayinput.empty();
  };

  const handleSpinResult = (actualDeg, player1) => {
    const zoneResult = Math.ceil(actualDeg / zoneSize);
    const wheelResult = valueZones[zoneResult];
    $display.text(wheelResult);
    const wheelItem = { wheelResult: wheelResult };

    if (wheelResult === "BANKRUPT") {
      player1.spinResult.push({ wheelResult: 0 });
      player1.score = 0;
      updateP1Score();

      $(".spin-btn").attr("disabled", false);

    } else if (wheelResult === "LOSE A TURN") {
      player1.spinResult.push({ wheelResult: 0 });
      player1.score = 0;
      updateP1Score();
      $(".spin-btn").attr("disabled", false);

    } else if (wheelResult === "FREE PLAY") {
      player1.spinResult.push({ wheelResult: 1 });
      alert("Spin the wheel again");
      $(".spin-btn").attr("disabled", false);

    } else {
      player1.spinResult.push(wheelItem);
    }

    console.log(player1);
  };

  const $disableSpinBtn = () => {
    $(".spin-btn").attr("disabled", true);
    $(".vowel-btn").attr("disabled", false);
    $(".solve-btn").attr("disabled", false);
    $(".choose-letter").attr("disabled", false);
  }

  //https://github.com/weibenfalk/wheel-of-fortune-part2/blob/main/vanilla-js-wheel-of-fortune-part2-FINISHED/script.js
  const transitionEnd = () => {
    $spinButton.css("pointer-events", "auto");
    $wheel.css("transition", "none");
    const actualDeg = deg % 360;
    $wheel.css({ transform: "rotate(" + actualDeg + "deg)" });

    $disableSpinBtn();

    handleSpinResult(actualDeg, player1);
  };

  /////////////////////player data/////////////////////////////
  const player1 = {
    score: 0,
    input: [
      {
        // clickedletter: "",
      },
    ],
    spinResult: [{ wheelResult: 0 }],
  };

  const render = (player1) => {
    player1Action(player1.input, player1.spinResult);

    console.log(player1);
  };

  const updateP1Score = () => {
    const $displayscorep1 = $(".display-p1score");

    $displayscorep1.text(player1.score);
  };


  
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

      updateP1Score();

      checkWin();
    } else if (word.includes(vowelLetter)) {
      updateSquares(vowelLetter);

      player1.score -= 200;

      updateP1Score();

      checkWin();
    } else if (solveinput === word.join("")) {
      const solveletter = solveinput.split("");

      $("#player1letter").empty();

      updateSquareSolved(solveletter);

      player1.score += 1000;

      updateP1Score();

      $displayinput.text(`You solved it!`);

      $disableAllBtn();

      ////////////solve input wrong//////////
    } else if (solveinput !== word.join("")) {
      $displayinput.text(`Wrong answer`);
    } else {
    }
  };


  const player1Action = (input, spinResult) => {
    loopSquareArray();

    checkLetter(input, spinResult);
  };

  const handleClickedLetter = (event) => {
    const clickedletter = $(event.target).text();

    const item = { clickedletter: clickedletter };
    player1.input.push(item);
    $(event.target).attr("disabled", true);
    $(event.target).css("color", "grey");
    $("#alphabetbuttons").hide();

    $enableChooseLetterBtn();

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

  const $enableChooseLetterBtn = () => {
    $(".spin-btn").attr("disabled", false);
    $(".vowel-btn").attr("disabled", false);
    $(".solve-btn").attr("disabled", false);
    $(".choose-letter").attr("disabled", true);
  };

  const handleVowel = () => {
    if (player1.score < 200) {
      alert("You need more than $200 to buy a vowel");
    } else {
      $("#vowelinput").show();

      $enableChooseLetterBtn();
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

  render(player1);
  $("#alphabetbuttons").on("click", handleClickedLetter);
  $("#solve").on("click", handleSolveButton);
  $(".vowel-btn").on("click", handleVowel);
  $("#vowelinput").on("click", handleClickedVowel);
  $spinButton.on("click", spinWheel);
  $wheel.on("transitionend", transitionEnd);
  $(".choose-letter").on("click", $displayConsonant);
  $(".solve-btn").on("click", $displaySolve);
};

$(main);
