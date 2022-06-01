<template>
  <div>
    <div class="container">
      <div class="section">
        <h1 class="title">VEP Transactions</h1>
        <h2 class="subtitle">Manage every transaction that VEP tracks, as well as manual balance adjustments</h2>
      </div>
    </div>
    <div class="container">
      <div class="section">
        <div class="columns">
          <div class="column">
            <div class="field">
              <label class="label">Sent By</label>
              <div class="control">
                <input class="input" type="search" placeholder="Nation, Ruler, or Alliance name" />
              </div>
            </div>
            <!-- <div class="dropdown">
                    <div class="dropdown-trigger">
                        <div class="field">
                            <label class="label">Sent By</label>
                            <div class="control">
                                <input class="input" type="search" placeholder="Nation or Ruler name" />
                            </div>
                        </div>
                    </div>
                    <div class="dropdown-menu" role="menu">
                        <div class="dropdown-content">
                            <p class="is-size-6" style="padding: 0 12px">Nations</p>
                            <span class="dropdown-item">lilweirdward of Land of Too Much Fun</span>
                            <span class="dropdown-item">Lord Draculea of Transylvania</span>
                            <hr class="dropdown-divider" />
                            <p class="is-size-6" style="padding: 0 12px">Alliances</p>
                            <span class="dropdown-item">Christian Coalition of Countries</span>
                        </div>
                    </div>
                </div> -->
          </div>
          <div class="column">
            <div class="field">
              <label class="label">Received By</label>
              <div class="control">
                <input class="input" type="search" placeholder="Nation, Ruler, or Alliance name" />
              </div>
            </div>
          </div>
          <div class="column">
            <div class="field">
              <label class="label">Since</label>
              <div class="control">
                <input class="input" type="date" />
              </div>
            </div>
          </div>
          <div class="column">
            <div class="field">
              <label class="label">Until</label>
              <div class="control">
                <input class="input" type="date" />
              </div>
            </div>
          </div>
        </div>
        <div class="tabs is-boxed">
          <ul>
            <li class="is-active"> <!-- [class.is-active]="currentTab === transactionType.AidBased" -->
              <a>
                <span>Aid-Based</span>
              </a>
            </li>
            <li>
              <a>
                <span>Manual</span>
              </a>
            </li>
          </ul>
        </div>
        <div class="table-container"> <!-- *ngIf="currentTab === transactionType.AidBased" -->
          <table class="table">
            <thead>
              <tr>
                <th>Actions</th>
                <th>Sending Ruler</th>
                <th>Receiving Ruler</th>
                <th>Status</th>
                <th>Money</th>
                <th>Tech</th>
                <th>Sold</th>
                <th>Reason</th>
                <th>Aid ID</th>
                <th>Start</th>
                <th>Ends</th>
                <th>Lu</th>
                <th>Cc</th>
                <th>Rate</th>
                <th>CT</th>
                <th>CC</th>
                <th>TC</th>
                <th>TT</th>
              </tr>
            </thead>
            <tbody>
              <tr> <!-- *ngFor="let transaction of aidBasedTransactions;" -->
                <td>
                  <div class="buttons are-small">
                    <button class="button is-info">Edit</button>
                  </div>
                </td>
                <td>FIX THIS</td> <!-- {{ transaction.sentBy?.rulerName || "" }} -->
                <td>FIX THIS</td> <!-- {{ transaction.receivedBy?.rulerName || "" }} -->
                <td>FIX THIS</td> <!-- {{ aidStatusNames[transaction.status] }} -->
                <td>FIX THIS</td> <!-- {{ transaction.money }} -->
                <td>FIX THIS</td> <!-- {{ transaction.technology }} -->
                <td>FIX THIS</td> <!-- {{ transaction.soldiers }} -->
                <td>FIX THIS</td> <!-- {{ transaction.reason }} -->
                <td>FIX THIS</td> <!-- {{ transaction.aidId || "" }} -->
                <td>FIX THIS</td> <!-- {{ transaction.startsOn }} -->
                <td>FIX THIS</td>
                <td>FIX THIS</td> <!-- {{ (transaction.code && transaction.code.sendingRole + transaction.code.receivingRole) || "" }} -->
                <td>FIX THIS</td> <!-- {{ transaction.classification }} -->
                <td>FIX THIS</td> <!-- {{ transaction.rate }} -->
                <td>FIX THIS</td> <!-- {{ transaction.cashMovedTechCredit }} -->
                <td>FIX THIS</td> <!-- {{ transaction.cashMovedCashCredit }} -->
                <td>FIX THIS</td> <!-- {{ transaction.techMovedCashCredit }} -->
                <td>FIX THIS</td> <!-- {{ transaction.techMovedTechCredit }} -->
              </tr>
            </tbody>
          </table>
        </div>
        <div v-if="false" class="table-container">
          <table class="table">
            <thead>
              <tr>
                <th>Actions</th>
                <th>Ruler Name</th>
                <th>Nation Name</th>
                <th>Adjustment Type</th>
                <th>Reason</th>
                <th>Lu</th>
                <th>Cc</th>
                <th>Rate</th>
                <th>CT</th>
                <th>CC</th>
                <th>TC</th>
                <th>TT</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div class="buttons are-small">
                    <button class="button is-info">Edit</button>
                    <button class="button is-danger">Delete</button>
                  </div>
                </td>
                <td>FIX THIS</td><!-- {{ transaction.nation.rulerName }} -->
                <td>FIX THIS</td><!-- {{ transaction.nation.nationName }} -->
                <td>FIX THIS</td><!-- {{ adjustmentTypeNames[transaction.adjustmentType] }} -->
                <td>FIX THIS</td><!-- {{ transaction.reason }} -->
                <td>FIX THIS</td><!-- {{ transaction.accountCode }} -->
                <td>FIX THIS</td><!-- {{ transaction.classification }} -->
                <td>FIX THIS</td><!-- {{ transaction.rate }} -->
                <td>FIX THIS</td><!-- {{ transaction.cashMovedTechCredit }} -->
                <td>FIX THIS</td><!-- {{ transaction.cashMovedCashCredit }} -->
                <td>FIX THIS</td><!-- {{ transaction.techMovedCashCredit }} -->
                <td>FIX THIS</td><!-- {{ transaction.techMovedTechCredit }} -->
              </tr>
            </tbody>
          </table>
        </div>
        <!-- <div class="columns">
          <div class="column is-four-fifths">
            <nav class="pagination is-centered" role="navigation" aria-label="pagination">
              <a class="pagination-previous">Previous</a>
              <a class="pagination-next">Next</a>
              <ul class="pagination-list">
                <li>
                  <a class="pagination-link" [class.is-current]="currentPage === 1" (click)="changePage(1)">
                    1
                  </a>
                </li>
                <ng-container *ngIf="currentPage <= 3 || totalPages <= 6">
                  <li *ngIf="totalPages >= 2">
                    <a class="pagination-link" [class.is-current]="currentPage === 2" (click)="changePage(2)">
                      2
                    </a>
                  </li>
                  <li *ngIf="totalPages >= 3">
                    <a class="pagination-link" [class.is-current]="currentPage === 3" (click)="changePage(3)">
                      3
                    </a>
                  </li>
                  <li *ngIf="totalPages >= 4">
                    <a class="pagination-link" (click)="changePage(4)">4</a>
                  </li>
                  <li *ngIf="totalPages >= 5">
                    <a class="pagination-link" (click)="changePage(5)">5</a>
                  </li>
                  <li *ngIf="totalPages >= 7">
                    <span class="pagination-link">&hellip;</span>
                  </li>
                </ng-container>
                <ng-container *ngIf="currentPage > 3 && totalPages > 6 && totalPages - currentPage > 2">
                  <li>
                    <span class="pagination-link">&hellip;</span>
                  </li>
                  <li>
                    <a class="pagination-link" (click)="changePage(currentPage - 1)">
                      {{ currentPage - 1 }}
                    </a>
                  </li>
                  <li>
                    <a class="pagination-link is-current">
                      {{ currentPage }}
                    </a>
                  </li>
                  <li>
                    <a class="pagination-link" (click)="changePage(currentPage + 1)">
                      {{ currentPage + 1 }}
                    </a>
                  </li>
                  <li>
                    <span class="pagination-link">&hellip;</span>
                  </li>
                </ng-container>
                <ng-container *ngIf="totalPages > 6 && totalPages - currentPage <= 2">
                  <li>
                    <span class="pagination-link">&hellip;</span>
                  </li>
                  <li>
                    <a class="pagination-link" (click)="changePage(totalPages - 4)">
                      {{ totalPages - 4 }}
                    </a>
                  </li>
                  <li>
                    <a class="pagination-link" (click)="changePage(1)">
                      {{ totalPages - 3 }}
                    </a>
                  </li>
                  <li>
                    <a class="pagination-link" [class.is-current]="currentPage === totalPages - 2"
                      (click)="changePage(totalPages - 2)">
                      {{ totalPages - 2 }}
                    </a>
                  </li>
                  <li>
                    <a class="pagination-link" [class.is-current]="currentPage === totalPages - 1"
                      (click)="changePage(totalPages - 1)">
                      {{ totalPages - 1 }}
                    </a>
                  </li>
                </ng-container>
                <li *ngIf="totalPages >= 6">
                  <a class="pagination-link" [class.is-current]="currentPage === totalPages"
                    (click)="changePage(totalPages)">
                    {{ totalPages }}
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div class="column">
            <div class="dropdown is-up" [class.is-active]="limitDropdownVisible">
              <div class="dropdown-trigger">
                <button class="button" (click)="limitDropdownVisible = !limitDropdownVisible">
                  Results Per Page
                </button>
              </div>
              <div class="dropdown-menu" role="menu">
                <div class="dropdown-content">
                  <a *ngFor="let option of limitOptions; index as i;" class="dropdown-item"
                    [class.is-active]="selectedLimit === i" (click)="limitDropdownSelectChanged(i)">
                    {{ option }}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TransactionsPage"
}
</script>