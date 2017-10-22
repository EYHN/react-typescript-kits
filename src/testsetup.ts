require('raf').polyfill();

import { configure as enzymeConfigure } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

enzymeConfigure({ adapter: new Adapter() });
