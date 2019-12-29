const patterns = require('@freesewing/pattern-info').list
const options = require('@freesewing/pattern-info').options

const brianSleevecap = {
  find: 'brian',
  replace: ['huey', 'simon', 'simone', 'sven']
}

const patternOptions = {
  '/docs/patterns/brian/options/backneckcutout/': {
    find: 'brian',
    replace: ['bent', 'carlita', 'carlton', 'huey', 'hugo', 'jaeger', 'simon', 'sven']
  },
  '/docs/patterns/brian/options/frontarmholedeeper/': {
    find: 'brian',
    replace: ['carlita', 'carlton', 'huey', 'jaeger', 'simon', 'sven', 'bent']
  },
  '/docs/patterns/brian/options/shoulderslopereduction/': {
    find: 'brian',
    replace: ['carlita', 'carlton', 'simon', 'huey', 'bent']
  },
  '/docs/patterns/brian/options/sleevelengthbonus/': {
    find: 'brian',
    replace: ['huey', 'hugo']
  },
  '/docs/patterns/bent/options/sleevecapheight/': {
    find: 'bent',
    replace: ['carlita', 'carlton', 'jaeger']
  },
  '/docs/patterns/brian/options/acrossbackfactor/': {
    find: 'brian',
    replace: ['huey', 'hugo', 'bent']
  },
  '/docs/patterns/brian/options/armholedepthfactor/': {
    find: 'brian',
    replace: ['huey', 'sven', 'wahid', 'bent']
  },
  '/docs/patterns/brian/options/bicepsease/': {
    find: 'brian',
    replace: ['huey', 'hugo', 'jaeger', 'bent']
  },
  '/docs/patterns/brian/options/chestease/': {
    find: 'brian',
    replace: ['huey', 'hugo', 'bent']
  },
  '/docs/patterns/brian/options/collarease/': {
    find: 'brian',
    replace: ['huey', 'jaeger', 'sven', 'bent']
  },
  '/docs/patterns/brian/options/cuffease/': {
    find: 'brian',
    replace: ['huey', 'hugo', 'bent']
  },
  '/docs/patterns/brian/options/lengthbonus/': {
    find: 'brian',
    replace: ['huey', 'hugo', 'bent']
  },
  '/docs/patterns/brian/options/shoulderease/': {
    find: 'brian',
    replace: ['huey', 'jaeger', 'simon', 'bent']
  },
  '/docs/patterns/huey/options/ribbingheight/': {
    find: 'huey',
    replace: ['hugo']
  },
  '/docs/patterns/carlita/options/frontoverlap/': {
    find: 'carlita',
    replace: ['carlton', 'jaeger']
  },
  '/docs/patterns/carlita/options/pocketradius/': {
    find: 'carlita',
    replace: ['carlton', 'jaeger']
  },
  '/docs/patterns/carlita/options/innerpocketdepth/': {
    find: 'carlita',
    replace: ['carlton', 'jaeger']
  },
  '/docs/patterns/carlita/options/innerpocketplacement/': {
    find: 'carlita',
    replace: ['carlton', 'jaeger']
  },
  '/docs/patterns/carlita/options/innerpocketweltheight/': {
    find: 'carlita',
    replace: ['carlton', 'jaeger']
  },
  '/docs/patterns/carlita/options/innerpocketwidth/': {
    find: 'carlita',
    replace: ['carlton', 'jaeger']
  },
  '/docs/patterns/carlita/options/lapelreduction/': {
    find: 'carlita',
    replace: ['carlton', 'jaeger']
  },
  // Brian sleevecap options are available in multiple patterns
  '/docs/patterns/brian/options/sleevecapbackfactorx/': brianSleevecap,
  '/docs/patterns/brian/options/sleevecapbackfactory/': brianSleevecap,
  '/docs/patterns/brian/options/sleevecapease/': brianSleevecap,
  '/docs/patterns/brian/options/sleevecapfrontfactorx/': brianSleevecap,
  '/docs/patterns/brian/options/sleevecapfrontfactory/': brianSleevecap,
  '/docs/patterns/brian/options/sleevecapq1offset/': brianSleevecap,
  '/docs/patterns/brian/options/sleevecapq1spread1/': brianSleevecap,
  '/docs/patterns/brian/options/sleevecapq1spread2/': brianSleevecap,
  '/docs/patterns/brian/options/sleevecapq2offset/': brianSleevecap,
  '/docs/patterns/brian/options/sleevecapq2spread1/': brianSleevecap,
  '/docs/patterns/brian/options/sleevecapq2spread2/': brianSleevecap,
  '/docs/patterns/brian/options/sleevecapq3offset/': brianSleevecap,
  '/docs/patterns/brian/options/sleevecapq3spread1/': brianSleevecap,
  '/docs/patterns/brian/options/sleevecapq3spread2/': brianSleevecap,
  '/docs/patterns/brian/options/sleevecapq4offset/': brianSleevecap,
  '/docs/patterns/brian/options/sleevecapq4spread1/': brianSleevecap,
  '/docs/patterns/brian/options/sleevecapq4spread2/': brianSleevecap,
  '/docs/patterns/brian/options/sleevecaptopfactorx/': brianSleevecap,
  '/docs/patterns/brian/options/sleevecaptopfactory/': brianSleevecap,
  '/docs/patterns/brian/options/sleevewidthguarantee/': brianSleevecap
}
// Carton inherits (almost) all options from Carlita
for (let option of options.carlita) {
  if (option !== 'contour') {
    patternOptions['/docs/patterns/carlita/options/' + option.toLowerCase() + '/'] = {
      find: 'carlita',
      replace: ['carlton']
    }
  }
}

