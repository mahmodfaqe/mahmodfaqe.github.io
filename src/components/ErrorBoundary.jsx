import { Component } from "react";
import "../styles/SoftPage.css";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Portfolio UI error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="soft-page">
          <div className="soft-page-card">
            <h1>Something went wrong</h1>
            <p>Refresh the page, or go home.</p>
            <p lang="ckb" dir="rtl">هەڵەیەک ڕوویدا. لاپەڕەکە نوێ بکەرەوە یان بگەڕێوە بۆ سەرەتا.</p>
            <button type="button" className="btn btn-primary-modern" onClick={() => window.location.assign("/")}>
              Home / سەرەتا
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
