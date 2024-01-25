export type Category = {
    userid: number;
    name: string;
    weight: number;
    balance: number;
}

export type UserData = {
    userid: number,
    username: string,
    firstname: string,
    lastname: string,
    password: string,
    email: string,
    balance: number,
}

export type UserContextType = {
    userData: UserData | null;
    setUserData: (user: UserData) => void;
  };