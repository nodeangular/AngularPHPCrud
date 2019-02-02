import { Component, OnInit } from '@angular/core';
import { Login } from './login';
import  {LoginService} from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  loginMessage: string;
  status:string;
  failed: string;
  login: Login[];

  error = '';
  success = '';
 

  log = new Login('','');

  constructor(private  loginService: LoginService) {
  }

  ngOnInit() {
    this.userDetails();
  
  }

  userDetails(): void {

   /*
    this.loginService.getDetails().subscribe(
      (res: Login[]) => {
        this.login = res;
      },
      (err) => {
        this.error = err;
      }
    );
   */
  console.log(localStorage.getItem("email"));
  this.loginMessage = localStorage.getItem("email")

  }


  loginValidate(f) {
    this.resetErrors();

    this.loginService.LoginAuth(this.log)
      .subscribe(
        (res: Login[]) => {
          const isLoggedIn:boolean=false;
          var result = this.login = res
         // if(result.status=='success'){
             //localStorage.setItem('status', result.status);
            // localStorage.setItem('email', result.email);
             //this.success = 'Login successfull';
         // }
          //else{
            //console.log('failed!');
           // localStorage.setItem('status','failed');
           // this.error = 'Invaid Login or password';
         // }
         
          f.reset();
        },
        (err) => this.error = err
      );
  }

  

  private resetErrors(){
    this.success = '';
    this.error   = '';
  }


  

}
