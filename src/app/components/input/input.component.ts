import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { AngularFire, FirebaseListObservable,FirebaseObjectObservable } from 'angularfire2';
import 'rxjs/add/operator/map'; //TODO: move to root level

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  inputForm: FormGroup;
  addresses: FormArray;
  something: any;

  //define firebase object observable, bad bad bad
  env: FirebaseListObservable<any[]>;
  tenant: FirebaseListObservable<any[]>;
  lang: FirebaseListObservable<any[]>;
  category: FirebaseListObservable<any[]>;
  model: FirebaseListObservable<any[]>;
  os: FirebaseListObservable<any[]>;

  constructor(
    private _fb: FormBuilder, //Formbuilder
    private af: AngularFire   //AngularFire object
    ) {
    //Firebase object:
    this.env = af.database.list('/env');
    this.tenant = af.database.list('/tenant/prod');
    this.lang = af.database.list('/lang');
    this.category = af.database.list('/category');
    this.model = af.database.list('/model/iphone');
    this.os = af.database.list('/os/iphone');

    //Create Forms
    this.inputForm = new FormGroup({
      category: new FormControl('iphone'),
      lang: new FormControl('en'),
      model: new FormControl('iphone6s'),
      os: new FormControl('9'),
      tenant: new FormControl('telia'),
      env: new FormControl('prod')
    });
    //Listen to valueChanges
    this.inputForm.valueChanges.subscribe(
      then => this.updateData()
    );
   }

   //Updates the available choices by fetching new data from firebase
   updateData(){
     this.model = this.af.database.list('/model/'+this.inputForm.value.category);
     this.tenant = this.af.database.list('/tenant/'+this.inputForm.value.env);
   }

  @Output() searchEvent = new EventEmitter<any>();

  ngOnInit() {}
  onSubmit() {
    console.log(this.inputForm.value);
    this.searchEvent.emit(this.inputForm.value);
  }
}
