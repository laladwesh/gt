import data from '../data/siteData.json';

export default function Contact() {
  const { profile } = data;
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary-900">Contact</h1>
          <div className="w-12 h-1 bg-accent-500 rounded mt-2"></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-700 to-primary-900 flex items-center justify-center text-white font-bold text-xl shadow">GT</div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{profile.name}</h2>
                  <p className="text-primary-600 font-semibold text-sm">{profile.title}</p>
                  <p className="text-gray-500 text-sm">Dept. of Electronics and Electrical Engg.</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary-50 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Address</p>
                    <p className="text-sm text-gray-700 mt-0.5 leading-relaxed">{profile.department}<br/>{profile.institution}<br/>Guwahati - 781039, Assam, India</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary-50 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Phone</p>
                    <p className="text-sm text-gray-700 mt-0.5">{profile.phone} <span className="text-gray-400">(Office)</span></p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary-50 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Email</p>
                    <a href={`mailto:${profile.email1}`} className="text-sm text-primary-600 hover:text-primary-800 font-medium block mt-0.5 transition-colors">{profile.email1}</a>
                    {profile.email2 && <a href={`mailto:${profile.email2}`} className="text-sm text-primary-600 hover:text-primary-800 font-medium block transition-colors">{profile.email2}</a>}
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary-50 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.07a1 1 0 011.447.894v6.352a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Skype</p>
                    <p className="text-sm text-gray-700 mt-0.5">{profile.skype}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-br from-primary-900/90 via-primary-800/80 to-primary-700/70 p-8 flex flex-col items-center justify-center min-h-48 text-white text-center">
                <svg className="w-12 h-12 text-white/80 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <p className="font-bold text-lg">IIT Guwahati</p>
                <p className="text-white/70 text-sm mt-1">North Guwahati, Assam 781039</p>
                <a href="https://www.iitg.ac.in" target="_blank" rel="noreferrer" className="mt-4 bg-white/20 hover:bg-white/30 border border-white/30 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">Visit IIT Guwahati Website</a>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-bold text-primary-900 mb-4">Department Information</h3>
              <div className="space-y-3 text-sm">
                {[profile.department, profile.institution, 'Guwahati – 781039, Assam, India', profile.officeLocation].map((item,i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full shrink-0 ${i===3 ? 'bg-accent-500' : 'bg-primary-400'}`}></span>
                    <span className="text-gray-600">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-primary-50 border border-primary-100 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <svg className="w-5 h-5 text-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <h3 className="font-bold text-primary-900">Office Hours</h3>
              </div>
              <p className="text-sm text-gray-600">{profile.officeHours}<br/><span className="text-gray-400 text-xs mt-1 block">Subject to availability. Please email for an appointment.</span></p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
