let assetCount = "";
let assetdata = "";

Given("I navigate existing asset page", () => {
  cy.visit("#/assets");
  cy.contains("Show entries");
  cy.contains("Next");
});

And("I verify the count of assests", () => {
  //select value '100' from show entries dropdown
  cy.get("select.custom-select").select("100");
  let assetRowCount = cy.get("tbody[data-test=table-body] tr").its("length");
  console.log(assetRowCount);

  //Select the data count statement and extract the total row count
  cy.get("div.dataTables_info[role=status]").then(($div) => {
    const text = $div.text();
    assetCount = text.split(" ").slice(5, 6);

    //verify the asset row count
    cy.get("tbody[data-test=table-body] tr")
      .should(($div2) => {
        expect($div2.length).to.equal(parseInt(assetCount));
      });
  });
});

Then("verify that I can search an assetid", () => {
  cy.get("tbody[data-test=table-body] tr td").then(($div2) => {
    expect($div2).to.have.length(parseInt(assetCount));
    //get the first row data from asset table and type in search
    //textbox to verify if exact asset name is displayed
    cy.get("tbody[data-test=table-body] tr:nth-child(1) > td:nth-child(1)")
      .invoke("text")
      .then((text) => {
        cy.get("input[aria-label=Search]")
          .type(text);
        cy.get("tbody[data-test=table-body] tr td")
          .should("contain", text);
      });
  });
});

Then("verify that I can sort assetid in ascending order", () => {
  //clear the search textbox
  cy.get("input[aria-label=Search]").clear();

  //function to extract the asset name from table and
  //store in an array named cellContents
  function getCellTextAsArray() {
    let cellContents = [];
    return new Cypress.Promise((resolve) => {
      cy.get("tbody[data-test=table-body] tr td")
        .each(($el, $index) => {
          cellContents.push($el.text());
        })
        .then(() => resolve(cellContents));
    });
  }

  //call the getCellTextAsArray(), create the array of the data table values
  getCellTextAsArray().then((cellContents) => {
    let actual = cellContents.slice();
  });

  //click on sort button to sort in ascending order
  cy.get("th[class^=sorting]")
    .click();

  //call the getCellTextAsArray(), copy of the sorted data from asset data table
  //verify the sorted values against the actual array to verify ascending sort
  getCellTextAsArray().then((cellContents) => {
    cy.wrap(cellContents)
      .should("deep.eq", actual.sort());
  });
});

And("verify that I can sort assetid in descending order", () => {
  cy.get("input[aria-label=Search]").clear();

  //function to extract the asset name from table and
  //store in an array named cellContents
  function getCellTextAsArray() {
    let cellContents = [];
    return new Cypress.Promise((resolve) => {
      cy.get("tbody[data-test=table-body] tr td")
        .each(($el, $index) => {
          cellContents.push($el.text());
        })
        .then(() => resolve(cellContents));
    });
  }

  //call the getCellTextAsArray(), create the array of the data table values
  getCellTextAsArray().then((cellContents) => {
    let actual = cellContents.slice();
  });
  //sort the asset name data in descending order
  cy.get("th[class^=sorting]").click();

  //call the getCellTextAsArray(), copy of the sorted data from asset data table
  //verify the sorted values against the actual array to verify ascending sort
  getCellTextAsArray().then((cellContents) => {
    cy.wrap(cellContents)
      .should("deep.eq", actual.sort().reverse());
  });
});

Then("verify that I can filter assetid", () => {
  //refresh/reload the page
  cy.reload();
  cy.contains("Show entries");
  cy.contains("Next");

  //select value '100' from show entries dropdown
  cy.get("select.custom-select").select("100");

  //Get the first data from Asset Name table and
  //create a substring pattern to filter the data
  cy.get("tbody[data-test=table-body] tr:nth-child(1) > td:nth-child(1)")
    .invoke("text")
    .then((text) => {
      var filterAsset = text.substring(0, 6);
      cy.get("input[aria-label=Search]").type(filterAsset);
    });

  //function to generate an array from the data values
  function getCellTextAsArray() {
    let cellContents = [];
    return new Cypress.Promise((resolve) => {
      cy.get("tbody[data-test=table-body] tr td")
        .each(($el, $index) => {
          cellContents.push($el.text());
        })
        .then(() => resolve(cellContents));
    });
  }

  //verify the asset data result array contains the pattern
  getCellTextAsArray().then((cellContents) => {
    let actual = cellContents.slice();
    cy.wrap(actual)
      .should("include.text", filterAsset);
  });
});

Then("verify error message for invalid search", () => {
    cy.get("input[aria-label=Search]")
      .clear().
      type('ISIN123$@!')
    cy.get("tbody[data-test=table-body] tr td")
      .should('have.text','No matching records found')
});