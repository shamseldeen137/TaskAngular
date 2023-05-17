import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { SendMoneyService } from '../Services/send-money.service';

@Component({
  selector: 'app-send-money',
  template: `
   <form #sendMoneyForm (ngSubmit)="onSubmit()">
    <div class="form-group">
        <label for="senderPhone">Sender</label>
        <input type="text" formControlName="senderPhone" class="form-control" [ngClass]="{ 'is-invalid': submitted && f['senderPhone'].errors }" />
        <div *ngIf="submitted && f['senderPhone'].errors" class="invalid-feedback">
            <div *ngIf="f['senderPhone'].errors['required']">senderPhone is required</div>
        </div>
    </div>
    <div class="form-group">
        <label for="recieverphone">Phone</label>
        <input type="text" formControlName="recieverphone" class="form-control" [ngClass]="{ 'is-invalid': submitted && f['recieverphone'].errors }" />
        <div *ngIf="submitted && f['recieverphone'].errors" class="invalid-feedback">
            <div *ngIf="f['recieverphone'].errors['required']">recieverphone is required</div>
        </div>
    </div>
    <div class="form-group">
        <label for="value">Password</label>
        <input type="number" formControlName="value" class="form-control" [ngClass]="{ 'is-invalid': submitted && f['value'].errors }" />
        <div *ngIf="submitted && f['value'].errors" class="invalid-feedback">
            <div *ngIf="f['value'].errors['required']">recieverphone is required</div>
        </div>
    </div>
    <div class="form-group">
        <button [disabled]="loading" class="btn btn-primary">Login</button>
           <a [routerLink]="['/register']" class="btn btn-link">send</a>
    </div>
</form>
  `,
  styles: [
  ]
})
export class SendMoneyComponent {
  sendMoneyForm: FormGroup ;
  loading = false;
  submitted = false;
  returnUrl: string ="";

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
    
   private sendMoneyService :SendMoneyService

      ) {}

  ngOnInit() {
      this.sendMoneyForm = this.formBuilder.group({
        senderPhone: ['', Validators.required],
        recieverphone: ['', Validators.required],
        value: ['', Validators.required]
      });

 

      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
    get f() { return this.sendMoneyForm.controls; }
       onSubmit() {
          this.submitted = true;
  
          // stop here if form is invalid
          if (this.sendMoneyForm.invalid) {
              return;
          }
  
          this.loading = true;
          this.sendMoneyService.sendMoney(this.f["senderPhone"].value , this.f["recieverphone"].value, this.f["value"].value)
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
