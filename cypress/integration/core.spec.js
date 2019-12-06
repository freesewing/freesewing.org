import { strings } from '@freesewing/i18n'
import { list } from '@freesewing/pattern-info'
import capitalize from '@freesewing/utils/capitalize'
const i18n = strings[Cypress.env('LANGUAGE')]

describe('Core pattern drafting', function() {
  beforeEach(function() {
    cy.visit('/login')
    cy.get('div.theme-wrapper').should('have.class', 'layoutdefault')
    cy.get('#username').type('test_user')
    cy.get('#password').type('test{enter}')
    cy.get('[data-test=notification]').should('contain', i18n['app.goodToSeeYouAgain'].slice(0, 20))
  })

  const sizes = ['a4', 'a3', 'a2', 'a1', 'a0', 'letter', 'tabloid']
  const formats = ['svg', 'postscript', 'pdf']
  const exports = ['json', 'yaml']

  for (let pattern of list) {
    // If you're working on these, you might want to limit this to 1 pattern
    if (pattern === 'theo' || 1) {
      it('Draft ' + capitalize(pattern), function() {
        cy.visit('/create/' + pattern)
        cy.get('[data-test=model1]').click()
        cy.get('[data-test=draft] svg').should('be.visible')
        cy.get('[data-test=draft] svg').should('have.attr', 'style', 'max-height: 85vh;')
        cy.get('[data-test=zoom]').click()
        cy.get('[data-test=draft] svg').should('have.attr', 'style', '')
        cy.get('[data-test=zoom]').click()
        cy.get('[data-test=draft] svg').should('have.attr', 'style', 'max-height: 85vh;')
        cy.get('[data-test=compare]').click()
        cy.get('[data-test=draft] svg').should('be.visible')
        cy.get('[data-test=compare]').click()
        cy.get('[data-test=export]').click({ force: true })
        for (let size of sizes) cy.get(`[data-test=${size}]`).should('be.visible')
        for (let format of formats) cy.get(`[data-test=${format}]`).should('be.visible')
        for (let exp of exports) cy.get(`[data-test=${exp}]`).should('be.visible')
        cy.get('[data-test=cancel]:first-of-type').click({ force: true, multiple: true })
      })
    }
  }
})
