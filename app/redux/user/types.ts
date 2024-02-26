export type UserModel = {
  first_name: string;
  last_name: string;
  bio?: string;
  website?: string;
  linkedin?: string;
  facebook?: string;
  twitter?: string;
  instagram?: string;
  company?: string;
  company_position?: string;
  profile_picture?: string;
  interests?: string[];
  header_image?: string;
};


export interface userStateModel { 
  isLoggedIn: boolean;
  userId: string;
  authInfo: UserModel | null;
  token: string;
}

export interface IAccountSignInDTO {
  phone_number: {
    code: string;
    number: string;
  };
  password: string;
}

export interface reportUserDTO {
  userId: string;
  description: string;
}

export interface IAccountRegisterDTO {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: {
    code: string;
    number: string;
  };
  country: string;
  password: string;
}