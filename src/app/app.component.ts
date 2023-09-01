import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'atm-app';

  depositAmount: number = 0;

  denominations = [
    { value: 2000, count: 0 },
    { value: 500, count: 0 },
    { value: 200, count: 0 },
    { value: 100, count: 0 }
  ];

  totalAmount = 0;
  withdrawalAmount!: number;
  log: string[] = [];

  deposit() {

    this.updateTotalAmount();
    if (this.totalAmount === 0) {
      alert('please Deposite money.');
    } else {
      alert('Deposited money.');
    }
  }

  withdraw() {
    if (!this.withdrawalAmount || isNaN(this.withdrawalAmount)) {
      alert('Invalid withdrawal amount.');
      return;
    }

    if (this.withdrawalAmount > this.totalAmount) {
      alert('Insufficient funds for withdrawal.');
      return;
    }

    const dispensedDenominations: { value: number, count: number }[] = [];

    for (const denom of this.denominations) {
      const countToDispense = Math.min(Math.floor(this.withdrawalAmount / denom.value), denom.count);
      if (countToDispense > 0) {
        denom.count -= countToDispense;
        this.withdrawalAmount -= countToDispense * denom.value;
        dispensedDenominations.push({ value: denom.value, count: countToDispense });
      }
    }

    if (this.withdrawalAmount === 0) {
      alert(`Withdrawn sucessful`);
    } else {
      alert('Unable to dispense the requested amount.');
    }

    this.updateTotalAmount();
  }

  updateTotalAmount() {
    this.totalAmount = this.denominations.reduce((total, denom) => total + (denom.value * denom.count), 0);
    console.log(this.totalAmount);

  }



}
