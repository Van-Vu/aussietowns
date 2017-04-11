import { Injectable } from '@angular/core';

function getWindow(): any {
    return window;
}

export enum BreakPoints {
    MediumModeScreenWidth = 737,
    DesktopModeScreenWidth = 1201
}

export enum DeviceMode {
    Mobile,
    Medium,
    Desktop
}

@Injectable()
export class DeviceDetectionService {
    get nativeWindow(): any {
        return getWindow();
    }

    getCurrentMode() {
        let size = this.nativeWindow.innerWidth;

        if (size >= BreakPoints.DesktopModeScreenWidth) {
            return DeviceMode.Desktop;
        } else if (size >= BreakPoints.MediumModeScreenWidth) {
            return DeviceMode.Medium;
        }
        return DeviceMode.Mobile;
    }

    isScrollOverHalfPage() {
        let height = this.nativeWindow.innerHeight / 2;
        let scrollY = this.nativeWindow.scrollY;

        if (scrollY >= height) {
            return true;
        }

        return false;
    }
}