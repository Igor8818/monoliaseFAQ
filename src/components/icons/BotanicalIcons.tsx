import {
  AlertTriangle,
  Ban,
  BookOpen,
  Car,
  Droplets,
  Eye,
  Footprints,
  HelpCircle,
  Home,
  Search,
  Shield,
  ShieldAlert,
  Shirt,
  Sprout,
  Tractor,
  UserCheck,
  Users,
  Wrench,
  Cog,
} from 'lucide-react';

export function CacaoPodLogo({ className = 'w-14 h-14' }: { className?: string }) {
  return (
    <svg viewBox="0 0 128 128" fill="none" className={className} aria-hidden="true">
      <path d="M64 25C53 16 40 16 35 24C42 32 54 34 64 25Z" fill="#86EFAC" />
      <path d="M64 25C75 16 88 16 93 24C86 32 74 34 64 25Z" fill="#4ADE80" />
      <path d="M64 19V32" stroke="#BEF264" strokeWidth="5" strokeLinecap="round" />
      <path
        d="M64 30C44 30 35 50 36 72C37 92 49 107 64 111C79 107 91 92 92 72C93 50 84 30 64 30Z"
        fill="url(#cacaoLogoGrad)"
        stroke="#FEF9C3"
        strokeWidth="3"
      />
      <path d="M64 32V109" stroke="#B45309" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
      <path
        d="M50 37C44 55 44 85 54 104"
        stroke="#B45309"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.55"
      />
      <path
        d="M78 37C84 55 84 85 74 104"
        stroke="#B45309"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.55"
      />
      <defs>
        <linearGradient id="cacaoLogoGrad" x1="36" y1="30" x2="92" y2="111" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FACC15" />
          <stop offset="55%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function BotanicalLeafWatermark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 320" fill="none" className={className} aria-hidden="true">
      <path
        d="M270 30C170 40 75 120 45 250C175 230 255 140 270 30Z"
        fill="currentColor"
        opacity="0.07"
      />
      <path
        d="M52 246C122 178 192 108 264 36"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.11"
      />
      <path
        d="M118 184L96 126M162 140L142 86M196 106L238 118M152 152L204 166"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.09"
      />
    </svg>
  );
}

export function HomeMenuIcon({
  kind,
  className = 'w-6 h-6',
}: {
  kind: 'recognize' | 'prevent' | 'biosecurity' | 'about';
  className?: string;
}) {
  switch (kind) {
    case 'recognize':
      return <Eye className={className} strokeWidth={2} />;
    case 'prevent':
      return <Shield className={className} strokeWidth={2} />;
    case 'biosecurity':
      return <Tractor className={className} strokeWidth={2} />;
    case 'about':
      return <BookOpen className={className} strokeWidth={2} />;
  }
}

export function BiosecurityCategoryIcon({
  categoryId,
  className = 'w-6 h-6',
}: {
  categoryId: string;
  className?: string;
}) {
  switch (categoryId) {
    case 'bio-pessoas':
      return <Users className={className} strokeWidth={2} />;
    case 'bio-visitantes':
      return <UserCheck className={className} strokeWidth={2} />;
    case 'bio-roupas':
      return <Shirt className={className} strokeWidth={2} />;
    case 'bio-calcados':
      return <Footprints className={className} strokeWidth={2} />;
    case 'bio-ferramentas':
      return <Wrench className={className} strokeWidth={2} />;
    case 'bio-equipamentos':
      return <Cog className={className} strokeWidth={2} />;
    case 'bio-veiculos':
      return <Car className={className} strokeWidth={2} />;
    case 'bio-material-vegetal':
      return <Sprout className={className} strokeWidth={2} />;
    default:
      return <Shield className={className} strokeWidth={2} />;
  }
}

export function SuspectStepIcon({
  iconKey,
  className = 'w-9 h-9',
}: {
  iconKey: 'eye' | 'search' | 'shield-alert' | 'ban' | 'droplets' | 'phone';
  className?: string;
}) {
  switch (iconKey) {
    case 'eye':
      return <Eye className={className} strokeWidth={2} />;
    case 'search':
      return <Search className={className} strokeWidth={2} />;
    case 'shield-alert':
      return <ShieldAlert className={className} strokeWidth={2} />;
    case 'ban':
      return <Ban className={className} strokeWidth={2} />;
    case 'droplets':
      return <Droplets className={className} strokeWidth={2} />;
    case 'phone':
      return <AlertTriangle className={className} strokeWidth={2} />;
  }
}

export function NavTabIcon({
  tab,
  active,
}: {
  tab: 'home' | 'recognize' | 'prevent' | 'biosecurity' | 'faq';
  active: boolean;
}) {
  const cls = `w-5 h-5 transition-transform duration-150 ${active ? 'scale-105' : ''}`;
  const strokeWidth = active ? 2.4 : 1.85;

  switch (tab) {
    case 'home':
      return <Home className={cls} strokeWidth={strokeWidth} />;
    case 'recognize':
      return <Eye className={cls} strokeWidth={strokeWidth} />;
    case 'prevent':
      return <Shield className={cls} strokeWidth={strokeWidth} />;
    case 'biosecurity':
      return <Tractor className={cls} strokeWidth={strokeWidth} />;
    case 'faq':
      return <HelpCircle className={cls} strokeWidth={strokeWidth} />;
  }
}
