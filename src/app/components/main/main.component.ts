import { Component, OnDestroy } from '@angular/core';
import { OperatorsService } from '../../services/operators.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnDestroy {
  subscription: Subscription;
  inProgress = false;
  operators: string[] = [];

  constructor(private operatorsService: OperatorsService) {
    this.inProgress = true;
    this.subscription = this.operatorsService.getOperators().subscribe(operators => {
      this.operators = operators;
      this.inProgress = false;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
