import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LongTermComponent  } from "./long-term/long-term.component";
import { ShortTermComponent } from "./short-term/short-term.component";
import {MatNativeDateModule,MatButtonModule, MatCheckboxModule,MatFormFieldModule,} from '@angular/material';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatRadioModule} from '@angular/material/radio';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
export const routes = [
    { path:'', redirectTo:'LongTerm', pathMatch:'full' },
  { path: 'LongTerm', component: LongTermComponent, pathMatch: 'full' },
  { path: 'ShortTerm', component: ShortTermComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    MatButtonModule, MatCheckboxModule,MatExpansionModule,MatFormFieldModule,MatDialogModule,MatRadioModule,MatInputModule,MatDatepickerModule,MatNativeDateModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    LongTermComponent,
    ShortTermComponent
  ]
})
export class PackageModule { }
