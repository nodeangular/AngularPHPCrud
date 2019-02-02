import { Component, OnInit } from '@angular/core';
import { Cats } from './cats';
import { CatsService } from './cats.service';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  cats: Cats[];
  error = '';
  success = '';

  cat = new Cats('','', 0,0);

  constructor(private catsService: CatsService) {
  }

  ngOnInit() {
    this.getCats();
  }

  getCats(): void {
    this.catsService.getAll().subscribe(
      (res: Cats[]) => {
        this.cats = res;
      },
      (err) => {
        this.error = err;
      }
    );
  }

  addCats(f) {
    this.resetErrors();

    this.catsService.store(this.cat)
      .subscribe(
        (res: Cats[]) => {
          // Update the list of cars
          this.cats = res;

          // Inform the user
          this.success = 'Created successfully';

          // Reset the form
          f.reset();
        },
        (err) => this.error = err
      );
  }

  updateCats(catName, catDesc,parent_id, id) {
    this.resetErrors();

    this.catsService.update({ catName: catName.value, catDesc: catDesc.value,parent_id:parent_id.value, id: +id })
      .subscribe(
        (res) => {
          this.cats    = res;
          this.success = 'Updated successfully';
        },
        (err) => this.error = err
      );
  }

  deleteCats(id) {
    //alert(id);
    this.resetErrors();

    this.catsService.delete(+id)
      .subscribe(
        (res: Cats[]) => {
          this.cats = res;
          //alert(res);
          this.success = 'Deleted successfully';
        },
        (err) => this.error = err
      );
  }

  private resetErrors(){
    this.success = '';
    this.error   = '';
  }









}
