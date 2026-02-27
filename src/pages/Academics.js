import { useState } from 'react';
import data from '../data/siteData.json';

function AccordionSection({ title, children, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen || false);
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <button className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors" onClick={() => setOpen(!open)}>
        <span className="font-semibold text-primary-900">{title}</span>
        <svg className={`w-5 h-5 text-primary-600 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
        </svg>
      </button>
      {open && <div className="px-6 pb-6">{children}</div>}
    </div>
  );
}

function CourseGroup({ label, courses, color }) {
  const colors = { blue: 'bg-blue-50 text-blue-800 border-blue-100', green: 'bg-green-50 text-green-800 border-green-100', purple: 'bg-purple-50 text-purple-800 border-purple-100' };
  return (
    <div className="mb-5">
      <span className={`inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border mb-3 ${colors[color]}`}>{label}</span>
      <ul className="space-y-1.5">
        {courses.map((c,i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-400 mt-2 shrink-0"></span>
            {c}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Academics() {
  const { academics } = data;
  const supervision = academics.projectSupervision || {};
  const phd = supervision.phd || {};
  const mtech = supervision.mtech || {};
  const btech = supervision.btech || {};
  const statsList = [
    { label: 'PhD',    stats: `${phd.completed ?? '06'} Defended · ${phd.submitted ?? '04'} Submitted · ${phd.synopsis ?? '02'} Synopsis · ${phd.ongoing ?? '06'} Ongoing` },
    { label: 'M.Tech', stats: `${mtech.completed ?? '25'} Completed · ${mtech.ongoing ?? '07'} Ongoing` },
    { label: 'B.Tech', stats: `${btech.completed ?? '67'} Completed · ${btech.ongoing ?? '06'} Ongoing` },
  ];

  function QualificationList({ items }) {
    if (!items || !items.length) return <p className="text-sm text-gray-600">No qualifications listed.</p>;
    return (
      <ul className="space-y-2">
        {items.map((q,i) => (
          <li key={i} className="text-sm text-gray-700">
            <span className="font-semibold">{q.degree}</span>{q.field ? ` — ${q.field}` : ''} <span className="text-gray-500">@ {q.institution}{q.year ? `, ${q.year}` : ''}</span>
          </li>
        ))}
      </ul>
    );
  }

  function ExperienceList({ items }) {
    const arr = items || data.experience || [];
    if (!arr.length) return <p className="text-sm text-gray-600">No experience listed.</p>;
    return (
      <div className="space-y-2">
        {arr.map((e,i) => (
          <div key={i} className="p-3 bg-white border rounded-lg">
            <p className="font-semibold text-sm text-primary-800">{e.position || e.role}</p>
            <p className="text-xs text-gray-600 mt-0.5">{e.nature || e.org || ''} {e.period ? `· ${e.period}` : ''}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary-900">Academics</h1>
          <div className="w-12 h-1 bg-accent-500 rounded mt-2"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {statsList.map((s) => (
            <div key={s.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 text-center hover:shadow-md transition-shadow">
              <div className="text-2xl font-bold text-primary-700 mb-1">{s.label}</div>
              <div className="text-xs text-gray-500 leading-relaxed">{s.stats}</div>
            </div>
          ))}
        </div>
        <div className="space-y-4">
          <AccordionSection title="Courses Taught" defaultOpen={true}>
            <CourseGroup label="Undergraduate" color="blue" courses={academics.ugCourses || academics.coursesTaught.filter(c=>c.toLowerCase().includes('ug') || c.match(/UG|Undergraduate/))}/>
            <CourseGroup label="Postgraduate" color="green" courses={academics.pgCourses || academics.coursesTaught.filter(c=>c.toLowerCase().includes('pg') || c.match(/PG|Postgraduate/))}/>
            <CourseGroup label="Elective / Open Elective" color="purple" courses={academics.electiveCourses || []}/>
            {academics.coursesTaught && (
              <div className="mt-4">
                <h4 className="text-sm font-semibold text-primary-800 mb-2">Full course list</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700">
                  {academics.coursesTaught.map((c,i) => <li key={i} className="p-2 bg-white border rounded">{c}</li>)}
                </ul>
              </div>
            )}
          </AccordionSection>

          <AccordionSection title="Personal & Contact">
            <div className="space-y-2">
              {academics.personal ? (
                <div>
                  <p className="font-semibold">{academics.personal.name}</p>
                  <p className="text-sm text-gray-600">{academics.personal.designation}</p>
                  <p className="text-sm text-gray-600">{academics.personal.postalAddress}</p>
                  <p className="text-sm text-gray-600">{(academics.personal.emails || []).join(' · ')}</p>
                  <p className="text-sm text-gray-600">{(academics.personal.phoneNumbers || []).join(' · ')}</p>
                </div>
              ) : <p className="text-sm text-gray-600">No personal info available.</p>}
            </div>
          </AccordionSection>

          <AccordionSection title="Qualifications">
            <QualificationList items={academics.qualifications}/>
          </AccordionSection>

          <AccordionSection title="Employment Experience">
            <ExperienceList items={academics.employmentExperience}/>
          </AccordionSection>

          <AccordionSection title="Project Supervision">
            <div className="text-sm text-gray-700">
              <p>PhD: {phd.completed ?? '20'} completed · {phd.ongoing ?? '18'} ongoing</p>
              <p>M.Tech: {mtech.completed ?? '61'} completed · {mtech.ongoing ?? '7'} ongoing</p>
              <p>B.Tech: {btech.completed ?? '76'} completed · {btech.ongoing ?? '4'} ongoing</p>
            </div>
          </AccordionSection>

          <AccordionSection title="Selected FDPs / Workshops / Trainings">
            <div className="space-y-3 mt-2">
              {academics.selectedFDPs && academics.selectedFDPs.map((f,i)=>(
                <div key={i} className="p-3 bg-white border rounded"> <p className="font-semibold text-sm">{f.title}</p><p className="text-xs text-gray-500">{f.startDate} — {f.endDate} · {f.participants ?? ''} participants</p></div>
              ))}
              {academics.workshopsConducted && academics.workshopsConducted.map((w,i)=>(
                <div key={`w${i}`} className="p-3 bg-white border rounded"> <p className="font-semibold text-sm">{w.title}</p><p className="text-xs text-gray-500">{w.startDate} — {w.endDate} · {w.venue}</p></div>
              ))}
              {academics.trainingConducted && academics.trainingConducted.map((t,i)=>(
                <div key={`t${i}`} className="p-3 bg-white border rounded"> <p className="font-semibold text-sm">{t.title}</p><p className="text-xs text-gray-500">{t.startDate} — {t.endDate} · {t.venue}</p></div>
              ))}
            </div>
          </AccordionSection>

          <AccordionSection title={`Invited Talks (${academics.invitedTalks.length})`}>
            <div className="space-y-3 mt-2">
              {academics.invitedTalks.map((t,i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all">
                  <span className="shrink-0 w-7 h-7 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-xs font-bold">{i+1}</span>
                  <div>
                    <p className="text-sm font-medium text-gray-800">{t.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{t.venue} &nbsp;&middot;&nbsp; {t.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </AccordionSection>

          <AccordionSection title="Visiting Faculty / Expert">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
              {academics.visitingFaculty.map((v,i) => (
                <div key={i} className="bg-primary-50 border border-primary-100 rounded-lg p-4">
                  <p className="font-semibold text-primary-800 text-sm">{v.role}</p>
                  <p className="text-gray-700 text-sm mt-0.5">{v.org}</p>
                  <p className="text-xs text-gray-400 mt-1">{v.period}</p>
                </div>
              ))}
            </div>
          </AccordionSection>

          <AccordionSection title={`Workshops / Conferences Organized (${academics.workshops.length})`}>
            <div className="space-y-3 mt-2">
              {academics.workshops.map((w,i) => (
                <div key={i} className="border-l-4 border-primary-400 pl-4 py-1">
                  <p className="text-sm font-semibold text-gray-800">{w.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{w.date}</p>
                  <span className="inline-block mt-1 text-xs bg-accent-500/10 text-accent-600 font-medium px-2 py-0.5 rounded">{w.role}</span>
                </div>
              ))}
            </div>
          </AccordionSection>
        </div>
      </div>
    </main>
  );
}
