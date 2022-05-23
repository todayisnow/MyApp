//export interface User {
//  username: string;
//  token: string;
//  photoUrl: string;
//  knownAs: string;
//  gender: string;
//  roles: string[];
//}
export interface UserDataResult {
  userData: any;
  allUserData: ConfigUserDataResult[];
}

export interface ConfigUserDataResult {
  configId: string;
  userData: any;
}
