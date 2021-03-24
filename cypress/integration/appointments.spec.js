describe("Appointments", () => {

  
// "should book an interview"
  it("should book an interview", () => {

    cy.request("GET", "/api/debug/reset")

  // Visits the root of our web server, confirm that the DOM contains the text "Monday".
  cy.visit("/");
  cy.contains("Monday");
  // Clicks on the "Add" button in the second appointment
  cy.get("[alt=Add]")
 .first()
 .click();
  // Enters their name
  cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");
  // Chooses an interviewer
  cy.get("[alt='Sylvia Palmer']").click();
  // Clicks the save button
  cy.contains("Save").click();
  // Sees the booked appointment
  cy.contains(".appointment__card--show", "Lydia Miller-Jones");
  cy.contains(".appointment__card--show", "Sylvia Palmer");


  });


});
  
  
  

  

  // "should edit an interview"

  // Visits the root of our web server
  // Clicks the edit button for the existing appointment
  // Changes the name and interviewer
  // Clicks the save button
  // Sees the edit to the appointment

  // "should cancel an interview"

  //  Visits the root of our web server
  // Clicks the delete button for the existing appointment
  // Clicks the confirm button
  // Sees that the appointment slot is empty
