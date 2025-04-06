import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CollegeDetailService } from '../college-detail/college-detail.service';
import { CollegesService } from '../colleges/colleges.service';
import { MyApplicationsService } from '../my-applications/my-applications.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  applicationId: string | null = null;
  pidx: string | null = null;
  paymentStatusMessage: string = "";

  constructor(
    private route: ActivatedRoute,
    private collegeDetailService: CollegeDetailService,
    private collegeService: CollegesService,
    private applicationService: MyApplicationsService
  ) {}

  ngOnInit() {
    const queryParams = this.route.snapshot.queryParams;
    this.applicationId = queryParams['purchase_order_id'] || null;
    this.pidx = queryParams['pidx'] || null;
    if (this.applicationId && this.pidx) {
      this.paymentLookup(this.pidx, this.applicationId);
    } else {
      this.paymentStatusMessage = "Missing parameters. Please check the URL.";
    }

    this.fetchCollegeDetails();
  }

  paymentLookup(pidx: string, applicationId: string) {
    this.collegeDetailService.paymentLookup(pidx, applicationId).subscribe((res: any) => {
      if (res && res.success && res.data && res.data.status === 'Completed') {
        this.paymentStatusMessage = "Payment successful";
      } else {
        this.paymentStatusMessage = "Payment failed. Please contact admin.";
      }
    });
  }

  applicationData: any;
  collegeData: any;
  fetchCollegeDetails() {
    // Ensure applicationId is not null before parsing
    const appId = this.applicationId ? parseInt(this.applicationId, 10) : null;
  
    if (appId !== null) {
      this.applicationService.getApplicationById(appId).subscribe((response: any) => {
        console.log("Application: ", response);
        this.applicationData = response.data;
  
        // Now that applicationData is populated, call getCollegeById
        this.collegeService.getCollegeById(this.applicationData.college_id).subscribe((collegeResponse: any) => {
          console.log("College response: ", collegeResponse);
        });
      });
    } else {
      console.error("Invalid applicationId.");
    }
  }
  
  
}