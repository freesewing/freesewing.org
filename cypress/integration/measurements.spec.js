import { strings } from "@freesewing/i18n";
import { measurements } from "@freesewing/models";
import capitalize from "@freesewing/utils/capitalize";
const i18n = strings[Cypress.env('LANGUAGE')]

describe('Measurement documentation', function() {

  for (let measurement of measurements.womenswear) {
    it(measurement, function() {
      cy.visit('/docs/measurements/'+measurement.toLowerCase())
      cy.get('[data-test=measurement-image]').should('be.visible')
      cy.get('[data-test=mdx]').should('be.visible')
    })
  }
/*
  describe('Pattern pages', function() {
    for (let pattern of list) {
      it(capitalize(pattern), function() {
        cy.visit('/patterns/'+pattern)
        cy.get('h1').should('contain', i18n['patterns.'+pattern+'.title'])
        cy.get(`[data-test=description]`).should('contain', i18n['patterns.'+pattern+'.description'])
        cy.get(`[data-test=measurements] h2`).should('contain', i18n['app.requiredMeasurements'])
        cy.get(`[data-test=options] h2`).should('contain', i18n['app.patternOptions'])

      })
    }
  })

  describe.only('Pattern options', function() {
    for (let pattern of list) {
      describe(capitalize(pattern), function() {
        for (let option of options[pattern]) {
          it(option, function() {
            cy.visit("/docs/patterns/"+pattern+"/options/"+option.toLowerCase())
            cy.get('[data-test=mdx]').should('be.visible')
          })
        }
      })
    }
  })
  */
})
