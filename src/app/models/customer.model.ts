export class Customer {
  id?: string;
  name: string;
  email: string;
  address: string;
  phone: string;
  constructor(id?: string, name?: string, email?: string, address?: string, phone?: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.address = address;
    this.phone = phone;
  }
}
