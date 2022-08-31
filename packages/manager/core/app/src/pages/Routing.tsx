import React, { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router-dom';
import { Route } from 'use-react-router-breadcrumbs';

const Onboarding = React.lazy(() => import('./Onboarding'));
const Listing = React.lazy(() => import('./Listing'));
const Details = React.lazy(() => import('./Details'));
const NodesListing = React.lazy(() => import('./NodesListing'));
const NodeDetails = React.lazy(() => import('./NodeDetails'));
const NodeInterventions = React.lazy(() => import('./NodeInterventions'));
const NodeTasks = React.lazy(() => import('./NodeTasks'));
const Dashboard = React.lazy(() => import('./Dashboard'));

export default function Routing(): JSX.Element {
  const { t } = useTranslation('nutanix');
  return (
    <>
      <Route path="nutanix">
        <Route
          index
          breadcrumb={t('nutanix')}
          element={
            <Suspense fallback="">
              <Listing />
            </Suspense>
          }
        />
        <Route
          path="onboarding"
          element={
            <Suspense fallback="">
              <Onboarding />
            </Suspense>
          }
        />
        <Route path=":serviceId">
          <Route
            index
            element={
              <Suspense fallback="">
                <Details tabIndex={0}>
                  <Dashboard />
                </Details>
              </Suspense>
            }
          />
          <Route path="nodes">
            <Route
              index
              element={
                <Suspense fallback="">
                  <Details tabIndex={1}>
                    <NodesListing />
                  </Details>
                </Suspense>
              }
            />
            <Route
              path=":nodeId"
              element={
                <Suspense fallback="">
                  <NodeDetails />
                </Suspense>
              }
            >
              <Route index element={<span>Infos TODO</span>} />
              <Route
                path="interventions"
                element={
                  <Suspense fallback="">
                    <NodeInterventions />
                  </Suspense>
                }
              />
              <Route path="ipmi" element={<span>IPMI TODO</span>} />
              <Route
                path="tasks"
                element={
                  <Suspense fallback="">
                    <NodeTasks />
                  </Suspense>
                }
              />
            </Route>
          </Route>
        </Route>
      </Route>
      <Route index element={<Navigate to="/nutanix" replace={true} />} />
      <Route path="*" element={<div>404 page</div>} />
    </>
  );
}
