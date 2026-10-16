import { resolveRoute } from './routes'

export default function App({ path }: { path: string }) {
  const { Page } = resolveRoute(path)
  return <Page />
}
