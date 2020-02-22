import { strings } from '@freesewing/i18n'
import { list } from '@freesewing/pattern-info'
import capitalize from '@freesewing/utils/capitalize'
const i18n = strings[Cypress.env('LANGUAGE')]

describe('Pattern documentation', function() {
  it('Designs overview page', function() {
    cy.visit('/designs/')
    cy.get('h1').should('contain', i18n['app.designs'])
    for (let pattern of list) {
      cy.get(`img[alt=${pattern}]`).should('be.visible')
      cy.get(`a[href='/designs/${pattern}/'] h2`).should('contain', capitalize(pattern))
      cy.get(`a[href='/designs/${pattern}/'] p`).should(
        'contain',
        i18n['patterns.' + pattern + '.description']
      )
    }
  })

  describe('Design pages', function() {
    for (let pattern of list) {
      it(capitalize(pattern), function() {
        cy.visit('/designs/' + pattern)
        cy.get('h1').should('contain', i18n['patterns.' + pattern + '.title'])
        cy.get(`#description`).should('contain', i18n['patterns.' + pattern + '.description'])
        cy.get(`[data-test=measurements] h2`).should('contain', i18n['app.requiredMeasurements'])
        cy.get(`[data-test=options] h2`).should('contain', i18n['app.patternOptions'])
      })
    }
  })
})
