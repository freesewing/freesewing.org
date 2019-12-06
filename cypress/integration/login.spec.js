import { strings } from '@freesewing/i18n'
const i18n = strings[Cypress.env('LANGUAGE')]

describe('Login flow', function() {
  beforeEach(function() {
    cy.visit('/login')
    cy.get('div.theme-wrapper').should('have.class', 'layoutdefault')
  })

  it('Verify login page translations', function() {
    // Title
    cy.get('h1').should('contain', i18n['app.logIn'])

    // Email label
    cy.get('[for=username]').should('contain', i18n['account.username'])

    // Password label
    cy.get('[for=password]').should('contain', i18n['account.password'])

    // Submit button
    cy.get('form button[type=submit]').should('contain', i18n['app.logIn'])

    // Trouble link (note the typo in the i18n key :| )
    cy.get('article a[data-test=trouble]').should('contain', i18n['app.troubleLoggingIn'])

    // Signup link
    cy.get('article a[data-test=signup]').should('contain', i18n['app.signUpForAFreeAccount'])

    // Google Oauth button
    cy.get('button[data-provider=google] span.MuiButton-label span').should(
      'contain',
      i18n['app.loginWithProvider'].slice(0, 10)
    )

    // Github Oauth button
    cy.get('button[data-provider=github] span.MuiButton-label span').should(
      'contain',
      i18n['app.loginWithProvider'].slice(0, 10)
    )
  })

  it('Verify login state on load', function() {
    // (auto) focus on username
    cy.focused().should('have.attr', 'id', 'username')

    // Disabled login button
    cy.get('form button[type=submit]').should('have.attr', 'disabled')

    // Hidden password
    cy.get('[data-test=hide-password]').should('be.visible')
    cy.get('#password').should('have.attr', 'type', 'password')
  })

  it('Missing password should prevent submit', function() {
    // Fill in username
    cy.get('#username').type('😇')

    // Submit button should remain disabled
    cy.get('form button[type=submit]').should('have.attr', 'disabled')
  })

  it('Missing username should prevent submit', function() {
    // Fill in username
    cy.get('#password').type('😇')

    // Submit button should remain disabled
    cy.get('form button[type=submit]').should('have.attr', 'disabled')
  })

  it('Username and password should enable submit', function() {
    // Fill in username
    cy.get('#username').type('😇')

    // Fill in password
    cy.get('#password').type('cypress')

    // Submit button should be enabled
    cy.get('form button[type=submit]').should('not.have.attr', 'disabled')
  })

  it.only('Form should submit via keyboard', function() {
    // Fill in username
    cy.get('#username').type('😇')

    // Fill in password
    cy.get('#password').type('cypress{enter}')

    // Check error message
    cy.get('[data-test=notification]').should(
      'contain',
      i18n['errors.requestFailedWithStatusCode401']
    )
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

  it('Verify result on login/submit', function() {
    // Fill in username
    cy.get('#username').type('test_user')

    // Enter password
    cy.get('#password').type('test')

    // Submit form
    cy.get('form button[type=submit]').click()

    // Title should be translated
    cy.get('h1').should('contain', i18n['app.account'])
  })

  it('Verify trouble loggin in instructions are translated', function() {
    // Click trouble link
    cy.get('article a[data-test=trouble]').click()

    // Title
    cy.get('h1').should('contain', i18n['app.troubleLoggingIn'])

    // Instructions
    cy.get('[data-test=trouble1]').contains(i18n['app.emailWorksToo'])
    cy.get('[data-test=trouble2]').contains(i18n['app.forgotLoginInstructions'].slice(0, 20))

    // Button
    cy.get('button[type=submit]').contains(i18n['app.resetPassword'])

    // Login link
    cy.get('article a[data-test=trouble]').should('contain', i18n['app.logIn'])

    // Signup link
    cy.get('article a[data-test=signup]').should('contain', i18n['app.signUpForAFreeAccount'])
  })

  it('Verify reset password handling', function() {
    // Click trouble link
    cy.get('article a[data-test=trouble]').click()

    // Enter email
    cy.get('#username').type('test@freesewing.org')

    // Submit form
    cy.get('form button[type=submit]').click()

    // Check loader
    cy.get('#loader').should('be.visible')

    // Check notification
    cy.get('[data-test=notification]').should(
      'contain',
      i18n['app.checkInboxClickLinkInConfirmationEmail']
    )
  })
})
