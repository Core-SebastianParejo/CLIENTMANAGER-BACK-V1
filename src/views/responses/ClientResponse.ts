import type { ClientData } from '../../models/Client.js';

interface ClientResponseShape {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  company: string;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
}

export class ClientResponse {
  static from(client: ClientData): ClientResponseShape {
    return {
      id: client.id,
      fullName: client.fullName,
      email: client.email,
      phone: client.phone,
      company: client.company,
      status: client.status,
      createdAt: client.createdAt.toISOString(),
    };
  }
}
