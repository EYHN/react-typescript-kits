import * as React from "React";
const style = require("./helloworld.scss");

export class Helloworld extends React.Component<undefined, undefined>{
  render() {
    return (
      <div>
        <h1 className={style.title}>Hello World!</h1>
      </div>
    )
  }
}