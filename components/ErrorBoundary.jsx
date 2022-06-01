import { Component } from 'react'
import Router, { withRouter } from 'next/router'
class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    console.log('getDerivedStateFromError error', error)

    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.log('window', window)
    // You can also log the error to an error reporting service

    console.log('error-componentDidCatch', error, errorInfo)
  }

  componentDidMount() {
    if (this.state.hasError && window !== 'undefined') {
      Router.reload(window.location.pathname)
      this.setState({
        hasError: false,
      })
    }
  }

  render() {
    if (this.state.hasError) {
      // Router.reload(window.location.pathname)

      // You can render any custom fallback UI
      return <>An error just occured</>
    }

    return this.props.children
  }
}

export default withRouter(ErrorBoundary)
