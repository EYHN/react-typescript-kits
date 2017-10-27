
import { configure as enzymeConfigure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

enzymeConfigure({ adapter: new Adapter() });
