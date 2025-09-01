import React, { useState, useEffect, useCallback, useMemo } from 'react';
import type { Page, Dungeon, Tag, Leaderboard, Mission, Boost } from './types';
import { 
    NAV_ITEMS,
    PickaxeIcon,
    FlameIcon,
    GemIcon,
    GlobeIcon,
    ChevronDown,
    ArrowUpDown,
    ExternalLinkIcon,
    LockIcon,
    GiftIcon,
    DUNGEONS_DATA,
    LEADERBOARDS_DATA,
    MISSIONS_DATA,
    BOOSTS_DATA
} from './constants';

// --- HELPER & UI COMPONENTS ---

const TagPill: React.FC<{ tag: Tag }> = ({ tag }) => {
    const colors = {
        red: 'bg-red-500/20 text-red-400 border-red-500/30',
        green: 'bg-green-500/20 text-green-400 border-green-500/30',
        blue: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
        yellow: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
        gray: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
    };
    return (
        <div className={`flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded-full border ${colors[tag.color]}`}>
            {tag.icon && <span>{tag.icon}</span>}
            <span>{tag.label}</span>
        </div>
    );
};

const DungeonCard: React.FC<{ dungeon: Dungeon; onPlay: (dungeon: Dungeon) => void }> = ({ dungeon, onPlay }) => {
    const [timeLeft, setTimeLeft] = useState(dungeon.opensIn || 0);

    useEffect(() => {
        if (dungeon.status !== 'timed') return;
        const timer = setInterval(() => {
            setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, [dungeon.status]);

    const formatTime = (seconds: number) => {
        const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
        const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${h}:${m}:${s}`;
    };

    const isClosed = dungeon.status === 'closed';
    const isTimed = dungeon.status === 'timed' && timeLeft > 0;

    return (
        <div className="bg-[#1A1B1F]/80 border border-gray-700/50 rounded-lg overflow-hidden flex flex-col transition-all duration-300 hover:border-lime-400/50 hover:scale-[1.02]">
            <img src={dungeon.imageUrl} alt={dungeon.name} className="w-full h-32 object-cover"/>
            <div className="p-4 flex flex-col flex-grow">
                <div className="flex flex-wrap gap-2 mb-3">
                    {dungeon.tags.map((tag, i) => <TagPill key={i} tag={tag} />)}
                </div>
                <h3 className="text-white text-lg font-bold">{dungeon.name}</h3>
                <div className="flex items-center gap-2 mt-1 text-gray-300">
                    <PickaxeIcon />
                    <span>x{dungeon.entryCost}</span>
                </div>
                <div className="mt-4 mb-4 flex-grow">
                    <span className="text-3xl font-bold text-white">{dungeon.reward.toLocaleString()}</span>
                    <span className="text-lime-400 ml-2">
                        {dungeon.rewardType === 'gem' ? 'in the dungeon' : 'in rewards'}
                    </span>
                </div>
                <button 
                    onClick={() => onPlay(dungeon)}
                    disabled={isClosed || isTimed}
                    className="w-full py-2.5 px-4 rounded-lg font-semibold text-white transition-all duration-300 disabled:bg-gray-600/50 disabled:cursor-not-allowed enabled:bg-indigo-600 enabled:hover:bg-indigo-500"
                >
                    {isClosed ? 'Closed 6 months ago' : isTimed ? `Opens in ${formatTime(timeLeft)}` : 'Play now'}
                </button>
            </div>
        </div>
    );
};

const LeaderboardCard: React.FC<{ leaderboard: Leaderboard }> = ({ leaderboard }) => (
    <div className="bg-[#1A1B1F]/80 border border-gray-700/50 rounded-lg overflow-hidden flex flex-col transition-all duration-300 hover:border-lime-400/50 hover:scale-[1.02]">
        <img src={leaderboard.imageUrl} alt={leaderboard.title} className="w-full h-32 object-cover"/>
        <div className="p-4 flex flex-col flex-grow">
             <div className="flex flex-wrap gap-2 mb-3">
                {leaderboard.tags.map((tag, i) => <TagPill key={i} tag={tag} />)}
            </div>
            <h3 className="text-white text-lg font-bold">{leaderboard.title}</h3>
            <p className="text-sm text-gray-400">Ended {leaderboard.endDate}</p>
             <div className="mt-4 mb-4 flex-grow flex items-center gap-2">
                <PickaxeIcon />
                <span className="text-xl font-bold text-white">x{leaderboard.prize.toLocaleString()}</span>
            </div>
            <button className="w-full py-2.5 px-4 rounded-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-all duration-300">
                View Leaderboard
            </button>
        </div>
    </div>
);

const MissionCard: React.FC<{ mission: Mission }> = ({ mission }) => (
     <div className="bg-[#1A1B1F]/80 border border-gray-700/50 rounded-lg overflow-hidden flex flex-col transition-all duration-300 hover:border-lime-400/50 hover:scale-[1.02]">
        <img src={mission.imageUrl} alt={mission.title} className="w-full h-32 object-cover"/>
        <div className="p-4 flex flex-col flex-grow">
            <div className="flex flex-wrap gap-2 mb-3">
                {mission.tags.map((tag, i) => <TagPill key={i} tag={tag} />)}
            </div>
            <div className="flex items-center gap-2">
                <LockIcon />
                <h3 className="text-white text-lg font-bold">{mission.title}</h3>
                <div className="ml-auto flex items-center gap-2 text-gray-300">
                    <PickaxeIcon />
                    <span>x{mission.reward}</span>
                </div>
            </div>
            <p className="text-sm text-gray-400 mt-1">{mission.description}</p>
            <div className="mt-auto pt-4">
                 <button className="w-full py-2.5 px-4 rounded-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-all duration-300 disabled:bg-gray-600/50 disabled:cursor-not-allowed" disabled={mission.isMember}>
                    {mission.isMember ? 'Become diamond member to unlock' : 'Reach to unlock'}
                </button>
                <button className="w-full text-center mt-2 text-sm text-gray-400 hover:text-white">
                    Reroll mission for <PickaxeIcon className="inline-block" /> x{mission.cost}
                </button>
            </div>
        </div>
    </div>
);

const BoostCard: React.FC<{ boost: Boost }> = ({ boost }) => {
    const [selectedDuration, setSelectedDuration] = useState(boost.durations[0]);
    
    return (
        <div className="bg-[#1A1B1F]/80 border border-gray-700/50 rounded-lg p-4 flex flex-col gap-4 transition-all duration-300 hover:border-lime-400/50">
            <div className="flex items-center gap-3">
                <div className="text-2xl">{boost.icon}</div>
                <div>
                    <h3 className="text-white font-bold">{boost.title}</h3>
                    <p className="text-gray-400 text-sm">{boost.description}</p>
                </div>
            </div>
            <div className="flex gap-2">
                {boost.durations.map(d => (
                    <button key={d.label} onClick={() => setSelectedDuration(d)} className={`flex-1 py-2 text-sm rounded-md border transition-colors ${selectedDuration.label === d.label ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-gray-700/50 border-gray-600/80 text-gray-300 hover:bg-gray-700'}`}>
                        {d.label}
                    </button>
                ))}
            </div>
            <button className="w-full py-2.5 px-4 rounded-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-all duration-300 flex items-center justify-center gap-2">
                Purchase <PickaxeIcon /> x{selectedDuration.cost}
            </button>
        </div>
    );
};

// --- MAIN PAGE COMPONENTS ---
const DungeonsPage: React.FC<{ dungeons: Dungeon[]; onPlay: (dungeon: Dungeon) => void }> = ({ dungeons, onPlay }) => (
    <>
        <div className="flex flex-wrap gap-4 items-center mb-8">
            <h1 className="text-4xl font-bold text-lime-400 font-pixel">Dungeons</h1>
            <p className="text-gray-300 mt-2">Open daily with fresh rewards</p>
        </div>
        <div className="flex flex-wrap gap-4 mb-8">
            <div className="bg-[#1A1B1F] border border-gray-700/50 rounded-lg px-4 py-2 flex items-center gap-2 text-white">
                <GlobeIcon />
                <span>Asia</span>
                <ChevronDown className="w-5 h-5" />
            </div>
             <div className="bg-[#1A1B1F] border border-gray-700/50 rounded-lg px-4 py-2 flex items-center gap-2 text-white">
                <ArrowUpDown className="w-4 h-4" />
                <span>Entry Cost</span>
                <ChevronDown className="w-5 h-5" />
            </div>
            <div className="flex items-center gap-2 text-white">
                <input type="checkbox" className="form-checkbox bg-gray-800 border-gray-700 rounded text-indigo-600 focus:ring-indigo-500" />
                <span>Hide Free Dungeons</span>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {dungeons.map(d => <DungeonCard key={d.id} dungeon={d} onPlay={onPlay} />)}
        </div>
    </>
);

const MissionsPage: React.FC<{ missions: Mission[] }> = ({ missions }) => (
     <>
        <div className="flex flex-wrap gap-4 items-center mb-8">
            <h1 className="text-4xl font-bold text-lime-400 font-pixel">Missions</h1>
            <p className="text-gray-300 mt-2">Daily missions to earn rewards</p>
        </div>
         <div className="flex flex-wrap gap-4 mb-8">
            <div className="bg-[#1A1B1F] border border-gray-700/50 rounded-lg px-4 py-2 flex items-center gap-2 text-white">
                <span>Pending</span>
                <ChevronDown className="w-5 h-5" />
            </div>
            <div className="bg-[#1A1B1F] border border-gray-700/50 rounded-lg px-4 py-2 text-sm">
                <span className="text-gray-400">Karma Score ⓘ</span>
                <p className="text-white">Play more to get a score</p>
            </div>
             <a href="#" className="flex items-center gap-2 text-white hover:text-lime-400">Learn more <ExternalLinkIcon className="w-4 h-4"/></a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {missions.map(m => <MissionCard key={m.id} mission={m} />)}
        </div>
    </>
);

const LeaderboardsPage: React.FC<{ leaderboards: Leaderboard[] }> = ({ leaderboards }) => (
     <>
        <div className="flex flex-wrap gap-4 items-center mb-8">
            <h1 className="text-4xl font-bold text-lime-400 font-pixel">Leaderboards</h1>
            <p className="text-gray-300 mt-2">Fight daily for extra rewards</p>
        </div>
        <div className="flex flex-wrap gap-4 mb-8">
            <div className="bg-[#1A1B1F] border border-gray-700/50 rounded-lg px-4 py-2 flex items-center gap-2 text-white">
                <span>All Leaderboards</span>
                <ChevronDown className="w-5 h-5" />
            </div>
            <a href="#" className="flex items-center gap-2 text-white hover:text-lime-400">Learn more <ExternalLinkIcon className="w-4 h-4"/></a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {leaderboards.map(l => <LeaderboardCard key={l.id} leaderboard={l} />)}
        </div>
    </>
);

const BoostsPage: React.FC<{ boosts: Boost[] }> = ({ boosts }) => (
    <>
        <div className="flex flex-wrap gap-4 items-center mb-8">
            <h1 className="text-4xl font-bold text-lime-400 font-pixel">Boosts</h1>
            <p className="text-gray-300 mt-2">Gain an edge over your enemies</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {boosts.map(b => <BoostCard key={b.id} boost={b} />)}
        </div>
    </>
);

const ReferralsPage = () => {
    const [copied, setCopied] = useState(false);
    const copyLink = () => {
        navigator.clipboard.writeText("https://pixeldungeons.xyz/ref/12345");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
    <>
        <div className="flex flex-wrap gap-4 items-center mb-8">
            <h1 className="text-4xl font-bold text-lime-400 font-pixel">Referrals</h1>
            <p className="text-gray-300 mt-2">Earn up to <PickaxeIcon className="inline"/> x50000 per invited friend</p>
        </div>
        <div className="flex flex-wrap gap-4">
             <button className="py-2.5 px-6 rounded-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-all duration-300 flex items-center justify-center gap-2">
                Claim tasks <PickaxeIcon /> x0
            </button>
             <button onClick={copyLink} className={`py-2.5 px-6 rounded-lg font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2 ${copied ? 'bg-green-600' : 'bg-gray-700 hover:bg-gray-600'}`}>
                {copied ? 'Copied!' : 'Copy referral link'}
            </button>
        </div>
    </>
    );
};
const MembershipPage = () => (
    <div className="flex justify-center items-center h-full">
        <div className="bg-[#1A1B1F]/80 border border-gray-700/50 rounded-lg p-8 max-w-2xl w-full">
            <h1 className="text-4xl font-bold text-lime-400 font-pixel mb-2">Membership</h1>
            <p className="text-gray-300 mb-6">Unlock exclusive benefits</p>
            <ul className="text-gray-200 space-y-3 mb-8">
                <li>• Member-only icon next to your username 💎</li>
                <li>• Unlimited FREE games</li>
                <li>• Auto-claim completed missions</li>
                <li>• Exclusive Discord role</li>
                <li>• Access to all missions (no <FlameIcon/> streak needed)</li>
                <li>• Unlock high-reward diamond missions</li>
                <li>• Mission to unlock limited & transferable monthly skin</li>
            </ul>
             <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="border-2 border-indigo-500 bg-indigo-900/30 rounded-lg p-4 text-center cursor-pointer">
                    <p className="text-2xl">🎟️</p>
                    <p className="font-bold text-white">Gold</p>
                    <p className="text-sm text-gray-400">2000 PIXEL • 31 days</p>
                </div>
                 <div className="border-2 border-cyan-400 bg-cyan-900/30 rounded-lg p-4 text-center cursor-pointer">
                    <p className="text-2xl">💠</p>
                    <p className="font-bold text-white">Diamond</p>
                    <p className="text-sm text-gray-400">3000 PIXEL • 31 days</p>
                </div>
            </div>
             <button className="w-full py-3 px-4 rounded-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-all duration-300">
                Purchase
            </button>
             <div className="text-center mt-4">
                <label className="flex items-center justify-center gap-2 text-gray-400">
                    <input type="checkbox" className="form-checkbox bg-gray-800 border-gray-700 rounded text-indigo-600 focus:ring-indigo-500"/>
                    Gift to a friend <GiftIcon />
                </label>
            </div>
        </div>
    </div>
);


// --- APP ---
export default function App() {
  const [activePage, setActivePage] = useState<Page>('Dungeons');
  const [gemCount, setGemCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [loginStep, setLoginStep] = useState(0); // 0: options, 1: verifying, 2: success

  // Data states
  const [dungeons, setDungeons] = useState<Dungeon[]>(DUNGEONS_DATA);
  const [leaderboards, setLeaderboards] = useState<Leaderboard[]>(LEADERBOARDS_DATA);
  const [missions, setMissions] = useState<Mission[]>(MISSIONS_DATA);
  const [boosts, setBoosts] = useState<Boost[]>(BOOSTS_DATA);

  useEffect(() => {
    // Animate gem count on load
    let currentCount = 0;
    const targetCount = 435;
    const interval = setInterval(() => {
      currentCount += Math.ceil((targetCount - currentCount) * 0.1);
      if (currentCount >= targetCount) {
        currentCount = targetCount;
        clearInterval(interval);
      }
      setGemCount(currentCount);
    }, 50);

    return () => clearInterval(interval);
  }, []);
  
  const handleLogin = () => {
      setShowLogin(true);
      setLoginStep(0);
  }

  const handleAuthAction = () => {
      setLoginStep(1); // Verifying
      setTimeout(() => {
          setLoginStep(2); // Success
          setTimeout(() => {
            setShowLogin(false);
            setIsLoggedIn(true);
          }, 1000);
      }, 2000);
  }

  const renderPage = () => {
      switch(activePage) {
          case 'Dungeons': return <DungeonsPage dungeons={dungeons} onPlay={() => {}} />;
          case 'Missions': return <MissionsPage missions={missions} />;
          case 'Leaderboards': return <LeaderboardsPage leaderboards={leaderboards} />;
          case 'Boosts': return <BoostsPage boosts={boosts} />;
          case 'Referrals': return <ReferralsPage />;
          case 'Membership': return <MembershipPage />;
          default: return <DungeonsPage dungeons={dungeons} onPlay={() => {}} />;
      }
  }

  return (
    <div className="bg-[#111214] text-gray-200 min-h-screen">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20" 
        style={{backgroundImage: "url('https://loremflickr.com/1920/1080/pixel,dungeon?lock=123')"}}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#111214] via-[#111214]/80 to-transparent"></div>

      <div className="relative min-h-screen flex">
        {/* Sidebar */}
        <aside className="w-64 bg-black/30 backdrop-blur-sm border-r border-gray-800/50 flex flex-col p-4">
          <h1 className="text-2xl font-bold text-white font-pixel mb-10">PIXEL <br/>DUNGEONS</h1>
          <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-3 mb-6">
            <div className="flex justify-between items-center text-sm mb-2">
                <span>Energy</span>
                <span className="text-white">0/1000 <FlameIcon/></span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-1.5">
                <div className="bg-orange-500 h-1.5 rounded-full" style={{width: '20%'}}></div>
            </div>
          </div>
          <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-3 mb-6 flex justify-between items-center">
             <span className="text-sm">Available Pickaxes</span>
             <span className="text-white font-semibold flex items-center gap-2"><PickaxeIcon /> 700</span>
          </div>
          
          <nav className="flex-grow space-y-2">
            {NAV_ITEMS.map(item => (
                <button 
                    key={item.name}
                    onClick={() => setActivePage(item.name)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-left text-base font-semibold transition-colors ${activePage === item.name ? 'bg-lime-400/10 text-lime-400' : 'text-gray-300 hover:bg-gray-800/70'}`}
                >
                    {item.icon}
                    <span>{item.name}</span>
                </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
            <header className="sticky top-0 bg-[#111214]/50 backdrop-blur-sm p-4 border-b border-gray-800/50 z-10 flex justify-end">
                {isLoggedIn ? (
                     <div className="flex items-center gap-4">
                        <span className="text-sm">user@email.com</span>
                        <button className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 px-4 rounded-lg">
                            Wallet
                        </button>
                     </div>   
                ) : (
                    <button onClick={handleLogin} className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 px-4 rounded-lg">
                        Login or Sign up
                    </button>
                )}
            </header>
            
            <div className="p-8">
                 {/* Hero Section */}
                <div className="text-left mb-16 max-w-2xl">
                    <h1 className="text-6xl font-bold text-white">
                        There are <span className="text-lime-400">{gemCount}</span><GemIcon/> in the dungeons
                    </h1>
                    <p className="text-xl text-gray-300 mt-4">
                        100.000+ players, enter the dungeons, collect $PIXEL and escape with your rewards.
                    </p>
                </div>

                {renderPage()}
            </div>
        </main>
      </div>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-[#1A1B1F] border border-gray-700/50 rounded-2xl p-8 w-full max-w-sm text-center relative">
                <button onClick={() => setShowLogin(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white text-2xl leading-none">&times;</button>
                {loginStep === 0 && (
                    <>
                        <h2 className="text-xl font-bold text-white mb-6">Log in or sign up</h2>
                        <div className="space-y-3">
                            <button onClick={handleAuthAction} className="w-full text-left flex items-center gap-3 bg-gray-700/80 hover:bg-gray-700 p-3 rounded-lg">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" className="w-6 h-6" alt="Google"/>
                                <span>Google</span>
                            </button>
                             <button onClick={handleAuthAction} className="w-full text-left flex items-center gap-3 bg-gray-700/80 hover:bg-gray-700 p-3 rounded-lg">
                                <span className="text-2xl">📧</span>
                                <span>your@email.com</span>
                            </button>
                             <button onClick={handleAuthAction} className="w-full text-left flex items-center gap-3 bg-gray-700/80 hover:bg-gray-700 p-3 rounded-lg">
                                 <span className="text-2xl">🐦</span>
                                <span>Twitter</span>
                            </button>
                             <button onClick={handleAuthAction} className="w-full text-left flex items-center gap-3 bg-gray-700/80 hover:bg-gray-700 p-3 rounded-lg">
                                <span className="text-2xl">💬</span>
                                <span>Discord</span>
                            </button>
                            <button onClick={handleAuthAction} className="w-full text-left flex items-center gap-3 bg-gray-700/80 hover:bg-gray-700 p-3 rounded-lg">
                                <span className="text-2xl">💳</span>
                                <span>Continue with a wallet</span>
                            </button>
                        </div>
                    </>
                )}
                {loginStep === 1 && (
                     <>
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-lime-400 mx-auto"></div>
                        <h2 className="text-xl font-bold text-white mt-6">Verifying connection...</h2>
                        <p className="text-gray-400 mt-2">Just a few more moments</p>
                    </>
                )}
                 {loginStep === 2 && (
                     <>
                        <div className="rounded-full h-16 w-16 border-2 border-green-500 mx-auto flex items-center justify-center">
                           <span className="text-3xl text-green-500">✓</span>
                        </div>
                        <h2 className="text-xl font-bold text-white mt-6">Successfully connected</h2>
                        <p className="text-gray-400 mt-2">You're good to go!</p>
                    </>
                )}
            </div>
        </div>
      )}
    </div>
  );
}