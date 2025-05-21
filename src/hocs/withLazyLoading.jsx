import React, { Suspense, lazy } from "react";
import netflix_spinner from "../assets/netflix_spinner.gif";

const Loader = () => (
  <div className="login-spinner">
    <img src={netflix_spinner} alt="" loading="lazy" />
  </div>
);

const withLazyLoading = (componentLoader, fallback = <Loader />) => {
  const LazyComponent = lazy(componentLoader);

  return (props) => (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

export default withLazyLoading;
