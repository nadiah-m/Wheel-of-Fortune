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
    cy.get("#vowelletter").contains("O").click();
    cy.get("#answerletter").find("li").eq(2).should("contain", "O");




  });
});
