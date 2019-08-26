export interface TokenPayload {
  email: string;
  password: string;
  name?: string;
  surname?: string;
  address?: string;
  birthday?: Date;
  image?: string;
  activated?: string;
  role?: string;
  passengerType?: string;
  img?: FormData;
  
}