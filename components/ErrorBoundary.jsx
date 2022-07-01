import { ErrorBoundary } from 'react-error-boundary'

// import ReloadPage from '@/components/ReloadPage'
import ReloadLayout from '@/components/ReloadLayout'

export default function ErrorBoundaryWrapper({ children }) {
  return (
    <ErrorBoundary FallbackComponent={ReloadLayout}>{children}</ErrorBoundary>
  )
}
