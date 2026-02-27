import { useState } from 'react';
import data from '../data/siteData.json';

function AwardBadge({ label }) {
  return (
    <span className="inline-flex items-center gap-1 mt-1.5 text-xs bg-yellow-50 text-yellow-700 border border-yellow-200 px-2 py-0.5 rounded-full font-medium">
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3l14 0M5 3a2 2 0 00-2 2v1c0 .825.504 1.532 1.224 1.83L12 9.5l7.776-2.67A2 2 0 0021 6V5a2 2 0 00-2-2M5 3h14M9 21l3-8 3 8M9 21h6"/>
      </svg>
      {label}
    </span>
  );
}

function TypeBadge({ label }) {
  return (
    <span className="inline-flex items-center gap-1 mt-1.5 text-xs bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-full font-medium">
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
      </svg>
      {label}
    </span>
  );
}

function PubItem({ index, authors, title, venue, year, award, type }) {
  return (
    <div className="flex gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group border border-transparent hover:border-gray-100">
      <span className="shrink-0 w-7 h-7 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-xs font-bold group-hover:bg-primary-200 transition-colors">{index}</span>
      <div>
        <p className="text-sm text-gray-500 font-medium">{authors}</p>
        <p className="text-sm font-semibold text-gray-800 mt-0.5 leading-snug">&ldquo;{title}&rdquo;</p>
        <p className="text-xs text-gray-500 mt-1">{venue}{year ? ` · ${year}` : ''}</p>
        {award && <AwardBadge label={award}/>}
        {type && <TypeBadge label={type}/>}
      </div>
    </div>
  );
}

export default function Publications() {
  const { publications } = data;
  const tabs = [
    { key: 'journals',     label: 'Journal Papers',    count: publications.journals.length },
    { key: 'conferences',  label: 'Conference Papers',  count: publications.conferences.length },
    { key: 'books',        label: 'Books',              count: publications.books.length },
    { key: 'bookChapters', label: 'Book Chapters',      count: publications.bookChapters.length },
    { key: 'patents',      label: 'Patents',            count: publications.patents.length },
    { key: 'shortPapers',  label: 'Short Papers',       count: publications.shortPapers.length },
  ];
  const [activeTab, setActiveTab] = useState('journals');

  const renderTab = () => {
    if (activeTab === 'journals')     return publications.journals.map((p,i)     => <PubItem key={i} index={i+1} {...p}/>);
    if (activeTab === 'conferences')  return publications.conferences.map((p,i)  => <PubItem key={i} index={i+1} {...p}/>);
    if (activeTab === 'books')        return publications.books.map((p,i)        => <PubItem key={i} index={i+1} {...p}/>);
    if (activeTab === 'bookChapters') return publications.bookChapters.map((p,i) => <PubItem key={i} index={i+1} {...p}/>);
    if (activeTab === 'shortPapers')  return publications.shortPapers.map((p,i)  => <PubItem key={i} index={i+1} {...p}/>);
    if (activeTab === 'patents') return publications.patents.map((p,i) => (
      <div key={i} className="flex gap-3 p-3 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-colors group">
        <span className="shrink-0 w-7 h-7 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-xs font-bold group-hover:bg-primary-200 transition-colors">{i+1}</span>
        <div>
          <p className="text-sm text-gray-500 font-medium">{p.inventors}</p>
          <p className="text-sm font-semibold text-gray-800 mt-0.5 leading-snug">&ldquo;{p.title}&rdquo;</p>
          <p className="text-xs text-gray-500 mt-1">Patent No.: {p.number}</p>
          <span className="inline-block mt-1.5 text-xs bg-primary-50 text-primary-700 border border-primary-100 px-2 py-0.5 rounded-full font-medium">{p.status}</span>
        </div>
      </div>
    ));
    return null;
  };

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary-900">Publications</h1>
          <div className="w-12 h-1 bg-accent-500 rounded mt-2"></div>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-8">
          {tabs.map((tab) => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
              className={`rounded-xl p-3 text-center transition-all ${activeTab === tab.key ? 'bg-primary-700 text-white shadow-md' : 'bg-white border border-gray-100 text-gray-700 hover:border-primary-200 hover:bg-primary-50'}`}>
              <div className={`text-xl font-bold ${activeTab === tab.key ? 'text-white' : 'text-primary-700'}`}>{tab.count}</div>
              <div className="text-xs mt-0.5 leading-tight">{tab.label}</div>
            </button>
          ))}
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-1">
          {renderTab()}
        </div>
      </div>
    </main>
  );
}
