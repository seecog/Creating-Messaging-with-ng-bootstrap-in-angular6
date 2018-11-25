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
  btn_stt : boolean = false;
  update_id : string;
  alert_stt : boolean = false;
  constructor(private http: Http, private data: MessageService) {

  }

  ngOnInit() {
    this.getProucts();
  }

  editProduct(product){
    this.alert_stt = false;
    this.update_id = product._id;
    this.btn_stt = true;
    this.product = product;
  }

  deleteProduct(id){
    this.alert_stt = false;
    if(confirm("Do you want to delete?")){
      this.http.delete("http://localhost:3000/api/products/"+id).subscribe(
      (res) => {
       this.data.success("Record deleted successfully!");
       this.alert_stt = true;
       this.getProucts();
      },
      (err) => {
        console.log('The error is ', err)
      })
    }
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

  updateProduct(){
    this.alert_stt = false;
    if (this.validate()) {
      this.http.put("http://localhost:3000/api/products/"+this.update_id, this.product).subscribe(
        (res) => {
          this.getProucts();
          this.data.success("Product updated successfully!")
          this.alert_stt = true;
        },
        (err) => {
          console.log('The error is ', err)
        })
    }
  }

  saveProduct() {
   
    if (this.validate()) {
      this.http.post("http://localhost:3000/api/products", this.product).subscribe(
        (res) => {
          this.getProucts();
          this.product = {};
          this.data.success("Product saved successfully!")
          this.alert_stt = true;
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
