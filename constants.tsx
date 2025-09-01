import React from 'react';
import type { Page, Dungeon, Leaderboard, Mission, Boost } from './types';

// --- ICONS ---
// Using inline SVGs to avoid dependencies
export const GemIcon = () => <span className="text-lime-400 text-3xl align-middle">💎</span>;
export const PickaxeIcon = ({ className }: { className?: string }) => <span className={`font-pixel text-gray-400 ${className}`}>⛏️</span>;
export const FlameIcon = () => <span>🔥</span>;
export const BombIcon = () => <span>💣</span>;
export const GoblinIcon = () => <span>👺</span>;
export const TimeIcon = () => <span>⏱️</span>;
export const GlobeIcon = () => <span>🌍</span>;
export const StarIcon = () => <span className="text-yellow-400">⭐</span>;
export const GuildsIcon = () => <span>🛡️</span>;
export const MembersIcon = () => <span className="text-yellow-400">⭐</span>;
export const MultiplierIcon = () => <span>⛏️</span>;
export const LockIcon = () => <span>🔒</span>;
export const BagIcon = () => <span>💰</span>;
export const DiamondIcon = () => <span>💎</span>;
export const HideIcon = () => <span>👻</span>;
export const DoubleIcon = () => <span>✨</span>;
export const GiftIcon = () => <span>🎁</span>;

export const ChevronDown = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m6 9 6 6 6-6"/></svg>
);
export const ArrowUpDown = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m3 16 4 4 4-4"/><path d="M7 20V4"/><path d="m21 8-4-4-4 4"/><path d="M17 4v16"/></svg>
)
export const ExternalLinkIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>
)

// --- NAVIGATION ---
export const NAV_ITEMS: { name: Page; icon: React.ReactNode }[] = [
  { name: 'Dungeons', icon: <GlobeIcon /> },
  { name: 'Missions', icon: <StarIcon /> },
  { name: 'Leaderboards', icon: <GuildsIcon /> },
  { name: 'Membership', icon: <MembersIcon /> },
  { name: 'Boosts', icon: <FlameIcon /> },
  { name: 'Referrals', icon: <GiftIcon /> },
];

export const SHOP_NETWORKS = [
    { id: 'ethereum', name: 'Ethereum', icon: 'https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=032' },
    { id: 'ronin', name: 'Ronin', icon: 'https://cryptologos.cc/logos/ronin-ron-logo.svg?v=032' },
    { id: 'base', name: 'Base', icon: 'https://cryptologos.cc/logos/base-base-logo.svg?v=032' },
];

