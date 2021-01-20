import { strings } from '@freesewing/i18n'

const i18n = strings[Cypress.env('LANGUAGE')]

describe('People', () => {
  beforeEach(() => {
    cy.visit('/login')
    cy.get('div.theme-wrapper').should('have.class', 'light')
    // Logging in with email address because we'll change the username in our tests
    cy.get('#username').type('test@freesewing.org')
    cy.get('#password').type('test{enter}')
    console.log(strings)
    cy.get('[data-test=notification]').should('contain', i18n['app.goodToSeeYouAgain'].slice(0, 20))
    cy.server()
  })

  it('create without breasts', () => {
    cy.route('POST', '/people').as('save')
    cy.visit('/person/')
    cy.get('[data-test=name-title]').should('contain', i18n['app.name'])
    cy.get('[data-test=units-title]').should('contain', i18n['account.units'])
    cy.get('[data-test=chest-title]').should('contain', i18n['app.chest'])
    cy.get('[data-test=save]').should('contain', i18n['app.createModel'])
    cy.get('[data-test=save]').should('contain', i18n['app.createModel'])
    cy.get('[data-test=invalid]').should('be.visible')
    cy.get('[data-test=save]').should('have.attr', 'disabled')
    cy.get('article input[type=text]').type('This is model without breasts')
    cy.get('[data-test=valid]').should('be.visible')
    cy.get('[data-test=save]').should('not.have.attr', 'disabled')
    cy.get('[data-test=metric]').click()
    cy.get('[data-test=save]').click({ force: true })
    cy.get('h1').should('contain', 'This is model without breasts')
    cy.get('[data-test=blank-slate]').should('be.visible')
    cy.get('article img').should('be.visible')
    cy.get('[data-test=notes-title]').should('contain', i18n['app.notes'])
    cy.get('[data-test=settings-title]').should('contain', i18n['app.settings'])
    cy.get('[data-test=measurements-title]').should('contain', i18n['app.measurements'])
    cy.get('[data-test=add-inseam-measurement]').should('be.visible')
  })

  it('create with breasts', () => {
    cy.route('POST', '/people').as('save')
    cy.visit('/person/')
    cy.get('[data-test=name-title]').should('contain', i18n['app.name'])
    cy.get('[data-test=units-title]').should('contain', i18n['account.units'])
    cy.get('[data-test=chest-title]').should('contain', i18n['app.chest'])
    cy.get('[data-test=save]').should('contain', i18n['app.createModel'])
    cy.get('[data-test=save]').should('contain', i18n['app.createModel'])
    cy.get('[data-test=invalid]').should('be.visible')
    cy.get('[data-test=save]').should('have.attr', 'disabled')
    cy.get('article input[type=text]').type('This is model with breasts')
    cy.get('[data-test=valid]').should('be.visible')
    cy.get('[data-test=save]').should('not.have.attr', 'disabled')
    cy.get('[data-test=metric]').click()
    cy.get('[data-test=withBreasts]').click()
    cy.get('[data-test=save]').click({ force: true })
    cy.get('h1').should('contain', 'This is model with breasts')
    cy.get('[data-test=blank-slate]').should('be.visible')
    cy.get('article img').should('be.visible')
    cy.get('[data-test=notes-title]').should('contain', i18n['app.notes'])
    cy.get('[data-test=settings-title]').should('contain', i18n['app.settings'])
    cy.get('[data-test=measurements-title]').should('contain', i18n['app.measurements'])
    cy.get('[data-test=add-bustSpan-measurement]').should('be.visible')
  })

  it('add notes', () => {
    cy.visit('/account/people/')
    cy.get('[data-test=model-link]').last().find('h6').click()
    cy.get('[data-test=add-notes]').click()
    cy.get('h1').should('contain', i18n['app.notes'])
    cy.get('[data-test=cancel]').should('contain', i18n['app.cancel'])
    cy.get('[data-test=save]').should('contain', i18n['app.save'])
    const notes = '\n![These are the notes](https://media.giphy.com/media/wrTiOAAVJYN5S/giphy.gif)'
    cy.get('[data-test=notes] textarea[aria-invalid=false]').type(notes)
    cy.get('[data-test=save]').click()
  })

  it('edit notes', () => {
    cy.visit('/account/people/')
    cy.get('[data-test=model-link]').first().find('h6').click()
    cy.get('[data-test=edit-notes]').click()
    cy.get('h1').should('contain', i18n['app.notes'])
    cy.get('[data-test=cancel]').should('contain', i18n['app.cancel'])
    cy.get('[data-test=save]').should('contain', i18n['app.save'])
    const notes = '\n![These are the notes](https://media.giphy.com/media/wrTiOAAVJYN5S/giphy.gif)'
    cy.get('[data-test=notes] textarea[aria-invalid=false]').type(notes)
    cy.get('[data-test=save]').click()
  })

  context('when having no neck circomference set', () => {
    it.only('add measurement', () => {
      cy.visit('/account/people/')
      cy.get('div.box > a').last().find('h6').click({ force: true })

      cy.get('h1').should('contain', 'Example person - With breasts')
      cy.get('[data-test=add-bustSpan-measurement]').click({ force: true })
      cy.get('[data-test=measurement] input').clear()
      cy.get('[data-test=measurement] input').type('24{enter}')
      cy.get('h1').should('contain', 'Example person - With breasts')

      // cy.route('PUT', `/models/${handle}`).as('update')
      // cy.get('[data-test=save]').click()
      // cy.wait('@update').then(xhr => {
      //   expect(xhr.response.body.model.measurements.ankleCircumference).to.equal(240)
      //   cy.get('[data-test=remove]').click({ force: true })
      //   cy.get('h1').should('contain', i18n['app.models'])
      // })
      // cy.get('h1').should('contain', 'This is a test model')
    })
  })

  context('when having the neck circumference set', () => {})
})
