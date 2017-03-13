import * as React from 'react';
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Helloworld } from './components/helloworld/helloworld';

interface AppState {
}

export class App extends React.Component<undefined, AppState>{
  constructor() {
    super();
    this.state = {
      content: undefined
    }
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <Helloworld/>
        {
          this.props.children
        }
      </div>
    )
  }
}