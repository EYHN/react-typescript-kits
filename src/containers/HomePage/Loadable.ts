import LoadingIndicator from '../../components/LoadingIndicator';
const Loadable = require('react-loadable');

export default Loadable({
  loader: () => import('./index'),
  loading: LoadingIndicator
});
