
import { Injectable } from '@angular/core';

function _window(): any {
   return window;
}

@Injectable()
export class NativeWindowService {
    getNativeWindow():any {
        return _window();
    }
}