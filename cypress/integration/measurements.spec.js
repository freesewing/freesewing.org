import { measurements } from "@freesewing/models";

describe('Measurement documentation', function() {

  for (let measurement of measurements.womenswear) {
    it(measurement, function() {
      cy.visit('/docs/measurements/'+measurement.toLowerCase())
      cy.get('[data-test=measurement-image]').should('be.visible')
      cy.get('[data-test=mdx]').should('be.visible')
    })
  }
})
