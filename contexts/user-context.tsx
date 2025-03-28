import { createContext, useContext, useState } from 'react';

type UserType = {
  name: string;
  level: number;
  points: number;
  coins: number;
  nextLevelPoints: number;
  avatar: any;
};

const defaultUser: UserType = {
  name: 'FOLIÃO BRINCANTE',
  level: 4,
  points: 400,
  coins: 400,
  nextLevelPoints: 1000,
  avatar: require('@/assets/images/laursa.png'),
};

const UserContext = createContext<{
  user: UserType;
  setUser: React.Dispatch<React.SetStateAction<UserType>>;
}>({
  user: defaultUser,
  setUser: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(defaultUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);