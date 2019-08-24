// FIXME: This should obviously be handled in logic,
// but doing so makes it hard to run a test per post :|
const posts = [
  "/showcase/theo-by-theodore",
  "/showcase/florent-by-enno",
  "/showcase/hugo-by-lainey",
  "/showcase/bruces-by-paul",
  "/showcase/claire-does-sven",
  "/showcase/sandy-by-karin",
  "/showcase/bruce-three-pack",
  "/showcase/sandy-by-adam",
  "/showcase/hugo-by-karin",
  "/showcase/huey-by-paul",
  "/showcase/linnen-jaeger-by-paul",
  "/showcase/yoga-set-by-paul",
  "/showcase/florent-by-wim",
  "/showcase/theo-by-cabi",
  "/showcase/speckles-simon",
  "/showcase/airline-blanket-sven",
  "/showcase/bound-wahid",
  "/showcase/fantastic-four-hugo",
  "/showcase/grey-sven",
  "/showcase/matching-simon",
  "/showcase/wonder-woman-simon",
  "/showcase/bleach-dyed-bruce",
  "/showcase/outfit-wahid-theo-florent-by-paul",
  "/showcase/outfit-wahid-theo-simon-by-paul",
  "/showcase/florent-by-michele",
  "/showcase/florent-by-wouter",
  "/showcase/quilted-jersey-huey",
  "/showcase/anneke-huey-grey",
  "/showcase/simon-on-snook",
  "/showcase/brian-by-stefan-1",
  "/showcase/brian-by-stefan-2",
  "/showcase/brian-by-stefan-3",
  "/showcase/brian-by-stefan-4",
  "/showcase/fighter-hoodie",
  "/showcase/bulbasaur-huey",
  "/showcase/anneke-huey",
  "/showcase/purple-huey",
  "/showcase/french-terry-sven",
  "/showcase/blue-simon",
  "/showcase/wonder-warrior-jacket",
  "/showcase/liberty-trayvon",
  "/showcase/black-bruce",
  "/showcase/mark-wears-simon",
  "/showcase/red-theo",
  "/showcase/bruce-on-doll",
  "/showcase/red-button-simon",
  "/showcase/casual-pink-simon",
  "/showcase/aaron-by-joost",
  "/showcase/sven-nr3",
  "/showcase/sven-nr2",
  "/showcase/sven-nr1",
  "/showcase/corduroy-theo",
  "/showcase/yellow-button-simon",
  "/showcase/purple-bruce",
  "/showcase/pirate-bruce",
  "/showcase/green-wahid",
  "/showcase/tight-aaron",
  "/showcase/harry-and-bruce",
  "/showcase/sample-wahid",
  "/showcase/nani-hugo",
  "/showcase/black-hugo",
  "/showcase/husband-hugo",
  "/showcase/blue-theo",
  "/showcase/nsfw-bruce",
  "/showcase/linnen-theo"
];


describe('Showcase posts', function() {
  //before(function () {
  //  cy.visit('/showcase')
  //  cy.get('a[data-test=post-link]').each(($el, index, $list) => {
  //    posts.push($el.attr('href'))
  //  })
  //    cy.log(posts)
  //})
  //it('noop', function() { })

  for (let post of posts) {
      it(post, function() {
        if (1 || post === "/showcase/theo-by-theodore") {
          cy.visit(post)
          cy.get('h1').should('not.be.empty')
          cy.get('div[data-test=meta] > span').should('not.be.empty')
          cy.get('a[data-test=pattern]').should('not.be.empty')
          cy.get('a[data-test=author]').should('not.be.empty')
          cy.get('article img').should('have.attr', 'alt')
          cy.get('article img').each(($el, index, $list) => {
            if ($el.attr('src').slice(0,4) !== 'data') {
              cy.request($el.attr('src')).its('status').should('equal', 200)
            }
          })
        }
      })
  }
})
