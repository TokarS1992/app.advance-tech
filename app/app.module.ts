import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';
import { FormsModule} from '@angular/forms';

// Main Component
import { AppComponent }  from './app.component';

// Pages
import { HomeComponent } from "./components/home/home.component";
import { AboutComponent } from "./components/about/about.component";
import { ServiceComponent } from "./components/service/service.component";
import { ContactsComponent } from "./components/contacts/contacts.component";
import { App404 } from './components/404/404.component';

// Route
import { routing } from "./routes";

// Home components
import { JquerySlider } from './components/home/slider/jquery-slider.component';
import { JqueryElement, Tabs } from './components/home/smoothScroll/jquery.component';

// Modules
import { ModalModule } from './modules/modal/index';
import { DirectiveModule } from './directives/directive.module';
import { CurtainModule } from './modules/curtain/index';
import { SliderModule } from './modules/slider/index';

// Other component
import { FormComponent } from "./components/contacts/form.component";
import { MapComponent } from "./components/contacts/map.component";

//Translate Service
import { TranslateService } from './translate/translate.service';
import {TRANSLATION_PROVIDERS} from './translate/translations';
import { TranslatePipe  } from  './translate/translate.pipe';
import {TranslateComponent} from "./components/translate/translate.component";

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        JsonpModule,
        routing,
        FormsModule,
        ModalModule,
        CurtainModule,
        DirectiveModule,
        SliderModule
    ],
    declarations: [
        AppComponent,
        AboutComponent,
        ServiceComponent,
        HomeComponent,
        ContactsComponent,
        App404,
        JqueryElement, Tabs,
        JquerySlider,
        FormComponent,
        MapComponent,
        TranslatePipe,
        TranslateComponent
    ],
    providers: [TRANSLATION_PROVIDERS,TranslateService],
    bootstrap: [ AppComponent ]
})
export class AppModule {}
