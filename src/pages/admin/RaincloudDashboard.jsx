import React, { useState, useEffect } from 'react';
import {
  LayoutGrid,
  Box,
  ChevronDown,
  ChevronUp,
  ShoppingBag,
  Users,
  Mail,
  Newspaper,
  Building2,
  ShieldCheck,
  Search,
  Plus,
  Eye,
  Pencil,
  Trash2,
  TrendingUp,
  UserCheck,
  FileText,
  X,
  Layers,
  DollarSign,
  Briefcase,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Filter,
  MessageCircle,
  Download,
  UserPlus,
  Activity,
  Briefcase as BriefcaseIcon,
  User,
  MapPin,
  Calendar,
  Award,
  Circle,
  PieChart,
  Inbox,
  Send,
  Drafts,
  Star,
  Trash as TrashIcon,
  Tag,
  Star as StarIcon,
  AlertCircle,
  Paperclip,
  Reply,
  Forward,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Settings,
  LogOut,
  Users as UsersIcon,
  FileText as FileTextIcon,
  FileCheck,
  Globe,
  Phone,
  Mail as MailIcon,
  UserCheck as UserCheckIcon,
  Award as AwardIcon,
  Target,
  Shield,
  BookOpen,
  FileSignature,
  Calendar as CalendarIcon,
  MoreHorizontal,
  Copy,
  ExternalLink
} from 'lucide-react';

