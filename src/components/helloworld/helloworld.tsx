import * as React from 'react';
const style = require('./helloworld.scss');

export class Helloworld extends React.Component<undefined, undefined> {
  public render() {
    return (
      <div>
        <h1 className={style.title + ' title'}>Hello World!</h1>
        <style jsx>{`
          .title {
            font-size: 100px
          }
        `}</style>
      </div>
    );
  }
}
