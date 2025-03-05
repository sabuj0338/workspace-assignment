/// <reference types="vite/client" />

type IAuth = {
  user: IUser
  access_token: string
  refresh_token: string
}

type IUser = {
  id: string
  name: string
  email: string
  avatar?: string
  phone?: string
  subscription_activated_at?: string
  last_login_at?: string
  email_verified_at?: string
  created_by?: string
  referral_user?: IUser
  roles?: Array<string>
  status: number
  created_at: string
  updated_at: string
}