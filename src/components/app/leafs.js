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
        title: translate('app.printPattern') + ' / ' + translate('app.exportPattern'),
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
