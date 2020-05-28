export class Kullanicilar {
  id: number;
  adSoyad: string;
  email: string;
  password: string;

  constructor(id, adSoyad: string, email: string, password: string) {
    this.id = id;
    this.adSoyad = adSoyad;
    this.email = email;
    this.password = password;
  }


}
