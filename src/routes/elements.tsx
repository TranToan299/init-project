import { Suspense, lazy, ElementType } from 'react';


// ----------------------------------------------------------------------

const Loadable = (Component: ElementType) => (props: any) =>
  (
    <Suspense fallback={<div>Loading...</div>}>
      <Component {...props} />
    </Suspense>
  );


// MAIN

export const HomePage = Loadable(lazy(() => import('../pages/HomePage')));
export const LogInPage = Loadable(lazy(() => import('../pages/LogInPage')));

