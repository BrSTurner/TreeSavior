import { HttpClient } from '@angular/common/http';
import { FormattedError } from '@angular/compiler';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatStepper } from '@angular/material/stepper';
import { MatTableDataSource } from '@angular/material/table';
import { PaymentViewModel } from './models/payment-view-model';
import { TopDonator } from './models/top-donator';

export interface ParcelElement {
  value: number;
  label: string;
  moneyValue: number;
}

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
  dataSource = new MatTableDataSource<TopDonator>([]);
  displayedColumns: string[] = ['position', 'name', 'donatedValue', 'plantedTrees'];
  totalAmount: number = 5;
  parcelOptions: ParcelElement[] = [];
  runLoading = false;

  constructor(private formBuilder: FormBuilder,
    private httpServer: HttpClient){

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
    this.getTopDonators();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  executePayment(){
    this.runLoading = true;

    if(!this.firstFormGroup.valid || !this.secondFormGroup.valid){
      this.runLoading = false;
      return;
    }

    const paymentViewModel = {
      name: this.firstFormGroup.controls.name.value,
      cpf: this.firstFormGroup.controls.cpf.value,
      value: Number.parseFloat(this.firstFormGroup.controls.value.value),
      quantity: Number.parseInt(this.firstFormGroup.controls.quantity.value),
      cardHolder: this.secondFormGroup.controls.cardName.value,
      cardNumber: Number.parseInt(this.secondFormGroup.controls.cardNumber.value),
      cardExpirationDate: this.secondFormGroup.controls.cardValidDate.value,
      cardParcels: Number.parseInt(this.secondFormGroup.controls.cardParcels.value),
      cardSecurityCode: Number.parseInt(this.secondFormGroup.controls.cardCode.value),
      totalAmount: this.totalAmount

    } as PaymentViewModel

    this.httpServer.post("http://127.0.0.1/api/donate/donate", paymentViewModel).subscribe((result) => {
      this.getTopDonators();
      this.runLoading = false;
      this.stepper.reset();
      this.resetForms();
      alert("Doação realizada com sucesso!");
    }, error =>{
      this.runLoading = false;
      this.stepper.reset();
      this.resetForms();
      alert("Ocorreu um erro durante o processo de Doação, tente novamente mais tarde");
    });
  }

  resetForms(){
    this.firstFormGroup.reset();
    this.secondFormGroup.reset();
    this.firstFormGroup.controls.value.setValue(5);
    this.firstFormGroup.controls.quantity.setValue(1);
    this.secondFormGroup.controls.cardParcels.setValue(1);
  }

  getTopDonators(){
    this.httpServer.get<Array<TopDonator>>("http://127.0.0.1/api/donate/gettopdonators").subscribe((result) => {
      if(result && result.length > 0){
        this.dataSource.data = result;
      }
    })
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
