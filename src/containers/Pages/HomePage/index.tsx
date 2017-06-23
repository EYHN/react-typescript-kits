import { returntypeof } from 'react-redux-typescript';
import { createSelector } from 'reselect';
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import Helloworld from '../../../components/helloworld/index';

interface IHomePageProps extends RouteComponentProps<{}> {
}

const mapStateToProps = () => {
  return {};
};

const stateProps = returntypeof(mapStateToProps);

type Props = typeof stateProps & IHomePageProps;

class HomePage extends React.PureComponent<Props, undefined> {
  public render() {
    return (
      <div>
        <Helloworld />
      </div>
    );
  }
}

export default connect<typeof stateProps, {}, IHomePageProps>(mapStateToProps, {})(HomePage);