// Simone inherits all options from Simon
for (let option of options.simon) {
  patternOptions['/docs/patterns/simon/options/' + option.toLowerCase() + '/'] = {
    find: 'simon',
    replace: ['simone']
  }
}

const placeholderPages = {
  '/docs/patterns/aaron/options/': {
    // This happens to be an empty page so we'll copy it
    find: '/docs/patterns/aaron/options/',
    replace: []
  }
}
for (let pattern of patterns) {
  placeholderPages['/docs/patterns/aaron/options/'].replace.push(
    `/docs/patterns/${pattern}/measurements/`
  )
}

const getDuplicates = () => {
  let dupes = {}
  for (let slug in patternOptions) {
    dupes[slug] = []
    for (let insert of patternOptions[slug].replace) {
      dupes[slug].push(slug.replace(patternOptions[slug].find, insert))
    }
  }
  for (let slug in placeholderPages) {
    dupes[slug] = []
    for (let insert of placeholderPages[slug].replace) {
      dupes[slug].push(slug.replace(placeholderPages[slug].find, insert))
    }
  }

  return dupes
}

/* This matches a route pattern with the page component */
const routes = {
  perDesign: {
    // _design in the route will be replaced with the design name
    single: {
      '/designs/_design/': 'designs/_design.js',
      '/showcase/designs/_design/': 'showcase/designs/_design.js',
      '/create/_design/': 'create/_design/index.js',
      '/recreate/_design/': 'create/_design/index.js',
      '/recreate/_design/from/': 'create/_design/index.js'
    },
    multiple: {
      '/create/_design/for/:person': 'create/_design/for/_person.js',
      '/recreate/_design/from/:pattern': 'recreate/_design/from/_pattern/index.js',
      '/recreate/_design/from/:pattern/for': 'recreate/_design/from/_pattern/index.js',
      '/recreate/_design/from/:pattern/for/:person': 'recreate/_design/from/_pattern/for/_person.js'
    }
  },
  perMeasurement: {
    multiple: {
      '/people/:person/measurements/_measurement': 'people/_person/measurements/_measurement.js'
    }
  },
  dynamic: {
    '/login/callback/:validation/:confirmation': 'login/callback/_index.js',
    '/patterns/:pattern': 'patterns/_pattern/index.js',
    '/patterns/:pattern/edit': 'patterns/_pattern/edit.js',
    '/people/:person/': 'people/_person/index.js',
    '/people/:person/avatar/': 'people/_person/avatar.js',
    '/people/:person/name/': 'people/_person/name.js',
    '/people/:person/notes/': 'people/_person/notes.js',
    '/users/:user': 'users/_user.js',
    '/confirm/signup/:confirmation': 'confirm/signup/_confirmation.js',
    '/confirm/email/:confirmation': 'confirm/email/_confirmation.js',
    '/confirm/reset/:confirmation': 'confirm/reset/_confirmation.js'
  },
  duplicates: getDuplicates(),
  redirects: {
    '/contact/': '/docs/about/contact/',
    '/faq/': '/docs/about/faq/',
    '/share/': '/docs/about/share/',
    '/pledge/': '/docs/about/pledge/',
    '/privary/': '/docs/about/privacy/',
    '/rights/': '/docs/about/rights/'
  }
}

for (let pattern of patterns) routes.redirects[`/patterns/${pattern}`] = `/designs/${pattern}/` // Old URL structure

module.exports = routes
