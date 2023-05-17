import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { User } from '../user';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterService } from '../Services/register.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-register',
  template: `
    <p>
    <div class="container-fluid">
  <h1> Register</h1>
  <form (ngSubmit)="onSubmit(userForm.value)" #userForm="ngForm" class="" style=" width: 50%;">
   
<div class="form-group">
  <label for="">Name</label>
  <input type="text" class="form-control"  name="name" [ngModel]="userModel.name" required="required">
</div>

<div class="form-group">
  <label for=""> Phone</label>
  <input type="tel" class="form-control" name="phone" (ngModel)="userModel.phone"  required="required">
</div>

<div class="form-group">
  <label for=""> Password</label>
  <input type="password" class="form-control" name="password" (ngModel)="userModel.Password"  required="required">
</div>

<div class="mb-3">
<label for="">Gender</label>
<div class="form-check">
  <input type="radio" class="form-check-input" name="Gender" value="1" (ngModel)="userModel.Gender" checked>
  <label class="form-check-label">Male</label>
</div>
<div class="form-check">
  <input type="radio" class="form-check-input" name="Gender" value="2" (ngModel)="userModel.Gender">
  <label class="form-check-label">Female</label>
</div>
</div>
<div class="mb-3">
   </div>
  <button type="submit" class="btn btn-primary">Submit form</button>
</form>
   
  `,
  styles: [
  ]
})
export class RegisterComponent  implements OnInit  {
  title = 'tdf';

  registerForm: FormGroup ;
  loading = false;
  submitted = false;
  returnUrl: string ="";
  userModel :User;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    // private registerservice: RegisterService,

    ) {}

ngOnInit() {
  



    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() { return this.registerForm.controls; }
  onSubmit( data :User) {
     this.submitted = true;

     // stop here if form is invalid
     if (this.registerForm.invalid) {
         return;
     }

     this.loading = true;
    //  this.registerservice.register(data )
    //      .pipe(first())
    //      .subscribe(
    //          data => {
    //              this.router.navigate([this.returnUrl]);
    //          },
    //          error => {
               
    //              this.loading = false;
    //          });
  }
}
