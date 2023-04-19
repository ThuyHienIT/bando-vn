import React, { ErrorInfo } from 'react';

export class ErrorBoundary extends React.Component<{
  children: React.ReactNode;
}> {
  state = {
    error: null,
  };

  static getDerivedStateFromError(error: string) {
    // Update state so next render shows fallback UI.
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Log the error to an error reporting service
    // logErrorToExampleService(error, info);
  }

  render() {
    if (this.state.error) {
      // You can render any custom fallback UI
      return <p>Something broke</p>;
    }
    return this.props.children;
  }
}
