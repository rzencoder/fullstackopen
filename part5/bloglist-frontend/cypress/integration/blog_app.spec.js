describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "Test",
      username: "test1",
      password: "123",
    };
    const blog = {};
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("login");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#loginUsername").type("test1");
      cy.get("#loginPassword").type("123");
      cy.contains("login").click();
      cy.contains("Logged in as test1");
    });

    it("fails with wrong credentials", function () {
      cy.get("#loginUsername").type("test1");
      cy.get("#loginPassword").type("1234");
      cy.contains("login").click();
      cy.contains("Wrong credentials");
      cy.get(".error").should("have.css", "color", "rgb(255, 0, 0)");
    });
  });
});
