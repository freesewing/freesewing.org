import { list } from '@freesewing/pattern-info'
import capitalize from '@freesewing/utils/capitalize'
import { strings } from '@freesewing/i18n'
const i18n = strings[Cypress.env('LANGUAGE') || 'en']

describe('Core pattern drafting for visitors', function () {
  const sizes = ['a4', 'a3', 'a2', 'a1', 'a0', 'letter', 'tabloid']
  const formats = ['svg', 'postscript', 'pdf']
  const exports = ['json', 'yaml', "'github gist'"]

  for (let pattern of list) {
    // If you're working on these, you might want to limit this to 1 pattern
    if (pattern === 'aaron' || true) {
      it('Draft ' + capitalize(pattern), function () {
        // Navigate to page
        cy.visit('/create/' + pattern + '/')
        // Pick size 36 with breasts, as that works for everything
        cy.get('a[data-test=size-36-b]').click({ force: true })
        // Default view
        cy.get('#freesewing-draft svg').should('be.visible')
        cy.get('#freesewing-draft svg').should('have.attr', 'style', 'max-height: 85vh;')
        // Zoom view
        cy.get('#draft-action-zoom span').click({ force: true })
        cy.get('#freesewing-draft svg').should('have.attr', 'style', '')
        // Back to default view
        cy.get('#draft-action-zoom span').click({ force: true })
        cy.get('#freesewing-draft svg').should('have.attr', 'style', 'max-height: 85vh;')
        // Compare draft
        cy.get('#draft-action-compare span').click({ force: true })
        cy.get('#freesewing-compare svg').should('be.visible')
        // Back to draft view
        cy.get('#draft-action-compare span').click({ force: true })
        cy.get('#freesewing-draft svg').should('be.visible')
        // Export draft
        cy.get('#draft-action-export span').click({ force: true })
        for (let size of sizes) cy.get(`[data-test=${size}]`).should('be.visible')
        for (let format of formats) cy.get(`[data-test=${format}]`).should('be.visible')
        for (let exp of exports) cy.get(`[data-test=${exp}]`).should('be.visible')
        // Back to draft view
        cy.get('#draft-action-export span').click({ force: true })
        cy.get('#freesewing-draft svg').should('be.visible')
        // Change units
        cy.get('#draft-action-units span').should('contain', i18n['app.metricUnits'])
        cy.get('#draft-action-units span').click({ force: true })
        cy.get('#draft-action-units span').should('contain', i18n['app.imperialUnits'])
      })
    }
  }
})
