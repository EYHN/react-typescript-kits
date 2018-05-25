import React from 'react';
import { css, withStyles, IThemeProps } from 'withStyles';
import { IWithStyleProps } from 'Interfaces/react-with-style';

const mapStyleToProps = ({ color }: IThemeProps) => ({
  title: {
    'color': color.text,
    'fontSize': '100px',
    'testAlign': 'center',
    'transition': 'color 300ms',
    'background-color': color.background
  }
});

@withStyles(mapStyleToProps)
export default class Helloworld extends React.PureComponent<IWithStyleProps<typeof mapStyleToProps>, undefined> {
  public render() {
    return (
      <div>
        <h1 {...css(this.props.styles.title)}>Hello World</h1>
      </div>
    );
  }
}
