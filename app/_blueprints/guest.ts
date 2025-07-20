export interface GuestAPIData {
  id: number;
  created_at?: Date;
  full_name: string;
  email: string;
  national_id?: string;
  nationality?: string;
  country_flag?: string;
}

export interface NewGuest {
  full_name: string;
  email: string;
  national_id?: number;
  nationality?: string;
  country_flag?: string;
  first_name?: string;
  last_name?: string;
}

export interface UpdateGuestData {
  full_name?: string;
  email?: string;
  national_id?: number;
  nationality?: string;
  country_flag?: string;
  first_name?: string;
  last_name?: string;
}

export interface UpdateProfileData {
  national_id: string;
}