const patterns = require('@freesewing/pattern-info').list
const options = require('@freesewing/pattern-info').options

const addDupe = (option, from, to) => {
  let slug = `/docs/patterns/${from}/options/${option.toLowerCase()}/`
  if (!patternOptions[slug]) patternOptions[slug] = { find: from, replace: [to] }
  else patternOptions[slug].replace.push(to)
}

// this will be populated by addDupe()
const patternOptions = {}

const dupes = {
  brian: [
    {
      options: [
        'sleevecapbackfactorx',
        'sleevecapbackfactory',
        'sleevecapease',
        'sleevecapfrontfactorx',
        'sleevecapfrontfactory',
        'sleevecapq1offset',
        'sleevecapq1spread1',
        'sleevecapq1spread2',
        'sleevecapq2offset',
        'sleevecapq2spread1',
        'sleevecapq2spread2',
        'sleevecapq3offset',
        'sleevecapq3spread1',
        'sleevecapq3spread2',
        'sleevecapq4offset',
        'sleevecapq4spread1',
        'sleevecapq4spread2',
        'sleevecaptopfactorx',
        'sleevecaptopfactory',
        'sleevewidthguarantee'
      ],
      to: ['huey', 'simon', 'simone', 'sven', 'diana']
    },
    {
      options: ['backneckcutout', 'frontarmholedeeper', 'shoulderslopereduction'],
      to: ['bent', 'carlita', 'carlton', 'huey', 'hugo', 'jaeger', 'simon', 'sven']
    },
    {
      options: ['sleevelengthbonus'],
      to: ['huey', 'hugo']
    },
    {
      options: ['sleevecapheight'],
      to: ['carlita', 'carlton', 'jaeger']
    },
    {
      options: ['acrossbackfactor'],
      to: ['bent', 'diana', 'huey', 'hugo']
    },
    {
      options: ['armholedepthfactor'],
      to: ['bent', 'huey', 'sven', 'wahid']
    },
    {
      options: ['acrossbackfactor'],
      to: ['bent', 'diana', 'huey', 'hugo']
    },
    {
      options: ['bicepsease'],
      to: ['bent', 'huey', 'hugo', 'jaeger']
    },
    {
      options: ['chestease', 'cuffease', 'lengthbonus'],
      to: ['bent', 'huey', 'hugo']
    },
    {
      options: ['collarease'],
      to: ['bent', 'huey', 'jaeger', 'sven']
    },
    {
      options: ['shoulderease'],
      to: ['bent', 'huey', 'jaeger', 'simon']
    }
  ],
  huey: [
    {
      options: ['ribbingheight'],
      to: ['hugo']
    }
  ],
  carlita: [
    {
      options: [
        'frontoverlap',
        'pocketradius',
        'innerpocketdepth',
        'innerpocketplacement',
        'innerpocketweltheight',
        'innerpocketwidth',
        'lapelreduction'
      ],
      to: ['carlton', 'jaeger']
    }
  ]
}

for (let from in dupes) {
  for (let set of dupes[from]) {
    for (let to of set.to) {
      for (let option of set.options) addDupe(option, from, to)
    }
  }
}

// Breanna inherits almost all options from Brian
for (let option of options.brian) {
  if (['lengthBonus', 'sleeveWidthGuarantee'].indexOf(option) === -1)
    addDupe(option, 'brian', 'breanna')
}

// Carton inherits almost all options from Carlita
for (let option of options.carlita) {
  if (option !== 'contour') addDupe(option, 'carlita', 'carlton')
}

// Simone inherits all options from Simon
for (let option of options.simon) addDupe(option, 'simon', 'simone')

const getDuplicates = () => {
  let dupes = {}
  for (let slug in patternOptions) {
    dupes[slug] = []
    for (let insert of patternOptions[slug].replace) {
      dupes[slug].push(slug.replace(patternOptions[slug].find, insert))
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
    '/login/callback/:confirmation/:validation': 'login/callback/_index.js',
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
