
import { createSelector } from 'reselect';
import React from 'react';
import { Dispatch, compose } from 'redux';
import { connect } from 'react-redux';
import Helloworld from 'components/helloworld/index';
import { loadHitokoto } from 'containers/HomePage/actions';
import reducer from './reducer';
import saga from './saga';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { makeSelectHitokoto } from 'containers/HomePage/selectors';
import { $Call } from 'utility-types';
import { ONCE_TILL_UNMOUNT } from 'utils/constants';

interface IHomePageProps {
}

const mapStateToProps = createSelector(
  makeSelectHitokoto(),
  (hitokoto) => ({ hitokoto })
);

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  onGetHitokoto: () => (dispatch(loadHitokoto()))
});

type stateProps = $Call<typeof mapStateToProps>;
type dispatchProps = $Call<typeof mapDispatchToProps>;

type Props = stateProps & IHomePageProps & dispatchProps;

export class HomePage extends React.PureComponent<Props, undefined> {

  public render() {
    return (
      <div>
        <Helloworld />
        <p>{this.props.hitokoto}</p>
      </div>
    );
  }
}

// tslint:disable-next-line:max-line-length
const withConnect = connect<stateProps, dispatchProps, IHomePageProps>(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga, mode: ONCE_TILL_UNMOUNT });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(HomePage);
