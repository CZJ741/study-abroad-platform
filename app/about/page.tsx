// app/about/page.tsx
import s from './about-print.module.css';
import { Navigation } from "@/components/navigation"

export default function AboutRuipingPage() {
  return (
    
    <div className={s.aboutWrapper}>
      <Navigation />
      <header className={s.header}>
        <h1>Why Choose Ruiping Education</h1>
        <p>18 Years of Excellence in Study-in-China Services • 300+ Direct University Partnerships • Trusted by Global Agents</p>
      </header>

      <section className={s.section}>
        <h2>Most Universities & Programs</h2>
        <p>Ruiping Education partners with over <strong>300 prestigious Chinese universities</strong>, offering more than <strong>15,000 programs</strong> across bachelor's, master's, PhD, language courses, and short-term study tours. From Belt and Road countries to Europe and North America, we help every agent find the perfect match.</p>

        <div className={s.statsGrid}>
          <div className={s.statCard}>
            <div className={s.num}>300+</div>
            <div className={s.label}>Partner Universities</div>
          </div>
          <div className={s.statCard}>
            <div className={s.num}>15,000+</div>
            <div className={s.label}>Available Programs</div>
          </div>
          <div className={s.statCard}>
            <div className={s.num}>70+</div>
            <div className={s.label}>Cities Covered</div>
          </div>
          <div className={s.statCard}>
            <div className={s.num}>100+</div>
            <div className={s.label}>Partner Countries</div>
          </div>
        </div>

        <div className={s.highlightBox}>
          <p><strong>Exclusive Edge:</strong> Direct access to Tsinghua, Peking, Fudan, SJTU, Wuhan, and HUST • Dedicated BRI application channels • Program info in English, Russian, Spanish, Arabic</p>
        </div>
      </section>

      <section className={s.section}>
        <h2>Most Trustworthy Service</h2>
        <p>With 18 years in the industry, Ruiping has served over <strong>50,000 international students</strong> with a <strong>99.8% visa success rate</strong>. We don’t promise “guaranteed admission” — we deliver transparency, accountability, and full tracking.</p>

        <div className={s.highlightBox}>
          <p><strong>Five Pillars of Trust:</strong></p>
          <ol style={{ margin:'12px 0 0 18px', lineHeight:'1.8', fontSize:'10.5pt' }}>
            <li><strong>Accurate Information:</strong> Monthly sync with 300+ university admissions offices</li>
            <li><strong>Full Responsibility:</strong> Dedicated advisor per case; full refund on visa rejection</li>
            <li><strong>Reliable Partners:</strong> All universities verified by China’s Ministry of Education</li>
            <li><strong>Official Recognition:</strong> Registered with Hubei Education Department; endorsed by CEAIE</li>
            <li><strong>Agents’ Top Choice:</strong> 800+ global enrollment agencies; 4,000+ annual applications</li>
          </ol>
        </div>
      </section>

      <section className={s.section}>
        <h2>Most Affordable & Transparent Pricing</h2>
        <p>We uphold a “no hidden fees” policy. All costs are shown upfront. Average service fee: <strong>USD 50</strong>. Scholarship application fee fully refunded upon success.</p>

        <table className={s.feeTable}>
          <thead>
            <tr>
              <th>Service Item</th>
              <th>Ruiping (USD)</th>
              <th>Direct to University</th>
              <th>Traditional Agency</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Application Service</td>
              <td className={s.best}>$50</td>
              <td>$0–$100</td>
              <td className={s.highlight}>$500–$5,000</td>
              <td>Includes document review & essay editing</td>
            </tr>
            <tr>
              <td>Scholarship Application</td>
              <td className={s.best}>$0 (refunded if awarded)</td>
              <td>$60–$200</td>
              <td>$1,000–$3,000</td>
              <td>CSC & provincial scholarship support</td>
            </tr>
            <tr>
              <td>Visa Documents</td>
              <td className={s.best}>Free</td>
              <td>DIY</td>
              <td>$200–$800</td>
              <td>JW202 + visa guidance</td>
            </tr>
            <tr>
              <td>Airport Pickup & Housing</td>
              <td className={s.best}>$80 (at cost)</td>
              <td>DIY</td>
              <td>$150–$400</td>
              <td>Driver + Chinese-speaking escort</td>
            </tr>
            <tr>
              <td>Post-Admission Fees</td>
              <td className={s.best}>$0</td>
              <td>$0</td>
              <td>$300–$2,000</td>
              <td>No extra charges after enrollment</td>
            </tr>
            <tr>
              <td>Hidden Fees</td>
              <td className={s.best}>None</td>
              <td>None</td>
              <td>$100–$1,000</td>
              <td>Full transparency guaranteed</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className={s.section}>
        <h2>Easiest Application Experience</h2>
        <p>From registration to university registration — fully online, average processing time: <strong>15 working days</strong>. Auto-save every 3 seconds. 7 clear stages with real-time progress bar.</p>

        <div className={s.timeline}>
          <div className={s.timelineItem}>
            <h4>Register & Bind (3 mins)</h4>
            <p>One-click via phone or WeChat; scan-to-login</p>
          </div>
          <div className={s.timelineItem}>
            <h4>Live Consulting (30s response)</h4>
            <p>WhatsApp/WeChat advisors online 24/7</p>
          </div>
          <div className={s.timelineItem}>
            <h4>Smart Form (One-time fill)</h4>
            <p>Auto-matched to university-specific forms</p>
          </div>
          <div className={s.timelineItem}>
            <h4>Document Upload (Templates included)</h4>
            <p>Passport, transcript, recommendation letter templates</p>
          </div>
          <div className={s.timelineItem}>
            <h4>Status Alerts (Multi-channel)</h4>
            <p>Email + SMS + App push notifications</p>
          </div>
          <div className={s.timelineItem}>
            <h4>Pre-Departure (One-click booking)</h4>
            <p>Housing, pickup, remittance, insurance</p>
          </div>
          <div className={s.timelineItem}>
            <h4>Enrollment (On-site support)</h4>
            <p>Wuhan team accompanies registration</p>
          </div>
        </div>
      </section>

      <section className={s.section}>
        <h2>Real Success Stories</h2>
        <p style={{ marginBottom:'20px', fontSize:'11pt', color:'#444' }}>Over 50,000 students have realized their China dream with Ruiping. Here are recent highlights (shared with permission):</p>

        <div className={s.casesGrid}>
          <div className={s.caseCard}>
            <div className={s.caseHeader}>
              <div className={s.caseFlag}>NG</div>
            </div>
            <div className={s.caseBody}>
              <h3 className={s.caseTitle}>Alex from Nigeria – Tsinghua Full Scholarship</h3>
              <div className={s.caseMeta}>Lagos → Beijing</div>
              <p className={s.caseDesc}>GPA 3.8, IELTS 6.5. Secured Tsinghua Engineering Management Master's with full CSC scholarship in 3 weeks. Visa approved in 10 days.</p>
              <div className={s.caseQuote}>“From Lagos to Tsinghua — Ruiping made the impossible real!”</div>
              <div className={s.caseFooter}>
                <span className={s.caseTag}>CSC Full Scholarship</span>
                <span>Fall 2024</span>
              </div>
            </div>
          </div>

          <div className={s.caseCard}>
            <div className={s.caseHeader}>
              <div className={s.caseFlag}>RU</div>
            </div>
            <div className={s.caseBody}>
              <h3 className={s.caseTitle}>Anna from Russia – Wuhan University</h3>
              <div className={s.caseMeta}>Moscow → Wuhan</div>
              <p className={s.caseDesc}>Top high school graduate. Admitted to International Economics & Trade. Completed 2-month online Chinese prep before arrival.</p>
              <div className={s.caseQuote}>“Wuhan’s cherry blossoms — my first stop in the China dream!”</div>
              <div className={s.caseFooter}>
                <span className={s.caseTag}>Direct Bachelor Entry</span>
                <span>2023 Entry</span>
              </div>
            </div>
          </div>

          <div className={s.caseCard}>
            <div className={s.caseHeader}>
              <div className={s.caseFlag}>PK</div>
            </div>
            <div className={s.caseBody}>
              <h3 className={s.caseTitle}>Ali from Pakistan – Peking University PhD</h3>
              <div className={s.caseMeta}>Karachi → Beijing</div>
              <p className={s.caseDesc}>MSc in Environmental Science. Research on CPEC ecology. Won Beijing Government Scholarship (30,000 RMB/year).</p>
              <div className={s.caseQuote}>“Professional service let me focus on research, not paperwork.”</div>
              <div className={s.caseFooter}>
                <span className={s.caseTag}>Provincial Scholarship</span>
                <span>2024 Entry</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={s.section}>
        <h2>Complete Service Ecosystem</h2>
        <p>One-stop solution from inquiry to post-graduation career support:</p>

        <div className={s.highlightBox}>
          <p><strong>Before Studying:</strong> Program matching → Document guidance → Online application → Scholarship coaching → Visa support → Pre-departure training</p>
          <p><strong>During Study:</strong> Airport pickup → Registration → Academic monitoring → Cultural adaptation → Internship placement</p>
          <p><strong>After Graduation:</strong> Alumni network → Degree authentication → Job placement → iAgent entrepreneurship platform</p>
        </div>
      </section>

      <footer className={s.footer}>
        <p><strong>Hubei Ruiping Education Technology Co., Ltd.</strong> © 2025 | MOE-Registered | 18 Years of Trust</p>
        <p style={{ marginTop:'8px' }}>
          <a href="mailto:info@studyinchina-csc.org">info@studyinchina-csc.org</a> | 
          <a href="tel:+8617671677856">+86 17671677856</a> | 
          <a href="/universities" target="_blank" rel="noopener noreferrer">www.studyinchina-csc.org</a>
        </p>
      </footer>
    </div>
  );
}