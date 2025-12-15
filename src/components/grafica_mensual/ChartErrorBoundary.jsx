import React from "react";

export default class ChartErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Error en Chart:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <p style={{ color: "red" }}>Error al cargar el gráfico</p>;
    }
    return this.props.children;
  }
}
