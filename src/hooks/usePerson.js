export default function usePerson(app, handle) {
  if (app.people[handle]) return app.people[handle]

  //  FIXME: Load person data from backand if user === admin
  return false
}
