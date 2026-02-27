import data from '../data/siteData.json';

const statusColors = {
  Completed: 'bg-green-100 text-green-700 border-green-200',
  Ongoing:   'bg-blue-100 text-blue-700 border-blue-200',
  Approved:  'bg-yellow-100 text-yellow-700 border-yellow-200',
  Announced: 'bg-purple-100 text-purple-700 border-purple-200',
};

function ProjectCard({ title, joint, agency, duration, status, website }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-primary-100 transition-all p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-semibold text-gray-900 text-sm leading-snug flex-1">{title}</h3>
        <span className={`shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full border ${statusColors[status] || 'bg-gray-100 text-gray-600 border-gray-200'}`}>{status}</span>
      </div>
      {joint && <p className="text-xs text-gray-500 italic">{joint}</p>}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="bg-gray-50 rounded-lg p-2.5">
          <p className="text-gray-400 font-medium uppercase tracking-wider text-xs mb-0.5">Agency</p>
          <p className="text-gray-700 font-medium">{agency}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-2.5">
          <p className="text-gray-400 font-medium uppercase tracking-wider text-xs mb-0.5">Duration</p>
          <p className="text-gray-700 font-medium">{duration}</p>
        </div>
      </div>
      {website && (
        <a href={website} target="_blank" rel="noreferrer" className="text-xs text-primary-600 hover:text-primary-800 font-medium flex items-center gap-1 transition-colors">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
          {website}
        </a>
      )}
    </div>
  );
}

export default function Projects() {
  const { projects } = data;
  const ongoing   = projects.sponsored.filter(p => p.status !== 'Completed');
  const completed = projects.sponsored.filter(p => p.status === 'Completed');
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary-900">Projects</h1>
          <div className="w-12 h-1 bg-accent-500 rounded mt-2"></div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Total Projects', value: projects.sponsored.length + projects.consultancy.length },
            { label: 'Sponsored',      value: projects.sponsored.length },
            { label: 'Consultancy',    value: projects.consultancy.length },
            { label: 'Active',         value: ongoing.length },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center">
              <div className="text-2xl font-bold text-primary-700">{stat.value}</div>
              <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <h2 className="text-xl font-bold text-primary-900">Sponsored Research Projects</h2>
            <div className="flex-1 h-px bg-primary-100"></div>
          </div>
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-green-700 uppercase tracking-wider mb-3">Active / Approved / Announced</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{ongoing.map((p,i) => <ProjectCard key={i} {...p}/>)}</div>
          </div>
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Completed</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{completed.map((p,i) => <ProjectCard key={i} {...p}/>)}</div>
          </div>
        </section>
        <section>
          <div className="flex items-center gap-3 mb-5">
            <h2 className="text-xl font-bold text-primary-900">Consultancy Projects</h2>
            <div className="flex-1 h-px bg-primary-100"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{projects.consultancy.map((p,i) => <ProjectCard key={i} {...p}/>)}</div>
        </section>
      </div>
    </main>
  );
}
