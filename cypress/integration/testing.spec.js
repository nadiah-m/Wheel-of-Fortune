// sample.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

describe("Wheel of Fortune", () => {
  it("should display correct consonant letter", () => {
    cy.visit("http://127.0.0.1:5501/");
    cy.get(".spin-btn").click();
    cy.wait(6000);
    cy.get(".choose-letter").click();
    cy.get("#alphabetbuttons").contains("R").click();
    cy.get("#answerletter").find("li").eq(1).should("contain", "R");
  });
});

describe("Wheel of Fortune", () => {
  it("should display correct consonant letter", () => {
    cy.visit("http://127.0.0.1:5501/");
    cy.get(".spin-btn").click();
    cy.wait(6000);
    cy.get(".choose-letter").click();
    cy.get("#alphabetbuttons").contains("N").click();
    cy.get("#answerletter").find("li").eq(3).should("contain", "N");
    cy.get("#answerletter").find("li").eq(6).should("contain", "N");
  });
});

describe("Wheel of Fortune", () => {
  it("should display correct consonant letter", () => {
    cy.visit("http://127.0.0.1:5501/");
    cy.get(".spin-btn").click();
    cy.wait(6000);
    cy.get(".choose-letter").click();
    cy.get("#alphabetbuttons").contains("M").click();
    cy.get("#answerletter").find("li").eq(4).should("contain", "M");
  });
});

describe("Wheel of Fortune", () => {
  it("should display vowel letter", () => {
    cy.visit("http://127.0.0.1:5501/");
    cy.get(".spin-btn").click();
    cy.wait(6000);
    cy.get(".choose-letter").click();
    cy.get("#alphabetbuttons").contains("N").click();

    cy.get(".vowel-btn").click();
    cy.get("#vowelinput").contains("O").click();
    cy.get("#answerletter").find("li").eq(2).should("contain", "O");

  });
});

describe("Wheel of Fortune", () => {
  it("should display solved when all filled up", () => {
    cy.visit("http://127.0.0.1:5501/");
    cy.get(".spin-btn").click();
    cy.wait(6000);
    cy.get(".choose-letter").click();
    cy.get("#alphabetbuttons").contains("N").click();


    cy.get(".spin-btn").click();
    cy.wait(6000);
    cy.get(".choose-letter").click();
    cy.get("#alphabetbuttons").contains("M").click();

    cy.get(".spin-btn").click();
    cy.wait(6000);
    cy.get(".choose-letter").click();
    cy.get("#alphabetbuttons").contains("R").click();
    
   

    cy.get(".vowel-btn").click();
    cy.get("#vowelinput").contains("O").click();

    cy.get(".vowel-btn").click();
    cy.get("#vowelinput").contains("I").click();

    cy.get(".vowel-btn").click();
    cy.get("#vowelinput").contains("A").click();
    cy.get("#player1Input").should("contain", "Solve the word");

  });
});

describe("Wheel of Fortune", () => {
  it("should display wrong answer", () => {
    cy.visit("http://127.0.0.1:5501/");
    cy.get(".spin-btn").click();
    cy.wait(6000);
    cy.get(".choose-letter").click();
    cy.get("#alphabetbuttons").contains("Z").click();

    cy.get("#player1Input").should("contain", "Wrong answer");

  });
});

describe("Wheel of Fortune", () => {
  it("solve input should appear, display solved", () => {
    cy.visit("http://127.0.0.1:5501/");
    cy.get(".spin-btn").click();
    cy.wait(6000);
    cy.get(".solve-btn").click();
    cy.get("#solveword").type("ironman");
    cy.get("#solve").click();

    cy.get("#player1Input").should("contain", "You solved it!");

  });
});

describe("Wheel of Fortune", () => {
  it("solve input should appear, display wrong", () => {
    cy.visit("http://127.0.0.1:5501/");
    cy.get(".spin-btn").click();
    cy.wait(6000);
    cy.get(".solve-btn").click();
    cy.get("#solveword").type("dfbdfbf");
    cy.get("#solve").click();

    cy.get("#player1Input").should("contain", "Wrong answer");

  });
});