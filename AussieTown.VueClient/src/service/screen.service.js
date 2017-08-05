import { ScreenSize } from '../model/enum';
export var myValue = 'foo';
export function thisIsAStaticLikeFunction() {
    console.log('function called');
}
export function detectScreenSize(screen) {
    if (isDesktop(screen))
        return ScreenSize.Desktop;
    if (isTablet(screen))
        return ScreenSize.Tablet;
    if (isMobile(screen))
        return ScreenSize.Mobile;
    return null;
}
export function isDesktop(screen) {
    return screen.above('769px');
}
export function isTablet(screen) {
    return screen.above('415px') && screen.below('769px');
}
export function isMobile(screen) {
    return screen.below('414px');
}
