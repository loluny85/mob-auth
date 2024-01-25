import {create} from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type TState = {
  isAuthenticated: boolean;
  username: string;
  email: string;
  password: string;
  country: string;
  login: (data: any) => void;
  register: (data: any) => void;
  signout: () => void;
};

const useAuthStore = create<TState>(persist((set) => ({
  isAuthenticated: false,
  username: '',
  email: '',
  password: '',
  country: '',
  register: (data: any) => {
    set({
      isAuthenticated: true,
      email:data.email,
      username: data.userName,
      country: data.country
    })
  },
  login: (data: any) => {
    set({
      isAuthenticated: true,
      email:data.email,
      username: data.userName
    })
  },
  signout: () => {
    set({
      isAuthenticated: false,
      username: '',
      email: '',
      password: '',
      country: '',
    })
  }
}),{
  name: "auth store",
  storage: createJSONStorage(()=>sessionStorage)
}
) as any
);

export { useAuthStore };