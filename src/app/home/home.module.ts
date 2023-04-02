import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryModule } from  'ng-gallery';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { NgIf } from '@angular/common';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    GalleryModule,
    MatGridListModule,
    MatCardModule,
    NgbCarouselModule,
    NgIf
    
  ]
})
export class HomeModule { }
