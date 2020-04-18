describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "Test",
      username: "test1",
      password: "123",
    };
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

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "test1", password: "123" });
    });

    it("A blog can be created", function () {
      cy.contains("Add Blog").click();
      cy.get("#author").type("Joe");
      cy.get("#title").type("Test Blog");
      cy.get("#url").type("http://localhost:3001");
      cy.contains("Submit Blog").click();
      cy.contains("Blog added");
      cy.contains("Test Blog");
    });
    it("A blog can be liked", function () {
      cy.createBlog("Test Blog", "Joe", "http://localhost:3001");
      cy.contains("Show").click();
      cy.contains("Like").click();
      cy.get("#blogLikes").should("contain", 1);
    });

    it("A blog can be deleted", function () {
      cy.createBlog("Test Blog", "Joe", "http://localhost:3001");
      cy.contains("Show").click();
      cy.get("#blogLikes").should("exist");
      cy.contains("Delete").click();
      cy.get("#blogLikes").should("not.exist");
    });

    it("A blog cannot be deleted by a different user", function () {
      const secondUser = {
        username: "test2",
        name: "Test2",
        password: "123",
      };

      cy.createBlog("Test Blog", "Joe", "http://localhost:3001");
      cy.contains("Logout").click();
      cy.request("POST", "http://localhost:3003/api/users/", secondUser);
      cy.login({ username: "test2", password: "123" });
      cy.contains("Show").click();
      cy.get("#blogLikes").should("exist");
      cy.get("#deleteBlogButton").should("not.exist");
    });

    it.only("Blogs are ordered by amount of likes", function () {
      cy.createBlog("Test Blog", "Joe", "http://localhost:3001", 4);
      cy.createBlog("Test Blog2", "Jane", "http://localhost:3002", 8);
      cy.createBlog("Test Blog3", "Jack", "http://localhost:3003", 6);
      cy.get(".show_all_button").eq(0).click();
      cy.get(".blog_container").eq(0).should("contain", 8);
      cy.get(".show_all_button").eq(1).click();
      cy.get(".blog_container").eq(1).should("contain", 6);
      cy.get(".show_all_button").eq(2).click();
      cy.get(".blog_container").eq(2).should("contain", 4);
    });
  });
});
