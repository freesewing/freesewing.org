import { strings } from '@freesewing/i18n'
const i18n = strings[Cypress.env('LANGUAGE')]

describe('User rights', function() {
  beforeEach(function() {
    cy.visit('/login')
    cy.get('div.theme-wrapper').should('have.class', 'layoutdefault')
    cy.get('#username').type('test_user')
    cy.get('#password').type('test{enter}')
    cy.get('[data-test=notification]').should('contain', i18n['app.goodToSeeYouAgain'].slice(0, 20))
  })

  const buttons = {
    export: 'exportYourData',
    consent: 'reviewYourConsent',
    restrict: 'restrictProcessingOfYourData',
    remove: 'removeYourAccount'
  }

  it('Verify translations and links', function() {
    cy.visit('/account/settings')
    cy.get('h1').should('contain', i18n['app.settings'])
    for (let button in buttons)
      cy.get(`a[href="/account/${button}"]`).should('contain', i18n['account.' + buttons[button]])
  })

  it('Export (translation only)', function() {
    cy.visit('/account/export')
    cy.get('h1').should('contain', i18n['account.exportYourData'])
    cy.get('blockquote.note').should('contain', i18n['account.exportYourDataInfo'].slice(0, 10))
    cy.get('a[data-test=cancel]').should('contain', i18n['app.cancel'])
    cy.get('button[data-test=export]').should('contain', i18n['account.exportYourData'])
    cy.get('article h6').should('contain', i18n['account.exportYourDataTitle'])
  })

  it('Consent (translation only)', function() {
    cy.visit('/account/consent')
    cy.get('h1').should('contain', i18n['account.reviewYourConsent'])
    cy.get('[data-test=details]').click({ force: true })
    cy.get('[data-test=noIDoNot]').click({ multiple: true, force: true })
    cy.get('[data-test=openDataQuestion]').click({ force: true })
    let strings = [
      'consentWhyAnswer',
      'consentForProfileData',
      'profileWhatQuestion',
      'whyQuestion',
      'timingQuestion',
      'shareQuestion',
      'profileQuestion',
      'noIDoNot',
      'yesIDo',
      'profileWarning',
      'consentForModelData',
      'modelWhatQuestion',
      'openData',
      'openDataQuestion',
      'openDataInfo',
      'modelQuestion',
      'modelWarning'
    ]
    for (let string of strings)
      cy.get(`[data-test=${string}]`).should('contain', i18n[`gdpr.${string}`])
    let htmlStrings = [
      'compliant',
      'profileWhatAnswer',
      'profileWhyAnswer',
      'profileTimingAnswer',
      'profileShareAnswer',
      'modelWhatAnswer',
      'modelWhyAnswer',
      'modelTimingAnswer',
      'modelShareAnswer'
    ]
    for (let string of strings)
      cy.get(`[data-test=${string}]`).should('contain', i18n[`gdpr.${string}`].slice(0, 3))
    cy.get('[data-test=openDataQuestion]').click({ force: true })
    cy.get('[data-test=yesIDo]').click({ multiple: true, force: true })
    cy.get('[data-test=details]').click({ force: true })
    cy.get('[data-test=details]').should('contain', i18n['app.showDetails'])
    cy.get('[data-test=cancel]').should('contain', i18n['app.cancel'])
    cy.get('button[data-test=save]').should('contain', i18n['app.save'])
  })

  it('Restrict (translation only)', function() {
    cy.visit('/account/restrict')
    cy.get('h1').should('contain', i18n['account.restrictProcessingOfYourData'])
    cy.get('blockquote.note').should(
      'contain',
      i18n['account.restrictProcessingOfYourDataInfo'].slice(0, 10)
    )
    cy.get('blockquote.warning h4').should('contain', i18n['app.proceedWithCaution'])
    cy.get('blockquote.warning p').should('contain', i18n['account.restrictProcessingWarning'])
    cy.get('[data-test=back]').should('contain', i18n['app.back'])
    cy.get('[data-test=cancel]').should('contain', i18n['app.cancel'])
    cy.get('[data-test=save]').should('contain', i18n['account.restrictProcessingOfYourData'])
  })
})
