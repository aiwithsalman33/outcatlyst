const paths: Record<string, React.ReactNode> = {
  classroom: (<><rect x="3" y="4" width="18" height="12" rx="2" /><path d="M7 20h10M12 16v4M7 9l3 2-3 2M13 13h4" /></>),
  mentor: (<><circle cx="8" cy="7" r="3" /><circle cx="17" cy="9" r="2.4" /><path d="M2.5 20a5.5 5.5 0 0111 0M13.5 20a4 4 0 017.5-2" /></>),
  globe: (<><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z" /></>),
  compass: (<><circle cx="12" cy="12" r="9" /><path d="M15.5 8.5l-2 5-5 2 2-5z" /></>),
  spark: (<><path d="M12 3l1.8 5.4L19 10l-5.2 1.6L12 17l-1.8-5.4L5 10l5.2-1.6z" /><path d="M19 17l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z" /></>),
  target: (<><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.2" /></>),
  briefcase: (<><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2M3 13h18" /></>),
  lightbulb: (<><path d="M9 18h6M10 21h4M12 3a6 6 0 00-3.6 10.8c.6.5 1 1.2 1 2V16h5.2v-.2c0-.8.4-1.5 1-2A6 6 0 0012 3z" /></>),
  growth: (<><path d="M3 20h18M5 16l5-5 4 3 6-7" /><path d="M15 7h5v5" /></>),
  handshake: (<><path d="M2 11l4-4 4 2 3-2 3 1 6 3M2 11l5 5 2-1 2 2 2-1 2 1 4-4 3-2" /></>),
  chat: (<><path d="M21 12a8 8 0 01-11.6 7.1L4 20l1.1-4.4A8 8 0 1121 12z" /><path d="M8.5 12h.01M12 12h.01M15.5 12h.01" /></>),
  layers: (<><path d="M12 3l9 5-9 5-9-5z" /><path d="M3 13l9 5 9-5" /></>),
  check: (<path d="M5 12.5l4.5 4.5L19 7.5" />),
  arrow: (<path d="M5 12h14M13 6l6 6-6 6" />),
  route: (<><circle cx="6" cy="18" r="2.5" /><circle cx="18" cy="6" r="2.5" /><path d="M8.5 18H15a3 3 0 000-6H9a3 3 0 010-6h6.5" /></>),
  reflect: (<><path d="M4 12a8 8 0 0114-5.3M20 12a8 8 0 01-14 5.3" /><path d="M18 3v4h-4M6 21v-4h4" /></>),
  users: (<><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20a6.5 6.5 0 0113 0M16 4.5a3.5 3.5 0 010 7M18 14.5a6.5 6.5 0 013.5 5.5" /></>),
  mail: (<><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></>),
  building: (<><path d="M4 21V5l8-3 8 3v16M4 21h16M9 21v-5h6v5M8 8h.01M12 8h.01M16 8h.01M8 12h.01M12 12h.01M16 12h.01" /></>),
  shield: (<><path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z" /><path d="M8.5 12l2.5 2.5 4.5-5" /></>),
};

export type IconName = keyof typeof paths;

export function Icon({ name, className = "size-6" }: { name: IconName | string; className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      {paths[name] ?? paths.spark}
    </svg>
  );
}
