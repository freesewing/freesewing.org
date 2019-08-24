// FIXME: This should obviously be handled in logic,
// but doing so makes it hard to run a test per post :|
const posts = [
  "/blog/roundup-2019-01",
  "/blog/lets-meet-up-in-2019",
  "/blog/roundup-2018-10",
  "/blog/roundup-2018-11",
  "/blog/roundup-2018-09",
  "/blog/announcing-shin",
  "/blog/announcing-freesewing-library",
  "/blog/announcing-sandy",
  "/blog/roundup-2018-07",
  "/blog/roundup-2018-06",
  "/blog/announcing-penelope",
  "/blog/roundup-2018-05",
  "/blog/gdpr-ready",
  "/blog/roundup-2018-04",
  "/blog/roundup-2018-03",
  "/blog/core-1-8-jaeger-across-back",
  "/blog/roundup-2018-02",
  "/blog/gdpr-plan",
  "/blog/roundup-2018-01",
  "/blog/announcing-carlita",
  "/blog/core-v1-3-0-is-out",
  "/blog/roundup-2017-12",
  "/blog/announcing-carlton-and-bent",
  "/blog/calling-all-patrons",
  "/blog/florent-flat-cap-beta",
  "/blog/roundup-2017-11",
  "/blog/benjamin-bow-tie-beta",
  "/blog/roundup-2017-10",
  "/blog/huey-hoodie-beta",
  "/blog/roundup-2017-09",
  "/blog/email-spam-problems",
  "/blog/the-refashioners-2017",
  "/blog/open-for-business",
  "/blog/announcing-sven",
  "/blog/privacy-choices",
  "/blog/freesewing-goes-jamstack",
  "/blog/announcing-freesewing"
];


describe('Blog posts', function() {
  //before(function () {
  //  cy.visit('/blog')
  //  cy.get('a[data-test=post-link]').each(($el, index, $list) => {
  //    posts.push($el.attr('href'))
  //  })
  //    cy.log(posts)
  //})
  //it('noop', function() { })

  for (let post of posts) {
    it(post, function() {
      if (0 || post === "/blog/roundup-2017-09") {
        cy.visit(post)
        cy.get('h1').should('not.be.empty')
        cy.get('div[data-test=meta] > span').should('not.be.empty')
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
