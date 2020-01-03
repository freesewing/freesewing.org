export default function usePattern(app, handle = false) {
  if (!handle) return false
  if (app.patterns[handle]) return app.patterns[handle]

  return app.loadPattern(handle)
}
