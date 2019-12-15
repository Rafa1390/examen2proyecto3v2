import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { Examen2Proyecto3V2SharedModule } from 'app/shared/shared.module';
import { Examen2Proyecto3V2CoreModule } from 'app/core/core.module';
import { Examen2Proyecto3V2AppRoutingModule } from './app-routing.module';
import { Examen2Proyecto3V2HomeModule } from './home/home.module';
import { Examen2Proyecto3V2EntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { JhiMainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    Examen2Proyecto3V2SharedModule,
    Examen2Proyecto3V2CoreModule,
    Examen2Proyecto3V2HomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    Examen2Proyecto3V2EntityModule,
    Examen2Proyecto3V2AppRoutingModule
  ],
  declarations: [JhiMainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [JhiMainComponent]
})
export class Examen2Proyecto3V2AppModule {}
