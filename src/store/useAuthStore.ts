import { create } from 'zustand'
// import CookieStorage from 'zustand-persist-cookie-storage'
import { persist } from 'zustand/middleware'

const ACCESS_TOKEN_KEY = import.meta.env.VITE_ACCESS_TOKEN_KEY
const AUTH_KEY = import.meta.env.VITE_AUTH_KEY

type AuthStoreType = {
  auth?: IAuth
  update: (auth: IAuth) => void
  logout: () => void
}

export const useAuthStore = create<AuthStoreType>()(
  persist(
    (set) => ({
      auth: undefined,
      update: (auth): void => set(() => ({ auth })),
      logout: (): void => {
        set(() => ({ auth: undefined }))
        localStorage.removeItem(ACCESS_TOKEN_KEY)
      }
    }),
    {
      name: AUTH_KEY // name of the item in the storage (must be unique)
      // storage: createJSONStorage(() =>
      //   CookieStorage({
      //     // expires: new Date(new Date().setFullYear(9999))
      //   })
      // )
    }
  )
)
