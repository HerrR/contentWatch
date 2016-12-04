import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import 'rxjs/add/operator/map'; //TODO: move to root level

import { QueryParams } from '../../dataTypes/queryParams';
import { ContentService } from '../../services/content-service.service';
import { ObjectToListPipe } from '../../pipes/object-to-list.pipe';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  providers: [ContentService]
})
export class InputComponent implements OnInit {
  @Output() searchEvent = new EventEmitter<any>();

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
  
  env: Object;
  tenant: Object;
  lang: Object;
  category: Object;
  model: Object;
  os: Object;
  envObject: FirebaseObjectObservable<any[]>;
  usageTipsCategories: Object;

  fbObject: FirebaseObjectObservable<any[]>;
  coolers: Object;
  constructor(
    private contentService: ContentService,
    private _fb: FormBuilder, //Formbuilder
    private af: AngularFire   //AngularFire object
    ) {

      // constructor(private missionService: MissionService) {
//     missionService.missionConfirmed$.subscribe(
//       astronaut => {
//         this.history.push(`${astronaut} confirmed the mission`);
//       });
//   }

    // contentService.QueryParams$.subscribe
    //Firebase object:

    af.database.object('/').subscribe( data => {
      console.log(this.fbObject);
      this.fbObject = data;
      console.log(this.fbObject);
      this.env = this.fbObject['env'];
      this.tenant = this.fbObject['tenant']['prod'];
      this.lang = this.fbObject['lang'];
      this.category = this.fbObject['category'];
      this.model = this.fbObject['model']['iphone'];
      this.os = this.fbObject['os']['iphone'];
      this.usageTipsCategories = this.fbObject['usagetipsCategories'];
    }
    );

    

    //this.envObject = af.database.object('/env');
    //this.envObject.subscribe( (data:Object) => this.envValue = data );
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
    this.model = this.fbObject['model'][this.categoryForm.value];
    this.os = this.fbObject['os'][this.categoryForm.value];
  };

  updateEnvForm(){
    this.tenant = this.fbObject['tenant'][this.envForm.value]
  };


  ngOnInit() {}

  queryTerms: QueryParams;

  onSubmit() {
    let categories = [];

    for(let i in this.usageTipsCategories){
      categories.push(this.usageTipsCategories[i]["name"]);
    }
    
    this.queryTerms = new QueryParams(
        this.env[this.envForm.value], 
        this.tenantForm.value, 
        this.langForm.value,
        this.categoryForm.value,
        this.modelForm.value,
        this.osForm.value, 
        categories
      );
      this.searchEvent.emit(this.queryTerms);
  }
}
