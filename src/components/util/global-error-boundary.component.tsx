import React from "react";
import errorService from "../../services/error.service";
import tukanIcon from "../../images/tukan.png";

interface IErrorBoundaryProps {}

interface IErrorBoundaryState {
  hasError: boolean;
}

export default class ErrorBoundary extends React.Component<
  IErrorBoundaryProps,
  IErrorBoundaryState
> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    const jsonError: string = JSON.stringify(error);
    const jsonErrorInfo: string = JSON.stringify(errorInfo);
    errorService.logError(jsonError, jsonErrorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="no-match-page">
          <img src={tukanIcon} alt="icon"></img>
          <h1 className="no-match-page__title"> błąd - i po ptokach ... </h1>
          <h2 className="no-match-page__subtitle">
            prosimy o cierpliwość, nasze najlepsze tukany już nad tym pracują ...
          </h2>
        </div>
      );
    }

    return this.props.children;
  }
}
