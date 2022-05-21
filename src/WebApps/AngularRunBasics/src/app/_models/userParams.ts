import { User } from './user';
import { PaginationParams } from './paginationParams';

export class UserParams extends PaginationParams {
  gender: string;
  minAge = 18;
  maxAge = 99;
  override pageNumber = 1;
  override pageSize = 20;
  orderBy = 'lastActive';

  constructor(user: User) {
    super();
    this.gender = user.gender === 'female' ? 'male' : 'female';
  }
}
