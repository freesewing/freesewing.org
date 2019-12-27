export default function useModel(app, handle) {
  if (app.models[handle]) return app.models[handle]

  //  FIXME: Load model data from backand if user === admin
  return false
}
