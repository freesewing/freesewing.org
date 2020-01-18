import { strings } from '@freesewing/i18n'
const i18n = strings[Cypress.env('LANGUAGE')]

describe('Signup flow', function() {
  beforeEach(function() {
    cy.visit('/signup')
    cy.get('div.theme-wrapper').should('have.class', 'light')
  })

  it('Verify signup page translations', function() {
    // Title
    cy.get('h1').should('contain', i18n['app.signUp'])

    // Instructions
    cy.get('h6').should('contain', i18n['app.enterEmailPickPassword'])

    // Email label
    cy.get('[for=email]').should('contain', i18n['app.emailAddress'])

    // Email hint
    cy.get('p#email-helper-text').should('contain', i18n['app.weNeverShareYourEmail'])

    // Password label
    cy.get('[for=password]').should('contain', i18n['account.password'])

    // Password hint
    cy.get('p#password-helper-text').should('contain', i18n['app.noPasswordPolicy'])

    // Submit button
    cy.get('form button[type=submit]').should('contain', i18n['app.signUp'])

    // Google Oauth button
    cy.get('button[data-provider=google] span.MuiButton-label span').should(
      'contain',
      i18n['app.signupWithProvider'].slice(0, 10)
    )

    // Github Oauth button
    cy.get('button[data-provider=github] span.MuiButton-label span').should(
      'contain',
      i18n['app.signupWithProvider'].slice(0, 10)
    )
  })

  it('Verify signup state on load', function() {
    // (auto) focus on email
    cy.focused().should('have.attr', 'id', 'email')

    // Disabled signup button
    cy.get('form button[type=submit]').should('have.attr', 'disabled')

    // Invalid email input
    cy.get('[data-test=email-invalid]').should('be.visible')

    // Hidden password
    cy.get('[data-test=hide-password]').should('be.visible')
    cy.get('#password').should('have.attr', 'type', 'password')
  })

  it('Invalid email address should prevent submit', function() {
    // Fill in invalid email address
    cy.get('#email').type('user.gmail.com')

    // Submit button should remain disabled
    cy.get('form button[type=submit]').should('have.attr', 'disabled')

    // Email input should remain invalid
    cy.get('[data-test=email-invalid]').should('be.visible')
  })

  it('Valid email address alone should not enable submit', function() {
    // Fill in valid email address
    cy.get('#email').type('cypress@freesewing.org')

    // Submit button should be disabled
    cy.get('form button[type=submit]').should('have.attr', 'disabled')

    // Email input should be valid
    cy.get('[data-test=email-valid]').should('be.visible')
  })

  it('Valid email address and password should enable submit', function() {
    // Fill in valid email address
    cy.get('#email').type('cypress@freesewing.org')

    // Fill in password
    cy.get('#password').type('cypress')

    // Submit button should be enabled
    cy.get('form button[type=submit]').should('not.have.attr', 'disabled')

    // Email input should be valid
    cy.get('[data-test=email-valid]').should('be.visible')
  })

  it('Form should submit via keyboard', function() {
    // Fill in valid email address
    cy.get('#email').type('test_user@freesewing.org')

    // Fill in password
    cy.get('#password').type('cypress{enter}')

    // Check error message
    cy.get('blockquote.warning').should('contain', i18n['errors.emailExists'])
  })

  it('Password reveal icon should toggle password visibility', function() {
    let val = i18n['app.ohNo']

    // Enter password
    cy.get('#password').type(val)

    // Click reveal password icon
    cy.get('[data-test=hide-password]').click()

    // Validate that password input type is now text
    cy.get('#password').should('have.attr', 'type', 'text')

    // Validate password is correct
    cy.get('#password').should('have.value', val)

    // Click reveal password icon again
    cy.get('[data-test=show-password]').click()

    // Validate that password input type is now password
    cy.get('#password').should('have.attr', 'type', 'password')

    // Validate password is correct
    cy.get('#password').should('have.value', val)
  })

  it('Verify result on signup/submit', function() {
    // Fill in valid email address
    cy.get('#email').type('cypress+' + Date.now() + '@freesewing.org')

    // Enter password
    cy.get('#password').type('cypress')

    // Submit form
    cy.get('form button[type=submit]').click()

    // Title should be translated
    cy.get('h2')
      .should('contain', i18n['app.yay'])
      .should('contain', i18n['app.goodJob'])

    // First paragraph should be translated
    cy.get('div.theme-wrapper.light > div > p').should(
      'contain',
      i18n['app.checkInboxClickLinkInConfirmationEmail']
    )

    // Second (last) paragraph should be translated
    cy.get('div.theme-wrapper.light > div > p:last-of-type').should(
      'contain',
      i18n['app.goAheadWeWillWait']
    )

    // Image should load
    cy.get('img[alt="Yay!"]').should('be.visible')
  })

  it('Verify result for existing user', function() {
    // Fill in email address of existing user
    cy.get('#email').type('test_user@freesewing.org')

    // Enter password
    cy.get('#password').type('cypress')

    // Submit form
    cy.get('form button[type=submit]').click()

    // Check error message
    cy.get('blockquote.warning').should('contain', i18n['errors.emailExists'])
  })
})
