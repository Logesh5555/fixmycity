import type { User, Issue } from './types';
import { PlaceHolderImages } from './placeholder-images';

const findImage = (id: string) => PlaceHolderImages.find((img) => img.id === id) || { imageUrl: '', imageHint: '' };

export const users: User[] = [
  {
    id: 'user-1',
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    ...findImage('user-avatar-1'),
    role: 'citizen',
  },
  {
    id: 'user-2',
    name: 'John Smith',
    email: 'john.smith@example.com',
    ...findImage('user-avatar-2'),
    role: 'citizen',
  },
  {
    id: 'admin-1',
    name: 'Admin User',
    email: 'admin@urbansense.ai',
    ...findImage('user-avatar-3'),
    role: 'admin',
  },
];

export const issues: Issue[] = [
  {
    id: 'issue-1',
    title: 'Large Pothole on Elm St',
    description: 'A very large and deep pothole is causing issues for traffic near 123 Elm Street. Multiple cars have been seen swerving to avoid it.',
    ...findImage('pothole-1'),
    location: { lat: 34.0522, lng: -118.2437 },
    type: 'pothole',
    severity: 'high',
    status: 'submitted',
    reporterId: 'user-1',
    createdAt: '2024-07-22T10:00:00Z',
    updatedAt: '2024-07-22T10:00:00Z',
  },
  {
    id: 'issue-2',
    title: 'Street Light Out',
    description: 'The street light at the corner of Oak Ave and Pine Ln has been out for three days. It is very dark and feels unsafe at night.',
    ...findImage('streetlight-1'),
    location: { lat: 34.055, lng: -118.25 },
    type: 'street light out',
    severity: 'medium',
    status: 'in_progress',
    reporterId: 'user-2',
    createdAt: '2024-07-21T14:30:00Z',
    updatedAt: '2024-07-22T09:00:00Z',
  },
  {
    id: 'issue-3',
    title: 'Overflowing Trash Can',
    description: 'The public trash can at the bus stop on Main Street is completely full and overflowing onto the sidewalk. It is attracting pests.',
    ...findImage('waste-1'),
    location: { lat: 34.05, lng: -118.24 },
    type: 'waste accumulation',
    severity: 'low',
    status: 'submitted',
    reporterId: 'user-1',
    createdAt: '2024-07-22T11:00:00Z',
    updatedAt: '2024-07-22T11:00:00Z',
  },
  {
    id: 'issue-4',
    title: 'Clogged Storm Drain',
    description: 'After the rain yesterday, a large pool of water has formed on Maple Drive because the storm drain is clogged with leaves and debris.',
    ...findImage('drainage-1'),
    location: { lat: 34.06, lng: -118.23 },
    type: 'drainage problem',
    severity: 'medium',
    status: 'resolved',
    reporterId: 'user-2',
    createdAt: '2024-07-20T08:00:00Z',
    updatedAt: '2024-07-21T15:00:00Z',
  },
  {
    id: 'issue-5',
    title: 'Cracked Road Surface',
    description: 'The road surface on the highway overpass is badly cracked and breaking apart. It feels dangerous to drive over.',
    ...findImage('road-damage-1'),
    location: { lat: 34.07, lng: -118.26 },
    type: 'damaged road',
    severity: 'high',
    status: 'in_progress',
    reporterId: 'user-1',
    createdAt: '2024-07-19T18:00:00Z',
    updatedAt: '2024-07-20T12:00:00Z',
  },
];

export const currentUser = users[2]; // Mock current user is admin
