import { strings } from '@freesewing/i18n'
const i18n = strings[Cypress.env('LANGUAGE')]

describe('Account page', function() {
  before(function() {
    cy.visit('/login/')
    cy.get('#username').type('test_user')
    cy.get('#password').type('test{enter}')
    cy.get('[data-test=notification]').should('contain', i18n['app.goodToSeeYouAgain'].slice(0, 20))
  })

  const buttons = {
    '/people/': 'app.people',
    '/patterns/': 'app.patterns',
    '/users/test_user/': 'app.profile',
    '/account/settings/': 'app.settings',
    '/logout/': 'app.logOut'
  }

  describe('Verify translations', function() {
    it('app.account', function() {
      cy.get('h1').should('contain', i18n['app.account'])
    })

    for (let button in buttons) {
      it(buttons[button], function() {
        cy.get(`a[data-test="${button}"] > span.MuiButton-label`).should(
          'contain',
          i18n[buttons[button]].slice(0, 4)
        )
      })
    }

    it('app.home', function() {
      cy.get('nav.breadcrumbs > ul > li:first-of-type > a').should('contain', i18n['app.home'])
    })
  })

  describe('Verify links', function() {
    for (let button in buttons) {
      if (button !== '/logout') {
        it(button, function() {
          cy.get(`a[data-test="${button}"]`).should('have.attr', 'href', button)
        })
      }
    }
  })

  after(function() {
    it('Log out flow', function() {
      cy.get('a[data-test="/logout"]').click({ force: true })
      cy.get('div.theme-wrapper').should('have.class', 'layouthome')
    })
  })
})
