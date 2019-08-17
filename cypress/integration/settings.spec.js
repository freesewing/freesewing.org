import { strings, languages } from "@freesewing/i18n";
const i18n = strings[Cypress.env('LANGUAGE')]

describe('Account settings', function() {

  beforeEach(function () {
    cy.visit('/login')
    cy.get('div.theme-wrapper')
      .should('have.class', 'layoutdefault')
    // Logging in with email address because we'll change the username in our tests
    cy.get('#username').type('test@freesewing.org')
    cy.get('#password').type('test{enter}')
    cy.get('[data-test=notification]').should('contain', i18n['app.goodToSeeYouAgain'].slice(0, 20))
    cy.visit('/account/settings')
  })

  const buttons = [
    'avatar',
    'bio',
    'language',
    'units',
    'github',
    'instagram',
    'twitter',
    'email',
    'username',
  ]

  it('Verify translations and links', function() {
    // Title
    cy.get('h1').should('contain', i18n['app.settings'])

    // Buttons
    for (let button of buttons) {
      cy.get(`a[href="/account/settings/${button}"]`).should('contain', i18n['account.'+button])
    }
  })

  it('Avatar (translations only)', function() {
    cy.visit('/account/settings/avatar')
    cy.get('h1').should('contain', i18n['account.avatar'])
    cy.get('blockquote.note').should('contain', i18n['account.avatarInfo'])
    cy.get('p[data-test=instructions]').should('contain', i18n['app.dragAndDropImageHere'])
    cy.get('button[data-test=pick-file]').should('contain', i18n['app.selectImage'])
    cy.get('[data-test=cancel]').should('contain', i18n['app.cancel'])
  })

  it('Bio', function() {
    cy.server()
    cy.route('PUT', '/account').as('save');
    cy.visit('/account/settings/bio')
    cy.get('h1').should('contain', i18n['account.bio'])
    cy.get('blockquote.note').should('contain', i18n['account.bioInfo'])
    cy.get('label[for=bio]').should('contain', i18n['account.bio'])
    cy.get('a[data-test=cancel]').should('contain', i18n['app.cancel'])
    cy.get('button[data-test=save]').should('contain', i18n['app.save'])
    cy.get('article h6').should('contain', i18n['app.preview'])
    cy.get('#bio').clear().type(i18n['email.footerSlogan'])
    cy.get('[data-test=preview]').should('contain', i18n['email.footerSlogan'])
    cy.get('button[data-test=save]').click()
    cy.wait('@save').then( xhr => {
      expect(xhr.response.body.account.bio).to.equal(i18n['email.footerSlogan'])
    })
    cy.get('h1').should('contain', i18n['app.settings'])
    cy.get('[data-test=notification]').should('be.visible')
  })

  it('Language', function() {
    cy.server()
    cy.route('PUT', '/account').as('save');
    let newLanguage;
    cy.visit('/account/settings/language')
    cy.get('h1').should('contain', i18n['account.language'])
    cy.get('blockquote.note').should('contain', i18n['account.languageInfo'])
    cy.get('a[data-test=cancel]').should('contain', i18n['app.cancel'])
    cy.get('button[data-test=save]').should('contain', i18n['app.save'])
    for (let language in languages) cy.get(`[data-test=${language}]`).should('contain', languages[language])
    if (Cypress.env['LANGUAGE'] !== 'en') {
      cy.get('[data-test=en]').click()
      newLanguage = 'en'
    } else {
      cy.get('[data-test=nl]').click()
      newLanguage = 'nl'
    }
    cy.get('button[data-test=save]').click()
    cy.wait('@save').then( xhr => {
      expect(xhr.response.body.account.settings.language).to.equal(newLanguage);
    })
    cy.get('h1').should('contain', i18n['app.settings'])
    cy.get('[data-test=notification]').should('be.visible')
  })

  it('Units', function() {
    cy.server()
    cy.route('PUT', '/account').as('save');
    let newUnits;
    cy.visit('/account/settings/units')
    cy.get('h1').should('contain', i18n['account.units'])
    cy.get('blockquote.note').should('contain', i18n['account.unitsInfo'])
    cy.get('a[data-test=cancel]').should('contain', i18n['app.cancel'])
    cy.get('button[data-test=save]').should('contain', i18n['app.save'])
    cy.get('[data-test=metric]').should('contain', i18n['app.metricUnits'])
    cy.get('[data-test=imperial]').should('contain', i18n['app.imperialUnits'])
    cy.get('input[name=units][checked]').invoke('val').then(value => {
      if(value === "metric") {
        newUnits = 'imperial'
        cy.get('[data-test=imperial]').click()
      } else {
        cy.get('[data-test=metric]').click()
        newUnits = 'metric'
      }
    })
    cy.get('button[data-test=save]').click()
    cy.wait('@save').then( xhr => {
      expect(xhr.response.body.account.settings.units).to.equal(newUnits);
    })
    cy.get('h1').should('contain', i18n['app.settings'])
    cy.get('[data-test=notification]').should('be.visible')
  })

  it('Social', function() {
    cy.server()
    cy.route('PUT', '/account').as('save');
    for (let social of ['github', 'twitter', 'instagram']) {
      cy.visit(`/account/settings/${social}`)
      cy.get('h1').should('contain', i18n[`account.${social}`])
      cy.get('blockquote.note').should('contain', i18n[`account.${social}Info`])
      cy.get('label[for=social]').should('contain', i18n[`account.${social}`])
      cy.get('a[data-test=cancel]').should('contain', i18n['app.cancel'])
      cy.get('button[data-test=save]').should('contain', i18n['app.save'])
      let newSocial = Date.now() + '_' + social
      cy.get('#social').clear().type(newSocial)
      cy.get('button[data-test=save]').click()
      cy.wait('@save').then( xhr => {
        expect(xhr.response.body.account.social[social]).to.equal(newSocial);
      })
      cy.get('h1').should('contain', i18n['app.settings'])
      cy.get('[data-test=notification]').should('be.visible')
    }
  })

  it('Email', function() {
    cy.server()
    cy.route('PUT', '/account').as('save');
    cy.visit('/account/settings/email')
    cy.get('h1').should('contain', i18n['account.email'])
    cy.get('blockquote.note').should('contain', i18n['account.emailInfo'])
    cy.get('label[for=email]').should('contain', i18n['account.email'])
    cy.get('a[data-test=cancel]').should('contain', i18n['app.cancel'])
    cy.get('button[data-test=save]').should('contain', i18n['app.save'])
    cy.get('[data-test=valid]').should('be.visible')
    let oldEmail
    let newEmail = 'test+' + Date.now() + '@freesewing.org'
    cy.get('#email').invoke('val').then( email => oldEmail = email )
    cy.get('#email').clear()
    cy.get('[data-test=invalid]').should('be.visible')
    cy.get('#email').type(newEmail)
    cy.get('[data-test=valid]').should('be.visible')
    cy.get('button[data-test=save]').click()
    cy.wait('@save').then( xhr => {
      // Email change requires confirmation, so it's still the old value
      expect(xhr.response.body.account.email).to.equal(oldEmail)
    })
    cy.get('h1').should('contain', i18n['app.settings'])
    cy.get('[data-test=notification]').should('be.visible')
  })

  it('Username', function() {
    cy.server()
    cy.route('PUT', '/account').as('save');
    cy.visit(`/account/settings/username`)
    cy.get('h1').should('contain', i18n['account.username'])
    cy.get('blockquote.note').should('contain', i18n['account.usernameInfo'].slice(0,20))
    cy.get('label[for=username]').should('contain', i18n['account.username'])
    cy.get('a[data-test=cancel]').should('contain', i18n['app.cancel'])
    cy.get('button[data-test=save]').should('contain', i18n['app.save'])
    cy.get('[data-test=valid]').should('be.visible')
    let newUsername = 'test_' + Date.now()
    cy.get('#username').clear()
    cy.get('[data-test=invalid]').should('be.visible')
    cy.get('#username').type(newUsername)
    cy.get('button[data-test=save]').click()
    cy.wait('@save').then( xhr => {
      expect(xhr.response.body.account.username).to.equal(newUsername);
    })
    cy.get('h1').should('contain', i18n['app.settings'])
    cy.get('[data-test=notification]').should('be.visible')
    // Restore username
    cy.visit(`/account/settings/username`)
    cy.get('#username').clear().type('test_user')
    cy.get('button[data-test=save]').click()
    cy.wait('@save').then( xhr => {
      expect(xhr.response.body.account.username).to.equal('test_user');
    })
    cy.get('h1').should('contain', i18n['app.settings'])
    cy.get('[data-test=notification]').should('be.visible')
  })

  it('Password', function() {
    cy.visit(`/account/settings/password`)
    cy.get('h1').should('contain', i18n['account.password'])
    cy.get('label[for=newPassword]').should('contain', i18n['account.newPassword'])
    cy.get('a[data-test=cancel]').should('contain', i18n['app.cancel'])
    cy.get('button[data-test=save]').should('contain', i18n['app.save'])
    cy.get('[data-test=hide]').should('be.visible')
    cy.get('#newPassword').should('have.attr', 'type', 'password')
    cy.get('#newPassword').clear()
    cy.get('[data-test=hide]').click()
    cy.get('#newPassword').should('have.attr', 'type', 'text')
    cy.get('[data-test=show]').click()
    cy.get('#newPassword').should('have.attr', 'type', 'password')
    cy.get('#newPassword').type('test')
    cy.get('button[data-test=save]').click()
    cy.get('h1').should('contain', i18n['app.settings'])
    cy.get('[data-test=notification]').should('be.visible')
  })

})
