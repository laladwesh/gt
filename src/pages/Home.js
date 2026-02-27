import { Link } from 'react-router-dom';
import data from '../data/siteData.json';

function ResearchIcon({ iconKey, className }) {
  const cls = className || 'w-7 h-7 text-gray-500';
  const shared = { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24', className: cls };
  if (iconKey === 'zap') return <svg {...shared}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>;
  if (iconKey === 'chip') return <svg {...shared}><rect x="7" y="7" width="10" height="10" rx="1" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 7V4M12 7V4M15 7V4M9 20v-3M12 20v-3M15 20v-3M4 9h3M4 12h3M4 15h3M17 9h3M17 12h3M17 15h3"/></svg>;
  if (iconKey === 'layers') return <svg {...shared}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>;
  if (iconKey === 'server') return <svg {...shared}><rect x="2" y="3" width="20" height="5" rx="1" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"/><rect x="2" y="10" width="20" height="5" rx="1" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"/><rect x="2" y="17" width="20" height="4" rx="1" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M6 5.5h.01M6 12.5h.01M6 19.5h.01"/></svg>;
  if (iconKey === 'shield') return <svg {...shared}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 2l7 3v6c0 5-3.5 9.7-7 11C5.5 20.7 2 16 2 11V5l10-3z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4"/></svg>;
  if (iconKey === 'atom') return <svg {...shared}><circle cx="12" cy="12" r="1.5" strokeWidth={1.8}/><ellipse cx="12" cy="12" rx="10" ry="4" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"/><ellipse cx="12" cy="12" rx="10" ry="4" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" transform="rotate(120 12 12)"/></svg>;
  if (iconKey === 'brain') return <svg {...shared}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9.5 2A3.5 3.5 0 006 5.5c0 .9.34 1.72.9 2.34A4 4 0 003 11a4 4 0 003.07 3.9A3.5 3.5 0 009.5 18H12v-2.5M14.5 2A3.5 3.5 0 0118 5.5c0 .9-.34 1.72-.9 2.34A4 4 0 0121 11a4 4 0 01-3.07 3.9A3.5 3.5 0 0114.5 18H12v-2.5"/><line x1="12" y1="18" x2="12" y2="22" strokeWidth={1.8} strokeLinecap="round"/><line x1="9" y1="22" x2="15" y2="22" strokeWidth={1.8} strokeLinecap="round"/></svg>;
  return <svg {...shared}><circle cx="12" cy="12" r="10" strokeWidth={1.8}/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10A15.3 15.3 0 0112 2z"/></svg>;
}

export default function Home() {
  const { home, profile } = data;
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <blockquote className="text-xl md:text-2xl font-light italic text-primary-200 max-w-2xl mx-auto leading-relaxed">
              <span className="text-4xl text-accent-500 font-serif leading-none">&ldquo;</span>
              {home.quote}
              <span className="text-4xl text-accent-500 font-serif leading-none">&rdquo;</span>
            </blockquote>
            <p className="mt-3 text-primary-300 text-sm font-medium tracking-widest uppercase">&mdash; {home.quoteAuthor}</p>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-10 bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <div className="shrink-0">
              <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-accent-500 shadow-2xl bg-primary-600 flex items-center justify-center">
                <img src="/gt.webp" alt={profile.name}/>
              </div>
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-1">{profile.name}</h1>
              <p className="text-accent-500 text-lg font-semibold mb-1">{profile.title}</p>
              <p className="text-primary-200 text-sm mb-4">{profile.department}<br/>{profile.institution}</p>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <Link to="/profile" className="bg-accent-500 hover:bg-accent-600 text-white px-5 py-2 rounded-lg text-sm font-semibold transition-colors shadow">View Profile</Link>
                <Link to="/publications" className="bg-white/10 hover:bg-white/20 text-white border border-white/30 px-5 py-2 rounded-lg text-sm font-semibold transition-colors">Publications</Link>
                <Link to="/contact" className="bg-white/10 hover:bg-white/20 text-white border border-white/30 px-5 py-2 rounded-lg text-sm font-semibold transition-colors">Contact</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-900 mb-2">Research Areas</h2>
            <div className="w-16 h-1 bg-accent-500 mx-auto rounded"></div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {home.researchAreas.map((area) => (
              <div key={area.title} className="bg-gray-50 border border-gray-100 rounded-xl p-5 hover:shadow-md hover:border-primary-200 hover:bg-primary-50 transition-all duration-200 group">
                <div className="mb-3"><ResearchIcon iconKey={area.iconKey} className="w-7 h-7 text-gray-500 group-hover:text-primary-600 transition-colors"/></div>
                <h3 className="font-semibold text-gray-800 text-sm group-hover:text-primary-800 leading-tight mb-1">{area.title}</h3>
                <p className="text-xs text-gray-500">{area.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-900 mb-2">News &amp; Announcements</h2>
            <div className="w-16 h-1 bg-accent-500 mx-auto rounded"></div>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl shadow-sm border border-blue-100 overflow-hidden">
              <div className="bg-primary-700 px-6 py-4 flex items-center gap-3">
                <span className="bg-accent-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">{home.announcement.tag}</span>
                <h3 className="text-white font-semibold text-sm md:text-base leading-snug">{home.announcement.title}</h3>
              </div>
              <div className="p-6 space-y-4 text-sm text-gray-700 leading-relaxed">
                <div className="flex items-center gap-2 text-primary-700 font-semibold text-base">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                  {home.announcement.dateTime}
                </div>
                <p>{home.announcement.body}</p>
                <p>{home.announcement.note}</p>
                {home.announcement.instructions && home.announcement.instructions.length > 0 && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 space-y-2">
                    <p className="font-semibold text-yellow-800">Important Instructions:</p>
                    <ul className="list-disc list-inside space-y-1.5 text-gray-700">
                      {home.announcement.instructions.map((inst, i) => <li key={i}>{inst}</li>)}
                    </ul>
                  </div>
                )}
                <p className="text-gray-500 italic">{home.announcement.footer}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary-900 text-white py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {home.stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-bold text-accent-500 mb-1">{stat.number}</div>
                <div className="text-primary-300 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
