import { UserDataResult } from './user';
import { PaginationParams } from './paginationParams';

export class UserParams extends PaginationParams {
  gender: string;
  minAge = 18;
  maxAge = 99;
  override pageNumber = 1;
  override pageSize = 20;
  orderBy = 'lastActive';

  constructor(user: UserDataResult) {
    super();
    this.gender = user.userData.gender === 'female' ? 'male' : 'female';
  }
}
