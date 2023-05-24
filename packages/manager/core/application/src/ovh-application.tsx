import { useEffect, useState, Suspense } from 'react';
import { ApplicationId } from '@ovh-ux/manager-config';
import OvhContext, { initOvhContext, OvhContextType } from './ovh-context';

export function OvhApplication({
  name,
  children,
  context,
}: {
  name: ApplicationId;
  children: JSX.Element;
  context: OvhContextType;
}): JSX.Element {
  useEffect(() => {
    console.info('******************%*%*%*%**%*%*%*%*%*%*%*%*');
    console.info('entre dans le ovh application useEffect init !');
    console.info('name : ', name);
  }, []);

  return (
    <OvhContext.Provider value={context}>
      {context && <Suspense fallback={null}>{children}</Suspense>}
    </OvhContext.Provider>
  );
}

export default OvhApplication;
