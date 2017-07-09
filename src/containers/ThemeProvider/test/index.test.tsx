import * as React from 'react';
import { mount, shallow } from 'enzyme';
import ConnectedThemeProvider, { ThemeProvider } from '../index';
import { Provider } from 'react-redux';

const testComponent: React.SFC<any> = () =>
  <div />;

describe('<ThemeProvider />', () => {

  it('should render its children', () => {
    const children = (<h1>test</h1>);
    const renderedComponent = shallow(
      <ThemeProvider themeName='ThemeName'>
        {children}
      </ThemeProvider>
    );
    expect(renderedComponent.contains(children)).toBe(true);
  });
});
