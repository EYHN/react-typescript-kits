import { IThemeProps } from 'withStyles';
import { $Call } from 'utility-types';

export interface IWithStyleProps<T extends (s: IThemeProps) => object> {
  styles?: Record<keyof $Call<T>, any>;
  theme?: IThemeProps;
}
