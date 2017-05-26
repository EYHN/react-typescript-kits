import * as React from 'react';
import { Helloworld } from './components/helloworld/helloworld';

interface AppState {
}

export class App extends React.Component<undefined, AppState> {
  public constructor() {
    super();
    this.state = {
      content: undefined
    };
  }

  public render() {
    return (
      <div>
        <Helloworld />
        {
          this.props.children
        }
      </div>
    );
  }
}
