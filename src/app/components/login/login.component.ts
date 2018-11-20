import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Store } from "@ngxs/store";
import { FormBuilder, Validators } from "@angular/forms";
import { LoginWithEmailAndPassword } from "../login/state/login.actions";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {
  return: string = '';
  loginForm = this.formBuilder.group({
    email: ['', Validators.required ],
    password: ['', Validators.required ]
  });

  constructor(private store: Store, private formBuilder: FormBuilder, private router:Router) {
  }

  ngOnInit() { }
  
  onSubmit() {
    const email = this.loginForm.get('email').value; 
    const password = this.loginForm.get('password').value; 
    this.store.dispatch(new LoginWithEmailAndPassword(email,password)).subscribe(() => {
      console.log('Signed out Successfuly');
      this.router.navigate(['/dashboard']);
    },
    error => {
      console.log('ooops');
      console.log(error);
    });
    // this.loginForm.reset();
  }
}
