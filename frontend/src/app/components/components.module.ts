import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {NouisliderModule} from 'ng2-nouislider';
import {JwBootstrapSwitchNg2Module} from 'jw-bootstrap-switch-ng2';
import {RouterModule} from '@angular/router';

import {BasicelementsComponent} from './basicelements/basicelements.component';
import {ComponentsComponent} from './components.component';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {NgxSpinnerModule} from 'ngx-spinner';
import {MatTabsModule} from '@angular/material/tabs';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        NouisliderModule,
        RouterModule,
        JwBootstrapSwitchNg2Module,
        NgxDatatableModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatButtonModule,
        MatSelectModule,
        NgxSpinnerModule,
        MatTabsModule
    ],
    declarations: [
        ComponentsComponent,
        BasicelementsComponent,
    ],
    entryComponents: [],
    exports: [ComponentsComponent]
})
export class ComponentsModule {
}
