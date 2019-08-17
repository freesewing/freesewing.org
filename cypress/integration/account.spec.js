import { strings } from "@freesewing/i18n";
const i18n = strings[Cypress.env('LANGUAGE')]

describe('Account page', function() {

  beforeEach(function () {
    cy.visit('/login')
    cy.get('div.theme-wrapper')
      .should('have.class', 'layoutdefault')
    cy.get('#username').type('test_user')
    cy.get('#password').type('test{enter}')
    cy.get('[data-test=notification]').should('contain', i18n['app.goodToSeeYouAgain'].slice(0, 20))
  })

  const buttons = {
    '/create': 'app.newPattern',
    '/model': 'app.newModel',
    '/models': 'app.models',
    '/recipes': 'app.recipes',
    '/users/test_user': 'app.profile',
    '/account/settings': 'app.settings',
    '/logout': 'app.logOut'
  }

  it('Verify translations', function() {
    // Title
    cy.get('h1').should('contain', i18n['app.account'])

    // Buttons
    for (let button in buttons) cy.get(`a[data-test="${button}"] > span.MuiButton-label > span`).should('contain', i18n[buttons[button]].slice(0,4))

    // Breadcrumbs
    cy.get('nav.breadcrumbs > ul > li:first-of-type > a > span').should('contain', i18n['app.home'])
  })

  it('Verify links', function() {
    for (let button in buttons) {
      if (button !== "/logout") cy.get(`a[data-test="${button}"]`).should('have.attr', 'href', button)
    }
  })

  it('Log out flow', function() {
    cy.get('a[data-test="/logout"]').click({force: true})
    cy.get('div.theme-wrapper').should('have.class', 'layouthome')
  })

})
