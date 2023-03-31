import { Component } from '@angular/core';
import { FormBuilder, FormControl,FormGroup, Validators,AbstractControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-customer-validation',
  templateUrl: './customer-validation.component.html',
  styleUrls: ['./customer-validation.component.css']
})
export class CustomerValidationComponent {

  form:FormGroup = new FormGroup({
    name:new  FormControl(''),
    email:new  FormControl(''),
    phone:new FormControl(''),
    type:new FormControl(''),
    amount:new FormControl('')

  })

  constructor(private fb:FormBuilder){}

 ngOnInit():void{
  this.form = this.fb.group({
    name:['',[Validators.required,Validators.minLength(4),Validators.maxLength(40)]],
    email:['',[Validators.required,Validators.email]],
    phone:['',[Validators.required,Validators.minLength(10)]],
    add:this.fb.array([]),
    MechType:['',[Validators.required]],
    amount:['',[Validators.required,Validators.min(0)]]
  })
 }

 submitted = false;

 get f():{[key:string]:AbstractControl}{
  return this.form.controls;
}

get addData()
{
  return this.form.get('add') as FormArray;
}

addBox()
{
  this.addData.push(
    this.fb.group({
      MechType:['-1',[Validators.required]],
      amount:['',[Validators.required]]
    })
  )
  
  }
  get MechType()
  {
   return this.addData.get('add.type');
  }

removeData(index:number)
  {
    this.addData.removeAt(index)
  }

onSubmit():void{
  this.submitted = true;
  console.log(JSON.stringify(this.form.value));
}

}
