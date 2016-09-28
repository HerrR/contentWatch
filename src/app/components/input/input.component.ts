import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import 'rxjs/add/operator/map'; //TODO: move to root level

import { QueryParams } from '../../dataTypes/queryParams';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html'
})
export class InputComponent implements OnInit {

  inputForm: FormGroup;
  addresses: FormArray;
  modelValue: Array<any>;
  envValue: Object;

  categoryForm: FormControl;
  langForm: FormControl;
  modelForm: FormControl;
  osForm: FormControl;
  tenantForm: FormControl;
  envForm: FormControl;

  //define firebase object observable, bad bad bad, many observables.. :/
  env: FirebaseListObservable<any[]>;
  tenant: FirebaseListObservable<any[]>;
  lang: FirebaseListObservable<any[]>;
  category: FirebaseListObservable<any[]>;
  model: FirebaseListObservable<any[]>;
  os: FirebaseListObservable<any[]>;
  envObject: FirebaseObjectObservable<any[]>;

  constructor(
    private _fb: FormBuilder, //Formbuilder
    private af: AngularFire   //AngularFire object
    ) {
    //Firebase objects:
    this.env = af.database.list('/env');
    this.tenant = af.database.list('/tenant/prod');
    this.lang = af.database.list('/lang');
    this.category = af.database.list('/category');
    this.model = af.database.list('/model/iphone');
    this.os = af.database.list('/os/iphone');
    
    this.envObject = af.database.object('/env');
    this.envObject.subscribe( (data:Object) => this.envValue = data );
    //Create Forms
    this.categoryForm = new FormControl('iphone');
    this.langForm = new FormControl('en');
    this.modelForm = new FormControl('iphone6s');
    this.osForm = new FormControl('9');
    this.tenantForm = new FormControl('telia');
    this.envForm = new FormControl('prod');

    this.inputForm = new FormGroup({
      category: this.categoryForm,
      lang: this.langForm,
      model: this.modelForm,
      os: this.osForm,
      tenant: this.tenantForm,
      env: this.envForm
    });

    //Listen to valueChanges
    this.categoryForm.valueChanges.subscribe(
      then => this.updateCategoryForm()
    );
    this.envForm.valueChanges.subscribe(
      then => this.updateEnvForm()
    );
    // this.onSubmit();
   } //end of constructor


//Methods:
  //updateCategoryForm should reload data arrays for "model" and "os" and set set values
   updateCategoryForm(){
     this.model = this.af.database.list('/model/'+this.categoryForm.value);
     this.model.subscribe(
       data => {
         if (data.length > 0) {this.modelForm.setValue(data[0].$key)} //set formvalue to first item in list
       }
     );
     this.os = this.af.database.list('/os/'+this.categoryForm.value);
     this.os.subscribe(
       data => {
         if (data.length > 0) {this.osForm.setValue(data[0].$key)} //set formvalue to first item in list
       }
     );
   };
   updateEnvForm(){
     this.tenant = this.af.database.list('/tenant/'+this.envForm.value);
     
     this.tenant.subscribe(
       data => {
         if (data.length > 0) {this.tenantForm.setValue(data[0].$value)} //set formvalue to first item in list
       }
     )
   };

   //Updates the available choices by fetching new data from firebase
   updateData(){
     //Check if category is changed... Can prob nicer with event emitter
     this.tenant = this.af.database.list('/tenant/'+this.inputForm.value.env);
     this.os = this.af.database.list('/os/'+this.inputForm.value.category);
   };

  @Output() searchEvent = new EventEmitter<any>();

  ngOnInit() {

  }
  queryTerms: QueryParams;

  onSubmit() {
    // console.log(this.envValue[this.envForm.value]);
    this.queryTerms = new QueryParams(
      this.envValue[this.envForm.value], 
      this.tenantForm.value, 
      this.langForm.value,
      this.categoryForm.value,
      this.modelForm.value,
      this.osForm.value
    );
    //feels unneccessary to convert inputForm to queryTerms

    // this.queryTerms.env = this.envForm.value;
    // this.queryTerms.tenant = this.tenantForm.value;
    // this.queryTerms.lang = this.langForm.value;
    // this.queryTerms.category = this.categoryForm.value;
    // this.queryTerms.model = this.modelForm.value;
    // this.queryTerms.os = this.osForm.value;

    // console.log(this.inputForm.value);
    // console.log(this.queryTerms);

    this.searchEvent.emit(this.queryTerms);
  }
}
