export type SVGNames =
    'login-header' |
    'comment' |
    'home-tab' |
    'group' |
    'search' |
    'conversation' | 
    'profile'|
    'forgot-password' |
    'quiz'

export interface ISVG {
    name: SVGNames;
    width?: number;
    height?: number;
    size?: number;
}