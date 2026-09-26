import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  Server,
  Layers,
  Database,
  Shield,
  FileCode,
  DollarSign,
  Cpu,
  ArrowRight,
  Copy,
  Check,
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

interface ArchitectureGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGoToAdmin: () => void;
}

export const ArchitectureGuideModal: React.FC<ArchitectureGuideModalProps> = ({
  isOpen,
  onClose,
  onGoToAdmin,
}) => {
  const { getAccentClasses } = usePortfolio();
  const accent = getAccentClasses();
  const [activeTab, setActiveTab] = useState<'stacks' | 'outline' | 'schema' | 'deployment'>('stacks');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const schemaCode = `// Database Schema Blueprint (PostgreSQL / Drizzle / Prisma)

Table users {
  id: uuid PRIMARY KEY
  email: varchar UNIQUE
  password_hash: varchar
  role: varchar // 'admin'
  created_at: timestamp
}

Table projects {
  id: uuid PRIMARY KEY
  title: varchar
  tagline: text
  category: varchar // 'fullstack' | 'frontend' | 'ai'
  cover_image: varchar
  tags: text[] // ['React', 'TypeScript', 'Node.js']
  live_url: varchar NULLABLE
  github_url: varchar NULLABLE
  impact_metric: varchar NULLABLE
  problem_statement: text
  solution_statement: text
  architecture_notes: text
  results: text[]
  featured: boolean DEFAULT false
  order_index: integer
  created_at: timestamp
}

Table work_experience {
  id: uuid PRIMARY KEY
  role: varchar
  company: varchar
  location: varchar
  period: varchar
  is_current: boolean
  achievements: text[]
  tech_stack: text[]
  order_index: integer
}

Table skills {
  id: uuid PRIMARY KEY
  category: varchar // 'Frontend', 'Backend', 'DevOps'
  name: varchar
  proficiency: integer // 1-100
  is_highlight: boolean DEFAULT false
}

Table inquiries {
  id: uuid PRIMARY KEY
  sender_name: varchar
  sender_email: varchar
  subject: varchar
  project_type: varchar
  budget_range: varchar
  message: text
  status: varchar // 'unread' | 'read' | 'replied'
  created_at: timestamp
}`;

  const handleCopySchema = () => {
    navigator.clipboard.writeText(schemaCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl rounded-2xl bg-neutral-900 border border-neutral-800 shadow-2xl overflow-hidden my-6 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="px-6 py-5 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/80">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400" />
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider font-semibold">
                Feasibility &amp; Technical Roadmap
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Portfolio with Admin Panel: Complete Blueprint
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Answer Banner */}
        <div className="px-6 py-3.5 bg-indigo-950/30 border-b border-indigo-900/40 text-xs sm:text-sm text-indigo-200 flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
          <div>
            <strong className="text-white">Yes, it is 100% possible and highly recommended.</strong> Building your own portfolio with an integrated CMS gives you instant content updates without redeploying code.
          </div>
        </div>

        {/* Tab navigation */}
        <div className="flex border-b border-neutral-800 px-6 bg-neutral-950/40 overflow-x-auto">
          {[
            { id: 'stacks', label: '1. Recommended Stacks' },
            { id: 'outline', label: '2. Complete Outline' },
            { id: 'schema', label: '3. Database Schema' },
            { id: 'deployment', label: '4. Hosting & Free Tier' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3 px-4 text-xs font-semibold whitespace-nowrap border-b-2 transition-all ${
                activeTab === tab.id
                  ? 'border-indigo-500 text-white'
                  : 'border-transparent text-neutral-400 hover:text-neutral-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-neutral-300">
          
          {/* TAB 1: STACKS */}
          {activeTab === 'stacks' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-base font-bold text-white">4 Battle-Tested Architecture Stacks</h4>
                <p className="text-xs text-neutral-400 mt-1">
                  Choose based on your existing familiarity and deployment preference:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Stack 1 */}
                <div className="rounded-xl border border-neutral-800 bg-neutral-950/60 p-5 space-y-3 relative overflow-hidden">
                  <div className="text-[11px] font-mono text-emerald-400 font-semibold uppercase">
                    Stack 1 · Modern Full-Stack (Most Popular)
                  </div>
                  <h5 className="font-bold text-white text-base">Next.js 15 + PostgreSQL + Prisma/Drizzle</h5>
                  <ul className="text-xs text-neutral-300 space-y-1.5 leading-relaxed">
                    <li><strong className="text-white">Frontend:</strong> Next.js App Router (React 19), Tailwind CSS, Motion</li>
                    <li><strong className="text-white">Backend:</strong> Next.js Server Actions &amp; API Route Handlers</li>
                    <li><strong className="text-white">Database:</strong> Neon Serverless Postgres or Supabase</li>
                    <li><strong className="text-white">Auth:</strong> NextAuth (Auth.js) or Clerk</li>
                    <li><strong className="text-white">Uploads:</strong> Uploadthing or Cloudinary</li>
                  </ul>
                  <div className="text-[11px] text-neutral-400 pt-2 border-t border-neutral-850">
                    <strong>Pros:</strong> Fast SEO with Server Side Rendering, single repository, zero server configuration on Vercel.
                  </div>
                </div>

                {/* Stack 2 */}
                <div className="rounded-xl border border-neutral-800 bg-neutral-950/60 p-5 space-y-3">
                  <div className="text-[11px] font-mono text-indigo-400 font-semibold uppercase">
                    Stack 2 · Decoupled SPA (Like this Applet)
                  </div>
                  <h5 className="font-bold text-white text-base">React (Vite) + Express / Node.js + MongoDB</h5>
                  <ul className="text-xs text-neutral-300 space-y-1.5 leading-relaxed">
                    <li><strong className="text-white">Frontend:</strong> Vite + React + Tailwind CSS</li>
                    <li><strong className="text-white">Backend:</strong> Express or Fastify microservice</li>
                    <li><strong className="text-white">Database:</strong> MongoDB Atlas or Cloud SQL Postgres</li>
                    <li><strong className="text-white">Auth:</strong> JWT Bearer Tokens in HTTP-only cookies</li>
                    <li><strong className="text-white">Storage:</strong> AWS S3 or Google Cloud Storage</li>
                  </ul>
                  <div className="text-[11px] text-neutral-400 pt-2 border-t border-neutral-850">
                    <strong>Pros:</strong> Ultra-fast local development, standard API separation, easy to port to React Native mobile app.
                  </div>
                </div>

                {/* Stack 3 */}
                <div className="rounded-xl border border-neutral-800 bg-neutral-950/60 p-5 space-y-3">
                  <div className="text-[11px] font-mono text-amber-400 font-semibold uppercase">
                    Stack 3 · Headless CMS
                  </div>
                  <h5 className="font-bold text-white text-base">React/Astro + Sanity.io or Strapi CMS</h5>
                  <ul className="text-xs text-neutral-300 space-y-1.5 leading-relaxed">
                    <li><strong className="text-white">Frontend:</strong> Astro or React SPA with static site generation</li>
                    <li><strong className="text-white">CMS / Admin:</strong> Sanity Studio or Strapi Dashboard (pre-built UI)</li>
                    <li><strong className="text-white">API:</strong> GraphQL or GROQ queries</li>
                    <li><strong className="text-white">Hosting:</strong> Netlify or Vercel</li>
                  </ul>
                  <div className="text-[11px] text-neutral-400 pt-2 border-t border-neutral-850">
                    <strong>Pros:</strong> No need to write custom admin form components or authentication from scratch.
                  </div>
                </div>

                {/* Stack 4 */}
                <div className="rounded-xl border border-neutral-800 bg-neutral-950/60 p-5 space-y-3">
                  <div className="text-[11px] font-mono text-sky-400 font-semibold uppercase">
                    Stack 4 · Backend-as-a-Service (BaaS)
                  </div>
                  <h5 className="font-bold text-white text-base">React + Firebase / Supabase</h5>
                  <ul className="text-xs text-neutral-300 space-y-1.5 leading-relaxed">
                    <li><strong className="text-white">Frontend:</strong> React + Tailwind CSS</li>
                    <li><strong className="text-white">Database &amp; Auth:</strong> Firebase Firestore + Firebase Auth OR Supabase</li>
                    <li><strong className="text-white">Rules:</strong> Granular Row-Level Security (RLS)</li>
                    <li><strong className="text-white">Storage:</strong> Firebase Storage bucket</li>
                  </ul>
                  <div className="text-[11px] text-neutral-400 pt-2 border-t border-neutral-850">
                    <strong>Pros:</strong> Real-time synchronization, zero backend code, generous free tier.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: OUTLINE */}
          {activeTab === 'outline' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-base font-bold text-white">Complete System Architecture &amp; Modules</h4>
                <p className="text-xs text-neutral-400 mt-1">
                  Here is the exact structural breakdown of both the public client and the admin CMS:
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-950/50 space-y-2">
                  <div className="flex items-center gap-2 text-white font-bold">
                    <span className="flex h-5 w-5 rounded-full bg-indigo-500 text-[10px] items-center justify-center">1</span>
                    <span>Module A: Public Facing Visitor Portfolio</span>
                  </div>
                  <ul className="text-xs text-neutral-300 pl-7 list-disc space-y-1 leading-relaxed">
                    <li><strong>Hero Section:</strong> High-impact title, live availability indicator, social links, resume download.</li>
                    <li><strong>Selected Works &amp; Case Studies:</strong> Filterable grid by category (Cloud, Frontend, Fullstack), impact metrics, and full case study modal (Problem, Solution, Architecture, Outcomes).</li>
                    <li><strong>Work Experience:</strong> Timeline view of roles, companies, key achievements, and technologies used.</li>
                    <li><strong>Technical Matrix:</strong> Categorized skills with mastery percentages and key highlights.</li>
                    <li><strong>Testimonials &amp; Social Proof:</strong> Client quotes and verified project references.</li>
                    <li><strong>Interactive Contact Form:</strong> Direct submission of proposals with project scope, budget selection, and confirmation.</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-950/50 space-y-2">
                  <div className="flex items-center gap-2 text-white font-bold">
                    <span className="flex h-5 w-5 rounded-full bg-emerald-500 text-[10px] items-center justify-center">2</span>
                    <span>Module B: Admin CMS Dashboard</span>
                  </div>
                  <ul className="text-xs text-neutral-300 pl-7 list-disc space-y-1 leading-relaxed">
                    <li><strong>Authentication &amp; Gatekeeper:</strong> Secure PIN / JWT token gatekeeper to prevent unauthorized edits.</li>
                    <li><strong>Overview Metrics:</strong> Real-time count of active projects, career entries, total inquiries, and unread client proposals.</li>
                    <li><strong>Profile &amp; Hero Editor:</strong> Live editing of your name, headline, bio, location, availability status, and social URLs.</li>
                    <li><strong>Project CRUD Engine:</strong> Create new case studies, edit metadata, upload cover photos, toggle featured flags, or delete old projects.</li>
                    <li><strong>Experience &amp; Skills Managers:</strong> Add new positions, update skill mastery bars, and categorize tech stacks.</li>
                    <li><strong>Inquiries Inbox:</strong> View incoming contact proposals, read message threads, copy email / reply, and mark as responded.</li>
                    <li><strong>Settings &amp; Theme Studio:</strong> Change accent colors, toggle sections on/off, export full JSON backup, and import data.</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-950/50 space-y-2">
                  <div className="flex items-center gap-2 text-white font-bold">
                    <span className="flex h-5 w-5 rounded-full bg-amber-500 text-[10px] items-center justify-center">3</span>
                    <span>Module C: Communication &amp; Media Pipeline</span>
                  </div>
                  <ul className="text-xs text-neutral-300 pl-7 list-disc space-y-1 leading-relaxed">
                    <li><strong>Email Notifications:</strong> Hooking up Resend API or Nodemailer so when a client submits the contact form, you get an immediate email ping or Telegram/Discord webhook alert.</li>
                    <li><strong>Image CDN:</strong> Automatic conversion of project screenshots to modern WebP format for fast sub-second load times.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SCHEMA */}
          {activeTab === 'schema' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-bold text-white">Relational Database Schema (ERD)</h4>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Production-ready schema for PostgreSQL, MySQL, or MongoDB.
                  </p>
                </div>
                <button
                  onClick={handleCopySchema}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-300 bg-neutral-800 hover:text-white rounded-lg transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy Schema'}</span>
                </button>
              </div>

              <pre className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-xs font-mono text-neutral-300 overflow-x-auto leading-relaxed">
                {schemaCode}
              </pre>
            </div>
          )}

          {/* TAB 4: DEPLOYMENT */}
          {activeTab === 'deployment' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-base font-bold text-white">Zero-Cost Free Tier vs Production Hosting</h4>
                <p className="text-xs text-neutral-400 mt-1">
                  You can deploy this entire architecture for $0/month using top-tier developer platforms:
                </p>
              </div>

              <div className="border border-neutral-800 rounded-xl overflow-hidden">
                <table className="w-full text-xs text-left">
                  <thead className="bg-neutral-950 border-b border-neutral-800 text-neutral-400 font-mono">
                    <tr>
                      <th className="p-3">Layer</th>
                      <th className="p-3">Free Tier Provider</th>
                      <th className="p-3">Free Quota</th>
                      <th className="p-3">Production Alternative</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800/80">
                    <tr>
                      <td className="p-3 font-semibold text-white">Frontend &amp; Edge</td>
                      <td className="p-3 text-neutral-300">Vercel / Cloudflare Pages</td>
                      <td className="p-3 text-emerald-400">100GB bandwidth/mo, unlimited builds</td>
                      <td className="p-3 text-neutral-400">AWS CloudFront + S3</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-white">Backend API</td>
                      <td className="p-3 text-neutral-300">Next.js Edge or Render Free Tier</td>
                      <td className="p-3 text-emerald-400">Generous serverless executions</td>
                      <td className="p-3 text-neutral-400">Fly.io / AWS ECS</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-white">Database</td>
                      <td className="p-3 text-neutral-300">Neon / Supabase</td>
                      <td className="p-3 text-emerald-400">500MB free PostgreSQL storage</td>
                      <td className="p-3 text-neutral-400">Cloud SQL / AWS Aurora</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-white">Image CDN</td>
                      <td className="p-3 text-neutral-300">Cloudinary / Uploadthing</td>
                      <td className="p-3 text-emerald-400">25GB storage &amp; image transforms</td>
                      <td className="p-3 text-neutral-400">AWS S3 + Imgix</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-white">Contact Emails</td>
                      <td className="p-3 text-neutral-300">Resend</td>
                      <td className="p-3 text-emerald-400">3,000 free emails/month</td>
                      <td className="p-3 text-neutral-400">SendGrid / AWS SES</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-950/60 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="font-bold text-white">Test the Live Implementation Now</div>
                  <div className="text-xs text-neutral-400">
                    We've already built the entire interactive admin panel right in this app!
                  </div>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onGoToAdmin();
                  }}
                  className={`px-4 py-2.5 rounded-lg text-xs font-semibold text-white ${accent.bg} hover:opacity-90 transition-all flex items-center gap-1.5`}
                >
                  <span>Launch Admin Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-neutral-800 bg-neutral-950/80 flex items-center justify-between">
          <span className="text-xs text-neutral-500 font-mono">
            Designed for high performance, modularity &amp; zero-pill aesthetic
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-neutral-200 bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
