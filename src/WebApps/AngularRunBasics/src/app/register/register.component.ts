import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AccountService } from "../_services/account.service";
import { ToastrService } from 'ngx-toastr'
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {};
  registerForm: FormGroup ;
  validationErrors: string[] = [];// to can check length on html
  maxDate:Date;
  @Output() cancelRegister= new EventEmitter();
  constructor(private accountService: AccountService//,
    //private toastr: ToastrService,
    //private fb: FormBuilder,
    //private router: Router
    ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);

  }
  initializeForm() {
    //this.registerForm = this.fb.group(
    //  {
    //    gender: ['male'],
    //    username: ['', Validators.required],
    //    knownAs: ['', Validators.required],
    //    dateOfBirth: ['', Validators.required],
    //    city: ['', Validators.required],
    //    country: ['', Validators.required],
    //    password: ['', [Validators.required,
    //      Validators.minLength(4), Validators.maxLength(8)]],
    //    confirmPassword: ['', [Validators.required, this.matchValues('password')]]
    //  });
    //this.registerForm.controls.password.valueChanges.subscribe(() => {
    //  this.registerForm.controls.confirmPassword.updateValueAndValidity();
      
    //  }
    //);
  }

  register() {
 
    
  }
  cancel() {
    this.cancelRegister.emit(false);
  }
  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control?.value === control?.parent?.controls[matchTo].value ? null : { isMatching: true }
    }
  }

}
