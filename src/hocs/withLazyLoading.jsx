import React, { Suspense, lazy } from "react";

const withLazyLoading = (componentLoader, fallback = <div>Loading...</div>) => {
  const LazyComponent = lazy(componentLoader);

  return (props) => (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

export default withLazyLoading;
