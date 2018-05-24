import LoadingIndicator from '../../components/LoadingIndicator';
import { asyncComponent } from 'react-async-component';

export default asyncComponent({
  resolve: () => import(/* webpackChunkName: "home" */ './index'),
  LoadingComponent: LoadingIndicator
});
