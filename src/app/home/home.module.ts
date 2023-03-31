import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryModule } from  'ng-gallery';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    GalleryModule,
    MatGridListModule,
    MatCardModule
  ]
})
export class HomeModule { }
