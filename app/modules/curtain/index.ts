
import { NgModule } from "@angular/core";

import { Curtain, CurtainCont } from './curtain';

@NgModule({
    exports: [
        Curtain,
        CurtainCont
    ],
    declarations: [
        Curtain,
        CurtainCont
    ]
})

export class CurtainModule {}