import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule, NgSelectModule],
  selector: 'app-client-information-form',
  templateUrl: './client-information-form.html',
  styleUrls: ['./client-information-form.css'],
})
export class ClientInfomartionForm implements OnInit {
  clientForm!: FormGroup;

  selectedFiles: File[] = []; // or: = [];

  activities = [
    { activity: '', employees: '', risk: '' }
  ];


  businessRequirements = [
    {
      description: 'Organization work in noncritical business sector and nonregulated sector.',
      stdValue: 1,
      input: ''
    },
    {
      description: 'The organization has customers in critical business sectors.',
      stdValue: 2,
      input: ''
    },
    {
      description: 'The organization works in the critical business sector.',
      stdValue: 3,
      input: ''
    }
  ];

  processTasks = [
    {
      description:
        'Standard Process with standard and repetitive tasks i.e. lots of persons doing work under the organization’s control carrying out the same tasks, few products or services.',
      stdValue: 1,
      input: ''
    },
    {
      description: 'Standard but not repetitive process with a high number of products or services.',
      stdValue: 2,
      input: ''
    },
    {
      description:
        'Complex Process, High number of products and services, many business units included in the scope of certification.',
      stdValue: 3,
      input: ''
    }
  ];




  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.clientForm = this.fb.group({
      companyName: ['', Validators.required],
      address: ['', Validators.required],
      registrationNumber: [''],
      gstNumber: [''],
      contactPerson: [''],
      designation: [''],
      contactNumber: [''],
      email: ['', [Validators.required, Validators.email]],
      scopeOfCertification: [''],
      soaVersion: [''],
      businessActivities: [''],
      certificationStandard: [''],
      accreditationDesired: ['SCC'],
      applicationType: [''],
      siteType: ['Single Site'],
      permanentEmployees: [''],
      partTimeEmployees: [''],
      contractualEmployees: [''],
      temporaryEmployees: [''],
      workingRemotely: [''],
      totalEmployees: [''],
      noOfShifts: [''],
      employeesPerShift: [''],
      exclusions: [''],
      outsourcedProcesses: [''],
      functionalUnit: [''],
      regulatoryRequirements: [''],
      msEstablishmentDate: [''],
      mrmDate: [''],
      internalAuditDate: [''],
      attachedDocuments: [''],
      soaDate: [''],
      documentNumberIsms: [''],
      revisionNumberIsms: [''],
      allRequirements: ['Yes'],
      impartialityIssue: ['No'],
      otherPointsInfluencing: ['Yes'],
      effectiveManpower: [''],
      generalTermsAvailable: ['Yes'],
      icCodeTechnicalArea: [''],
      competencyAvailable: ['Yes'],
      reviewResult: ['Approve'],
      prevCertification: ['No'],
      reviewDate: [''],
      reviewerName: ['']
    });
  }




  addActivity(): void {
    this.activities.push({ activity: '', employees: '', risk: '' });
  }

  saveActivity(index: number): void {
    const act = this.activities[index];
    console.log('Saved activity:', act);
    alert(`✅ Saved Activity ${index + 1}: ${act.activity}`);
  }



  onFileSelected(event: any): void {
    this.selectedFiles = Array.from(event.target.files || []);
    console.log('Selected files:', this.selectedFiles);
  }


  onSubmit() {
    if (this.clientForm.valid) {
      console.log(this.clientForm.value);
      alert('✅ Form submitted successfully!');
    } else {
      this.clientForm.markAllAsTouched();
    }
  }
}

