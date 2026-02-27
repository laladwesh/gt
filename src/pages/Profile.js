import data from '../data/siteData.json';

function SectionHeader({ title }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <h2 className="text-xl font-bold text-primary-900">{title}</h2>
      <div className="flex-1 h-px bg-primary-200"></div>
    </div>
  );
}

export default function Profile() {
  const { qualifications, experience, profile } = data;
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary-900">Profile</h1>
          <div className="w-12 h-1 bg-accent-500 rounded mt-2"></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <div className="w-36 h-36 mx-auto rounded-full overflow-hidden bg-gradient-to-br from-primary-700 to-primary-900 flex items-center justify-center mb-4 border-4 border-primary-100 shadow">
                <svg className="w-20 h-20 text-white/60" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
                </svg>
              </div>
              <h2 className="text-center font-bold text-lg text-gray-900 mb-0.5">{profile.name}</h2>
              <p className="text-center text-accent-600 font-medium text-sm mb-1">{profile.title}</p>
              <p className="text-center text-gray-500 text-xs mb-5">Dept. of EEE, IIT Guwahati</p>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2 text-gray-700">
                  <svg className="w-4 h-4 text-primary-600 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                  <span className="break-all">{profile.email1}</span>
                </div>
                <div className="flex items-start gap-2 text-gray-700">
                  <svg className="w-4 h-4 text-primary-600 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                  <span>{profile.phone}</span>
                </div>
                <div className="flex items-start gap-2 text-gray-700">
                  <svg className="w-4 h-4 text-primary-600 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  <span>{profile.address}</span>
                </div>
                <div className="flex items-start gap-2 text-gray-700">
                  <svg className="w-4 h-4 text-primary-600 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.07a1 1 0 011.447.894v6.352a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                  </svg>
                  <span>{profile.skype} (Skype)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-10">
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <SectionHeader title="Qualification"/>
              <div className="space-y-5">
                {qualifications.map((q, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="shrink-0 w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                      <svg className="w-6 h-6 text-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M12 14l9-5-9-5-9 5 9 5z"/><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-semibold text-gray-900">{q.degree}</h3>
                          <p className="text-primary-600 text-sm font-medium">{q.field}</p>
                        </div>
                        <span className="shrink-0 bg-primary-50 text-primary-700 text-xs font-semibold px-3 py-1 rounded-full border border-primary-100">{q.year}</span>
                      </div>
                      <p className="text-gray-500 text-sm mt-1">{q.institution}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <SectionHeader title="Experience"/>
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-primary-100"></div>
                <div className="space-y-6 pl-10">
                  {experience.map((exp, i) => (
                    <div key={i} className="relative">
                      <div className={`absolute -left-6 top-1 w-3 h-3 rounded-full border-2 ${exp.current ? 'bg-accent-500 border-accent-500' : 'bg-primary-300 border-primary-400'}`}></div>
                      <div className={`rounded-xl p-4 border ${exp.current ? 'bg-primary-50 border-primary-200' : 'bg-gray-50 border-gray-100'}`}>
                        <div className="flex items-start justify-between gap-2 flex-wrap">
                          <h3 className={`font-semibold text-sm leading-snug ${exp.current ? 'text-primary-800' : 'text-gray-800'}`}>{exp.role}</h3>
                          {exp.current && <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full">Current</span>}
                        </div>
                        <p className="text-gray-600 text-sm mt-0.5">{exp.org}</p>
                        <p className="text-gray-400 text-xs mt-1.5">{exp.period}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