export const SHOP_TOKENS: { [key: string]: { id: string; name: string; icon: string }[] } = {
    ethereum: [
        { id: 'usdc', name: 'USDC', icon: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.svg?v=032' },
        { id: 'usdt', name: 'USDT', icon: 'https://cryptologos.cc/logos/tether-usdt-logo.svg?v=032' },
    ],
    ronin: [
        { id: 'pixel', name: 'PIXEL', icon: 'https://assets.coingecko.com/coins/images/34944/standard/PIXEL_logomark_2.png?1707371550' }
    ],
    base: [
        { id: 'eth', name: 'ETH', icon: 'https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=032' },
        { id: 'usdc', name: 'USDC', icon: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.svg?v=032' },
        { id: 'usdt', name: 'USDT', icon: 'https://cryptologos.cc/logos/tether-usdt-logo.svg?v=032' },
        { id: 'brett', name: 'BRETT', icon: 'https://assets.coingecko.com/coins/images/35072/standard/brett-logo-200x200.png?1708940884' }
    ],
};

// --- MOCK DATA ---
export const DUNGEONS_DATA: Dungeon[] = [
    { id: 1, name: 'The Swamp', reward: 67.62, rewardType: 'gem', entryCost: 25, tags: [{ label: '4 bombs', color: 'red', icon: <BombIcon /> }, { label: 'Extra Goblins', color: 'green' }, {label: 'Asia', color: 'blue', icon: <GlobeIcon />}], status: 'open', imageUrl: 'https://loremflickr.com/320/240/pixel,dungeon,swamp?lock=1' },
    { id: 2, name: 'Practice Dungeon', reward: 0.51, rewardType: 'gem', entryCost: 0, tags: [], status: 'open', imageUrl: 'https://loremflickr.com/320/240/pixel,dungeon,practice?lock=2' },
    { id: 3, name: 'The Bridge', reward: 25.00, rewardType: 'gem', entryCost: 1000, tags: [{ label: '4 bombs', color: 'red', icon: <BombIcon /> }, { label: '2 min', color: 'yellow', icon: <TimeIcon /> }, {label: 'Asia', color: 'blue', icon: <GlobeIcon />}], status: 'timed', opensIn: 64260, imageUrl: 'https://loremflickr.com/320/240/pixel,dungeon,bridge?lock=3' },
    { id: 4, name: 'The Clock', reward: 25.00, rewardType: 'gem', entryCost: 1000, tags: [{ label: '5 bombs', color: 'red', icon: <BombIcon /> }, { label: 'Extra Goblins', color: 'green' }], status: 'timed', opensIn: 67860, imageUrl: 'https://loremflickr.com/320/240/pixel,dungeon,clock?lock=4' },
    { id: 5, name: 'The Grid', reward: 400374, rewardType: 'reward', entryCost: 0, tags: [{ label: 'Random Spawn', color: 'yellow' }], status: 'closed', imageUrl: 'https://loremflickr.com/320/240/pixel,dungeon,grid?lock=5' },
    { id: 6, name: 'The Maze', reward: 276452, rewardType: 'reward', entryCost: 0, tags: [], status: 'closed', imageUrl: 'https://loremflickr.com/320/240/pixel,dungeon,maze?lock=6' },
];

export const LEADERBOARDS_DATA: Leaderboard[] = [
    { id: 1, title: 'Players Killed', prize: 8936861, endDate: '0xd9e4...88b30b', tags: [{ label: 'Multiplier', color: 'red', icon: <MultiplierIcon/> }, { label: 'Incremental', color: 'green' }], imageUrl: 'https://loremflickr.com/320/240/pixel,dungeon,kill?lock=7' },
    { id: 2, title: 'Players Killed', prize: 1500000, endDate: '0x1a96...77fae5', tags: [{ label: 'Guilds', color: 'blue', icon: <GuildsIcon/> }, { label: 'Multiplier', color: 'red', icon: <MultiplierIcon/> }], imageUrl: 'https://loremflickr.com/320/240/pixel,dungeon,kill?lock=8' },
    { id: 3, title: 'Goblins Killed', prize: 150000, endDate: '0xcdd9...7680cd', tags: [{ label: 'Members', color: 'yellow', icon: <MembersIcon/> }, { label: 'Multiplier', color: 'red', icon: <MultiplierIcon/> }], imageUrl: 'https://loremflickr.com/320/240/pixel,dungeon,goblin?lock=9' },
    { id: 4, title: 'Seconds Survived', prize: 150000, endDate: '0xabb0...b7fafa', tags: [{ label: 'Members', color: 'yellow', icon: <MembersIcon/> }, { label: 'Multiplier', color: 'red', icon: <MultiplierIcon/> }], imageUrl: 'https://loremflickr.com/320/240/pixel,dungeon,survival?lock=10' },
];

export const MISSIONS_DATA: Mission[] = [
    { id: 1, title: 'Survive 573 seconds', description: 'This mission doesn\'t expire', reward: 25, cost: 40, tags: [], imageUrl: 'https://loremflickr.com/320/240/pixel,dungeon,survival,mission?lock=11', isMember: false },
    { id: 2, title: 'Kill 11 goblins', description: 'This mission doesn\'t expire', reward: 25, cost: 18, tags: [], imageUrl: 'https://loremflickr.com/320/240/pixel,dungeon,goblin,mission?lock=12', isMember: false },
    { id: 3, title: 'Collect 44 bags', description: 'This mission doesn\'t expire', reward: 450, cost: 76, tags: [{ label: '+1000', color: 'red' }], imageUrl: 'https://loremflickr.com/320/240/pixel,dungeon,bags?lock=13', isMember: false },
    { id: 4, title: 'Mine 282 diamonds', description: 'This mission doesn\'t expire', reward: 1000, cost: 1000, tags: [{ label: 'Members', color: 'blue', icon: <DiamondIcon /> }, { label: '+1000', color: 'red' }], imageUrl: 'https://loremflickr.com/320/240/pixel,dungeon,diamond?lock=14', isMember: true },
];

export const BOOSTS_DATA: Boost[] = [
    { id: 1, title: 'Hide Username', description: "Don't let others know who you are", icon: <HideIcon />, durations: [{ label: '1 hour', cost: 1000 }, { label: '2 hours', cost: 2000 }, { label: '24 hours', cost: 4000 }] },
    { id: 2, title: 'Extra Bomb', description: 'Start every game with an extra bomb', icon: <BombIcon />, durations: [{ label: '1 hour', cost: 2000 }, { label: '2 hours', cost: 4000 }, { label: '24 hours', cost: 6000 }] },
    { id: 3, title: 'Double Invulnerability', description: 'Double your initial invulnerability duration', icon: <DoubleIcon />, durations: [{ label: '1 hour', cost: 1000 }, { label: '2 hours', cost: 1309 }, { label: '24 hours', cost: 4000 }] },
];
