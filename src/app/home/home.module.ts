import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryModule } from  'ng-gallery';
import {MatGridListModule} from '@angular/material/grid-list';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    GalleryModule,
    MatGridListModule
  ]
})
export class HomeModule { }
