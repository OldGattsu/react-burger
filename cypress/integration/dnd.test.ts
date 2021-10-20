/// <reference types="cypress" />

describe("DND works property", function () {
  before(() => {
    cy.visit("http://localhost:3000");
  });

  it("should drag and drop ingredient", () => {
    cy.get('[data-test-id="ingredient"]').first().trigger("dragstart");
    cy.get('[data-test-id="dropTarget"]').trigger("drop");
  });
});
