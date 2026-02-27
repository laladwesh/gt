import data from '../data/siteData.json';

function DownloadCard({ name, description, link }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-primary-200 transition-all p-4 flex items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center shrink-0">
          <svg className="w-5 h-5 text-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
        </div>
        <div>
          <p className="font-semibold text-gray-800 text-sm">{name}</p>
          <p className="text-xs text-gray-500 mt-0.5">{description}</p>
        </div>
      </div>
      <a href={link} className="shrink-0 flex items-center gap-1.5 bg-primary-700 hover:bg-primary-800 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors">
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
        </svg>
        Download
      </a>
    </div>
  );
}

export default function Download() {
  const { downloads } = data;
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary-900">Download</h1>
          <div className="w-12 h-1 bg-accent-500 rounded mt-2"></div>
        </div>
        <section className="mb-10">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-primary-900 mb-2">Course Project (EE 664)</h2>
                <p className="text-sm text-gray-600 mb-4">Download the complete project list for EE 664 — Fundamentals of VLSI CAD.</p>
                <a href="/" className="inline-flex items-center gap-2 bg-primary-700 hover:bg-primary-800 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors shadow-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                  </svg>
                  Download Course Project List
                </a>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="flex items-center gap-3 mb-5">
            <h2 className="text-xl font-bold text-primary-900">Open Source Software</h2>
            <div className="flex-1 h-px bg-primary-100"></div>
          </div>
          <p className="text-sm text-gray-500 mb-5">For the completion of some course projects, you may need the following open-source software tools:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {downloads.software.map((s) => <DownloadCard key={s.name} {...s}/>)}
          </div>
        </section>
        <div className="mt-10 bg-blue-50 border border-blue-200 rounded-xl p-5 flex items-start gap-3">
          <svg className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <p className="text-sm text-blue-800">These downloads are made available for academic and educational use only. Please contact <span className="font-semibold">trivedi@iitg.ac.in</span> for any queries regarding the software tools.</p>
        </div>
      </div>
    </main>
  );
}
