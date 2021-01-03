import { measurements as allMeasurements } from '@freesewing/models'

const measurements = new Set()
allMeasurements.menswear.forEach((m) => measurements.add(m))
allMeasurements.womenswear.forEach((m) => measurements.add(m))

export function patternLeaf(pattern, translate) {
  return {
    title: pattern.name,
    slug: `/account/patterns/${pattern.handle}/`,
    offspring: {
      name: {
        title: translate('app.editThing', {
          thing: translate('app.name').toLowerCase()
        }),
        slug: `/account/patterns/${pattern.handle}/name/`,
        offspring: {}
      },
      notes: {
        title: translate('app.editThing', {
          thing: translate('app.notes').toLowerCase()
        }),
        slug: `/account/patterns/${pattern.handle}/notes/`,
        offspring: {}
      },
      edit: {
        title: translate('app.editThing', {
          thing: translate('app.pattern')
        }),
        slug: `/account/patterns/${pattern.handle}/edit/`,
        offspring: {}
      },
      export: {
        title: translate('app.exportPattern'),
        slug: `/account/patterns/${pattern.handle}/export/`,
        offspring: {}
      },
      share: {
        title: translate('app.shareThing', {
          thing: translate('app.pattern')
        }),
        slug: `/account/patterns/${pattern.handle}/share/`,
        offspring: {}
      },
      recreate: {
        title: translate('app.recreatePattern'),
        slug: `/recreate/${pattern.data.design}/from/${pattern.handle}/`,
        offspring: {}
      },
      'save-as': {
        title: translate('app.saveAsNewPattern'),
        slug: `/account/patterns/${pattern.handle}/save-as/`,
        offspring: {}
      },
      data: {
        title: 'YAML',
        slug: `/account/patterns/${pattern.handle}/data/`,
        offspring: {}
      },
      remove: {
        title: translate('app.removeThing', { thing: translate('app.pattern') }),
        slug: `/account/patterns/${pattern.handle}/remove/`,
        offspring: {}
      }
    }
  }
}

export function personLeaf(person, translate) {
  let order = {}
  for (let m of measurements) order[translate(`measurements.${m}`)] = m
  let mnodes = {}
  for (let title of Object.keys(order).sort()) {
    let m = order[title]
    mnodes[m] = {
      title,
      slug: `/account/people/${person.handle}/measurements/${m}/`,
      offspring: {}
    }
  }

  return {
    title: person.name,
    slug: `/account/people/${person.handle}/`,
    offspring: {
      name: {
        title: translate('app.editThing', {
          thing: translate('app.name').toLowerCase()
        }),
        slug: `/account/people/${person.handle}/name/`,
        offspring: {}
      },
      chest: {
        title: translate('app.editThing', {
          thing: translate('app.chest').toLowerCase()
        }),
        slug: `/account/people/${person.handle}/chest/`,
        offspring: {}
      },
      units: {
        title: translate('app.editThing', {
          thing: translate('account.units').toLowerCase()
        }),
        slug: `/account/people/${person.handle}/units/`,
        offspring: {}
      },
      avatar: {
        title: translate('app.editThing', {
          thing: translate('account.avatar').toLowerCase()
        }),
        slug: `/account/people/${person.handle}/avatar/`,
        offspring: {}
      },
      notes: {
        title: translate('app.editThing', {
          thing: translate('app.notes').toLowerCase()
        }),
        slug: `/account/people/${person.handle}/notes/`,
        offspring: {}
      },
      measurements: {
        title: translate('app.measurements'),
        slug: `/account/people/${person.handle}/measurements/`,
        offspring: mnodes
      }
    }
  }
}
