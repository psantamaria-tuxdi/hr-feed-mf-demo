// Types
export type Scheme = 'auto' | 'tw-dark' | 'tw-light';
export type Screens = { [key: string]: string };
export type Theme = 'theme-default' | string;
export type Themes = { id: string; name: string }[];

/**
 * AppConfig interface. Update this interface to strictly type your config
 * object.
 */
export interface FuseConfig {
    layout: string;
    scheme: Scheme;
    screens: Screens;
    theme: Theme;
    themes: Themes;
}
