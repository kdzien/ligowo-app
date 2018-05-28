import { User } from './User';

export interface Rank {
  id: string;
  user_id: string;
  user?: User;
  rank: string;
  group_id: number;
}
