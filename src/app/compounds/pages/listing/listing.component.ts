import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../_service/http.service';
import { MatDialog } from '@angular/material/dialog';
import { EditComponent } from '../edit/edit.component';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {

  pageSizeOptions: number[] = [10, 20, 30, 50, 100];
  compoundList: any = [];
  paginationData: any = {limit: 10,pageNo: 1, total: 0}

  constructor(
    private _service: HttpService,
    public _dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getCompoundList();
  }

  getCompoundList() {
    const query = {
      page: this.paginationData.pageNo,
      limit: this.paginationData.limit
    }
    this._service.compoundList(query).subscribe((res: any) => {
      if (res.statusCode == 200) {
        this.compoundList = res.data.map((item: any) => {
          return {...item, description: item.CompounrDescription.slice(0,100)}
        });
        this.paginationData = res.paginationData;
      } else {
        this.compoundList = [];
      }
    }, error => {
      this.compoundList = [];
    })
  }

  changePage(event: any) {
    this.paginationData.pageNo = event.pageIndex+1;
    this.paginationData.limit = event.pageSize;
    this.getCompoundList();
  }

  openDialog(item: any, index: number) {
    const dialogRef = this._dialog.open(EditComponent, {data: item, disableClose: true});
    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
      if (res) {
        res.description = res.CompounrDescription.slice(0,100);
        this.compoundList[index] = res
      }
    })
  }

}
