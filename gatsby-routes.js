const patterns = require('@freesewing/pattern-info').list

/* This matches a route pattern with the page component */
const routes = {
  perDesign: {
    // _design in the route will be replaced with the design name
    single: {
      '/designs/_design/': 'designs/_design.js',
      '/showcase/designs/_design/': 'showcase/designs/_design.js',
      '/create/_design/': 'create/_design/index.js',
      '/recreate/_design/': 'create/_design/index.js',
      '/recreate/_design/from/': 'create/_design/index.js',
    },
    multiple: {
      '/create/_design/for/:person': 'create/_design/for/_person.js',
      '/recreate/_design/from/:pattern': 'recreate/_design/from/_pattern/index.js',
      '/recreate/_design/from/:pattern/for': 'recreate/_design/from/_pattern/index.js',
      '/recreate/_design/from/:pattern/for/:person':
        'recreate/_design/from/_pattern/for/_person.js',
    },
  },
  perMeasurement: {
    multiple: {
      '/account/people/:person/measurements/_measurement':
        'account/people/_person/measurements/_measurement.js',
    },
  },
  dynamic: {
    '/login/callback/:confirmation/:validation': 'login/callback/_index.js',
    '/account/patterns/:pattern': 'account/patterns/_pattern/index.js',
    '/account/patterns/:pattern/data': 'account/patterns/_pattern/data.js',
    '/account/patterns/:pattern/edit': 'account/patterns/_pattern/edit.js',
    '/account/patterns/:pattern/export': 'account/patterns/_pattern/export.js',
    '/account/patterns/:pattern/name': 'account/patterns/_pattern/name.js',
    '/account/patterns/:pattern/notes': 'account/patterns/_pattern/notes.js',
    '/account/patterns/:pattern/remove': 'account/patterns/_pattern/remove.js',
    '/account/patterns/:pattern/save-as': 'account/patterns/_pattern/save-as.js',
    '/account/patterns/:pattern/share': 'account/patterns/_pattern/share.js',
    '/account/people/:person/': 'account/people/_person/index.js',
    '/account/people/:person/avatar/': 'account/people/_person/avatar.js',
    '/account/people/:person/chest/': 'account/people/_person/chest.js',
    '/account/people/:person/measurements/': 'account/people/_person/measurements/index.js',
    '/account/people/:person/name/': 'account/people/_person/name.js',
    '/account/people/:person/notes/': 'account/people/_person/notes.js',
    '/account/people/:person/remove/': 'account/people/_person/remove.js',
    '/account/people/:person/units/': 'account/people/_person/units.js',
    '/users/:user': 'users/_user.js',
    '/confirm/signup/:confirmation': 'confirm/signup/_confirmation.js',
    '/confirm/email/:confirmation': 'confirm/email/_confirmation.js',
    '/confirm/reset/:confirmation': 'confirm/reset/_confirmation.js',
    '/patterns/:pattern': 'patterns/_pattern/index.js',
    '/patterns/:pattern/edit': 'patterns/_pattern/edit.js',
    '/patterns/:pattern/export': 'patterns/_pattern/export.js',
    '/patterns/:pattern/save-as': 'patterns/_pattern/save-as.js',
    '/recreate/gist/:gist': 'recreate/gist/_gist.js',
  },
  redirects: {
    '/recreate/': '/create/',
    '/contact/': '/docs/about/contact/',
    '/faq/': '/docs/about/faq/',
    '/share/': '/docs/about/share/',
    '/pledge/': '/docs/about/pledge/',
    '/privary/': '/docs/about/privacy/',
    '/rights/': '/docs/about/rights/',
    '/designs/fu/': '/designs/florence/',
    '/docs/patterns/fu/': '/docs/patterns/florence/',
    '/people/': '/account/people/',
    '/patterns/': '/designs/',
    '/patrons/join/': '/community/join/',
    '/patrons/thanks/': '/thanks/',
  },
}

for (let pattern of patterns) routes.redirects[`/patterns/${pattern}`] = `/designs/${pattern}/` // Old URL structure

module.exports = routes
