import LoadingIndicator from '../../components/LoadingIndicator';
const Loadable = require('react-loadable');

export default Loadable({
  loader: () => System.import('./index'),
  loading: LoadingIndicator,
});
