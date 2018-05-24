

type Messages = Record<string, any>;

interface LanguageMessages {
  [key: string]: Messages;
}

declare module "translations/*.json" {
  const value: Record<string, string>;
  export default value;
}