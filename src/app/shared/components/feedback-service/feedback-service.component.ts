import { Component, OnInit } from '@angular/core';

import { GlobalConstants } from '../../constants/global.constants';

@Component({
  selector: 'app-feedback-service',
  templateUrl: './feedback-service.component.html',
  styleUrls: ['./feedback-service.component.scss']
})
export class FeedbackServiceComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    const script = document.createElement('script');
    script.setAttribute('feedback-service', 'true');
    script.setAttribute('data-domain', GlobalConstants.feedbackServiceDomain);
    script.setAttribute('data-issecure', 'true');
    script.src =
      'https://' + GlobalConstants.feedbackServiceDomain + '/feedback.js';
    document.body.appendChild(script);
  }
}
