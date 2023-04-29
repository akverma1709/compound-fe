import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompoundsComponent } from './compounds.component';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { ListingComponent } from './pages/listing/listing.component';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { EditComponent } from './pages/edit/edit.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PageNotFoundModule } from '../components/page-not-found/page-not-found.module';
import { ViewComponent } from './pages/view/view.component';
import { MatIconModule } from '@angular/material/icon'

const inrRoutes: Routes = [
  {path: "",component: CompoundsComponent, children: [
    {path: "", component: ListingComponent},
    {path: ":id", component: ViewComponent}
  ]}
]

@NgModule({
  declarations: [
    CompoundsComponent,
    ListingComponent,
    EditComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes),
    MatCardModule,
    MatPaginatorModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    PageNotFoundModule,
    MatIconModule
  ]
})
export class CompoundsModule { }
