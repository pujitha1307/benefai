'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

type Beneficiary = {
  id: string
  full_name: string
  aadhaar: string
  annual_income: number
  district: string
  scheme_name: string
  risk_level: string
  score: number
  decision: string
  reason: string
  created_at: string
}

export default function AuditLog() {
  const [records, setRecords] = useState<Beneficiary[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRecords = async () => {
      const { data, error } = await supabase
        .from('beneficiaries')
        .select('*')
        .order('created_at', { ascending: false })

      if (!error && data) setRecords(data)
      setLoading(false)
    }
    fetchRecords()
  }, [])

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Nav */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-900 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-slate-900">BenefAI</span>
            </div>
            <div className="flex items-center gap-4">
              <a href="https://fraud-dashboard-green.vercel.app/" target="_blank" className="text-sm font-medium text-slate-600 hover:text-slate-900">Dashboard</a>
              <a href="https://benefai.vercel.app" target="_blank" className="text-sm font-medium text-slate-600 hover:text-slate-900">Verification</a>
              <a href="https://benefai-legal-intelligence-mgln-dprw767no.vercel.app/p3test" target="_blank" className="text-sm font-medium text-slate-600 hover:text-slate-900">Legal Intelligence</a>
              <a href="https://benefd.vercel.app/" target="_blank" className="text-sm font-medium text-slate-600 hover:text-slate-900">BenefD</a>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Audit Log</h1>
            <p className="text-slate-500 mt-1 text-sm">All beneficiary verification records</p>
          </div>
          <a href="/" className="px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">
            ← Back to Verification
          </a>
        </div>

        {loading ? (
          <div className="text-center py-20 text-slate-400">Loading records...</div>
        ) : records.length === 0 ? (
          <div className="text-center py-20 text-slate-400">No records found.</div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-slate-600">Name</th>
                  <th className="text-left px-4 py-3 font-medium text-slate-600">Aadhaar</th>
                  <th className="text-left px-4 py-3 font-medium text-slate-600">Scheme</th>
                  <th className="text-left px-4 py-3 font-medium text-slate-600">State</th>
                  <th className="text-left px-4 py-3 font-medium text-slate-600">Income</th>
                  <th className="text-left px-4 py-3 font-medium text-slate-600">Score</th>
                  <th className="text-left px-4 py-3 font-medium text-slate-600">Decision</th>
                  <th className="text-left px-4 py-3 font-medium text-slate-600">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {records.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium text-slate-900">{r.full_name}</td>
                    <td className="px-4 py-3 text-slate-500">••••{r.aadhaar?.slice(-4)}</td>
                    <td className="px-4 py-3 text-slate-700">{r.scheme_name}</td>
                    <td className="px-4 py-3 text-slate-700">{r.district}</td>
                    <td className="px-4 py-3 text-slate-700">₹{r.annual_income?.toLocaleString('en-IN')}</td>
                    <td className="px-4 py-3">
                      <span className={`font-bold ${
                        r.risk_level === 'green' ? 'text-emerald-600' :
                        r.risk_level === 'yellow' ? 'text-amber-600' : 'text-red-600'
                      }`}>{r.score}/100</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        r.risk_level === 'green' ? 'bg-emerald-100 text-emerald-800' :
                        r.risk_level === 'yellow' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {r.decision?.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-400">
                      {new Date(r.created_at).toLocaleDateString('en-IN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  )
}