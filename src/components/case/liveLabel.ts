import type { Project } from '../../types/project'

/** "Visit <label>" on the live-site buttons: the project's liveLabel, else the URL's host without "www.". */
export function liveLabel(project: Project): string {
  if (project.liveLabel) return project.liveLabel
  try {
    return new URL(project.liveUrl ?? '').hostname.replace(/^www\./, '')
  } catch {
    return project.liveUrl ?? ''
  }
}
