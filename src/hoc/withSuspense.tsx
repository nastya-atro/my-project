import React from 'react';
import { Suspense } from 'react';

export function withSuspense<WCP> (Component:React.ComponentType<WCP>){
  return (props:WCP) => {
    return <Suspense fallback={<div>Загрузка...</div>}>
      <Component {...props} />
    </Suspense>
  }
}

