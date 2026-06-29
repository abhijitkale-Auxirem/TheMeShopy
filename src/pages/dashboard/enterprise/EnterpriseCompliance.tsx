import DashboardLayout from '@/layouts/DashboardLayout';
import { Shield, CheckCircle, AlertTriangle, Clock, FileText, Download, ChevronRight } from 'lucide-react';

const complianceItems = [
  { id: 'c1', title: 'License Audit', description: 'All active licenses verified and accounted for', status: 'passed', lastChecked: '2024-06-14', category: 'Licensing' },
  { id: 'c2', title: 'GDPR Data Processing', description: 'Data processing agreements in place for all vendors', status: 'passed', lastChecked: '2024-06-10', category: 'Privacy' },
  { id: 'c3', title: 'Security Review', description: 'Annual security assessment of all digital assets', status: 'pending', lastChecked: '2024-05-01', category: 'Security' },
  { id: 'c4', title: 'IP Rights Verification', description: 'Intellectual property rights confirmed for all assets', status: 'passed', lastChecked: '2024-06-12', category: 'Legal' },
  { id: 'c5', title: 'License Expiry Monitor', description: '2 licenses expiring in the next 90 days', status: 'warning', lastChecked: '2024-06-14', category: 'Licensing' },
  { id: 'c6', title: 'Usage Policy Compliance', description: 'Team adherence to acceptable use policy', status: 'passed', lastChecked: '2024-06-08', category: 'Policy' },
  { id: 'c7', title: 'Vendor Assessment', description: 'ThirdParty vendor risk assessment pending update', status: 'pending', lastChecked: '2024-04-15', category: 'Security' },
  { id: 'c8', title: 'Financial Compliance', description: 'All license purchases documented and approved', status: 'passed', lastChecked: '2024-06-13', category: 'Finance' },
];

const statusConfig = {
  passed: { icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/20', badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' },
  warning: { icon: AlertTriangle, color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-900/20', badge: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' },
  pending: { icon: Clock, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20', badge: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
};

const passed = complianceItems.filter(c => c.status === 'passed').length;
const score = Math.round((passed / complianceItems.length) * 100);

export default function EnterpriseCompliance() {
  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-heading">Compliance</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Monitor regulatory and policy compliance status</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-xl transition-colors">
            <Download className="w-4 h-4" /> Download Report
          </button>
        </div>

        {/* Compliance Score */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-xl p-6 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/80 mb-1">Overall Compliance Score</p>
              <div className="flex items-end gap-2">
                <p className="text-5xl font-bold font-heading">{score}%</p>
                <p className="text-white/70 mb-1.5">({passed}/{complianceItems.length} checks passed)</p>
              </div>
              <div className="w-64 bg-white/20 rounded-full h-2.5 mt-3">
                <div className="bg-white h-2.5 rounded-full transition-all" style={{ width: `${score}%` }} />
              </div>
            </div>
            <Shield className="w-20 h-20 text-white/20" />
          </div>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Passed', value: complianceItems.filter(c => c.status === 'passed').length, color: 'emerald' },
            { label: 'Warnings', value: complianceItems.filter(c => c.status === 'warning').length, color: 'amber' },
            { label: 'Pending', value: complianceItems.filter(c => c.status === 'pending').length, color: 'blue' },
          ].map(s => (
            <div key={s.label} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-5 text-center">
              <p className={`text-3xl font-bold font-heading text-${s.color}-600`}>{s.value}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Checks */}
        <div className="space-y-3">
          {complianceItems.map(item => {
            const config = statusConfig[item.status as keyof typeof statusConfig];
            const Icon = config.icon;
            return (
              <div key={item.id} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-5 flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl ${config.bg} flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-5 h-5 ${config.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${config.badge} capitalize`}>{item.status}</span>
                    <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 px-2 py-0.5 rounded-full">{item.category}</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{item.description}</p>
                  <p className="text-xs text-gray-400 mt-0.5">Last checked: {item.lastChecked}</p>
                </div>
                <button className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors flex-shrink-0">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
