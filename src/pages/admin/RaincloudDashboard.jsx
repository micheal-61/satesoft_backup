import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';

// Using Bootstrap Icons
import { 
  Display, Building, Stack, ShieldCheck, ClockHistory, 
  People, Tools, BoxSeam, Hammer, Gear, 
  Fullscreen, Type, PersonCircle, Sliders, ChevronDown
} from 'react-bootstrap-icons';

const Sidebar = ({ theme, setTheme }) => {
  const [progressExpanded, setProgressExpanded] = useState(true);

  return (
    <aside className={`w-64 flex-shrink-0 border-r border-border transition-colors duration-300 flex flex-col ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-surface text-text'}`}>
      <div className="h-16 flex items-center px-6 border-b border-border">
        <div className="w-8 h-8 rounded-lg bg-primary-500 mr-3 shadow-md shadow-primary-500/30"></div>
        <span className="font-bold text-xl tracking-tight">Raincloud</span>
        <button className="ml-auto text-text/50 hover:text-text transition-colors"><Sliders /></button>
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-3">
          {[
            { icon: <Display />, label: 'Digital screen' },
            { icon: <Building />, label: 'Workplace', hasChevron: true },
            { icon: <Stack />, label: 'Quantity', hasChevron: true },
            { icon: <ShieldCheck />, label: 'Security', hasChevron: true },
          ].map((item, idx) => (
            <li key={idx}>
              <Link to="#" className="flex items-center px-3 py-2.5 rounded-lg text-text/70 hover:bg-bg hover:text-primary-600 transition-colors">
                <span className="mr-3 text-lg">{item.icon}</span> 
                <span className="font-medium text-sm">{item.label}</span>
                {item.hasChevron && <ChevronDown className="ml-auto opacity-50" size={12} />}
              </Link>
            </li>
          ))}
          
          <li>
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); setProgressExpanded(!progressExpanded); }}
              className="flex items-center px-3 py-2.5 rounded-lg bg-primary-50 text-primary-600 transition-colors"
            >
              <span className="mr-3 text-lg"><ClockHistory /></span> 
              <span className="font-bold text-sm">Progress</span> 
              <ChevronDown className={`ml-auto transition-transform ${progressExpanded ? 'rotate-180' : ''}`} size={12} />
            </a>
            {progressExpanded && (
              <ul className="mt-1 space-y-1 pl-11 pr-3">
                <li><Link to="#" className="block px-3 py-2 rounded-lg text-text/70 hover:bg-bg hover:text-primary-600 transition-colors text-sm font-medium">Management</Link></li>
                <li><Link to="#" className="block px-3 py-2 rounded-lg bg-primary-500 text-white shadow-md transition-colors text-sm font-bold">Dashboard</Link></li>
              </ul>
            )}
          </li>

          {[
            { icon: <People />, label: 'Workmen', hasChevron: true },
            { icon: <Tools />, label: 'Engineering', hasChevron: true },
            { icon: <BoxSeam />, label: 'Warehouse' },
            { icon: <Hammer />, label: 'Materials', hasChevron: true },
            { icon: <Gear />, label: 'System setup', hasChevron: true },
          ].map((item, idx) => (
            <li key={idx}>
              <Link to="#" className="flex items-center px-3 py-2.5 rounded-lg text-text/70 hover:bg-bg hover:text-primary-600 transition-colors mt-1">
                <span className="mr-3 text-lg">{item.icon}</span> 
                <span className="font-medium text-sm">{item.label}</span>
                {item.hasChevron && <ChevronDown className="ml-auto opacity-50" size={12} />}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-border mt-auto">
        <div className="flex bg-bg rounded-lg p-1">
          <button className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all ${theme === 'auto' ? 'bg-white shadow-sm text-text' : 'text-text/50 hover:text-text'}`} onClick={() => setTheme('auto')}>Auto</button>
          <button className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all ${theme === 'light' ? 'bg-white shadow-sm text-text' : 'text-text/50 hover:text-text'}`} onClick={() => setTheme('light')}>Light</button>
          <button className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all ${theme === 'dark' ? 'bg-gray-800 shadow-sm text-white' : 'text-text/50 hover:text-text'}`} onClick={() => setTheme('dark')}>Dark</button>
        </div>
      </div>
    </aside>
  );
};

const Topbar = () => {
  return (
    <header className="h-16 flex items-center justify-between px-6 bg-surface border-b border-border">
      <div className="flex gap-2">
        {['Project', 'Scene', 'Report', 'Reform', 'Management'].map((tab, idx) => (
          <div key={idx} className="flex items-center px-4 py-1.5 rounded-full bg-bg text-text/70 text-sm font-medium border border-transparent hover:border-border cursor-pointer transition-colors">
            {tab} <span className="ml-2 hover:text-danger">&times;</span>
          </div>
        ))}
        <div className="flex items-center px-4 py-1.5 rounded-full bg-primary-50 text-primary-600 border border-primary-200 text-sm font-bold shadow-sm cursor-pointer transition-colors">
          Dashboard <span className="ml-2 hover:text-danger">&times;</span>
        </div>
      </div>
      <div className="flex items-center gap-4 text-text/70">
        <button className="flex items-center gap-2 hover:text-primary-500 transition-colors text-sm font-medium"><Fullscreen /> Screen</button>
        <button className="flex items-center gap-2 hover:text-primary-500 transition-colors text-sm font-medium"><Type /> Font</button>
        <button className="flex items-center gap-2 text-text font-bold"><PersonCircle className="text-xl text-primary-500" /> Zan</button>
        <button className="hover:text-primary-500 transition-colors"><Sliders /></button>
      </div>
    </header>
  );
};

const DashboardContent = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('/api/stats');
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };
    fetchStats();
  }, []);

  const getStat = (title, defaultVal) => {
    const item = stats.find(s => s.title === title);
    return item ? item.value : defaultVal;
  };

  return (
    <div className="p-6">
      {/* Timeline Stepper */}
      <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm mb-6 flex justify-between relative">
        <div className="absolute top-10 left-10 right-10 h-0.5 bg-border z-0"></div>
        {['24-02-15', '24-03-15', '24-04-15', '24-05-15', '', '', ''].map((date, idx) => (
          <div className="relative z-10 flex flex-col items-center gap-2" key={idx}>
            <div className={`w-4 h-4 rounded-full border-2 ${idx < 3 ? 'bg-primary-500 border-primary-500' : idx === 3 ? 'bg-white border-primary-500 ring-4 ring-primary-100' : 'bg-white border-border'}`}></div>
            <div className={`text-sm font-medium ${idx <= 3 ? 'text-text' : 'text-text/40'}`}>Item</div>
            <div className="text-xs text-text/50 font-mono">{date || 'TBD'}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Progress of project */}
        <div className="md:col-span-3">
          <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl p-6 text-white shadow-lg h-full flex flex-col">
            <h6 className="font-bold mb-6 text-primary-100 uppercase tracking-wider text-xs">Progress of project</h6>
            
            <div className="mb-6 flex justify-between items-end border-b border-white/20 pb-4">
              <span className="text-primary-100 font-medium text-sm">Countdown</span>
              <div className="text-right">
                <span className="text-4xl font-black">{getStat('Countdown', '186 days').split(' ')[0]}</span>
                <span className="text-primary-200 ml-1 font-medium">days</span>
              </div>
            </div>
            
            <div className="mb-6 flex justify-between items-end border-b border-white/20 pb-4">
              <span className="text-primary-100 font-medium text-sm">Completed</span>
              <div className="text-right">
                <span className="text-2xl font-bold">{getStat('Completed', '298 days').split(' ')[0]}</span>
                <span className="text-primary-200 ml-1 text-sm font-medium">days</span>
              </div>
            </div>
            
            <div className="mt-auto space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-primary-200/70">Total days</span>
                <span className="font-semibold">{getStat('Total days', '478 days')}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-primary-200/70">Begin</span>
                <span className="font-mono">23-09-05</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-primary-200/70">Completion</span>
                <span className="font-mono">24-09-20</span>
              </div>
            </div>
          </div>
        </div>

        {/* Plan of today */}
        <div className="md:col-span-4">
          <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm h-full">
            <h6 className="font-bold mb-6 text-text uppercase tracking-wider text-xs">Plan of today</h6>
            
            <div className="flex items-center gap-6 mb-8">
              <div className="relative w-20 h-20 flex-shrink-0">
                <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#EEF2F6" strokeWidth="3" />
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#7CB518" strokeWidth="3" strokeDasharray="50, 100" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-lg font-bold text-text">50%</span>
                </div>
              </div>
              <div className="flex-1 space-y-3">
                <div className="flex items-center text-sm">
                  <div className="w-2 h-2 rounded-full bg-primary-500 mr-3"></div>
                  <span className="text-text/70 flex-1">Scheduled</span>
                  <span className="font-bold text-text">12 <span className="text-xs font-normal text-text/50">Item</span></span>
                </div>
                <div className="flex items-center text-sm">
                  <div className="w-2 h-2 rounded-full bg-border mr-3"></div>
                  <span className="text-text/70 flex-1">Completed</span>
                  <span className="font-bold text-text">6 <span className="text-xs font-normal text-text/50">Item</span></span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="relative w-20 h-20 flex-shrink-0">
                <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#EEF2F6" strokeWidth="3" />
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#EF4444" strokeWidth="3" strokeDasharray="100, 100" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-lg font-bold text-text">100%</span>
                </div>
              </div>
              <div className="flex-1 space-y-3">
                <div className="flex items-center text-sm">
                  <div className="w-2 h-2 rounded-full bg-danger mr-3"></div>
                  <span className="text-text/70 flex-1">Rectification</span>
                  <span className="font-bold text-text">10 <span className="text-xs font-normal text-text/50">Item</span></span>
                </div>
                <div className="flex items-center text-sm">
                  <div className="w-2 h-2 rounded-full bg-border mr-3"></div>
                  <span className="text-text/70 flex-1">Not rectified</span>
                  <span className="font-bold text-text">0 <span className="text-xs font-normal text-text/50">Item</span></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Nearly 30 days to completion */}
        <div className="md:col-span-5">
          <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h6 className="font-bold text-text uppercase tracking-wider text-xs m-0">Nearly 30 days to completion</h6>
              <div className="flex gap-4 text-xs font-medium text-text/70">
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-primary-500"></div> Safety</div>
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-danger"></div> Risks</div>
              </div>
            </div>
            
            <div className="flex-1 flex flex-col justify-center space-y-5 relative pl-16">
              {/* x-axis guides */}
              <div className="absolute inset-0 left-16 flex justify-between pointer-events-none">
                {[...Array(11)].map((_, i) => (
                  <div key={i} className="h-full border-l border-border/50"></div>
                ))}
              </div>
              
              {[ 
                {lbl: 'Item 1', p: '39%', c: 'bg-danger'}, 
                {lbl: 'Item 2', p: '25%', c: 'bg-primary-500'}, 
                {lbl: 'Item 3', p: '66%', c: 'bg-danger'}, 
                {lbl: 'Item 4', p: '84%', c: 'bg-primary-500'} 
              ].map((b, i) => (
                <div className="flex items-center relative z-10" key={i}>
                  <span className="absolute -left-16 w-14 text-right text-sm font-medium text-text/70">{b.lbl}</span>
                  <div className="h-4 w-full bg-bg rounded-full overflow-hidden flex items-center">
                    <div className={`h-full ${b.c} rounded-full`} style={{ width: b.p }}></div>
                  </div>
                  <span className="absolute text-xs font-bold text-text" style={{ left: `calc(${b.p} + 8px)` }}>{b.p}</span>
                </div>
              ))}
              
              <div className="flex justify-between text-[10px] text-text/40 pt-2 absolute bottom-0 left-16 right-0 translate-y-full">
                <span>0</span><span>20</span><span>40</span><span>60</span><span>80</span><span>100</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Overdue of project */}
        <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm overflow-hidden">
          <h6 className="font-bold mb-4 text-text uppercase tracking-wider text-xs">Overdue of project</h6>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-text/50 uppercase bg-bg border-b border-border">
                <tr>
                  <th className="px-4 py-3 font-semibold">Subtask</th>
                  <th className="px-4 py-3 font-semibold">Coordinator</th>
                  <th className="px-4 py-3 font-semibold">Planned period</th>
                  <th className="px-4 py-3 font-semibold">Overtime</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[30, 24, 18, 15, 10].map((overtime, idx) => (
                  <tr key={idx} className="hover:bg-bg/50 transition-colors">
                    <td className="px-4 py-3 font-medium text-text">Text</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center text-xs font-bold text-primary-600">Z</div>
                        <span>Zan</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-mono text-text/70 text-xs">24-02-15 - 24-10-07</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold rounded-md bg-danger/10 text-danger">{overtime}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Risk warning of project */}
        <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm overflow-hidden">
          <h6 className="font-bold mb-4 text-text uppercase tracking-wider text-xs">Risk warning of project</h6>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-text/50 uppercase bg-bg border-b border-border">
                <tr>
                  <th className="px-4 py-3 font-semibold">Subtask</th>
                  <th className="px-4 py-3 font-semibold">Coordinator</th>
                  <th className="px-4 py-3 font-semibold">Progress</th>
                  <th className="px-4 py-3 font-semibold">Planned</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[30, 50, 30, 70, 30].map((prog, idx) => (
                  <tr key={idx} className="hover:bg-bg/50 transition-colors">
                    <td className="px-4 py-3 font-medium text-text">Text</td>
                    <td className="px-4 py-3">Zan</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-2 bg-bg rounded-full overflow-hidden">
                          <div className="h-full bg-primary-500 rounded-full" style={{width: `${prog}%`}}></div>
                        </div>
                        <span className="font-bold text-xs">{prog}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-bold text-text/70">{prog + 10}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default function RaincloudDashboard() {
  const [theme, setTheme] = useState('light');

  return (
    <div className={`min-h-screen flex font-sans ${theme === 'dark' ? 'dark' : ''} bg-bg text-text`}>
      <Sidebar theme={theme} setTheme={setTheme} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <Topbar />
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<DashboardContent />} />
            <Route path="*" element={<DashboardContent />} />
          </Routes>
        </main>
      </div>
      
      {/* Floating Bottom Toolbar */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 p-2 bg-surface/80 backdrop-blur-md border border-border shadow-2xl rounded-2xl z-50">
        {[
          { i: <i className="bi bi-cursor-fill"></i>, a: true },
          { i: '#' },
          { i: <i className="bi bi-square"></i> },
          { i: <i className="bi bi-circle"></i> },
          { i: <i className="bi bi-pen"></i> },
          { i: 'T' },
          { i: <i className="bi bi-image"></i> },
          { i: <i className="bi bi-grid-3x3-gap"></i> },
          { i: '</>' }
        ].map((btn, idx) => (
          <button 
            key={idx} 
            className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all ${btn.a ? 'bg-primary-500 text-white shadow-md' : 'text-text/70 hover:bg-bg hover:text-text'}`}
          >
            {btn.i}
          </button>
        ))}
      </div>
    </div>
  );
}
