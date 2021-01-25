let asset = "";

function generateRandom() {
  return Math.floor((Math.random() + 1) * 1000000000);
}

let validAssetId = "ISIN" + generateRandom();

Given("I navigate to add asset page", () => {
  cy.visit("#/add");
});

And("I see field to add asset", () => {
  cy.get("#defaultFormAddAsset").as("textbox").should("be.visible");
});

Given("I type valid asset id", () => {
  cy.get("#defaultFormAddAsset").type(validAssetId);
});

Given("I type existing asset id", () => {
  cy.get("#defaultFormAddAsset").clear().type(validAssetId);
});

Given("I type invalid {string}", (asset_name) => {
  asset = asset_name;
  cy.get("#defaultFormAddAsset").type(asset_name);
});

When("I click add Asset", () => {
  cy.get("button").click();
});

Then("I see new asset is sucessfully added", () => {
  cy.get("[data-test=modal-header]")
    .should("be.visible")
    .contains("h4", "Sucssess");
  cy.get("[data-test=modal-body]")
    .should("be.visible")
    .contains("div", "Asset " + validAssetId + " was added to the list");
  cy.get("[data-test=modal-footer]")
    .should("be.visible")
    .contains("button", "Close")
    .click();
});

Then("I see error message that assets exists", () => {
  cy.get("[data-test=modal-header]")
    .should("be.visible")
    .contains("h4", "Asset alredy exist");
  cy.get("[data-test=modal-body]")
    .should("be.visible")
    .contains(
      "div",
      "Asset name should be unique. Assert with this name already exists"
    );
  cy.get("[data-test=modal-footer]")
    .should("be.visible")
    .contains("button", "Close")
    .click();
  cy.get("[data-test=modal-body]").should("not.be.visible");
});

Then("I see validation error message", () => {
  cy.get("@textbox").should(($textbox) => {
    expect($textbox.get(0).checkValidity()).to.equal(false);
    expect($textbox.get(0).validationMessage).to.equal(
      "Please match the format requested."
    );
  });
});
