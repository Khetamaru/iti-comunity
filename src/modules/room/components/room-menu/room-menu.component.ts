import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable } from 'rxjs';
import { FeedStore } from 'src/modules/feed/feed.store';
import { Room } from '../../room.model';
import { RoomQueries } from '../../services/room.queries';
import { RoomSocketService } from '../../services/room.socket.service';
import { RoomCreateModalComponent } from '../room-create-modal/room-create-modal.component';
@Component({
  selector: 'app-room-menu',
  templateUrl: './room-menu.component.html',
  styleUrls: ['./room-menu.component.less']
})
export class RoomMenuComponent implements OnInit {
  @ViewChild("modal")
  roomCreateModalComponent: RoomCreateModalComponent;
  
  roomId$: Observable<string | undefined>;
  rooms: Room[];
  
  constructor(
    private feedStore: FeedStore, 
    private queries: RoomQueries, 
    private router: Router,
    private roomSocketService: RoomSocketService) {

    this.roomId$ = feedStore.roomId$;
    this.rooms = [];
  }

  async ngOnInit() {

    this.roomSocketService.onNewRoom((room: Room) => {this.rooms.push(room)});

    this.rooms = await this.queries.getAll();

    if (this.feedStore.value.roomId == null) {

      this.router.navigate(["app/" + this.rooms[0].id]);
    }
  }

  goToRoom(room: Room) {

    this.router.navigate(["app/" + room.id]);
  }

  newRoom() {

    this.roomCreateModalComponent.open();
  }
}
