import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterService } from './Services/register.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  title = 'tdf';

  registerForm: FormGroup ;
  loading = false;
  submitted = false;
  returnUrl: string ="";
  userModel :User;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
     private registerservice: RegisterService,

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
            this.registerservice.register(data )
                .pipe(first())
                .subscribe(
                    data => {
                        this.router.navigate([this.returnUrl]);
                    },
                    error => {
                      
                        this.loading = false;
                    });
         }

}
