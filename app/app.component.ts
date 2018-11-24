import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { MessageService } from './services/message.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private products: any[];
  product: any = {};
  p: number = 1;
  constructor(private http: Http, private data: MessageService) {

  }

  ngOnInit() {
    this.getProucts();
  }

  getProucts() {
    this.http.get("http://localhost:3000/api/products").subscribe(
      (res) => {
        console.log(res.json())
        this.products = res.json();
      },
      (err) => {
        console.log('The error is ', err)
      })
  }

  saveProduct() {
    if (this.validate()) {
      this.http.post("http://localhost:3000/api/products", this.product).subscribe(
        (res) => {
          this.getProucts();
          this.product = {};
          this.data.success("Product saved successfully!")
        },
        (err) => {
          console.log('The error is ', err)
        })
    }
  }

  validate() {
    if (this.product.name) {
      if (this.product.cost) {
        if (this.product.brand) {
          if (this.product.image) {
            return true;
          }
          else {
            this.data.error("Product image required !")
          }
        }
        else {
          this.data.error("Product brand required !")
        }
      }
      else {
        this.data.error("Product cost required !")
      }
    }
    else {
      this.data.error("Product name required !")
    }
  }

}
