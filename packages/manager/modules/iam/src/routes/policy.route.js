import { policy as component } from '@iam/components';

export default {
  component,
  name: 'policy',
  redirectTo: (transition) => {
    return transition.injector().get('IAMRoutes').POLICIES;
  },
  url: '/policy',
};
