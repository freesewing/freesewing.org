import { strings } from "@freesewing/i18n";
const i18n = strings[Cypress.env('LANGUAGE')]

describe('Home page', function() {

  const navs = {
    patterns: 'patterns',
    docs: 'docs',
    blog: 'blog',
    account: 'logIn',
    signup: 'signUp'
  }

  before(function () {
    cy.visit('/')
    cy.get('div.theme-wrapper')
      .should('have.class', 'layouthome')
  })

  it('All links should point to the right place', function() {

    /* Navbar */

    // links
    for (let nav in navs)
      cy.get(`[data-test=navbar-${nav}]`).should('have.attr', 'href', '/'+navs[nav].toLowerCase())

    // icons
    for (let icon of ['search', 'language'])
      cy.get(`[data-test=navbar-${icon}]`).should('have.attr', 'href', '/'+icon)

    // logo
    cy.get(`[data-test=navbar-home]`).should('have.attr', 'href', '/')

    /* Top banner */

    // Button
    cy.get('[data-test=top-button-visitor]').should('have.attr', 'href', '/signup')

    /* Subscribe banner */

    // Button should link to pricing anchor
    cy.get('[data-test=subscribe] a').should('have.attr', 'href', '#tiers')

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
  })

  it('All strings should be translated', function() {

    /* Navbar */
    for (let nav in navs)
      cy.get(`[data-test=navbar-${nav}] > span`).should('contain', i18n['app.'+navs[nav]])

    /* Top header */

    // Title should read FreeSewing
    cy.get('[data-test=header] h1').should('contain', 'FreeSewing')

    // Slogan should be translated
    cy.get(`[data-test=slogan]`).should('contain', i18n['app.sewingPatternsForNonAveragePeople'])

    // Sub-Slogan should be translated
    cy.get(`[data-test=subslogan]`).should('contain', i18n['app.averagePeopleDoNotExist'])

    /* Top banner */

    // Button
    cy.get('[data-test=top-button-visitor]').should('contain', i18n['app.signUp'])

    /* Top text boxes */

    for (let i=1;i<4;i++) {

      // Box title
      cy.get(`[data-test=row1-${i}] > h2`).should('contain', i18n[`homepage.row1col${i}title`])

      // Box paragraph
      // FIXME: Not testing the entire string because HTML tags seem to make cypress complain
      cy.get(`[data-test=row1-${i}] p > span`).should('contain', i18n[`homepage.row1col${i}text`].slice(0, 20))
    }

    /* Bottom text boxes */

    for (let i=1;i<4;i++) {

      // Box title
      cy.get(`[data-test=row2-${i}] > h2`).should('contain', i18n[`homepage.row2col${i}title`])

      // Box paragraph
      // FIXME: Not testing the entire string because HTML tags seem to make cypress complain
      cy.get(`[data-test=row2-${i}] p > span`).should('contain', i18n[`homepage.row2col${i}text`].slice(0, 3))
    }

    /* Subscribe banner */

    // Title
    cy.get('[data-test=subscribe] h1').should('contain', i18n['app.supportFreesewing'])

    // Lead
    cy.get('[data-test=subscribe] h2').should('contain', i18n['app.txt-tiers'])

    // Paragraph
    cy.get('[data-test=subscribe] p').should('contain', i18n['app.patronPitch'])

    // Button
    cy.get('[data-test=subscribe] a').should('contain', i18n['app.pricing'])

    /* Subscribe tiers */

    // Title
    cy.get('[data-test=tiers] h3').should('contain', i18n['app.pricing'])

    for (let tier of [0,2,4,8]) {

      // Price
      cy.get(`[data-test=tier-${tier}] h3`).should('contain', i18n['app.perMonth'])

      // Description
      // FIXME: Not testing the entire string because HTML tags seem to make cypress complain
      cy.get(`[data-test=tier-${tier}] p`).should('contain', i18n[`app.txt-tier${tier}`].slice(0, 20))
    }

    for (let tier of [2,4,8]) {

      // Subscribe button
      cy.get(`form#form-tier${tier} button`).should('contain', i18n['app.subscribe'])

      // Subscribe yearly button
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

    // Footer message
    // FIXME: Not testing the entire string because HTML tags seem to make cypress complain
    cy.get(`footer [data-test=text]`).should('contain', i18n['app.txt-footer'].slice(0,20))

    // Links
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

  it('All images should load', function() {

    /* Patterns/Showcase/Blog boxes */

    // Images per box
    for (let box of ['patterns', 'showcase', 'blog']) {
      cy.get(`[data-test=${box}] img`).should('be.visible')
    }

    /* Footer */

    // Patron avatars
    cy.get('footer ul li a img').should('be.visible')
  })
})
