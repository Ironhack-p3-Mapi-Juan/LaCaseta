import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-createBook',
  templateUrl: './createBook.component.html',
  styleUrls: ['./createBook.component.css']
})
export class CreateBookComponent implements OnInit {

  constructor(public bookingService: BookingService) { }

  ngOnInit() {
  }

}
