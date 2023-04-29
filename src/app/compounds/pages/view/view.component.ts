import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../_service/http.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  paramData: any;
  data: any;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _service: HttpService
  ) { }

  ngOnInit(): void {
    this.getParamData();
    this.getCompoundDetail();
  }

  getParamData() {
    this._activatedRoute.params.subscribe(res => {
      this.paramData = res;
      console.log(this.paramData);
    })
  }

  getCompoundDetail() {
    this._service.compoundDetail({id: this.paramData.id}).subscribe((res: any) => {
      console.log(res);
      if (res.statusCode == 200) {
        this.data = res.data;
      }
    })
  }

}
