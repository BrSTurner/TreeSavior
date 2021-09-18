import { FormattedError } from '@angular/compiler';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatStepper } from '@angular/material/stepper';
import { MatTableDataSource } from '@angular/material/table';
import { PaymentViewModel } from './models/payment-view-model';

export interface ParcelElement {
  value: number;
  label: string;
  moneyValue: number;
}

export interface PeriodicElement {
  name: string;
  position: number;
  donatedValue: string;
  plantedTrees: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Bruno Silva', donatedValue: 'R$ 100', plantedTrees: 20},
  {position: 2, name: 'Luis',donatedValue: 'R$ 100', plantedTrees: 20},
  {position: 3, name: 'Mariane', donatedValue: 'R$ 100', plantedTrees: 20},
  {position: 4, name: 'Hector', donatedValue: 'R$ 100', plantedTrees: 20},
  {position: 5, name: 'Jéssica', donatedValue: 'R$ 100', plantedTrees: 20},
  {position: 6, name: 'Barros', donatedValue: 'R$ 100', plantedTrees: 20},
  {position: 7, name: 'Vinicius', donatedValue: 'R$ 100', plantedTrees: 20},
  {position: 8, name: 'Lucas', donatedValue: 'R$ 100', plantedTrees: 20},
  {position: 9, name: 'Leticia', donatedValue: 'R$ 100', plantedTrees: 20},
  {position: 10, name: 'Felipe', donatedValue: 'R$ 100', plantedTrees: 20},
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit  {
  title = 'Tree Savior';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatStepper) stepper!: MatStepper;

  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  displayedColumns: string[] = ['position', 'name', 'donatedValue', 'plantedTrees'];
  totalAmount: number = 5;
  parcelOptions: ParcelElement[] = [];

  constructor(private formBuilder: FormBuilder){

  }

  ngOnInit(): void {
    this.firstFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      cpf: ['', [
        Validators.required]],
      value: [5, Validators.required],
      quantity: [1, [
        Validators.required,
        Validators.min(1)]]
    });

    this.firstFormGroup.controls.value.disable();

    this.secondFormGroup = this.formBuilder.group({
      cardName: ['', Validators.required],
      cardNumber: ['', Validators.required],
      cardValidDate: ['', Validators.required],
      cardCode: ['', Validators.required],
      cardParcels: [1, Validators.required],
      totalValue: [this.getTotalAmout(), Validators.required]
    });

    this.secondFormGroup.controls.totalValue.disable();

    this.setWatchers();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  executePayment(){
    if(!this.firstFormGroup.valid || !this.secondFormGroup.valid){
      return;
    }

    const paymentViewModel = {
      name: this.firstFormGroup.controls.name.value,
      cpf: this.firstFormGroup.controls.cpf.value,
      value: this.firstFormGroup.controls.value.value,
      quantity: this.firstFormGroup.controls.quantity.value,
      cardHolder: this.secondFormGroup.controls.cardName.value,
      cardNumber: this.secondFormGroup.controls.cardNumber.value,
      cardExpirationDate: this.secondFormGroup.controls.cardValidDate.value,
      cardParcels: this.secondFormGroup.controls.cardParcels.value,
      cardSecurityCode: this.secondFormGroup.controls.cardCode.value,
      totalAmount: this.totalAmount

    } as PaymentViewModel

    console.log(paymentViewModel);
  }

  setWatchers(){
    this.firstFormGroup.controls.quantity.valueChanges.subscribe(() => {
      this.secondFormGroup.controls.totalValue.setValue(this.getTotalAmout());
    })
  }

  getTotalAmout(): string{
    this.totalAmount = (5 * this.firstFormGroup.controls.quantity.value)
    this.parcelOptions = [];

    if(this.totalAmount >= 12){
      for(var i=1; i<=12; i++){
        this.parcelOptions.push({
          value: i,
          label: `${i}x - `,
          moneyValue: this.totalAmount/i
        })
      }
    }
    else {
      this.parcelOptions.push({
        value: 1,
        label: `1x - `,
        moneyValue: this.totalAmount
      });
    }

    return `R$ ${this.totalAmount}`;
  }
}
