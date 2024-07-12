import { createContext, ReactNode, useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { signin } from '../apis/user';
import { STORAGE_KEY_TOKEN, STORAGE_KEY_USERNAME } from "./constant";
import { clearStorage, getStorage, setStorage } from "./storage";


type AuthContextType = {
  authed:boolean,
  login: (
    username:string,
    password:string,
    callback:(res:any)=>void
  ) => void;
  logout: (callback:any) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  return useContext(AuthContext);
}

interface IAuthProviderProps {
  children: ReactNode;
}

export const AuthProvider:React.FC<IAuthProviderProps> = ({children}) => {
  const [authed,setAuthed] = useState<boolean>(false);

  const login = (username:string,password:string,callback:any) =>{
    return signin(username,password).then(data =>  {
      setAuthed(true);
      setStorage(STORAGE_KEY_USERNAME,username);
      setStorage(STORAGE_KEY_TOKEN, data['token']);
      callback(data);
    })
  }

  const logout = (callback:any) =>{
    setAuthed(false);
    clearStorage();
    callback();
  }

  return (
    <AuthContext.Provider value={{ authed, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}


interface IRequiredAuthProps {
  children: ReactNode;
}
export const RequiredAuth:React.FC<IRequiredAuthProps> = ({children}) => {
  const auth = useAuth();

  return (getStorage(STORAGE_KEY_TOKEN) !== null || (auth && auth.authed) ) ? <>{children}</> : <Navigate to='/login' replace />;
}

