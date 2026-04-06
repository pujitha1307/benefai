import IntakeForm from '@/components/IntakeForm'

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
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
              <a href="https://benefai-dashboard.vercel.app" target="_blank" className="text-sm font-medium text-slate-600 hover:text-slate-900">AI Features</a>
              <a href="/audit" className="text-sm font-medium text-slate-600 hover:text-slate-900">Audit Log</a>
              <a href="/dashboard" className="text-sm font-medium text-slate-600 hover:text-slate-900">Dashboard</a>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Beneficiary Verification</h1>
          <p className="text-slate-500 mt-2 text-sm">Submit applicant details for AI-powered fraud detection and eligibility check</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
          <IntakeForm />
        </div>
      </main>
    </div>
  )
}