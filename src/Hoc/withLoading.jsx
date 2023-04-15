import React, { Component } from 'react';

const withLoading = (WrappedComponent) => {
  class WithLoading extends Component {
    state = {
      loading: true,
      data: null,
      error: null,
    };

    async componentDidMount() {
      try {
        const data = await this.props.fetchData();
        this.setState({
          loading: false,
          data,
        });
      } catch (error) {
        this.setState({
          loading: false,
          error,
        });
      }
    }

    render() {
      const { loading, data, error } = this.state;

      if (loading) {
        return <div>Loading...</div>;
      }

      if (error) {
        return <div>Error: {error.message}</div>;
      }

      return <WrappedComponent data={data} {...this.props} />;
    }
  }

  return WithLoading;
};

export default withLoading;