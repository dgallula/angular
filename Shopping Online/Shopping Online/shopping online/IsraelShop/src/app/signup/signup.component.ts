import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../model/User';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  formStep1: FormGroup;
  formStep2: FormGroup;
  showForm1: Boolean;
  showForm2: Boolean;
  displayForm2: Boolean = true;
  registrationSuccess: Boolean = false
  id: string = '';
  email: string = '';
  password: string = '';
  error: string = '';

  constructor(private userService: UserService) {
    this.formStep1 = new FormGroup({
      id: new FormControl(null, { updateOn: 'blur', validators: [Validators.minLength(2), Validators.maxLength(120), Validators.required] }),
      email: new FormControl(null, { updateOn: 'blur', validators: [Validators.email, Validators.required] }),
      password: new FormControl(null, { updateOn: 'blur', validators: [Validators.minLength(3), Validators.maxLength(50), Validators.required] }),
      passwordconfirm: new FormControl(null, { updateOn: 'blur', validators: [Validators.minLength(3), Validators.maxLength(50), Validators.required] })
    });

    this.formStep2 = new FormGroup({
      city: new FormControl(null, { updateOn: 'blur', validators: [Validators.minLength(2), Validators.maxLength(120), Validators.required] }),
      street: new FormControl(null, { updateOn: 'blur', validators: [Validators.minLength(2), Validators.maxLength(120), Validators.required] }),
      name: new FormControl(null, { updateOn: 'blur', validators: [Validators.minLength(3), Validators.maxLength(50), Validators.required] }),
      lastname: new FormControl(null, { updateOn: 'blur', validators: [Validators.minLength(3), Validators.maxLength(50), Validators.required] })
    });
    this.showForm1 = true
    this.showForm2 = false
   }

  ngOnInit(): void {
  }

  onSubmitForm1() {
    console.log(this.formStep1);
    this.error = '';
    this.id = this.formStep1.value.id;
    this.email = this.formStep1.value.email;
    this.password = this.formStep1.value.password;

    if (this.formStep1.valid) {
      console.log('here1');
      if(this.password === this.formStep1.value.passwordconfirm) {
        console.log('here2');
        this.showForm1 = false
        this.showForm2 = true
      }
      else{
        console.log('here3');
        this.error = 'Passwords not matches.';
        return
      }
    }
    else {
      console.log('here4');
      this.error = 'Some fields are not valid please verify and retry.';
    }

  }

  onSubmitForm2() {
    console.log(this.formStep2);
    this.error = '';
    const city = this.formStep2.value.city;
    const street = this.formStep2.value.street;
    const name = this.formStep2.value.name;
    const lastname = this.formStep2.value.lastname;

    if (this.formStep2.valid) {
      const newUser = {
        id: this.id,
        email: this.email,
        password: this.password,
        city: city,
        street: street,
        name: name,
        lastname: lastname,
        role: 0
      };
      console.log("newUser: ", newUser);
      this.userService.createUser(newUser).subscribe(response => {
        console.log("response: ", response);
        if (response.success){
          console.log("in resp ok");
          this.error = '';
          this.registrationSuccess = true;
          this.displayForm2 = false;
        }
      });
    }
  }

}
