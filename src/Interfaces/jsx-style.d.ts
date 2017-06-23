import 'react';

declare module 'react' {
  interface HTMLProps<T> {
    jsx?: boolean;
    global?: boolean;
  }
}
