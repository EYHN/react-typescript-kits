import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

export default class Helloworld extends React.Component<undefined, undefined> {
  public render() {
    return (
      <div>
        <h1 className={'title'}><FormattedMessage {...messages.startProjectHeader} /></h1>
        <style jsx>{`
          .title {
            font-size: 100px;
            text-align: center;
            color: #F00;
          }
        `}</style>
      </div>
    );
  }
}
