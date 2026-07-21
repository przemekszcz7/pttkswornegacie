export interface GalleryItem {
  id: string;
  url: string;
  title: string;
  category: 'all' | 'rooms' | 'tavern' | 'nature' | 'activities';
  description: string;
}

export interface AttractionItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  details: string[];
  imageUrl: string;
}

export interface AccommodationType {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  priceEstimate: string;
  features: string[];
  capacity: string;
  imageUrl: string;
}

export interface ReservationInquiry {
  name: string;
  phone: string;
  email: string;
  accommodationType: string;
  checkIn: string;
  checkOut: string;
  guestsCount: number;
  message: string;
}
