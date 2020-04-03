import { withBreasts, withoutBreasts } from '@freesewing/models'

const sizes = {}
sizes['with-breasts'] = withBreasts
sizes['without-breasts'] = withoutBreasts

export default function usePerson(app, handle = false) {
  if (!handle) return false
  if (app.people[handle]) return app.people[handle]
  if (handle.slice(0, 5) === 'size-') {
    // Standard sizes
    let size = 'size' + handle.slice(5, 7)
    let build = handle.slice(8)
    if (typeof sizes[build][size] !== 'undefined') {
      let name =
        app.translate('app.size') +
        ` ${handle.slice(5, 7)}, ` +
        app.translate(build === 'with-breasts' ? 'app.withBreasts' : 'app.withoutBreasts')
      return {
        notAPerson: true,
        handle: name,
        name,
        measurements: sizes[build][size]
      }
    }
  }

  //  FIXME: Load person data from backend if user === admin
  return false
}
