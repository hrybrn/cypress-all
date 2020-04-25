/// <reference types="cypress" />

const {
  email,
  password,
  chatID,
  yourName,
  message
} = require('../../facebook-config.json');

context('@ all', () => {
  it('@s everyone and sends message', () => {
    // go to messenger
    cy.visit('https://messenger.com');
    cy.wait(500);

    // login
    cy.get('#email').type(email);
    cy.get('#pass').type(password);
    cy.get('#loginbutton').click();

    // go to dota chat
    cy.visit(`https://www.messenger.com/t/${chatID}`);
    cy.wait(500);


    // find people names
    cy.get('body').contains('h3', 'Conversation information').parent().find('li').each(li => {
      const name = li.text().replace('Admin', '')
      if (name != yourName) {
        cy.focused().type(`@${name}`);
        cy.wait(50);
        cy.get('ul[role="listbox"]').click();
        cy.get('[aria-label="Type a message, @name..."]').focus();
        cy.focused().type(' ');
      }
    });

    // send message
    cy.focused().type(`${message}{enter}`);
  })
})
