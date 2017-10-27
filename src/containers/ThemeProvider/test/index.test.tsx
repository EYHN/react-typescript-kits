import React from 'react';
import { mount, shallow } from 'enzyme';
import ConnectedThemeProvider, { ThemeProvider } from '../index';
import { Provider } from 'react-redux';
import configureStore from 'store';
import createHistory from 'history/createBrowserHistory';
import { withStyles, appThemes } from 'withStyles';
import { IWithStyleProps } from 'Interfaces/react-with-style';
import { DEFAULT_THEMENAME } from 'containers/App/constants';

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

describe('<ConnectedThemeProvider />', () => {
  let store: any;

  beforeAll(() => {
    store = configureStore({}, createHistory());
  });

  it('should render the default theme style', () => {
    const TestComponent: React.SFC<IWithStyleProps> = (props) => {
      expect(props.theme).toEqual(appThemes[DEFAULT_THEMENAME]);
      expect(props.styles).toBeDefined();
      return <div>test</div>;
    };
    const TestComponentWithStyles = withStyles((theme) => theme)(TestComponent);
    const renderedComponent = mount(
      <Provider store={store}>
        <ConnectedThemeProvider>
          <TestComponentWithStyles />
        </ConnectedThemeProvider>
      </Provider>
    );
    expect(renderedComponent.contains(<TestComponentWithStyles />)).toBe(true);
  });
});
