describe('Blog posts', () => {
  before(() => {
    // Get latest blog posts from the homepage
    cy.visit('/')
    cy.get('div#blog div.single div.post > a.image').click({ force: true })
  })

  describe('Verify blog post', () => {
    it('Heading should be present', () => {
      cy.get('h1').should('not.be.empty')
    })
    it('Date should be present', () => {
      cy.get('[data-test=meta').should('contain', ', 202')
    })
    it('Author should be present', () => {
      cy.get('a[data-test=author]').should('not.be.empty')
    })
    it('Author should link to a user profile', () => {
      cy.get('a[data-test=author]').invoke('attr', 'href').should('contain', '/users/')
    })
    it('Image should have a src', () => {
      cy.get('img[data-test=img]').invoke('attr', 'src').should('contain', '/static/')
    })
    it('Image should have a srcSet', () => {
      cy.get('img[data-test=img]').invoke('attr', 'srcset').should('not.be.empty')
    })
    it('Image should have an alt', () => {
      cy.get('img[data-test=img]').invoke('attr', 'alt').should('not.be.empty')
    })
    it('Figure should have a caption', () => {
      cy.get('figcaption[data-test=caption]').should('not.be.empty')
    })
    it('Post should have content', () => {
      cy.get('#mdx').should('not.be.empty')
    })
    it('All images should load', () => {
      cy.get('div.content img').each(($el, index, $list) => {
        if ($el.attr('src').slice(0, 4) !== 'data') {
          cy.request($el.attr('src')).its('status').should('equal', 200)
        }
      })
    })
  })

  describe('Verify navigation', () => {
    it('Blog section should be active', () => {
      cy.get('#main-menu > li > a.active').invoke('attr', 'href').should('equal', '/blog/')
    })
    it('Article link should be active', () => {
      cy.get('#main-menu > li > a.active + ul.level-1 > li > a.active')
        .invoke('attr', 'href')
        .should('contain', '/blog/')
    })
    it('Navigation should have links to many blog posts', () => {
      cy.get('#main-menu ul.level-1 li').its('length').should('gt', 20)
    })
  })
})
