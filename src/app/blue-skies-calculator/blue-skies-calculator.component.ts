import {Component, OnInit, } from '@angular/core';
import {FormGroup, FormControl, Validators, FormArray} from '@angular/forms'
import {CalculateService} from "../blue-skies-http.service";
import {Response} from "@angular/http";

@Component({
  selector: 'app-blue-skies-calculator',
  templateUrl: './blue-skies-calculator.component.html',
  styleUrls: ['./blue-skies-calculator.component.css']
})
export class BlueSkiesCalculatorComponent implements OnInit {

  states = [
    {
      name: "Alabama",
      abbreviation: "AL"
    },
    {
      name: "Alaska",
      abbreviation: "AK"
    },
    {
      name: "Arizona",
      abbreviation: "AZ"
    },
    {
      name: "Arkansas",
      abbreviation: "AR"
    },
    {
      name: "California",
      abbreviation: "CA"
    },
    {
      name: "Colorado",
      abbreviation: "CO"
    },
    {
      name: "Connecticut",
      abbreviation: "CT"
    },
    {
      name: "Delaware",
      abbreviation: "DE"
    },
    {
      name: "District Of Columbia",
      abbreviation: "DC"
    },
    {
      name: "Florida",
      abbreviation: "FL"
    },
    {
      name: "Georgia",
      abbreviation: "GA"
    },
    {
      name: "Hawaii",
      abbreviation: "HI"
    },
    {
      name: "Idaho",
      abbreviation: "ID"
    },
    {
      name: "Illinois",
      abbreviation: "IL"
    },
    {
      name: "Indiana",
      abbreviation: "IN"
    },
    {
      name: "Iowa",
      abbreviation: "IA"
    },
    {
      name: "Kansas",
      abbreviation: "KS"
    },
    {
      name: "Kentucky",
      abbreviation: "KY"
    },
    {
      name: "Louisiana",
      abbreviation: "LA"
    },
    {
      name: "Maine",
      abbreviation: "ME"
    },
    {
      name: "Maryland",
      abbreviation: "MD"
    },
    {
      name: "Massachusetts",
      abbreviation: "MA"
    },
    {
      name: "Michigan",
      abbreviation: "MI"
    },
    {
      name: "Minnesota",
      abbreviation: "MN"
    },
    {
      name: "Mississippi",
      abbreviation: "MS"
    },
    {
      name: "Missouri",
      abbreviation: "MO"
    },
    {
      name: "Montana",
      abbreviation: "MT"
    },
    {
      name: "Nebraska",
      abbreviation: "NE"
    },
    {
      name: "Nevada",
      abbreviation: "NV"
    },
    {
      name: "New Hampshire",
      abbreviation: "NH"
    },
    {
      name: "New Jersey",
      abbreviation: "NJ"
    },
    {
      name: "New Mexico",
      abbreviation: "NM"
    },
    {
      name: "New York",
      abbreviation: "NY"
    },
    {
      name: "North Carolina",
      abbreviation: "NC"
    },
    {
      name: "North Dakota",
      abbreviation: "ND"
    },
    {
      name: "Ohio",
      abbreviation: "OH"
    },
    {
      name: "Oklahoma",
      abbreviation: "OK"
    },
    {
      name: "Oregon",
      abbreviation: "OR"
    },
    {
      name: "Pennsylvania",
      abbreviation: "PA"
    },
    {
      name: "Rhode Island",
      abbreviation: "RI"
    },
    {
      name: "South Carolina",
      abbreviation: "SC"
    },
    {
      name: "South Dakota",
      abbreviation: "SD"
    },
    {
      name: "Tennessee",
      abbreviation: "TN"
    },
    {
      name: "Texas",
      abbreviation: "TX"
    },
    {
      name: "Utah",
      abbreviation: "UT"
    },
    {
      name: "Vermont",
      abbreviation: "VT"
    },
    {
      name: "Virginia",
      abbreviation: "VA"
    },
    {
      name: "Washington",
      abbreviation: "WA"
    },
    {
      name: "West Virginia",
      abbreviation: "WV"
    },
    {
      name: "Wisconsin",
      abbreviation: "WI"
    },
    {
      name: "Wyoming",
      abbreviation: "WY"
    }
  ];
  calculateForm: FormGroup;
  regDs = ['b', 'c'];
  totalFilingCost;
  efdMessage;
  returnedStates;
  loadResults = false;
  isNotValid = false;

  constructor(private calculateService: CalculateService) { }

  ngOnInit() {
    this.calculateForm = new FormGroup({
      'stateGroups': new FormArray([new FormGroup ({
        'stateCode': new FormControl(null, Validators.required),
        'investorNumber': new FormControl(null, Validators.required),
        'totalInvested': new FormControl(null, Validators.required),
        'regD': new FormControl(null, Validators.required)
      })
      ])
    });
  }

  onSubmit() {
    if (this.calculateForm.valid) {
      this.loadResults = true;


      this.totalFilingCost = undefined;


      let outputData = {'input1': this.calculateForm.value};

      let output = JSON.stringify(outputData);


      this.calculateService.putStateRequest(output)
        .subscribe(
          (response: Response) => {
            const data = response.json();

            this.totalFilingCost = data.response.blueSkiesTotal;
            this.efdMessage = data.response.efdMessage;
            this.returnedStates = data.response.detailedStateInfo;

          },
          (error) => console.log(error)
        );
      window.scrollTo(0,0);
    } else {
      this.isNotValid = true;
      this.loadResults = false;
      window.scrollTo(0,0);
    }
  }

  onAddStateGroup() {
    (<FormArray>this.calculateForm.get('stateGroups')).push(new FormGroup({
      'stateCode': new FormControl(null, Validators.required),
      'investorNumber': new FormControl(null, Validators.required),
      'totalInvested': new FormControl(null, Validators.required),
      'regD': new FormControl(null, Validators.required)
    }))
    window.scrollTo(0,document.body.scrollHeight);
  }

  removeStateGroup(index: number) {
    (<FormArray>this.calculateForm.get('stateGroups')).removeAt(index)
  }

  resetData() {
    if (confirm("Are you sure you want to clear this form? All input data will be lost.")) {
      this.calculateForm.reset();
      this.loadResults = false;
      this.totalFilingCost = undefined;
      this.isNotValid = false;
    }

  }

}
