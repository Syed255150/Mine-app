
export type Page = 'Dungeons' | 'Missions' | 'Leaderboards' | 'Membership' | 'Boosts' | 'Referrals';

export interface Tag {
  label: string;
  color: 'red' | 'green' | 'blue' | 'yellow' | 'gray';
  icon?: React.ReactNode;
}

export interface Dungeon {
  id: number;
  name: string;
  reward: number;
  rewardType: 'gem' | 'reward';
  entryCost: number;
  tags: Tag[];
  status: 'open' | 'closed' | 'timed';
  opensIn?: number; // seconds
  imageUrl: string;
}

export interface Leaderboard {
  id: number;
  title: string;
  prize: number;
  endDate: string;
  tags: Tag[];
  imageUrl: string;
}

export interface Mission {
    id: number;
    title: string;
    description: string;
    reward: number;
    cost: number;
    tags: Tag[];
    imageUrl: string;
    isMember?: boolean;
}

export interface Boost {
    id: number;
    title: string;
    description: string;
    icon: React.ReactNode;
    durations: {
        label: string;
        cost: number;
    }[];
}
