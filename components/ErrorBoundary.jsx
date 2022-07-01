import { ErrorBoundary } from 'react-error-boundary'

import ReloadPage from '@/components/ReloadPage'

export default function ErrorBoundaryWrapper({ children }) {
  return (
    <ErrorBoundary FallbackComponent={ReloadPage}>{children}</ErrorBoundary>
  )
}
