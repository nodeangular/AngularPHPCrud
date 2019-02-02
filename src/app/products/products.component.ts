import { Component, OnInit } from '@angular/core';
import { Products } from './products';
import { ProductsService } from './products.services';
import { CatsService } from '../categories/cats.service';
import { Cats } from '../categories/cats';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {

  prods: Products[];
  catList: Cats[];
  error = '';
  success = '';

  prod = new Products('','', 0,0);

  constructor(private  prodsService: ProductsService,catsSerive:CatsService) {
  }

  ngOnInit() {
    this.getProds();
    this.getCats();
  }

  getProds(): void {
    this.prodsService.getAll().subscribe(
      (res: Products[]) => {
        this.prods = res;
      },
      (err) => {
        this.error = err;
      }
    );
  }


  getCats(): void {
    this.prodsService.getAllCats().subscribe(
      (res: Cats[]) => {
        this.catList = res;
      },
      (err) => {
        this.error = err;
      }
    );
  }

  addProds(f) {
    this.resetErrors();

    this.prodsService.store(this.prod)
      .subscribe(
        (res: Products[]) => {
          // Update the list of prods
          this.prods = res;
          console.log(this.prods);
          // Inform the user
          this.success = 'Created successfully';

          // Reset the form
          f.reset();
        },
        (err) => this.error = err
      );
  }

  updateProds(prodName, prodDesc,prodPrice,catId, id) {
    this.resetErrors();

    //console.log(prodName.value);
   
    this.prodsService.update({ prod_name: prodName.value, prod_description: prodDesc.value,prod_price:prodPrice.value,cat_id:catId.value, id: +id })
      .subscribe(
        (res) => {

       // console.log(JSON.stringify( res))
          this.prods    = res;
          this.success = 'Updated successfully';
        },
        (err) => this.error = err
      );
  }

  deleteProds(id) {
    //alert(id);
    this.resetErrors();

    this.prodsService.delete(+id)
      .subscribe(
        (res: Products[]) => {
          this.prods = res;
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
