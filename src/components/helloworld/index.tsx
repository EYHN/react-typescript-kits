import * as React from 'react';
const style = require('./helloworld.scss');
import { FormattedMessage } from 'react-intl';
import messages from './messages';

export default class Helloworld extends React.Component<undefined, undefined> {
  public render() {
    return (
      <div>
        <h1 className={style.title + ' title'}><FormattedMessage {...messages.startProjectHeader} /></h1>
        <style jsx>{`
          .title {
            font-size: 100px
          }
        `}</style>
      </div>
    );
  }
}
