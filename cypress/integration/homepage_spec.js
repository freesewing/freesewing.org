import { strings } from "@freesewing/i18n";
const i18n = strings[Cypress.env('LANGUAGE')]

describe('Home page', function() {

  beforeEach(function () {
    cy.visit('/')
    cy.get('div.theme-wrapper')
      .should('have.class', 'layouthome')
  })

  it('Check links, images, and translation', function() {

    /* navbar */

    const navs = {
      patterns: 'patterns',
      docs: 'docs',
      blog: 'blog',
      account: 'logIn',
      signup: 'signUp'
    }

    for (let nav in navs) {
      let txt = navs[nav];

      // Links should go to correct pages
      cy.get(`[data-test=navbar-${nav}]`).should('have.attr', 'href', '/'+txt.toLowerCase())

      // Links should be translated
      cy.get(`[data-test=navbar-${nav}] > span`).should('contain', i18n['app.'+txt])
    }

    // Icons links should go to correct pages
    for (let icon of ['search', 'language'])
      cy.get(`[data-test=navbar-${icon}]`).should('have.attr', 'href', '/'+icon)

    it(`NavBar home logo should go to home page`, function() {
      cy.get(`[data-test=navbar-home]`)
        .should('have.attr', 'href', '/')
    })

    /* Top header */

    // Title should read FreeSewing
    cy.get('[data-test=header] h1').should('contain', 'FreeSewing')

    // Slogan should be translated
    cy.get(`[data-test=slogan]`).should('contain', i18n['app.sewingPatternsForNonAveragePeople'])

    // Sub-Slogan should be translated
    cy.get(`[data-test=subslogan]`).should('contain', i18n['app.averagePeopleDoNotExist'])

    // Top button should go to sign up page
    cy.get('[data-test=top-button-visitor]').should('have.attr', 'href', '/signup')

    // Top button should be translated
    cy.get('[data-test=top-button-visitor]').should('contain', i18n['app.signUp'])

    /* Top text boxes */

    for (let i=1;i<4;i++) {

      // Box title should be translated
      cy.get(`[data-test=row1-${i}] > h2`).should('contain', i18n[`homepage.row1col${i}title`])

      // Box paragraph should be translated
      // FIXME: Not testing the entire string because HTML tags seem to make cypress complain
      cy.get(`[data-test=row1-${i}] p > span`).should('contain', i18n[`homepage.row1col${i}text`].slice(0, 20))
    }

    /* Bottom text boxes */

    for (let i=1;i<4;i++) {

      // Box title should be translated
      cy.get(`[data-test=row2-${i}] > h2`).should('contain', i18n[`homepage.row2col${i}title`])

      // Box paragraph should be translated
      // FIXME: Not testing the entire string because HTML tags seem to make cypress complain
      cy.get(`[data-test=row2-${i}] p > span`).should('contain', i18n[`homepage.row2col${i}text`].slice(0, 3))
    }

    /* Subscribe banner */

    // Title should be translated
    cy.get('[data-test=subscribe] h1').should('contain', i18n['app.supportFreesewing'])

    // Lead should be translated
    cy.get('[data-test=subscribe] h2').should('contain', i18n['app.txt-tiers'])

    // Paragraph should be translated
    cy.get('[data-test=subscribe] p').should('contain', i18n['app.patronPitch'])

    // Button should be translated
    cy.get('[data-test=subscribe] a').should('contain', i18n['app.pricing'])

    // Button should link to pricing anchor
    cy.get('[data-test=subscribe] a').should('have.attr', 'href', '#tiers')

    /* Subscribe tiers */

    // Title should be translated
    cy.get('[data-test=tiers] h3').should('contain', i18n['app.pricing'])

    for (let tier of [0,2,4,8]) {

      // Price should be translated
      cy.get(`[data-test=tier-${tier}] h3`).should('contain', i18n['app.perMonth'])

      // Description should be translated
      // FIXME: Not testing the entire string because HTML tags seem to make cypress complain
      cy.get(`[data-test=tier-${tier}] p`).should('contain', i18n[`app.txt-tier${tier}`].slice(0, 20))
    }

    for (let tier of [2,4,8]) {

      // Subscribe button should be translated
      cy.get(`form#form-tier${tier} button`).should('contain', i18n['app.subscribe'])

      // Subscribe yearly button should be translated
      cy.get(`form#form-tier${tier}-yearly button`).should('contain', i18n['app.orPayPerYear'])
    }

    /* Patterns/Showcase/Blog boxes */

    for (let box of ['patterns', 'showcase', 'blog']) {

      // Title should be translated
      cy.get(`[data-test=${box}] h4`).should('contain', i18n[`app.${box}`])

      // Description should be translated
      if (box !== 'patterns')
        cy.get(`[data-test=${box}] p`).should('contain', i18n[`intro.txt-${box}`])

      // Image should load
      cy.get(`[data-test=${box}] img`).should('be.visible')
    }

    /* Footer */

    // Logo should link to the home page
    cy.get(`footer [data-test=logo]`).should('have.attr', 'href', '/')

    let social = {
      gitter: 'https://gitter.im/freesewing/chat',
      twitter: 'https://twitter.com/freesewing_org',
      github: 'https://github.com/freesewing',
      instagram: 'https://instagram.com/freesewing_org',
    }

    // Social icon should link to correct URI
    for (let s in social)
      cy.get(`footer a.${s}`).should('have.attr', 'href', social[s])

    // Footer message should be translated
    // FIXME: Not testing the entire string because HTML tags seem to make cypress complain
    cy.get(`footer [data-test=text]`).should('contain', i18n['app.txt-footer'].slice(0,20))

    // Patron avatars should load
    cy.get('footer ul li a img').should('be.visible')


    // Links should be translated
    let links = {
      blog: "/blog",
      aboutFreesewing: "/docs/about",
      faq: "/docs/faq",
      becomeAPatron: "/patrons/join",
      makerDocs: "/docs",
      devDocs: "https://"+Cypress.env('LANGUAGE')+".freesewing.dev/"
    }
    for (let link in links)
      cy.get(`footer [data-test=${link}]`).should('contain', i18n['app.'+link])

  })
})
