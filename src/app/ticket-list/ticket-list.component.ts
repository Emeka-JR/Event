import { Component } from '@angular/core';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent {
  baseCollection = [
    {
      title: 'Standard Access',
      price: 150,
      features: [
        { text: 'Regular Seating', available: true },
        { text: 'Coffee Break', available: true },
        { text: 'Custom Badge', available: true },
        { text: 'Community Access', available: false },
        { text: 'Workshop Access', available: false },
        { text: 'After Party', available: false }
      ],
      ticketType: 'standard-access'
    },
    {
      title: 'Pro Access',
      price: 250,
      features: [
        { text: 'Regular Seating', available: true },
        { text: 'Coffee Break', available: true },
        { text: 'Custom Badge', available: true },
        { text: 'Community Access', available: true },
        { text: 'Workshop Access', available: false },
        { text: 'After Party', available: false }
      ],
      ticketType: 'pro-access'
    },
    {
      title: 'Premium Access',
      price: 350,
      features: [
        { text: 'Regular Seating', available: true },
        { text: 'Coffee Break', available: true },
        { text: 'Custom Badge', available: true },
        { text: 'Community Access', available: true },
        { text: 'Workshop Access', available: true },
        { text: 'After Party', available: true }
      ],
      ticketType: 'premium-access'
    }
  ];

  // Create 30 tickets, 10 of each type
  collection = [
    ...Array.from({ length: 10 }, () => this.baseCollection[0]),
    ...Array.from({ length: 10 }, () => this.baseCollection[1]),
    ...Array.from({ length: 10 }, () => this.baseCollection[2])
  ];

  // Pagination variables
  currentPage = 1;
  itemsPerPage = 6; // Display 6 tickets per page
  totalPages = Math.ceil(this.collection.length / this.itemsPerPage);

  searchText: string = '';
  filteredCollection = [...this.collection];

  get paginatedItems() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredCollection.slice(startIndex, startIndex + this.itemsPerPage);
  }

  setPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  setSearchText(value: string) {
    this.searchText = value.toLowerCase();
    this.filteredCollection = this.collection.filter(item =>
      item.title.toLowerCase().includes(this.searchText)
    );
    this.totalPages = Math.ceil(this.filteredCollection.length / this.itemsPerPage);
    this.setPage(1); // Reset to the first page after search
  }
}