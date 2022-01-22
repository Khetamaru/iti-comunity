import { Component, Input, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MessageElement, Post, PostData } from '../../post.model';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.less']
})
export class PostComponent implements OnInit, AfterViewInit {
  @Input()
  post: Post;

  @ViewChild("anchor")
  anchor: ElementRef<HTMLDivElement>;

  constructor(
    private postService: PostService
  ) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.anchor.nativeElement.scrollIntoView();
  }

  async like() {
    
    this.postService.like(this.post);
    this.post.liked = true;
  }

  toDate(str: string) {

    return new Date(str);
  }

  isYoutube(element: MessageElement) {

    return element.type === 'youtube'
  }

  isImage(element: MessageElement) {

    return element.type === 'image'
  }

  isVideo(element: MessageElement) {

    return element.type === 'video'
  }

  isAudio(element: MessageElement) {

    return element.type === 'audio'
  }
}