import { strings } from '@freesewing/i18n'

const i18n = strings[Cypress.env('LANGUAGE')]

describe('Model flow', () => {
  beforeEach(() => {
    cy.visit('/login')
    cy.get('div.theme-wrapper').should('have.class', 'layoutdefault')
    // Logging in with email address because we'll change the username in our tests
    cy.get('#username').type('test@freesewing.org')
    cy.get('#password').type('test{enter}')
    cy.get('[data-test=notification]').should('contain', i18n['app.goodToSeeYouAgain'].slice(0, 20))
  })

  it('Create/Update/Remove model', () => {
    const name = 'This is a test model'
    let handle = ''

    cy.server()
    cy.route('POST', '/models').as('save')
    cy.visit('/model')
    cy.get('[data-test=name-title]').should('contain', i18n['app.name'])
    cy.get('[data-test=units-title]').should('contain', i18n['account.units'])
    cy.get('[data-test=chest-title]').should('contain', i18n['app.chest'])
    cy.get('[data-test=save]').should('contain', i18n['app.createModel'])
    cy.get('[data-test=save]').should('contain', i18n['app.createModel'])
    cy.get('[data-test=invalid]').should('be.visible')
    cy.get('[data-test=save]').should('have.attr', 'disabled')
    cy.get('article input[type=text]').type(name)
    cy.get('[data-test=valid]').should('be.visible')
    cy.get('[data-test=save]').should('not.have.attr', 'disabled')
    cy.get('[data-test=metric]').click()
    cy.get('[data-test=withBreasts]').click()
    cy.get('[data-test=save]').click({ force: true })
    cy.wait('@save').then(xhr => {
      expect(xhr.response.body.model.breasts).to.equal(true)
      expect(xhr.response.body.model.units).to.equal('metric')
      expect(xhr.response.body.model.name).to.equal(name)
      handle = xhr.response.body.model.handle
      cy.get('h1').should('contain', name)
      cy.get('article img').should('be.visible')
      cy.get('[data-test=notes-title]').should('contain', i18n['app.notes'])
      cy.get('[data-test=settings-title]').should('contain', i18n['app.settings'])
      cy.get('[data-test=measurements-title]').should('contain', i18n['app.measurements'])
      cy.get('[data-test=add-notes]').click()
      cy.get('h1').should('contain', i18n['app.notes'])
      cy.get('[data-test=cancel]').should('contain', i18n['app.cancel'])
      cy.get('[data-test=save]').should('contain', i18n['app.save'])
      const notes = '![These are the notes](https://media.giphy.com/media/wrTiOAAVJYN5S/giphy.gif)'
      cy.get('[data-test=notes] textarea[aria-invalid=false]').type(notes)
      cy.get('[data-test=save]').click()
      cy.visit(`/models/${handle}/measurements/ankleCircumference`)
      cy.get('[data-test=valid]').should('be.visible')
      cy.get('[data-test=measurement] input').type('invalid')
      cy.get('[data-test=invalid]').should('be.visible')
      cy.get('[data-test=measurement] input').clear()
      cy.get('[data-test=measurement] input').type('24')
      cy.route('PUT', `/models/${handle}`).as('update')
      cy.get('[data-test=save]').click()
      cy.wait('@update').then(xhr => {
        expect(xhr.response.body.model.measurements.ankleCircumference).to.equal(240)
        cy.get('[data-test=remove]').click({ force: true })
        cy.get('h1').should('contain', i18n['app.models'])
      })
    })
  })
})
