import { strings } from '@freesewing/i18n'
import { list, options } from '@freesewing/pattern-info'
import capitalize from '@freesewing/utils/capitalize'
const i18n = strings[Cypress.env('LANGUAGE')]

describe('Pattern documentation', function() {
  it('Patterns overview page', function() {
    cy.visit('/patterns')
    cy.get('h1').should('contain', i18n['app.patterns'])
    for (let pattern of list) {
      cy.get(`[data-test=${pattern}] img`).should('be.visible')
      cy.get(`[data-test=${pattern}] h5`).should('contain', capitalize(pattern))
      cy.get(`[data-test=${pattern}] a span`).should(
        'contain',
        i18n['patterns.' + pattern + '.description']
      )
      cy.get(`[data-test=${pattern}] a`).should('have.attr', 'href', '/patterns/' + pattern)
    }
  })

  describe('Pattern pages', function() {
    for (let pattern of list) {
      it(capitalize(pattern), function() {
        cy.visit('/patterns/' + pattern)
        cy.get('h1').should('contain', i18n['patterns.' + pattern + '.title'])
        cy.get(`[data-test=description]`).should(
          'contain',
          i18n['patterns.' + pattern + '.description']
        )
        cy.get(`[data-test=measurements] h2`).should('contain', i18n['app.requiredMeasurements'])
        cy.get(`[data-test=options] h2`).should('contain', i18n['app.patternOptions'])
      })
    }
  })

  describe('Pattern options', function() {
    for (let pattern of list) {
      describe(capitalize(pattern), function() {
        for (let option of options[pattern]) {
          it(option, function() {
            cy.visit('/docs/patterns/' + pattern + '/options/' + option.toLowerCase())
            cy.get('[data-test=mdx]').should('be.visible')
          })
        }
      })
    }
  })
})
