import React from 'react';
import { shallow, mount } from 'enzyme';
import { defineMessages, FormattedMessage } from 'react-intl';
import ConnectedLanguageProvider, { LanguageProvider } from '../index';
import configureStore from '../../../store';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { IStore } from 'Interfaces/store';
import { changeLocale, localeLoaded } from '../actions';

const messages = defineMessages({
  someMessage: {
    id: 'some.id',
    defaultMessage: 'This is some default message',
    en: 'This is some en message'
  }
});

describe('<LanguageProvider />', () => {
  it('should render its children', () => {
    const children = (<h1>Test</h1>);
    const renderedComponent = shallow(
      <LanguageProvider messages={messages} locale='en'>
        {children}
      </LanguageProvider>
    );
    expect(renderedComponent.contains(children)).toBe(true);
  });

  it('should not render children if the language is not set', () => {
    const children = (<h1>Test</h1>);
    const renderedComponent = shallow(
      <LanguageProvider messages={messages} locale={null}>
        {children}
      </LanguageProvider>
    );
    expect(renderedComponent.contains(children)).toBe(false);
  });
});

describe('<ConnectedLanguageProvider />', () => {
  let store: IStore;

  it('should not render children if the language is not set', () => {
    store = configureStore({}, createHistory());
    const renderedComponent = mount(
      <Provider store={store}>
        <ConnectedLanguageProvider>
          <FormattedMessage {...messages.someMessage} />
        </ConnectedLanguageProvider>
      </Provider>
    );
    expect(renderedComponent.contains(<FormattedMessage {...messages.someMessage} />)).toBe(false);
  });

  it('should render the language messages', () => {
    store = configureStore({}, createHistory());
    const renderedComponent = mount(
      <Provider store={store}>
        <ConnectedLanguageProvider>
          <FormattedMessage {...messages.someMessage} />
        </ConnectedLanguageProvider>
      </Provider>
    );
    store.dispatch(localeLoaded({languageLocale: 'en', translationMessages: messages}));
    expect(renderedComponent.contains(<FormattedMessage {...messages.someMessage} />)).toBe(false);
  });
});
