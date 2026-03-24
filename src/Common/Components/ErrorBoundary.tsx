import { Component, ReactNode, ErrorInfo } from 'react'
import cn from 'classnames'

type Props = {
  children: ReactNode
  className?: string
  message: ReactNode | string
}

export class ErrorBoundary extends Component<Props> {
  state = {
    error: false,
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    })
  }

  render() {
    const { children, message, className } = this.props

    if (this.state.error) {
      return <div className={cn('text-red-600', className)}>{message}</div>
    }

    return children
  }
}
