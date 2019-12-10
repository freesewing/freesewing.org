import { strings } from '@freesewing/i18n'
const i18n = strings[Cypress.env('LANGUAGE')]

describe('Home page', function() {
  const navs = {
    patterns: 'patterns',
    docs: 'docs',
    blog: 'blog',
    account: 'logIn',
    signup: 'signUp'
  }

  before(function() {
    cy.visit('/')
    cy.get('div.theme-wrapper').should('have.class', 'layouthome')
  })

  describe('Navbar', function() {
    for (let nav in navs) {
      it('Links: ' + nav, function() {
        cy.get(`[data-test=navbar-${nav}]`).should(
          'have.attr',
          'href',
          '/' + navs[nav].toLowerCase()
        )
      })
    }

    for (let icon of ['search', 'language']) {
      it('Icons: ' + icon, function() {
        cy.get(`[data-test=navbar-${icon}]`).should('have.attr', 'href', '/' + icon)
      })
    }

    it('Logo', function() {
      cy.get(`[data-test=navbar-home]`).should('have.attr', 'href', '/')
    })
  })
  describe('Top banner', function() {
    it('Button', function() {
      cy.get('[data-test=top-button-visitor]').should('have.attr', 'href', '/signup')
    })
  })
  describe('Subscribe banner', function() {
    it('Button to pricing anchor', function() {
      cy.get('[data-test=subscribe] a').should('have.attr', 'href', '#tiers')
    })
  })
  describe('Footer', function() {
    it('Logo should link to the home page', function() {
      cy.get(`footer [data-test=logo]`).should('have.attr', 'href', '/')
    })

    let social = {
      gitter: 'https://gitter.im/freesewing/chat',
      twitter: 'https://twitter.com/freesewing_org',
      github: 'https://github.com/freesewing',
      instagram: 'https://instagram.com/freesewing_org'
    }

    for (let s in social) {
      it('Social links: ' + s, function() {
        cy.get(`footer a.${s}`).should('have.attr', 'href', social[s])
      })
    }
  })
  describe('All strings should be translated', function() {
    for (let nav in navs) {
      it('app.' + navs[nav], function() {
        cy.get(`[data-test=navbar-${nav}] > span`).should('contain', i18n['app.' + navs[nav]])
      })
    }

    it('Title should read FreeSewing', function() {
      cy.get('[data-test=header] h1').should('contain', 'FreeSewing')
    })

    it('app.sewingPatternsForNonAveragePeople', function() {
      cy.get(`[data-test=slogan]`).should('contain', i18n['app.sewingPatternsForNonAveragePeople'])
    })

    it('app.averagePeopleDoNotExist', function() {
      cy.get(`[data-test=subslogan]`).should('contain', i18n['app.averagePeopleDoNotExist'])
    })

    it('app.signup', function() {
      cy.get('[data-test=top-button-visitor]').should('contain', i18n['app.signUp'])
    })

    for (let i = 1; i < 4; i++) {
      it(`homepage.row1col${i}title`, function() {
        cy.get(`[data-test=row1-${i}] > h2`).should('contain', i18n[`homepage.row1col${i}title`])
      })

      it(`homepage.row1col${i}text`, function() {
        cy.get(`[data-test=row1-${i}] p > span`).should(
          'contain',
          i18n[`homepage.row1col${i}text`].slice(0, 10)
        )
      })
    }

    for (let i = 1; i < 4; i++) {
      it(`homepage.row2col${i}title`, function() {
        cy.get(`[data-test=row2-${i}] > h2`).should('contain', i18n[`homepage.row2col${i}title`])
      })

      it(`homepage.row2col${i}text`, function() {
        cy.get(`[data-test=row2-${i}] p > span`).should(
          'contain',
          i18n[`homepage.row2col${i}text`].slice(0, 3)
        )
      })
    }

    it('app.supportFreesewing', function() {
      cy.get('[data-test=subscribe] h1').should('contain', i18n['app.supportFreesewing'])
    })

    it('app.txt-tiers', function() {
      cy.get('[data-test=subscribe] h2').should('contain', i18n['app.txt-tiers'])
    })

    it('app.patronPitch', function() {
      cy.get('[data-test=subscribe] p').should('contain', i18n['app.patronPitch'])
    })

    it('app.pricing', function() {
      cy.get('[data-test=subscribe] a').should('contain', i18n['app.pricing'])
    })

    it('app.pricing', function() {
      cy.get('[data-test=tiers] h3').should('contain', i18n['app.pricing'])
    })

    for (let tier of [0, 2, 4, 8]) {
      it('app.perMonth - tier ' + tier, function() {
        cy.get(`[data-test=tier-${tier}] h3`).should('contain', i18n['app.perMonth'])
      })

      it(`app.txt-tier${tier}`, function() {
        cy.get(`[data-test=tier-${tier}] p`).should(
          'contain',
          i18n[`app.txt-tier${tier}`].slice(0, 20)
        )
      })
    }

    for (let tier of [2, 4, 8]) {
      it('app.subscribe - tier ' + tier, function() {
        cy.get(`form#form-tier${tier} button`).should('contain', i18n['app.subscribe'])
      })

      it('app.orPayPerYear - tier ' + tier, function() {
        cy.get(`form#form-tier${tier}-yearly button`).should('contain', i18n['app.orPayPerYear'])
      })
    }

    /* Patterns/Showcase/Blog boxes */

    for (let box of ['patterns', 'showcase', 'blog']) {
      it(`app.${box}`, function() {
        cy.get(`[data-test=${box}] h4`).should('contain', i18n[`app.${box}`])
      })

      it(`intro.txt-${box}`, function() {
        if (box !== 'patterns')
          cy.get(`[data-test=${box}] p`).should('contain', i18n[`intro.txt-${box}`])
      })
    }

    it('app.txt-footer', function() {
      cy.get(`footer [data-test=text]`).should('contain', i18n['app.txt-footer'].slice(0, 20))
    })

    // Links
    let links = {
      blog: '/blog',
      aboutFreesewing: '/docs/about',
      faq: '/docs/faq',
      becomeAPatron: '/patrons/join',
      makerDocs: '/docs',
      devDocs: 'https://' + Cypress.env('LANGUAGE') + '.freesewing.dev/'
    }
    for (let link in links) {
      it('app.' + link, function() {
        cy.get(`footer [data-test=${link}]`).should('contain', i18n['app.' + link])
      })
    }
  })

  describe('All images should load', function() {
    for (let box of ['patterns', 'showcase', 'blog']) {
      it('Image for ' + box + ' box should load', function() {
        cy.get(`[data-test=${box}] img`).should('be.visible')
      })
    }

    it('Patron avatars should load', function() {
      cy.get('footer ul li a img').should('be.visible')
    })
  })
})
