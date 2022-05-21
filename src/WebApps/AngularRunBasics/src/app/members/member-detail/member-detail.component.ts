import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';


import { ActivatedRoute } from "@angular/router";
import { MembersService } from '../../_services/members.service'
import { Member } from "../../_models/member";
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from '@kolkov/ngx-gallery';
import { ToastrService } from "ngx-toastr";
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
//import { MessageService } from 'src/app/_services/message.service';
//import { Message } from 'src/app/_models/message';
//import { PresenceService } from '../../_services/presence.service';
import { AccountService } from "../../_services/account.service";
import { User } from "../../_models/user";
import {take} from 'rxjs/operators'

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit , OnDestroy{
  @ViewChild('memberTabs', {static:true}) memberTabs: TabsetComponent;//static to fast detect chnages before change detection runs
  activeTab: TabDirective;
  member: Member;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  //messages: Message[] = [];

  user:User;
  constructor(private memberService: MembersService,
    private route: ActivatedRoute,
    //private messageService: MessageService,
    //public presence: PresenceService,
    public accountService: AccountService,
    private toastr: ToastrService,
    private router :Router) {

    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
    this.router.routeReuseStrategy.shouldReuseRoute = () => false; // so it should refress the reouter if the user click on new messgae of  userA while he's viewing message of userB
  }
    ngOnDestroy(): void {
       //this.messageService.stopHubConnection();
    }

  ngOnInit(): void {
    //this.loadMember();
    this.memberService.getMember(this.route.snapshot.paramMap.get("username")).subscribe(data => {
      this.member = data
      this.galleryImages = this.getImages();
    });
   //this.route.data.subscribe(data => {
   //  this.member = data.member
   //  console.log(data)
   //});
   this.route.queryParams.subscribe(params => {

     params['tab'] ? this.selectTab(params['tab']) : this.selectTab(0);
   });
    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ];
   /* this.galleryImages = this.getImages();*/
   
    

    
  }

  addLike(member: Member) {
    this.memberService.addLike(member.username).subscribe(() => {
      this.toastr.success('You have liked ' + member.knownAs);
    });
  }

  getImages(): NgxGalleryImage[] {
    const imageUrls = [];
  
      for (const photo of this.member.photos) {
        imageUrls.push({
          small: photo?.url,
          medium: photo?.url,
          big: photo?.url
        });
      }
    
    return imageUrls;
  }

  onTabActivated(data: TabDirective) {
    
    this.activeTab = data;
    //if (this.activeTab.heading === 'Messages' && this.messages.length === 0) {
    //  //this.loadMessages();
    //  this.messageService.createHubConnection(this.user, this.member.username);
    //} else {
    //  this.messageService.stopHubConnection();
    //}
  }
  selectTab(tabId: number) {
    //this.memberTabs.tabs[tabId].active = true;
  }
  loadMessages() {
    //this.messageService.getMessageThread(this.member.username).subscribe(message => {
    //  this.messages = message;
    //})
  }
}
