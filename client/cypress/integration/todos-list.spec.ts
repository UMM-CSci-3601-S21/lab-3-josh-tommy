import { TodosListPage } from '../support/todos-list.po';

const page = new TodosListPage();

describe('Todos list', () => {

  beforeEach(() => {
    page.navigateTo();
  });

  it('Should have the correct title', () => {
    page.getTodosTitle().should('have.text', 'Todos');
  });

  it('Should type something in the owner filter and check that it returned correct elements', () => {
    // Filter for todos 'Fry'
    cy.get('#todos-owner-input').type('Fry');

    // All of the todos cards should have the owner we are filtering by
    page.getTodosCards().each(e => {
      cy.wrap(e).find('.todos-card-owner').should('have.text', 'Fry');
    });

    // (We check this two ways to show multiple ways to check this)
    page.getTodosCards().find('.todos-card-owner').each($el =>
      expect($el.text()).to.equal('Fry')
    );
  });

  it('Should type something in the body filter and check that it returned correct elements', () => {
    // Filter for body 'in sunt'
    cy.get('#todos-body-input').type('In sunt ex non tempor cillum commodo amet incididunt' +
    ' anim qui commodo quis. Cillum non labore ex sint esse.');

    // All of the todos cards should have the body we are filtering by
    page.getTodosCards().find('.todos-card-body').each($card => {
      cy.wrap($card).should('have.text', 'In sunt ex non tempor cillum commodo amet incididunt ' +
      'anim qui commodo quis. Cillum non labore ex sint esse.');
    });
  });

  it('Should type something partial in the body filter and check that it returned correct elements', () => {
    // Filter for bodies that contain 'ti'
    cy.get('#todos-body-input').type('In sunt');

    // Go through each of the cards that are being shown and get the bodies
    page.getTodosCards().find('.todos-card-body')
      // We should see these bodies
      .should('contain.text', 'Cillum non labore ex sint esse.')
      .should('contain.text', 'Ipsum irure anim excepteur')
      // We shouldn't see these bodies
      .should('not.contain.text', 'im a horse')
      .should('not.contain.text', 'grandma loves you');
  });

  it('Should type something in the category filter and check that it returned correct elements', () => {
    // Filter for category 'homework'
    cy.get('#todos-category-input').type('homework');

    // All of the todos cards should have the category we are filtering by
    page.getTodosCards().find('.todos-card-category').each($card => {
      cy.wrap($card).should('have.text', 'homework');
    });
  });

  it('Should type something in the status filter and check that it returned correct elements', () => {
    // Filter for status 'complete'
    page.selectStatus('complete');

    // All of the todos cards should have the status we are filtering by
    page.getTodosCards().find('.todos-card-status').each($card => {
      cy.wrap($card).should('have.text', 'true');
    });
  });

  it('Should select an order and make sure elements are returned', () => {
    // Thing to order by
    page.selectOrder('owner');

    // All of the todos cards should have the status we are filtering by
    page.getTodosCards().find('.todos-card-owner')
    .should('contain.text', 'Barry');
    });

  it('Should type something in the limit box and check that it returned correct amount of elements', () => {
    // Filter for todos of limit '2'
    cy.get('#todos-limit-input').type('2');

    // Go through each of the cards that are being shown and get the owners
    page.getTodosCards().find('.todos-card-owner')
      // We should see these todos whose age is 2
      .should('contain.text', 'Blanche')
      .should('contain.text', 'Fry')
      // We shouldn't see these todos
      .should('not.contain.text', 'jamie');
  });

  it('Should change the view', () => {
    // Choose the view type "List"
    page.changeView('list');

    // We should not see any cards
    // There should be list items
    page.getTodosCards().should('not.exist');
    page.getTodosListItems().should('exist');

    // Choose the view type "Card"
    page.changeView('card');

    // There should be cards
    // We should not see any list items
    page.getTodosCards().should('exist');
    page.getTodosListItems().should('not.exist');
  });

  it('Should click view profile on a todos and go to the right URL', () => {
    page.getTodosCards().first().then((card) => {
      const firstTodosOwner = card.find('.todos-card-owner').text();
      const firstTodosStatus = card.find('.todos-card-status').text();
      const firstTodosBody = card.find('.todos-card-body').text();
      const firstTodosCategory = card.find('.todos-card-category').text();

      // When the view profile button on the first todos card is clicked, the URL should have a valid mongo ID
      page.clickViewProfile(page.getTodosCards().first());

      // The URL should contain '/todos/' (note the ending slash) and '/todos/' should be followed by a mongo ID
      cy.url()
        .should('contain', '/todos/')
        .should('match', /.*\/todos\/[0-9a-fA-F]{24}$/);

      // On this profile page we were sent to, the owner and category should be correct
      cy.get('.todos-card-owner').first().should('have.text', firstTodosOwner);
      cy.get('.todos-card-status').first().should('have.text', firstTodosStatus);
      cy.get('.todos-card-body').first().should('have.text', firstTodosBody);
      cy.get('.todos-card-category').first().should('have.text', firstTodosCategory);
    });
   });

});
