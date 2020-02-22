// FIXME: This should obviously be handled in logic,
// but doing so makes it hard to run a test per post :|
const posts = [
  '/blog/roundup-2019-01',
  '/blog/core-1-8-jaeger-across-back',
  '/blog/email-spam-problems',
  '/blog/freesewing-goes-jamstack'
]

describe('Blog posts', function() {
  for (let post of posts) {
    it(post, function() {
      if (1 || post === '/blog/roundup-2017-09') {
        cy.visit(post)
        cy.get('h1').should('not.be.empty')
        cy.get('div[data-test=meta] > span').should('not.be.empty')
        cy.get('a[data-test=author]').should('not.be.empty')
        cy.get('article img').should('have.attr', 'alt')
        cy.get('article img').each(($el, index, $list) => {
          if ($el.attr('src').slice(0, 4) !== 'data') {
            cy.request($el.attr('src'))
              .its('status')
              .should('equal', 200)
          }
        })
      }
    })
  }
})
