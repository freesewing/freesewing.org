export default function usePattern(app, handle) {
  if (app.patterns[handle]) return app.patterns[handle]

  return app.loadPattern(handle)
}
