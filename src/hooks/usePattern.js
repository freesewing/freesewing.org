export default function usePattern(app, handle) {
  if (app.patterns[handle]) return app.patterns[handle]

  // FIXME: Load pattern from backend
  return false
}
