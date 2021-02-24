describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });

  it("Should navigate to Tuesday", () => {
    cy.visit("/")
    cy.contains("[data-testid=day]", "Tuesday")
      .click()
      .should("have.css", "background-color", "rgb(242, 242, 242)");
  })
});