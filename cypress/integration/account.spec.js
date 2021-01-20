import { strings } from '@freesewing/i18n'
const i18n = strings[Cypress.env('LANGUAGE')]

describe('Account page', function () {
  before(function () {
    cy.visit('/login/')
    cy.get('#username').type('test_user')
    cy.get('#password').type('test{enter}')
    cy.get('[data-test=notification]').should('contain', i18n['app.goodToSeeYouAgain'].slice(0, 20))
  })

  const links = {
    '/patterns/': 'app.patterns',
    '/account/people/': 'app.people',
    '/users/test_user/': 'app.profile',
    '/account/settings/avatar/': 'account.avatar',
    '/account/settings/bio/': 'account.bio',
    '/account/settings/language/': 'account.language',
    '/account/settings/units/': 'account.units',
    '/account/settings/github/': 'account.github',
    '/account/settings/instagram/': 'account.instagram',
    '/account/settings/email/': 'account.email',
    '/account/settings/username/': 'account.username',
    '/account/settings/password/': 'account.password',
    '/account/export/': 'account.exportYourData',
    '/account/consent/': 'account.reviewYourConsent',
    '/account/restrict/': 'account.restrictProcessingOfYourData',
    '/account/remove/': 'account.removeYourAccount'
  }

  describe('Verify links & translations', function () {
    it('Should be translated', function () {
      cy.get('h1').should('contain', i18n['app.account'])
    })

    for (let link in links) {
      it(`${links[link]} should be translated and point to ${link}`, function () {
        cy.get(`a[href="${link}"]`).should('contain', i18n[links[link]].slice(0, 4))
      })
    }

    it('app.home', function () {
      cy.get('nav.breadcrumbs > ul > li:first-of-type > a').should('contain', i18n['app.home'])
    })
  })

  after(function () {
    it('Log out flow', function () {
      cy.get('a[href="/logout"]').click({ force: true })
      cy.get('div.theme-wrapper').should('have.class', 'layouthome')
    })
  })
})
