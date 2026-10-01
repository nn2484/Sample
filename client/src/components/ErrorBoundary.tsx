import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onReset) {
      this.props.onReset();
    } else {
      window.location.reload();
    }
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[300px] flex items-center justify-center p-6 bg-paper-50 rounded-2xl border border-paper-200 m-4">
          <div className="max-w-md text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-serif font-bold text-paper-900">
                {this.props.fallbackTitle || 'Something went wrong displaying this section'}
              </h2>
              <p className="text-xs text-paper-600 mt-1">
                A temporary data format or parsing issue occurred. You can restore the default verified data with one click.
              </p>
            </div>
            <button
              onClick={this.handleReset}
              className="inline-flex items-center gap-2 px-4 py-2 bg-navy-600 hover:bg-navy-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset & Reload View</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
