import { strings } from "@freesewing/i18n";
const i18n = strings[Cypress.env('LANGUAGE')]

describe('Home page - Visitor', function() {

  it('Home page should load', function() {
    cy.visit('/')
    cy.get('div.theme-wrapper')
      .should('have.class', 'layouthome')
  })

  describe('NavBar', function() {
    const navs = {
      patterns: 'patterns',
      docs: 'docs',
      blog: 'blog',
      account: 'logIn',
      signup: 'signUp'
    }

    for (let nav in navs) {
      let txt = navs[nav];

      it(`NavBar ${txt} link should go to ${txt} page`, function() {
        cy.get(`[data-test=navbar-${nav}]`)
          .should('have.attr', 'href', '/'+txt.toLowerCase())
      })

      it(`NavBar ${txt} link should be translated`, function() {
        cy.get(`[data-test=navbar-${nav}] > span`)
          .should('contain', i18n['app.'+txt])
      })

    }

    const icons = ['search', 'language']
    for (let icon of icons) {

      it(`NavBar ${icon} icon should go to ${icon} page`, function() {
        cy.get(`[data-test=navbar-${icon}]`)
          .should('have.attr', 'href', '/'+icon)
      })

    }

    it(`NavBar home logo should go to home page`, function() {
      cy.get(`[data-test=navbar-home]`)
        .should('have.attr', 'href', '/')
    })
  })

  describe('Top banner', function() {

     it('Title should read FreeSewing', function() {
       cy.get('[data-test=header] h1')
         .should('contain', 'FreeSewing')
     })

     it('Slogan should be translated', function() {
       cy.get(`[data-test=slogan]`)
         .should('contain', i18n['app.sewingPatternsForNonAveragePeople'])
     })

     it('Sub-Slogan should be translated', function() {
       cy.get(`[data-test=subslogan]`)
         .should('contain', i18n['app.averagePeopleDoNotExist'])
     })

     it('Top button should go to sign up page', function() {
       cy.get('[data-test=top-button-visitor]')
         .should('have.attr', 'href', '/signup')
     })

     it('Top button should be translated', function() {
       cy.get('[data-test=top-button-visitor]')
         .should('contain', i18n['app.signUp'])
     })
  })

  describe('Triple text boxes - Top', function() {

    for (let i=1;i<4;i++) {

      it(`Box ${i} - Title should be translated`, function() {
        cy.get(`[data-test=row1-${i}] > h2`)
          .should('contain', i18n[`homepage.row1col${i}title`])
      })

      it(`Box ${i} - Paragraph should be translated`, function() {
        // FIXME: Not testing the entire string because HTML tags seem to make cypress complain
        cy.get(`[data-test=row1-${i}] p > span`)
          .should('contain', i18n[`homepage.row1col${i}text`].slice(0, 20))
      })

    }

  })

  describe('Triple text boxes - Bottom', function() {

    for (let i=1;i<4;i++) {

      it(`Box ${i} - Title should be translated`, function() {
        cy.get(`[data-test=row2-${i}] > h2`)
          .should('contain', i18n[`homepage.row2col${i}title`])
      })

      it(`Box ${i} - Paragraph should be translated`, function() {
        // FIXME: Not testing the entire string because HTML tags seem to make cypress complain
        cy.get(`[data-test=row2-${i}] p > span`)
          .should('contain', i18n[`homepage.row2col${i}text`].slice(0, 3))
      })

    }
  })

  describe('Subscribe banner', function() {

    it('Title should be translated', function() {
      cy.get('[data-test=subscribe] h1')
        .should('contain', i18n['app.supportFreesewing'])
    })

    it('Lead should be translated', function() {
      cy.get('[data-test=subscribe] h2')
        .should('contain', i18n['app.txt-tiers'])
    })

    it('Paragraph should be translated', function() {
      cy.get('[data-test=subscribe] p')
        .should('contain', i18n['app.patronPitch'])
    })

    it('Button should be translated', function() {
      cy.get('[data-test=subscribe] a')
        .should('contain', i18n['app.pricing'])
    })

    it('Button should link to pricing anchor', function() {
      cy.get('[data-test=subscribe] a')
        .should('have.attr', 'href', '#tiers')
    })

  })

  describe('Subscribe tiers', function() {

    it('Title should be translated', function() {
      cy.get('[data-test=tiers] h3')
        .should('contain', i18n['app.pricing'])
    })

    for (let tier of [0,2,4,8]) {

      it(`Tier ${tier} price should be translated`, function() {
        cy.get(`[data-test=tier-${tier}] h3`)
          .should('contain', i18n['app.perMonth'])
      })

      it(`Tier ${tier} description should be translated`, function() {
        cy.get(`[data-test=tier-${tier}] p`)
          // FIXME: Not testing the entire string because HTML tags seem to make cypress complain
          .should('contain', i18n[`app.txt-tier${tier}`].slice(0, 20))
      })

    }
    for (let tier of [2,4,8]) {

      it(`Tier ${tier} subscribe button should be translated`, function() {
        cy.get(`form#form-tier${tier} button`)
          .should('contain', i18n['app.subscribe'])
      })

      it(`Tier ${tier} subscribe yearly button should be translated`, function() {
        cy.get(`form#form-tier${tier}-yearly button`)
          .should('contain', i18n['app.orPayPerYear'])
      })

    }
  })

  describe('Patterns/Showcase/Blog boxes', function() {

    for (let box of ['patterns', 'showcase', 'blog']) {

      it(`${box} title should be translated`, function() {
        cy.get(`[data-test=${box}] h4`)
          .should('contain', i18n[`app.${box}`])
      })

      if (box !== 'patterns') {
        it(`${box} description should be translated`, function() {
          cy.get(`[data-test=${box}] p`)
            .should('contain', i18n[`intro.txt-${box}`])
        })
      }

      it(`${box} image should load`, function() {
        cy.get(`[data-test=${box}] img`)
          .should('be.visible')
      })
    }
  })

  describe('Footer', function() {

    it('Logo should link to the home page', function() {
      cy.get(`footer [data-test=logo]`)
        .should('have.attr', 'href', '/')
    })

    let social = {
      gitter: 'https://gitter.im/freesewing/chat',
      twitter: 'https://twitter.com/freesewing_org',
      github: 'https://github.com/freesewing',
      instagram: 'https://instagram.com/freesewing_org',
    }

    for (let s in social) {
      it(`${s} icon should link to ${s}`, function() {
        cy.get(`footer a.${s}`)
          .should('have.attr', 'href', social[s])
      })

    }

    it('Footer message should be translated', function() {
      cy.get(`footer [data-test=text]`)
        // FIXME: Not testing the entire string because HTML tags seem to make cypress complain
        .should('contain', i18n['app.txt-footer'].slice(0,20))
    })

    it('Patron avatars should load', function() {
      cy.get('footer ul li a img')
        .should('be.visible')
    })

    let links = {
      blog: "/blog",
      aboutFreesewing: "/docs/about",
      faq: "/docs/faq",
      becomeAPatron: "/patrons/join",
      makerDocs: "/docs",
      devDocs: "https://"+Cypress.env('LANGUAGE')+".freesewing.dev/"
    }

    for (let link in links) {

      it(`${link} link should be translated`, function() {
        cy.get(`footer [data-test=${link}]`)
          .should('contain', i18n['app.'+link])
      })

    }

  })

})
