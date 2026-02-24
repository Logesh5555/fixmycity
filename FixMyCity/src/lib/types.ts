export type User = {
  id: string;
  name: string;
  email: string;
  imageUrl: string;
  imageHint: string;
  role: 'citizen' | 'admin';
};

export type Issue = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  location: {
    lat: number;
    lng: number;
  };
  type: 'pothole' | 'street light out' | 'drainage problem' | 'waste accumulation' | 'damaged road' | 'other';
  severity: 'low' | 'medium' | 'high';
  status: 'submitted' | 'in_progress' | 'resolved';
  reporterId: string;
  createdAt: string;
  updatedAt: string;
};
