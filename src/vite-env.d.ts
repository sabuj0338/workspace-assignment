/// <reference types="vite/client" />

type IAuth = {
  user: IUser
  // access_token: string
  // refresh_token: string
  tokens: {
    access: {
      token: string
      expires: string
    }
    refresh: {
      token: string
      expires: string
    }
  }
}

type IUser = {
  id: string
  userId: number
  fullName: string
  username: string
  email: string
  avatar?: string
  contactNo?: string
  designation?: string
  company?: string
  companyAddress?: string
  roles?: Array<string>
  createdAt: string
  updatedAt: string
}

type ApiResponse = {
  success: boolean
  message: string
  data: unknown
}

type Team = {
  id: string;
  count: number;
  description: string;
  name: string;
}