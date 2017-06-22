import * as React from 'react';
import { Helloworld } from './components/helloworld/helloworld';

interface AppState {
  postTitle: string[];
}

export class App extends React.Component<undefined, AppState> {
  public constructor() {
    super();
    this.state = {
      postTitle: []
    };
  }

  public async getPostTitle() {
    const res = await fetch('https://huaji8.top/api/posts.json');
    const posts = await res.json();
    return posts.data.map((post: any) => {
      return post.title;
    }) as string[];
  }

  public componentDidMount() {
    this.getPostTitle().then((postTitle) => {
      this.setState({
        ...this.state,
        postTitle
      });
    });
  }

  public render() {
    return (
      <div>
        {
          this.state.postTitle.map((title) => {
            return <p>{title}</p>;
          })
        }
      </div>
    );
  }
}
