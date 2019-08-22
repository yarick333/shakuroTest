import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { WalletService } from '../../services/wallet.service';
import { MatSnackBar } from '@angular/material';
import { IRefillData } from '../../models/refillData';

@Component({
  selector: 'app-refill',
  templateUrl: './refill.component.html',
  styleUrls: ['./refill.component.scss']
})
export class RefillComponent implements OnDestroy {
  inProgress = false;
  operator: string;
  subscription: Subscription;
  refillForm;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private walletService: WalletService,
              private snackBar: MatSnackBar,
              private formBuilder: FormBuilder) {
    this.subscription = this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.operator = params.get('operator');
    });

    this.refillForm = this.formBuilder.group({
      phone: new FormControl('', Validators.required),
      amount: new FormControl(0, [
        Validators.required,
        Validators.min(1),
        Validators.max(1000)
      ])
    });
  }

  showSnackBar(message: string, customClass?: string) {
    this.snackBar.open(message, 'Close', { duration: 5000, panelClass: [ 'snack-bar', customClass ] });
  }

  onSubmit(data: IRefillData) {
    this.inProgress = true;

    this.walletService.refill(data).subscribe(() => {
      this.showSnackBar('Refill was successful.', 'success');
      this.router.navigate(['']);
      this.inProgress = false;
    }, (error: Error) => {
      this.showSnackBar(`Error: ${error.message}`, 'error');
      this.inProgress = false;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
