// // src/context/UserContext.tsx
// import React, { createContext, useState, ReactNode } from "react";

// interface UserContextType {
//   signedUser: { access_token: string | null };
//   setSignedUser: React.Dispatch<
//     React.SetStateAction<{ access_token: string | null }>
//   >;
// }

// const UserContext = createContext<UserContextType | undefined>(undefined);

// interface UserProviderProps {
//   children: ReactNode;
// }

// const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
//   const [signedUser, setSignedUser] = useState<{ access_token: string | null }>(
//     {
//       access_token: null,
//     }
//   );

//   return (
//     <UserContext.Provider value={{ signedUser, setSignedUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export { UserContext, UserProvider };
// src/context/UserContext.tsx
import React, { createContext, useState, ReactNode, useContext } from "react";
import { UserAuthType } from "./useAuthForm";


interface UserContextType {
  signedUser: UserAuthType | null;
  setSignedUser: React.Dispatch<React.SetStateAction<UserAuthType | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
  value: UserContextType; // Define the value prop
}

const UserProvider: React.FC<UserProviderProps> = ({ children,value }) => {
  const [signedUser, setSignedUser] = useState<UserAuthType | null>(null);

  return (
    <UserContext.Provider value={value} >
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for accessing the UserContext
const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export { UserProvider, useUser };
