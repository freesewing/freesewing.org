import { list } from '@freesewing/pattern-info'
import capitalize from '@freesewing/utils/capitalize'

describe('Core pattern drafting for visitors', function() {
  const sizes = ['a4', 'a3', 'a2', 'a1', 'a0', 'letter', 'tabloid']
  const formats = ['svg', 'postscript', 'pdf']
  const exports = ['json', 'yaml']

  for (let pattern of list) {
    // If you're working on these, you might want to limit this to 1 pattern
    if (pattern === 'simon' || 1) {
      it('Draft ' + capitalize(pattern), function() {
        cy.visit('/create/' + pattern + '/')
        cy.get('a[data-test=size-36]').click({ force: true })
        cy.get('[data-test=draft] svg').should('be.visible')
        cy.get('[data-test=draft] svg').should('have.attr', 'style', 'max-height: 85vh;')
        cy.get('[data-test=zoom]').click({ force: true })
        cy.get('[data-test=draft] svg').should('have.attr', 'style', '')
        cy.get('[data-test=zoom]').click({ force: true })
        cy.get('[data-test=draft] svg').should('have.attr', 'style', 'max-height: 85vh;')
        cy.get('[data-test=compare]').click({ force: true })
        cy.get('[data-test=draft] svg').should('be.visible')
        cy.get('[data-test=compare]').click({ force: true })
        cy.get('[data-test=export]').click({ force: true })
        for (let size of sizes) cy.get(`[data-test=${size}]`).should('be.visible')
        for (let format of formats) cy.get(`[data-test=${format}]`).should('be.visible')
        for (let exp of exports) cy.get(`[data-test=${exp}]`).should('be.visible')
        cy.get('[data-test=cancel]:first-of-type').click({ force: true, multiple: true })
      })
    }
  }
})
