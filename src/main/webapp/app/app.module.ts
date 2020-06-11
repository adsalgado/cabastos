import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { CabastosSharedModule } from 'app/shared/shared.module';
import { CabastosCoreModule } from 'app/core/core.module';
import { CabastosAppRoutingModule } from './app-routing.module';
import { CabastosHomeModule } from './home/home.module';
import { CabastosEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ActiveMenuDirective } from './layouts/navbar/active-menu.directive';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    CabastosSharedModule,
    CabastosCoreModule,
    CabastosHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    CabastosEntityModule,
    CabastosAppRoutingModule,
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, ActiveMenuDirective, FooterComponent],
  bootstrap: [MainComponent],
})
export class CabastosAppModule {}
