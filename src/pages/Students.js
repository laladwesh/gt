import { useState } from 'react';
import data from '../data/siteData.json';

function InitialAvatar({ name, size }) {
  const initials = name.split(' ').filter(w => /^[A-Z]/.test(w)).slice(0,2).map(w=>w[0]).join('');
  const colors = ['bg-blue-600','bg-indigo-600','bg-purple-600','bg-teal-600','bg-cyan-600','bg-emerald-600'];
  const color = colors[name.charCodeAt(0) % colors.length];
  const sz = size === 'lg' ? 'w-14 h-14 text-xl' : 'w-10 h-10 text-sm';
  return <div className={`${sz} ${color} rounded-full flex items-center justify-center text-white font-bold shrink-0`}>{initials || '?'}</div>;
}

export default function Students() {
  const { students } = data;
  const tabs = [
    { key: 'phd-ongoing',   label: 'PhD (Ongoing)',   count: students.ongoingPhD.length },
    { key: 'phd-completed', label: 'PhD (Completed)', count: students.completedPhD.length },
    { key: 'mtech',         label: 'M.Tech',          count: students.mtechCompleted.length + students.mtechOngoing.length },
    { key: 'btech',         label: 'B.Tech',          count: students.btechCompleted.length + students.btechOngoing.length },
  ];
  const [activeTab, setActiveTab] = useState('phd-ongoing');
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary-900">Students</h1>
          <div className="w-12 h-1 bg-accent-500 rounded mt-2"></div>
        </div>
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab) => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab===tab.key ? 'bg-primary-700 text-white shadow' : 'bg-white text-gray-600 border border-gray-200 hover:border-primary-300 hover:text-primary-700'}`}>
              {tab.label}
              <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${activeTab===tab.key ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'}`}>{tab.count}</span>
            </button>
          ))}
        </div>

        {activeTab === 'phd-ongoing' && (
          <div className="space-y-4">
            <p className="text-sm text-gray-500 mb-4">{students.ongoingPhD.length} current research scholars</p>
            {students.ongoingPhD.map((s,i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-primary-100 transition-all p-6">
                <div className="flex items-start gap-4">
                  <InitialAvatar name={s.name} size="lg"/>
                  <div className="flex-1">
                    <div className="flex items-start justify-between flex-wrap gap-2">
                      <div>
                        <h3 className="text-base font-bold text-gray-900">{s.name}</h3>
                        <p className="text-xs text-primary-600 font-medium mt-0.5">{s.status}</p>
                      </div>
                      <span className="bg-green-100 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full">Ongoing</span>
                    </div>
                    <p className="text-xs font-semibold text-gray-500 mt-2 mb-2 uppercase tracking-wide">Research Area</p>
                    <p className="text-xs text-primary-700 bg-primary-50 px-3 py-1.5 rounded-lg font-medium inline-block">{s.area}</p>
                    <p className="text-sm text-gray-600 mt-3 leading-relaxed">{s.bio}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'phd-completed' && (
          <div className="space-y-3">
            {students.completedPhD.map((s,i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-primary-100 transition-all p-5">
                <div className="flex items-start gap-4">
                  <InitialAvatar name={s.name} size="md"/>
                  <div className="flex-1">
                    <div className="flex items-start justify-between flex-wrap gap-2">
                      <h3 className="font-bold text-gray-900 text-sm">{s.name}</h3>
                      <span className="bg-primary-50 text-primary-700 text-xs font-semibold px-2.5 py-1 rounded-full border border-primary-100">{s.year}</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1 leading-snug">{s.area}</p>
                    {s.current && <p className="text-xs text-gray-400 mt-1 italic">Currently: {s.current}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'mtech' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-primary-700 uppercase tracking-wider mb-3">Ongoing ({students.mtechOngoing.length})</h3>
              <div className="flex flex-wrap gap-2">
                {students.mtechOngoing.map((name,i) => (
                  <span key={i} className="bg-blue-50 text-blue-800 border border-blue-100 text-xs font-medium px-3 py-1.5 rounded-lg">{name}</span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Completed ({students.mtechCompleted.length})</h3>
              <div className="flex flex-wrap gap-2">
                {students.mtechCompleted.map((name,i) => (
                  <span key={i} className="bg-gray-100 text-gray-700 border border-gray-200 text-xs font-medium px-3 py-1.5 rounded-lg">{name}</span>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'btech' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-primary-700 uppercase tracking-wider mb-3">Ongoing ({students.btechOngoing.length})</h3>
              <div className="flex flex-wrap gap-2">
                {students.btechOngoing.map((s,i) => (
                  <span key={i} className="bg-blue-50 text-blue-800 border border-blue-100 text-xs font-medium px-3 py-1.5 rounded-lg">{s.name} <span className="text-blue-500">({s.year})</span></span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Completed ({students.btechCompleted.length})</h3>
              <div className="flex flex-wrap gap-2">
                {students.btechCompleted.map((s,i) => (
                  <span key={i} className={`bg-gray-100 border border-gray-200 text-xs font-medium px-3 py-1.5 rounded-lg ${s.note ? 'text-accent-700 bg-accent-50 border-accent-200' : 'text-gray-700'}`}>
                    {s.name} <span className="text-gray-400">({s.year})</span>{s.note && <span className="ml-1 font-bold"> — {s.note}</span>}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
