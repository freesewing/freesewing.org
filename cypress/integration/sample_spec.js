//import { strings } from "@freesewing/i18n";
//const i18n = strings[process.env.GATSBY_LANGUAGE]

describe('Home page', function() {
  it('Visit the home page', function() {
    cy.visit('/')
    expect(true).to.equal(true)
  })
})