export default function SatesoftApp() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [animateCharts, setAnimateCharts] = useState(false);

  // Animate charts when dashboard loads
  useEffect(() => {
    if (activeTab === 'dashboard') {
      setTimeout(() => setAnimateCharts(true), 100);
    } else {
      setAnimateCharts(false);
    }
  }, [activeTab]);

  const [openAccordions, setOpenAccordions] = useState({
    opportunity: false,
    partner: true,
    corporate: false,
    legal: false,
    opportunityMgt: false,
    corporateMgt: false,
    legalMgt: false
  });

  const toggleAccordion = (key) => {
    setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // --- PRODUCTS STATE ---
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Duqact',
      tagline: 'Retail Intelligence for the African Market',
      iconType: 'trending',
      category: 'Retail Intelligence',
      status: 'Active',
      version: '2.3.1',
      lastUpdated: '2026-03-15'
    },
    {
      id: 2,
      name: 'Karibyshoo',
      tagline: 'Smart Visitor & Event Management',
      iconType: 'users',
      category: 'Visitor Management',
      status: 'Active',
      version: '1.8.0',
      lastUpdated: '2026-03-10'
    },
    {
      id: 3,
      name: 'FoundDocument',
      tagline: 'Intelligent Archiving & Retrieval',
      iconType: 'file',
      category: 'Document Management',
      status: 'Active',
      version: '3.0.2',
      lastUpdated: '2026-03-01'
    }
  ]);

  // --- PARTNERS STATE ---
  const [partners, setPartners] = useState([
    {
      id: 1,
      name: 'Global Tech Solutions',
      joined: '2025-01-15',
      industry: 'Information Technology',
      location: 'Nairobi, Kenya',
      contactName: 'Jane Doe',
      contactEmail: 'jane.doe@globaltech.com',
      status: 'ACTIVE'
    },
    {
      id: 2,
      name: 'African Retail Group',
      joined: '2025-02-10',
      industry: 'Retail',
      location: 'Lagos, Nigeria',
      contactName: 'John Smith',
      contactEmail: 'john.smith@africanretail.com',
      status: 'ACTIVE'
    }
  ]);

  // --- OPPORTUNITIES STATE ---
  const [opportunities, setOpportunities] = useState([
    { id: 1, title: 'Enterprise POS License - Safaricom Retail', client: 'Safaricom Ltd', value: '$45,000', stage: 'Proposal', priority: 'High' },
    { id: 2, title: 'Visitor Archiving System - Bank of Kigali', client: 'Bank of Kigali', value: '$28,000', stage: 'Negotiation', priority: 'Medium' },
    { id: 3, title: 'Document Scanning & OCR Contract', client: 'Kenya Revenue Authority', value: '$110,000', stage: 'Qualified Lead', priority: 'High' }
  ]);

  // --- JOB OPPORTUNITIES STATE ---
  const [jobOpportunities, setJobOpportunities] = useState([
    { id: 1, title: 'Software Developer', location: 'Remote', type: 'Deferred Payment', applications: 12, status: 'Active' },
    { id: 2, title: 'UI/UX Designer', location: 'Remote', type: 'Full-time', applications: 8, status: 'Active' },
    { id: 3, title: 'Product Manager', location: 'Nairobi, Kenya', type: 'Full-time', applications: 5, status: 'Terminated' },
    { id: 4, title: 'DevOps Engineer', location: 'Lagos, Nigeria', type: 'Contract', applications: 3, status: 'Active' }
  ]);

  // --- APPLICANTS STATE ---
  const [applicants, setApplicants] = useState([
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', opportunity: 'Software Developer', sex: 'Male', experience: '5 years', appliedDate: '2024-03-10', status: 'PENDING' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', opportunity: 'Software Developer', sex: 'Female', experience: '3 years', appliedDate: '2024-03-12', status: 'REVIEWED' },
    { id: 3, name: 'David Okoro', email: 'david.okoro@example.com', opportunity: 'UI/UX Designer', sex: 'Male', experience: '4 years', appliedDate: '2024-03-15', status: 'PENDING' },
    { id: 4, name: 'Sarah Johnson', email: 'sarah.j@example.com', opportunity: 'Product Manager', sex: 'Female', experience: '6 years', appliedDate: '2024-03-18', status: 'REVIEWED' },
    { id: 5, name: 'Michael Chen', email: 'michael.c@example.com', opportunity: 'DevOps Engineer', sex: 'Male', experience: '2 years', appliedDate: '2024-03-20', status: 'PENDING' }
  ]);

  // --- BOARD OF ADVISORS STATE ---
  const [advisors, setAdvisors] = useState([
    { 
      id: 1, 
      name: 'Dr. Samuel Otieno', 
      role: 'Chief Technical Advisor', 
      status: 'ACTIVE', 
      order: 1,
      email: 'samuel.otieno@satesoft.com',
      expertise: 'AI & Machine Learning',
      bio: 'PhD in Computer Science with 20 years experience'
    },
    { 
      id: 2, 
      name: 'Grace Muli', 
      role: 'Strategic Business Advisor', 
      status: 'ACTIVE', 
      order: 2,
      email: 'grace.muli@satesoft.com',
      expertise: 'Business Strategy & Growth',
      bio: 'MBA with 15 years in corporate strategy'
    },
    { 
      id: 3, 
      name: 'James Kariuki', 
      role: 'Financial Advisor', 
      status: 'INACTIVE', 
      order: 3,
      email: 'james.kariuki@satesoft.com',
      expertise: 'Financial Planning & Analysis',
      bio: 'CPA with 18 years in financial management'
    }
  ]);

  // --- MAILBOX STATE ---
  const [emails, setEmails] = useState([
    { 
      id: 1, 
      sender: 'Sarah Johnson', 
      email: 'sarah.johnson@techcorp.com',
      subject: 'Partnership Inquiry', 
      preview: 'Hello Satesoft team, we are interested in integrating...',
      date: '2026-03-20',
      read: false,
      starred: false,
      label: 'Important'
    },
    { 
      id: 2, 
      sender: 'Michael Chen', 
      email: 'michael.chen@enterprise.com',
      subject: 'Pricing for Karibyshoo', 
      preview: 'I would like to know the enterprise pricing for Karibys...',
      date: '2026-03-19',
      read: true,
      starred: true,
      label: 'Promotions'
    },
    { 
      id: 3, 
      sender: 'Amina Owuor', 
      email: 'amina.owuor@support.com',
      subject: 'Support Request', 
      preview: 'We are experiencing some issues with the offline data...',
      date: '2026-03-18',
      read: false,
      starred: false,
      label: 'Social'
    },
    { 
      id: 4, 
      sender: 'Peter Okonkwo', 
      email: 'peter.okonkwo@bank.com',
      subject: 'Contract Renewal', 
      preview: 'We would like to discuss the renewal terms for our...',
      date: '2026-03-17',
      read: true,
      starred: false,
      label: 'Important'
    }
  ]);

  // --- COMPANY NEWS STATE ---
  const [newsPosts, setNewsPosts] = useState([
    { 
      id: 1, 
      title: 'Satesoft Expands Operations to West Africa', 
      category: 'Company News', 
      author: 'Corporate Communications',
      date: '2026-03-20',
      excerpt: 'Satesoft announces expansion into Nigeria and Ghana...'
    },
    { 
      id: 2, 
      title: 'Duqact 2.0: Now with AI-Powered Insights', 
      category: 'Product Updates', 
      author: 'Product Team',
      date: '2026-03-15',
      excerpt: 'Major update to Duqact with advanced analytics...'
    },
    { 
      id: 3, 
      title: 'Satesoft Partners with Regional Bank for Digital Transformation', 
      category: 'Partnerships', 
      author: 'Partnerships Team',
      date: '2026-03-05',
      excerpt: 'Strategic partnership announced with leading bank...'
    }
  ]);

  // --- LEGAL & COMPLIANCE DATA ---
  const [legalData, setLegalData] = useState({
    'service-agreement': [
      { id: 1, title: 'Standard Service Agreement v2.0', version: '2.0', date: '2026-01-15', status: 'Active', description: 'Master service agreement for all clients' },
      { id: 2, title: 'Enterprise Service Agreement v1.2', version: '1.2', date: '2025-11-20', status: 'Active', description: 'For enterprise-level clients' },
      { id: 3, title: 'Partner Service Agreement v1.0', version: '1.0', date: '2025-08-10', status: 'Draft', description: 'For strategic partners' }
    ],
    'agreement-history': [
      { id: 1, title: 'Service Agreement Amendment #3', date: '2026-02-28', client: 'Safaricom Ltd', changes: 'Updated pricing and scope', status: 'Signed' },
      { id: 2, title: 'Service Agreement Amendment #2', date: '2025-12-15', client: 'Bank of Kigali', changes: 'Extended timeline', status: 'Signed' },
      { id: 3, title: 'Service Agreement Amendment #1', date: '2025-09-01', client: 'KRA', changes: 'Added new deliverables', status: 'Pending' }
    ],
    jurisdictions: [
      { id: 1, name: 'Kenya', code: 'KE', courts: 'High Court, Court of Appeal', laws: 'Companies Act, Data Protection Act' },
      { id: 2, name: 'Nigeria', code: 'NG', courts: 'Federal High Court, Court of Appeal', laws: 'Companies and Allied Matters Act' },
      { id: 3, name: 'Rwanda', code: 'RW', courts: 'High Court, Supreme Court', laws: 'Law No. 24/2016 on Companies' }
    ],
    'contact-info': [
      { id: 1, department: 'Legal Department', contact: 'Sarah Wanjiku', email: 'legal@satesoft.com', phone: '+254 700 123456', role: 'Legal Counsel' },
      { id: 2, department: 'Compliance Department', contact: 'John Mwangi', email: 'compliance@satesoft.com', phone: '+254 700 123457', role: 'Compliance Officer' },
      { id: 3, department: 'Contracts Team', contact: 'Mary Akinyi', email: 'contracts@satesoft.com', phone: '+254 700 123458', role: 'Contracts Manager' }
    ]
  });

  // Product Modals State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [productModalMode, setProductModalMode] = useState('add');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [viewProduct, setViewProduct] = useState(null);
  const [productFormData, setProductFormData] = useState({ name: '', tagline: '', category: 'Software Solution' });

  // Partner Modals State
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);
  const [partnerModalMode, setPartnerModalMode] = useState('add');
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [viewPartner, setViewPartner] = useState(null);
  const [partnerFormData, setPartnerFormData] = useState({
    name: '',
    joined: new Date().toISOString().split('T')[0],
    industry: '',
    location: '',
    contactName: '',
    contactEmail: '',
    status: 'ACTIVE'
  });

  // --- PRODUCT HANDLERS ---
  const handleOpenAddProduct = () => {
    setProductModalMode('add');
    setProductFormData({ name: '', tagline: '', category: 'Software Solution' });
    setIsProductModalOpen(true);
  };

  const handleOpenEditProduct = (product) => {
    setProductModalMode('edit');
    setSelectedProduct(product);
    setProductFormData({ name: product.name, tagline: product.tagline, category: product.category || 'Software Solution' });
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (productModalMode === 'add') {
      const newProduct = { 
        id: Date.now(), 
        name: productFormData.name, 
        tagline: productFormData.tagline, 
        category: productFormData.category, 
        iconType: 'layers',
        status: 'Active',
        version: '1.0.0',
        lastUpdated: new Date().toISOString().split('T')[0]
      };
      setProducts([...products, newProduct]);
    } else {
      setProducts(products.map((p) => (p.id === selectedProduct.id ? { ...p, ...productFormData } : p)));
    }
    setIsProductModalOpen(false);
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  const handleViewProduct = (product) => {
    alert(`Viewing product: ${product.name}\nTagline: ${product.tagline}\nCategory: ${product.category}`);
  };

  // --- PARTNER HANDLERS ---
  const handleOpenAddPartner = () => {
    setPartnerModalMode('add');
    setPartnerFormData({ name: '', joined: new Date().toISOString().split('T')[0], industry: '', location: '', contactName: '', contactEmail: '', status: 'ACTIVE' });
    setIsPartnerModalOpen(true);
  };

  const handleOpenEditPartner = (partner) => {
    setPartnerModalMode('edit');
    setSelectedPartner(partner);
    setPartnerFormData({ ...partner });
    setIsPartnerModalOpen(true);
  };

  const handleSavePartner = (e) => {
    e.preventDefault();
    if (partnerModalMode === 'add') {
      const newPartner = { id: Date.now(), ...partnerFormData };
      setPartners([...partners, newPartner]);
    } else {
      setPartners(partners.map((p) => (p.id === selectedPartner.id ? { ...p, ...partnerFormData } : p)));
    }
    setIsPartnerModalOpen(false);
  };

  const handleDeletePartner = (id) => {
    if (window.confirm('Are you sure you want to delete this partner?')) {
      setPartners(partners.filter((p) => p.id !== id));
    }
  };

  // --- ADVISOR HANDLERS ---
  const handleAddAdvisor = () => {
    const newAdvisor = {
      id: Date.now(),
      name: 'New Advisor',
      role: 'Advisor',
      status: 'ACTIVE',
      order: advisors.length + 1,
      email: 'new.advisor@satesoft.com',
      expertise: 'Expertise Area',
      bio: 'Bio information'
    };
    setAdvisors([...advisors, newAdvisor]);
  };

  const handleDeleteAdvisor = (id) => {
    if (window.confirm('Are you sure you want to delete this advisor?')) {
      setAdvisors(advisors.filter((a) => a.id !== id));
    }
  };

  // --- NEWS HANDLERS ---
  const handleAddNews = () => {
    const newPost = {
      id: Date.now(),
      title: 'New Company Announcement',
      category: 'Company News',
      author: 'Admin User',
      date: new Date().toISOString().split('T')[0],
      excerpt: 'New announcement coming soon...'
    };
    setNewsPosts([newPost, ...newsPosts]);
  };

  const handleDeleteNews = (id) => {
    if (window.confirm('Are you sure you want to delete this news post?')) {
      setNewsPosts(newsPosts.filter((p) => p.id !== id));
    }
  };

  // Filters
  const filteredProducts = products.filter(
    (p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.tagline.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPartners = partners.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.contactName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredJobOpportunities = jobOpportunities.filter(
    (j) => j.title.toLowerCase().includes(searchTerm.toLowerCase()) || j.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredApplicants = applicants.filter(
    (a) =>
      a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.opportunity.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredEmails = emails.filter(
    (e) =>
      e.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.preview.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredNews = newsPosts.filter(
    (n) =>
      n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredAdvisors = advisors.filter(
    (a) =>
      a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderProductIcon = (type) => {
    switch (type) {
      case 'trending':
        return <TrendingUp className="w-5 h-5 text-[#72bf24]" />;
      case 'users':
        return <UserCheck className="w-5 h-5 text-[#72bf24]" />;
      case 'file':
        return <FileText className="w-5 h-5 text-[#72bf24]" />;
      default:
        return <Layers className="w-5 h-5 text-[#72bf24]" />;
    }
  };

  // Mailbox data for the chart
  const weeklyData = [
    { day: 'Mon', received: 10, sent: 8 },
    { day: 'Tue', received: 19, sent: 15 },
    { day: 'Wed', received: 15, sent: 10 },
    { day: 'Thu', received: 22, sent: 17 },
    { day: 'Fri', received: 29, sent: 25 },
    { day: 'Sat', received: 9, sent: 7 },
    { day: 'Sun', received: 8, sent: 5 }
  ];

  const maxValue = Math.max(...weeklyData.flatMap(d => [d.received, d.sent]));

  // Pie chart data for mailbox
  const mailboxData = [
    { label: 'Read', value: 1284, color: '#72bf24' },
    { label: 'Replied', value: 856, color: '#3b82f6' },
    { label: 'Unread', value: 423, color: '#94a3b8' }
  ];
  const totalMailbox = mailboxData.reduce((sum, item) => sum + item.value, 0);

  // Dynamic stat values with animation
  const [stats, setStats] = useState({
    newVisits: 0,
    totalVisits: 0,
    downloads: 0,
    directChat: 0
  });

  useEffect(() => {
    if (activeTab === 'dashboard') {
      const targetStats = {
        newVisits: 450,
        totalVisits: 15489,
        downloads: 55005,
        directChat: 13921
      };
      
      let currentStats = { newVisits: 0, totalVisits: 0, downloads: 0, directChat: 0 };
      const duration = 1500;
      const steps = 60;
      const increment = {
        newVisits: targetStats.newVisits / steps,
        totalVisits: targetStats.totalVisits / steps,
        downloads: targetStats.downloads / steps,
        directChat: targetStats.directChat / steps
      };
      
      let step = 0;
      const interval = setInterval(() => {
        step++;
        if (step >= steps) {
          setStats(targetStats);
          clearInterval(interval);
        } else {
          setStats({
            newVisits: Math.round(currentStats.newVisits + increment.newVisits),
            totalVisits: Math.round(currentStats.totalVisits + increment.totalVisits),
            downloads: Math.round(currentStats.downloads + increment.downloads),
            directChat: Math.round(currentStats.directChat + increment.directChat)
          });
          currentStats = {
            newVisits: currentStats.newVisits + increment.newVisits,
            totalVisits: currentStats.totalVisits + increment.totalVisits,
            downloads: currentStats.downloads + increment.downloads,
            directChat: currentStats.directChat + increment.directChat
          };
        }
      }, duration / steps);
      
      return () => clearInterval(interval);
    }
  }, [activeTab]);

  // Render legal sub-tabs
  const renderLegalContent = () => {
    const tabMap = {
      'service-agreement': { title: 'Service Agreement', icon: FileSignature },
      'agreement-history': { title: 'Agreement History', icon: BookOpen },
      'jurisdictions': { title: 'Jurisdictions', icon: Globe },
      'contact-info': { title: 'Contact Information', icon: MailIcon }
    };

    const currentTab = activeTab.split('-')[1] || 'service-agreement';
    const data = legalData[currentTab] || legalData['service-agreement'];
    const meta = tabMap[currentTab] || tabMap['service-agreement'];
    const Icon = meta.icon;

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{meta.title}</h1>
            <p className="text-sm text-slate-500 mt-1">Manage {meta.title.toLowerCase()} information</p>
          </div>
          <button className="bg-[#72bf24] hover:bg-[#62a71e] text-white font-semibold px-5 py-2.5 rounded-xl flex items-center gap-2 text-sm shadow-sm transition-all cursor-pointer">
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Add New</span>
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-xs font-bold text-slate-400 tracking-wider">
                {Object.keys(data[0] || {}).filter(key => key !== 'id').map((key) => (
                  <th key={key} className="pb-4 pl-2 uppercase">{key.replace(/-/g, ' ')}</th>
                ))}
                <th className="pb-4 text-right pr-2">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                  {Object.entries(item).filter(([key]) => key !== 'id').map(([key, value]) => (
                    <td key={key} className="py-4 pl-2 text-sm text-slate-600">
                      {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value}
                    </td>
                  ))}
                  <td className="py-4 pr-2">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 hover:text-[#72bf24] hover:bg-green-50 rounded-lg transition-colors">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-[#f8fafc] text-slate-800 font-sans antialiased overflow-hidden">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col p-5 gap-4 overflow-y-auto shrink-0">
        <div className="text-xl font-extrabold text-[#72bf24] tracking-wide px-2 py-1 select-none">
          SATESOFT
        </div>

        <nav className="flex flex-col gap-1 text-sm font-medium flex-1">
          {/* Dashboard Tab */}
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all w-full text-left cursor-pointer ${
              activeTab === 'dashboard' ? 'bg-[#72bf24] text-white font-semibold shadow-sm' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-3">
              <LayoutGrid className="w-4 h-4" />
              <span>Dashboard</span>
            </div>
          </button>

          {/* Products Tab */}
          <button
            onClick={() => setActiveTab('products')}
            className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all w-full text-left cursor-pointer ${
              activeTab === 'products' ? 'bg-[#72bf24] text-white font-semibold shadow-sm' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-3">
              <Box className="w-4 h-4" />
              <span>Products</span>
            </div>
          </button>

          {/* Opportunity Management Dropdown Accordion */}
          <div>
            <button
              onClick={() => toggleAccordion('opportunityMgt')}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all w-full text-left cursor-pointer ${
                activeTab === 'opportunities' || activeTab === 'applicants'
                  ? 'bg-[#72bf24] text-white font-semibold shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-4 h-4" />
                <span>Opportunity Mgt</span>
              </div>
              {openAccordions.opportunityMgt ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
            </button>

            {openAccordions.opportunityMgt && (
              <div className="pl-9 flex flex-col gap-2 mt-2 text-xs">
                <span
                  onClick={() => setActiveTab('opportunities')}
                  className={`cursor-pointer transition-colors ${
                    activeTab === 'opportunities' ? 'text-[#72bf24] font-bold' : 'text-slate-500 hover:text-[#72bf24]'
                  }`}
                >
                  Opportunities
                </span>
                <span
                  onClick={() => setActiveTab('applicants')}
                  className={`cursor-pointer transition-colors ${
                    activeTab === 'applicants' ? 'text-[#72bf24] font-bold' : 'text-slate-500 hover:text-[#72bf24]'
                  }`}
                >
                  Applicants
                </span>
              </div>
            )}
          </div>

          {/* Partner Management Dropdown Accordion */}
          <div>
            <button
              onClick={() => {
                toggleAccordion('partner');
                setActiveTab('partner-list');
              }}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all w-full text-left cursor-pointer ${
                activeTab === 'partner-list' ? 'bg-[#72bf24] text-white font-semibold shadow-sm' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4" />
                <span>Partner Management</span>
              </div>
              {openAccordions.partner ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
            </button>

            {openAccordions.partner && (
              <div className="pl-9 flex flex-col gap-2 mt-2 text-xs">
                <span
                  onClick={() => setActiveTab('partner-list')}
                  className={`cursor-pointer transition-colors ${
                    activeTab === 'partner-list' ? 'text-[#72bf24] font-bold' : 'text-slate-500 hover:text-[#72bf24]'
                  }`}
                >
                  Partner List
                </span>
              </div>
            )}
          </div>

          {/* Mailbox */}
          <button
            onClick={() => setActiveTab('mailbox')}
            className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all w-full text-left cursor-pointer ${
              activeTab === 'mailbox' ? 'bg-[#72bf24] text-white font-semibold shadow-sm' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4" />
              <span>Mailbox</span>
            </div>
            <span className="bg-[#eaf6de] text-[#5b9b1d] text-xs px-2 py-0.5 rounded-full font-bold">
              {emails.filter(e => !e.read).length}
            </span>
          </button>

          {/* Company News */}
          <button
            onClick={() => setActiveTab('news')}
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all w-full text-left cursor-pointer ${
              activeTab === 'news' ? 'bg-[#72bf24] text-white font-semibold shadow-sm' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Newspaper className="w-4 h-4" />
            <span>Company News</span>
          </button>

          {/* Corporate Mgt Dropdown Accordion with Board of Advisors */}
          <div>
            <button
              onClick={() => toggleAccordion('corporateMgt')}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all w-full text-left cursor-pointer ${
                activeTab === 'board-of-advisors' 
                  ? 'bg-[#72bf24] text-white font-semibold shadow-sm' 
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <Building2 className="w-4 h-4" />
                <span>Corporate Mgt</span>
              </div>
              {openAccordions.corporateMgt ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
            </button>

            {openAccordions.corporateMgt && (
              <div className="pl-9 flex flex-col gap-2 mt-2 text-xs">
                <span
                  onClick={() => setActiveTab('board-of-advisors')}
                  className={`cursor-pointer transition-colors ${
                    activeTab === 'board-of-advisors' ? 'text-[#72bf24] font-bold' : 'text-slate-500 hover:text-[#72bf24]'
                  }`}
                >
                  Board of Advisors
                </span>
              </div>
            )}
          </div>

          {/* Legal & Compliance Dropdown Accordion */}
          <div>
            <button
              onClick={() => toggleAccordion('legalMgt')}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all w-full text-left cursor-pointer ${
                activeTab.startsWith('legal-') 
                  ? 'bg-[#72bf24] text-white font-semibold shadow-sm' 
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-4 h-4" />
                <span>Legal & Compliance</span>
              </div>
              {openAccordions.legalMgt ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
            </button>

            {openAccordions.legalMgt && (
              <div className="pl-9 flex flex-col gap-2 mt-2 text-xs">
                <span
                  onClick={() => setActiveTab('legal-service-agreement')}
                  className={`cursor-pointer transition-colors ${
                    activeTab === 'legal-service-agreement' ? 'text-[#72bf24] font-bold' : 'text-slate-500 hover:text-[#72bf24]'
                  }`}
                >
                  Service Agreement
                </span>
                <span
                  onClick={() => setActiveTab('legal-agreement-history')}
                  className={`cursor-pointer transition-colors ${
                    activeTab === 'legal-agreement-history' ? 'text-[#72bf24] font-bold' : 'text-slate-500 hover:text-[#72bf24]'
                  }`}
                >
                  Agreement History
                </span>
                <span
                  onClick={() => setActiveTab('legal-jurisdictions')}
                  className={`cursor-pointer transition-colors ${
                    activeTab === 'legal-jurisdictions' ? 'text-[#72bf24] font-bold' : 'text-slate-500 hover:text-[#72bf24]'
                  }`}
                >
                  Jurisdictions
                </span>
                <span
                  onClick={() => setActiveTab('legal-contact-info')}
                  className={`cursor-pointer transition-colors ${
                    activeTab === 'legal-contact-info' ? 'text-[#72bf24] font-bold' : 'text-slate-500 hover:text-[#72bf24]'
                  }`}
                >
                  Contact Information
                </span>
              </div>
            )}
          </div>

          {/* Spacer */}
          <div className="flex-1"></div>

          {/* Settings */}
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all w-full text-left cursor-pointer ${
              activeTab === 'settings' ? 'bg-[#72bf24] text-white font-semibold shadow-sm' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </button>

          {/* Logout */}
          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to logout?')) {
                alert('Logging out...');
              }
            }}
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all w-full text-left cursor-pointer text-red-600 hover:bg-red-50"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </nav>
      </aside>

      {/* Main Layout Area */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        <main className="p-8 flex-1 flex flex-col">
          {/* Top Header Bar */}
          <header className="flex items-center justify-between mb-8">
            <div className="flex items-center bg-white rounded-2xl px-4 py-2.5 w-96 gap-2 border border-slate-200/50 shadow-sm">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search products, applicants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent border-none outline-none text-xs w-full text-slate-700 placeholder-slate-400"
              />
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-xs font-bold text-slate-900">Admin User</div>
                <div className="text-[10px] font-black text-[#72bf24] tracking-wider">SUPER ADMIN</div>
              </div>
              <div className="w-9 h-9 rounded-full bg-[#e8f5e9] text-[#72bf24] font-bold text-xs flex items-center justify-center border border-[#72bf24]/20">
                AD
              </div>
            </div>
          </header>

          {/* ==================== DASHBOARD ==================== */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-slate-900 tracking-tight">System Overview</h1>
                  <p className="text-sm text-slate-500 mt-1">Real-time metrics and operational insights</p>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 text-xs font-semibold bg-white border border-slate-200 rounded-xl flex items-center gap-2 hover:bg-slate-50 shadow-sm transition-all hover:shadow-md">
                    <Filter className="w-3.5 h-3.5 text-slate-500" /> Filter Range
                  </button>
                </div>
              </div>

              {/* Stat Cards Grid with Dynamic Numbers */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">New Visits</span>
                      <h3 className="text-2xl font-extrabold text-slate-900 mt-1 transition-all duration-700">
                        {stats.newVisits.toLocaleString()}
                      </h3>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center animate-pulse">
                      <UserPlus className="w-5 h-5 text-[#72bf24]" />
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mt-4 text-xs font-bold text-emerald-600">
                    <ArrowUpRight className="w-4 h-4" />
                    <span>45% Increase</span>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Visits</span>
                      <h3 className="text-2xl font-extrabold text-slate-900 mt-1 transition-all duration-700">
                        {stats.totalVisits.toLocaleString()}
                      </h3>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center animate-pulse">
                      <Activity className="w-5 h-5 text-blue-600" />
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mt-4 text-xs font-bold text-blue-600">
                    <ArrowUpRight className="w-4 h-4" />
                    <span>40% Increase</span>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Downloads</span>
                      <h3 className="text-2xl font-extrabold text-slate-900 mt-1 transition-all duration-700">
                        {stats.downloads.toLocaleString()}
                      </h3>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center animate-pulse">
                      <Download className="w-5 h-5 text-purple-600" />
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mt-4 text-xs font-bold text-purple-600">
                    <ArrowUpRight className="w-4 h-4" />
                    <span>85% Increase</span>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Direct Chat</span>
                      <h3 className="text-2xl font-extrabold text-slate-900 mt-1 transition-all duration-700">
                        {stats.directChat.toLocaleString()}
                      </h3>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center animate-pulse">
                      <MessageCircle className="w-5 h-5 text-amber-600" />
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mt-4 text-xs font-bold text-amber-600">
                    <ArrowUpRight className="w-4 h-4" />
                    <span>50% Increase</span>
                  </div>
                </div>
              </div>

              {/* Mailbox Status with Pie Chart & Applicants per Opportunity */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
                  <h3 className="text-sm font-bold text-slate-900 mb-4">Mailbox Status</h3>
                  <div className="flex items-center justify-center mb-4">
                    <div className="relative w-44 h-44">
                      <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                        {mailboxData.map((item, index) => {
                          const percentage = item.value / totalMailbox;
                          const startAngle = mailboxData.slice(0, index).reduce((acc, curr) => acc + (curr.value / totalMailbox) * 360, 0);
                          const endAngle = startAngle + percentage * 360;
                          
                          const startRad = (startAngle - 90) * Math.PI / 180;
                          const endRad = (endAngle - 90) * Math.PI / 180;
                          const radius = 50;
                          const cx = 60;
                          const cy = 60;
                          
                          const x1 = cx + radius * Math.cos(startRad);
                          const y1 = cy + radius * Math.sin(startRad);
                          const x2 = cx + radius * Math.cos(endRad);
                          const y2 = cy + radius * Math.sin(endRad);
                          const largeArc = endAngle - startAngle > 180 ? 1 : 0;
                          
                          return (
                            <path
                              key={index}
                              d={`M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`}
                              fill={item.color}
                              stroke="white"
                              strokeWidth="2"
                              className="transition-all duration-1000"
                              style={{
                                transform: `scale(${animateCharts ? 1 : 0.7})`,
                                opacity: animateCharts ? 1 : 0,
                                transformOrigin: `${cx}px ${cy}px`,
                                transitionDelay: `${index * 150}ms`
                              }}
                            />
                          );
                        })}
                        <circle cx="60" cy="60" r="28" fill="white" stroke="#e2e8f0" strokeWidth="1.5" />
                        <text x="60" y="57" textAnchor="middle" className="text-xs font-bold fill-slate-700">Total</text>
                        <text x="60" y="70" textAnchor="middle" className="text-[10px] font-bold fill-[#72bf24]">
                          {totalMailbox.toLocaleString()}
                        </text>
                      </svg>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {mailboxData.map((item) => (
                      <div key={item.label} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                          <span className="text-sm text-slate-600">{item.label}</span>
                        </div>
                        <span className="text-sm font-semibold text-slate-900">{item.value.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-100 flex gap-2">
                    <button className="px-3 py-1.5 text-xs font-semibold bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 transition-colors">Read</button>
                    <button className="px-3 py-1.5 text-xs font-semibold bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">Replied</button>
                    <button className="px-3 py-1.5 text-xs font-semibold bg-slate-50 text-slate-700 rounded-lg hover:bg-slate-100 transition-colors">Unread</button>
                  </div>
                </div>

                <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
                  <h3 className="text-sm font-bold text-slate-900 mb-4">Applicants per Opportunity</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-sm text-slate-600">Software Developer</span>
                        <span className="text-sm font-bold text-slate-900">2</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                        <div 
                          className="bg-[#72bf24] h-2.5 rounded-full transition-all duration-1000"
                          style={{ 
                            width: animateCharts ? '40%' : '0%',
                            transitionDelay: '200ms'
                          }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-sm text-slate-600">UI/UX Designer</span>
                        <span className="text-sm font-bold text-slate-900">1.5</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                        <div 
                          className="bg-[#72bf24] h-2.5 rounded-full transition-all duration-1000"
                          style={{ 
                            width: animateCharts ? '30%' : '0%',
                            transitionDelay: '300ms'
                          }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-sm text-slate-600">Product Manager</span>
                        <span className="text-sm font-bold text-slate-900">3</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                        <div 
                          className="bg-[#72bf24] h-2.5 rounded-full transition-all duration-1000"
                          style={{ 
                            width: animateCharts ? '60%' : '0%',
                            transitionDelay: '400ms'
                          }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-sm text-slate-600">DevOps Engineer</span>
                        <span className="text-sm font-bold text-slate-900">1</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                        <div 
                          className="bg-[#72bf24] h-2.5 rounded-full transition-all duration-1000"
                          style={{ 
                            width: animateCharts ? '20%' : '0%',
                            transitionDelay: '500ms'
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">Weekly Mail & Communication Activity</h2>
                    <p className="text-xs text-slate-500 mt-0.5">Inbound vs Outbound emails across partners</p>
                  </div>
                  <div className="flex justify-end gap-6 text-xs font-semibold">
                    <span className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-[#72bf24]"></span> Received
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-blue-500"></span> Sent
                    </span>
                  </div>
                </div>
                <div className="h-64 flex items-end justify-between border-b border-slate-100 pb-3 px-2">
                  {weeklyData.map((item, idx) => {
                    const receivedHeight = (item.received / maxValue) * 200;
                    const sentHeight = (item.sent / maxValue) * 200;
                    return (
                      <div key={idx} className="flex flex-col items-center gap-2 w-full">
                        <div className="flex gap-1.5 items-end">
                          <div 
                            className="w-6 bg-[#72bf24] rounded-t transition-all duration-1000 hover:opacity-80"
                            style={{ 
                              height: animateCharts ? `${receivedHeight}px` : '0px',
                              transitionDelay: `${idx * 100}ms`
                            }}
                          ></div>
                          <div 
                            className="w-6 bg-blue-500 rounded-t transition-all duration-1000 hover:opacity-80"
                            style={{ 
                              height: animateCharts ? `${sentHeight}px` : '0px',
                              transitionDelay: `${idx * 100 + 50}ms`
                            }}
                          ></div>
                        </div>
                        <span className="text-xs text-slate-400 font-medium mt-2">{item.day}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ==================== PRODUCTS VIEW - Clean Minimal Design ==================== */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Product Management</h1>
                  <p className="text-sm text-slate-500 mt-1">Manage Satesoft software solutions</p>
                </div>
                <button
                  onClick={handleOpenAddProduct}
                  className="bg-[#72bf24] hover:bg-[#62a71e] text-white font-semibold px-5 py-2.5 rounded-xl flex items-center gap-2 text-sm shadow-sm transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                  <span>Add Product</span>
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-[#f8fafc]">
                    <tr className="border-b border-slate-200 text-xs font-bold text-slate-500 tracking-wider">
                      <th className="py-4 pl-6 w-[30%]">PRODUCT</th>
                      <th className="py-4 w-[55%]">TAGLINE</th>
                      <th className="py-4 pr-6 text-right w-[15%]">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredProducts.length > 0 ? (
                      filteredProducts.map((product) => (
                        <tr key={product.id} className="hover:bg-slate-50/70 transition-colors group">
                          <td className="py-5 pl-6">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-xl bg-[#f0f9e8] border border-[#d3f0b4] flex items-center justify-center shrink-0">
                                {renderProductIcon(product.iconType)}
                              </div>
                              <span className="font-bold text-slate-900 text-base">{product.name}</span>
                            </div>
                          </td>
                          <td className="py-5 text-sm text-slate-600">
                            {product.tagline}
                          </td>
                          <td className="py-5 pr-6">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => handleViewProduct(product)}
                                className="p-2 hover:bg-blue-50 rounded-lg transition-all text-slate-400 hover:text-blue-600"
                                title="View"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleOpenEditProduct(product)}
                                className="p-2 hover:bg-green-50 rounded-lg transition-all text-slate-400 hover:text-[#72bf24]"
                                title="Edit"
                              >
                                <Pencil className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(product.id)}
                                className="p-2 hover:bg-red-50 rounded-lg transition-all text-slate-400 hover:text-red-600"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                              <button
                                className="p-2 hover:bg-slate-100 rounded-lg transition-all text-slate-400 hover:text-slate-600"
                                title="More"
                              >
                                <MoreHorizontal className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={3} className="py-16 text-center">
                          <div className="flex flex-col items-center gap-3">
                            <Box className="w-12 h-12 text-slate-300" />
                            <span className="text-sm text-slate-400">No products found matching your search.</span>
                            <button
                              onClick={handleOpenAddProduct}
                              className="text-[#72bf24] text-sm font-semibold hover:underline"
                            >
                              Add your first product
                            </button>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ==================== OPPORTUNITIES VIEW ==================== */}
          {activeTab === 'opportunities' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Opportunities</h1>
                  <p className="text-sm text-slate-500 mt-1">Manage job openings and career opportunities</p>
                </div>
                <button
                  onClick={() => alert('Add Opportunity Form')}
                  className="bg-[#72bf24] hover:bg-[#62a71e] text-white font-semibold px-5 py-2.5 rounded-xl flex items-center gap-2 text-sm shadow-sm transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                  <span>Add Opportunity</span>
                </button>
              </div>

              <div className="flex gap-2">
                <button className="px-4 py-2 bg-[#72bf24] text-white text-xs font-semibold rounded-lg shadow-sm">Active</button>
                <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 text-xs font-semibold rounded-lg hover:bg-slate-50 transition-colors">Terminated</button>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-xs font-bold text-slate-400 tracking-wider">
                      <th className="pb-4 pl-2">TITLE</th>
                      <th className="pb-4">LOCATION</th>
                      <th className="pb-4">TYPE</th>
                      <th className="pb-4">APPLICATIONS</th>
                      <th className="pb-4 text-right pr-2">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredJobOpportunities.map((job) => (
                      <tr key={job.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-5 pl-2">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-[#f0f9e8] border border-[#d3f0b4] flex items-center justify-center shrink-0">
                              <BriefcaseIcon className="w-4 h-4 text-[#72bf24]" />
                            </div>
                            <span className="font-bold text-slate-900 text-sm">{job.title}</span>
                          </div>
                        </td>
                        <td className="py-5 text-sm text-slate-600">
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-slate-400" />
                            {job.location}
                          </div>
                        </td>
                        <td className="py-5 text-sm text-slate-600">{job.type}</td>
                        <td className="py-5 text-sm font-semibold text-slate-900">{job.applications}</td>
                        <td className="py-5 pr-2">
                          <div className="flex items-center justify-end gap-2">
                            <button className="p-1.5 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-1.5 hover:text-[#72bf24] hover:bg-green-50 rounded-lg transition-colors">
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button className="p-1.5 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ==================== APPLICANTS VIEW ==================== */}
          {activeTab === 'applicants' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Applicants</h1>
                  <p className="text-sm text-slate-500 mt-1">Review and manage job applications</p>
                </div>
              </div>

              <div className="grid grid-cols-5 gap-3">
                <select className="px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white focus:outline-none focus:border-[#72bf24] focus:ring-1 focus:ring-[#72bf24]">
                  <option>All Opportunities</option>
                  <option>Software Developer</option>
                  <option>UI/UX Designer</option>
                </select>
                <select className="px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white focus:outline-none focus:border-[#72bf24] focus:ring-1 focus:ring-[#72bf24]">
                  <option>All Experience</option>
                  <option>0-2 years</option>
                  <option>3-5 years</option>
                  <option>5+ years</option>
                </select>
                <input type="date" className="px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white focus:outline-none focus:border-[#72bf24] focus:ring-1 focus:ring-[#72bf24]" placeholder="dd/mm/yyyy" />
                <select className="px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white focus:outline-none focus:border-[#72bf24] focus:ring-1 focus:ring-[#72bf24]">
                  <option>All Sex</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
                <select className="px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white focus:outline-none focus:border-[#72bf24] focus:ring-1 focus:ring-[#72bf24]">
                  <option>All Status</option>
                  <option>PENDING</option>
                  <option>REVIEWED</option>
                  <option>REJECTED</option>
                  <option>ACCEPTED</option>
                </select>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-xs font-bold text-slate-400 tracking-wider">
                      <th className="pb-4 pl-2">APPLICANT</th>
                      <th className="pb-4">OPPORTUNITY</th>
                      <th className="pb-4">SEX</th>
                      <th className="pb-4">EXPERIENCE</th>
                      <th className="pb-4">APPLIED DATE</th>
                      <th className="pb-4 text-right pr-2">STATUS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredApplicants.map((applicant) => (
                      <tr key={applicant.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-5 pl-2">
                          <div>
                            <div className="font-bold text-slate-900 text-sm">{applicant.name}</div>
                            <div className="text-xs text-slate-400">{applicant.email}</div>
                          </div>
                        </td>
                        <td className="py-5 text-sm text-slate-600">{applicant.opportunity}</td>
                        <td className="py-5 text-sm text-slate-600">{applicant.sex}</td>
                        <td className="py-5 text-sm text-slate-600">{applicant.experience}</td>
                        <td className="py-5 text-sm text-slate-600">{applicant.appliedDate}</td>
                        <td className="py-5 pr-2 text-right">
                          <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${
                            applicant.status === 'PENDING' 
                              ? 'bg-amber-50 text-amber-700' 
                              : 'bg-emerald-50 text-emerald-700'
                          }`}>
                            {applicant.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ==================== PARTNER MANAGEMENT VIEW ==================== */}
          {activeTab === 'partner-list' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Partner List</h1>
                  <p className="text-sm text-slate-500 mt-1 font-normal">Manage your business partners and collaborations</p>
                </div>
                <button
                  onClick={handleOpenAddPartner}
                  className="bg-[#72bf24] hover:bg-[#62a71e] text-white font-semibold px-5 py-2.5 rounded-xl flex items-center gap-2 text-sm shadow-sm transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                  <span>Add Partner</span>
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-xs font-bold text-slate-400 tracking-wider">
                      <th className="pb-4 pl-2">PARTNER</th>
                      <th className="pb-4">INDUSTRY</th>
                      <th className="pb-4">LOCATION</th>
                      <th className="pb-4">CONTACT</th>
                      <th className="pb-4">STATUS</th>
                      <th className="pb-4 text-right pr-2">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredPartners.length > 0 ? (
                      filteredPartners.map((partner) => (
                        <tr key={partner.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-5 pl-2">
                            <div>
                              <div className="font-bold text-slate-900 text-base">{partner.name}</div>
                              <div className="text-xs text-slate-400 mt-0.5">Joined: {partner.joined}</div>
                            </div>
                          </td>
                          <td className="py-5 text-sm text-slate-600">{partner.industry}</td>
                          <td className="py-5 text-sm text-slate-600">{partner.location}</td>
                          <td className="py-5">
                            <div>
                              <div className="text-sm font-medium text-slate-800">{partner.contactName}</div>
                              <div className="text-xs text-slate-400">{partner.contactEmail}</div>
                            </div>
                          </td>
                          <td className="py-5">
                            <span className="bg-[#dcfce7] text-[#166534] text-[11px] font-extrabold px-2.5 py-1 rounded-md tracking-wide">
                              {partner.status}
                            </span>
                          </td>
                          <td className="py-5 pr-2">
                            <div className="flex items-center justify-end gap-3 text-slate-400">
                              <button
                                onClick={() => setViewPartner(partner)}
                                className="p-1.5 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                                title="View Partner"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleOpenEditPartner(partner)}
                                className="p-1.5 hover:text-[#72bf24] hover:bg-green-50 rounded-lg transition-colors cursor-pointer"
                                title="Edit Partner"
                              >
                                <Pencil className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeletePartner(partner.id)}
                                className="p-1.5 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                title="Delete Partner"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="py-10 text-center text-sm text-slate-400">
                          No partners found matching your search.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ==================== BOARD OF ADVISORS VIEW ==================== */}
          {activeTab === 'board-of-advisors' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Board of Advisors</h1>
                  <p className="text-sm text-slate-500 mt-1">Manage profiles and information for the Satesoft Board of Advisors</p>
                </div>
                <button
                  onClick={handleAddAdvisor}
                  className="bg-[#72bf24] hover:bg-[#62a71e] text-white font-semibold px-5 py-2.5 rounded-xl flex items-center gap-2 text-sm shadow-sm transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                  <span>Add Advisor</span>
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
                <div className="mb-4">
                  <h2 className="text-sm font-bold text-slate-900">Board of Advisors Profiles</h2>
                </div>
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-xs font-bold text-slate-400 tracking-wider">
                      <th className="pb-4 pl-2">PROFILE</th>
                      <th className="pb-4">ROLE</th>
                      <th className="pb-4">STATUS</th>
                      <th className="pb-4">ORDER</th>
                      <th className="pb-4 text-right pr-2">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredAdvisors.map((advisor) => (
                      <tr key={advisor.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-5 pl-2">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#f0f9e8] border border-[#d3f0b4] flex items-center justify-center shrink-0">
                              <User className="w-5 h-5 text-[#72bf24]" />
                            </div>
                            <div>
                              <div className="font-bold text-slate-900 text-sm">{advisor.name}</div>
                              <div className="text-xs text-slate-400">{advisor.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-5 text-sm text-slate-600">{advisor.role}</td>
                        <td className="py-5">
                          <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                            advisor.status === 'ACTIVE' 
                              ? 'bg-emerald-50 text-emerald-700' 
                              : 'bg-slate-50 text-slate-700'
                          }`}>
                            {advisor.status}
                          </span>
                        </td>
                        <td className="py-5 text-sm text-slate-600">{advisor.order}</td>
                        <td className="py-5 pr-2">
                          <div className="flex items-center justify-end gap-2">
                            <button className="p-1.5 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-1.5 hover:text-[#72bf24] hover:bg-green-50 rounded-lg transition-colors">
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleDeleteAdvisor(advisor.id)}
                              className="p-1.5 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ==================== MAILBOX VIEW ==================== */}
          {activeTab === 'mailbox' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Mailbox</h1>
                  <p className="text-sm text-slate-500 mt-1">Manage your communications</p>
                </div>
                <button className="bg-[#72bf24] hover:bg-[#62a71e] text-white font-semibold px-5 py-2.5 rounded-xl flex items-center gap-2 text-sm shadow-sm transition-all cursor-pointer">
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                  <span>Compose</span>
                </button>
              </div>

              <div className="grid grid-cols-4 gap-6">
                <div className="col-span-1 bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 px-2 py-1.5 bg-[#f0f9e8] rounded-lg text-[#72bf24] font-semibold text-sm">
                      <Inbox className="w-4 h-4" />
                      <span>Inbox</span>
                      <span className="ml-auto bg-[#72bf24] text-white text-xs px-2 py-0.5 rounded-full">
                        {emails.filter(e => !e.read).length}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 px-2 py-1.5 text-slate-600 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors text-sm">
                        <Send className="w-4 h-4" />
                        <span>Sent</span>
                      </div>
                      <div className="flex items-center gap-2 px-2 py-1.5 text-slate-600 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors text-sm">
                        <Drafts className="w-4 h-4" />
                        <span>Drafts</span>
                      </div>
                      <div className="flex items-center gap-2 px-2 py-1.5 text-slate-600 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors text-sm">
                        <Star className="w-4 h-4" />
                        <span>Starred</span>
                      </div>
                      <div className="flex items-center gap-2 px-2 py-1.5 text-slate-600 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors text-sm">
                        <TrashIcon className="w-4 h-4" />
                        <span>Trash</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100">
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Labels</div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 px-2 py-1.5 text-slate-600 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors text-sm">
                          <Tag className="w-4 h-4 text-amber-500" />
                          <span>Important</span>
                        </div>
                        <div className="flex items-center gap-2 px-2 py-1.5 text-slate-600 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors text-sm">
                          <Tag className="w-4 h-4 text-blue-500" />
                          <span>Promotions</span>
                        </div>
                        <div className="flex items-center gap-2 px-2 py-1.5 text-slate-600 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors text-sm">
                          <Tag className="w-4 h-4 text-purple-500" />
                          <span>Social</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100">
                      <div className="relative">
                        <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          placeholder="Search Mail"
                          className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-xl bg-white focus:outline-none focus:border-[#72bf24] focus:ring-1 focus:ring-[#72bf24]"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-span-3 bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                  <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors">
                        <ChevronLeft className="w-4 h-4 text-slate-500" />
                      </button>
                      <button className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors">
                        <ChevronRight className="w-4 h-4 text-slate-500" />
                      </button>
                      <span className="text-xs text-slate-500 ml-2">1-{filteredEmails.length}/200</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors">
                        <Reply className="w-4 h-4 text-slate-500" />
                      </button>
                      <button className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors">
                        <Forward className="w-4 h-4 text-slate-500" />
                      </button>
                      <button className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors">
                        <MoreVertical className="w-4 h-4 text-slate-500" />
                      </button>
                    </div>
                  </div>

                  <div className="divide-y divide-slate-100">
                    {filteredEmails.length > 0 ? (
                      filteredEmails.map((email) => (
                        <div 
                          key={email.id} 
                          className={`p-4 hover:bg-slate-50 transition-colors cursor-pointer ${!email.read ? 'bg-[#f8fafc]' : ''}`}
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 mt-1">
                              <input type="checkbox" className="rounded border-slate-300 text-[#72bf24] focus:ring-[#72bf24]" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <span className={`font-semibold text-sm ${!email.read ? 'text-slate-900' : 'text-slate-600'}`}>
                                    {email.sender}
                                  </span>
                                  {email.starred && <StarIcon className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />}
                                  {email.label && (
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                      email.label === 'Important' ? 'bg-amber-50 text-amber-700' :
                                      email.label === 'Promotions' ? 'bg-blue-50 text-blue-700' :
                                      'bg-purple-50 text-purple-700'
                                    }`}>
                                      {email.label}
                                    </span>
                                  )}
                                </div>
                                <span className="text-xs text-slate-400 flex-shrink-0">{email.date}</span>
                              </div>
                              <div className={`text-sm ${!email.read ? 'font-semibold text-slate-800' : 'text-slate-500'}`}>
                                {email.subject}
                              </div>
                              <div className="text-sm text-slate-400 truncate">{email.preview}</div>
                              <div className="text-xs text-slate-400 mt-1">{email.email}</div>
                            </div>
                            <div className="flex-shrink-0 flex items-center gap-1">
                              <button className="p-1 hover:bg-slate-200 rounded-lg transition-colors">
                                <Paperclip className="w-3.5 h-3.5 text-slate-400" />
                              </button>
                              <button className="p-1 hover:bg-slate-200 rounded-lg transition-colors">
                                <Star className="w-3.5 h-3.5 text-slate-400" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-8 text-center text-sm text-slate-400">
                        No emails found matching your search.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==================== COMPANY NEWS VIEW ==================== */}
          {activeTab === 'news' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Company News Management</h1>
                  <p className="text-sm text-slate-500 mt-1">Manage blog posts and company announcements</p>
                </div>
                <button
                  onClick={handleAddNews}
                  className="bg-[#72bf24] hover:bg-[#62a71e] text-white font-semibold px-5 py-2.5 rounded-xl flex items-center gap-2 text-sm shadow-sm transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                  <span>Add News Post</span>
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-xs font-bold text-slate-400 tracking-wider">
                      <th className="pb-4 pl-2">POST</th>
                      <th className="pb-4">CATEGORY</th>
                      <th className="pb-4">AUTHOR</th>
                      <th className="pb-4">DATE</th>
                      <th className="pb-4 text-right pr-2">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredNews.length > 0 ? (
                      filteredNews.map((post) => (
                        <tr key={post.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-5 pl-2">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-lg bg-[#f0f9e8] border border-[#d3f0b4] flex items-center justify-center shrink-0">
                                <Newspaper className="w-4 h-4 text-[#72bf24]" />
                              </div>
                              <span className="font-bold text-slate-900 text-sm">{post.title}</span>
                            </div>
                          </td>
                          <td className="py-5">
                            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                              post.category === 'Company News' ? 'bg-blue-50 text-blue-700' :
                              post.category === 'Product Updates' ? 'bg-purple-50 text-purple-700' :
                              'bg-amber-50 text-amber-700'
                            }`}>
                              {post.category}
                            </span>
                          </td>
                          <td className="py-5 text-sm text-slate-600">{post.author}</td>
                          <td className="py-5 text-sm text-slate-600">{post.date}</td>
                          <td className="py-5 pr-2">
                            <div className="flex items-center justify-end gap-2">
                              <button className="p-1.5 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button className="p-1.5 hover:text-[#72bf24] hover:bg-green-50 rounded-lg transition-colors">
                                <Pencil className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => handleDeleteNews(post.id)}
                                className="p-1.5 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="py-10 text-center text-sm text-slate-400">
                          No news posts found matching your search.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ==================== LEGAL & COMPLIANCE VIEWS ==================== */}
          {activeTab.startsWith('legal-') && renderLegalContent()}

          {/* ==================== SETTINGS VIEW ==================== */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Settings</h1>
                  <p className="text-sm text-slate-500 mt-1">Configure system preferences and user settings</p>
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-slate-900">General Settings</h3>
                    <div className="space-y-2">
                      <label className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">Dark Mode</span>
                        <div className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#72bf24] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#72bf24]"></div>
                        </div>
                      </label>
                      <label className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">Email Notifications</span>
                        <div className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-[#72bf24] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#72bf24] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#72bf24]"></div>
                        </div>
                      </label>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-slate-900">Account Preferences</h3>
                    <div className="space-y-2">
                      <button className="w-full text-left px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">Change Password</button>
                      <button className="w-full text-left px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">Two-Factor Authentication</button>
                      <button className="w-full text-left px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">Export Data</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* --- MODALS --- */}

      {/* Product Modal */}
      {isProductModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-100">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-bold text-slate-900">
                {productModalMode === 'add' ? 'Add New Product' : 'Edit Product'}
              </h3>
              <button onClick={() => setIsProductModalOpen(false)} className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Product Name</label>
                <input
                  type="text"
                  required
                  value={productFormData.name}
                  onChange={(e) => setProductFormData({ ...productFormData, name: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl outline-none focus:border-[#72bf24] focus:ring-1 focus:ring-[#72bf24]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Tagline</label>
                <input
                  type="text"
                  required
                  value={productFormData.tagline}
                  onChange={(e) => setProductFormData({ ...productFormData, tagline: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl outline-none focus:border-[#72bf24] focus:ring-1 focus:ring-[#72bf24]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 text-xs font-semibold text-white bg-[#72bf24] hover:bg-[#62a71e] rounded-xl transition-colors">
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Partner Modal */}
      {isPartnerModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-100">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-bold text-slate-900">
                {partnerModalMode === 'add' ? 'Add New Partner' : 'Edit Partner'}
              </h3>
              <button onClick={() => setIsPartnerModalOpen(false)} className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePartner} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Partner Name</label>
                <input
                  type="text"
                  required
                  value={partnerFormData.name}
                  onChange={(e) => setPartnerFormData({ ...partnerFormData, name: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl outline-none focus:border-[#72bf24] focus:ring-1 focus:ring-[#72bf24]"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Industry</label>
                  <input
                    type="text"
                    required
                    value={partnerFormData.industry}
                    onChange={(e) => setPartnerFormData({ ...partnerFormData, industry: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl outline-none focus:border-[#72bf24] focus:ring-1 focus:ring-[#72bf24]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Location</label>
                  <input
                    type="text"
                    required
                    value={partnerFormData.location}
                    onChange={(e) => setPartnerFormData({ ...partnerFormData, location: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl outline-none focus:border-[#72bf24] focus:ring-1 focus:ring-[#72bf24]"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsPartnerModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 text-xs font-semibold text-white bg-[#72bf24] hover:bg-[#62a71e] rounded-xl transition-colors">
                  Save Partner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}