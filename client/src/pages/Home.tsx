/**
 * Design: Bold Report / Editorial Style
 * Theme: Royal Blue (#1B3A6B) → Teal (#00B4D8) gradient with warm orange (#FF6B35) accents
 * Layout: Long-form single page with visually contrasting sections
 * Typography: Almarai ExtraBold for headings, Tajawal for body text
 * Direction: RTL (Arabic)
 */

import { useEffect, useRef, useState } from "react";
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  AreaChart, Area,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from "recharts";

// ─── Data ────────────────────────────────────────────────────────────────────

const serviceProviderData = [
  { name: "وزارة الصحة (مباشر)", value: 64, color: "#1B3A6B", patients: "13,142" },
  { name: "ديافيروم", value: 20.8, color: "#00B4D8", patients: "4,280+" },
  { name: "دافيتا", value: 12.9, color: "#FF6B35", patients: "2,650+" },
  { name: "قطاع خاص آخر", value: 2.3, color: "#90E0EF", patients: "~470" },
];

const equipmentMarketData = [
  { name: "فريزينيوس ميديكال كير", share: 45, color: "#1B3A6B" },
  { name: "باكستر إنترناشيونال", share: 20, color: "#00B4D8" },
  { name: "بي براون ميلسونغن", share: 15, color: "#FF6B35" },
  { name: "نيبرو كوربوريشن", share: 10, color: "#0096C7" },
  { name: "نيكيسو", share: 5, color: "#48CAE4" },
  { name: "أخرى", share: 5, color: "#ADE8F4" },
];

const marketGrowthData = [
  { year: "2020", value: 720 },
  { year: "2021", value: 760 },
  { year: "2022", value: 800 },
  { year: "2023", value: 840 },
  { year: "2024", value: 877 },
  { year: "2025", value: 920 },
  { year: "2026", value: 970 },
  { year: "2027", value: 1020 },
  { year: "2028", value: 1080 },
  { year: "2029", value: 1150 },
  { year: "2030", value: 1247 },
];

const patientsGrowthData = [
  { year: "2017", patients: 14200 },
  { year: "2018", patients: 15400 },
  { year: "2019", patients: 16800 },
  { year: "2020", patients: 18000 },
  { year: "2021", patients: 20534 },
  { year: "2022", patients: 21600 },
  { year: "2023", patients: 22800 },
  { year: "2024", patients: 24000 },
];

const sectorDistributionData = [
  { sector: "وزارة الصحة", centers: 193, patients: 13142, machines: 5600 },
  { sector: "حكومي آخر", centers: 31, patients: 4312, machines: 1200 },
  { sector: "قطاع خاص", centers: 51, patients: 3080, machines: 1200 },
];

const companyRadarData = [
  { subject: "عدد المراكز", Diaverum: 85, DaVita: 60, Fresenius: 30 },
  { subject: "رضا المرضى", Diaverum: 90, DaVita: 88, Fresenius: 92 },
  { subject: "التغطية الجغرافية", Diaverum: 80, DaVita: 65, Fresenius: 40 },
  { subject: "جودة الرعاية", Diaverum: 88, DaVita: 87, Fresenius: 95 },
  { subject: "الحصة السوقية", Diaverum: 82, DaVita: 55, Fresenius: 35 },
];

const esrdCausesData = [
  { name: "السكري", value: 42, color: "#FF6B35" },
  { name: "ارتفاع ضغط الدم", value: 34, color: "#1B3A6B" },
  { name: "أسباب أخرى", value: 24, color: "#00B4D8" },
];

// ─── Suppliers & Distributors Data ──────────────────────────────────────────

const integratedSuppliersData = [
  {
    name: "فريزينيوس ميديكال كير",
    nameEn: "Fresenius Medical Care",
    flag: "🇩🇪",
    agent: "فرع السعودية",
    products: ["أجهزة هيموديالسيز", "الدياليزرز", "محاليل الديالسيز", "خطوط الدم"],
    website: "fresenius.com",
    color: "#1B3A6B",
    category: "مزود متكامل",
  },
  {
    name: "باكستر إنترناشيونال",
    nameEn: "Baxter International",
    flag: "🇺🇸",
    agent: "Olayan Group",
    products: ["معدات الديالسيز البريتوني", "محاليل PD", "أكياس الديالسيز"],
    website: "baxter.com",
    color: "#00B4D8",
    category: "مزود متكامل",
  },
  {
    name: "بي براون ميلسونغن",
    nameEn: "B. Braun Melsungen",
    flag: "🇩🇪",
    agent: "MediServ",
    products: ["أجهزة الهيموديالسيز", "الدياليزرز", "المستهلكات الطبية"],
    website: "bbraun.com",
    color: "#FF6B35",
    category: "مزود متكامل",
  },
  {
    name: "نيبرو كوربوريشن",
    nameEn: "Nipro Corporation",
    flag: "🇯🇵",
    agent: "الصالحية",
    products: ["آلات الهيموديالسيز", "الفلاتر", "المستهلكات"],
    website: "nipro.co.jp",
    color: "#0096C7",
    category: "مزود متكامل",
  },
  {
    name: "نيكيسو",
    nameEn: "Nikkiso Co., Ltd.",
    flag: "🇯🇵",
    agent: "أساس الجود",
    products: ["آلات الهيموديالسيز المتطورة", "أنظمة المراقبة"],
    website: "nikkiso.com",
    color: "#48CAE4",
    category: "مزود متكامل",
  },
  {
    name: "توراي",
    nameEn: "Toray",
    flag: "🇯🇵",
    agent: "الزهراوي",
    products: ["الدياليزرز المتقدمة", "أغشية الترشيح"],
    website: "toray.co.jp",
    color: "#ADE8F4",
    category: "مزود متكامل",
  },
];

const consumablesSpecialistsData = [
  {
    name: "سيدانة الدولية",
    nameEn: "Sidanah International",
    flag: "🇸🇦",
    products: ["بيكربونات الصوديوم", "إبر الناسور", "خطوط الدم"],
    website: "sidanah.com",
    color: "#1B3A6B",
    category: "متخصص محلي",
  },
  {
    name: "مايس السعودية",
    nameEn: "Maisco",
    flag: "🇸🇦",
    products: ["خطوط الدم", "فلاتر الدياليزر", "إبر الناسور"],
    website: "maisco.com.sa",
    color: "#00B4D8",
    category: "متخصص محلي",
  },
  {
    name: "جمجوم ميديسين ستور",
    nameEn: "Jamjoom Medicine Store",
    flag: "🇸🇦",
    products: ["مستهلكات طبية متنوعة", "أدوات الديالسيز"],
    website: "jms.sa",
    color: "#FF6B35",
    category: "متخصص محلي",
  },
];

// ─── Animated Counter ────────────────────────────────────────────────────────

function AnimatedNumber({ value, suffix = "", prefix = "" }: { value: number; suffix?: string; prefix?: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1800;
          const steps = 60;
          const increment = value / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
              setDisplay(value);
              clearInterval(timer);
            } else {
              setDisplay(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref}>
      {prefix}{display.toLocaleString("ar-SA")}{suffix}
    </span>
  );
}

// ─── Scroll Reveal ───────────────────────────────────────────────────────────

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ─── Custom Tooltip ──────────────────────────────────────────────────────────

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-blue-200 rounded-xl p-3 shadow-xl text-right">
        {label && <p className="text-sm font-bold text-gray-700 mb-1">{label}</p>}
        {payload.map((p: any, i: number) => (
          <p key={i} className="text-sm" style={{ color: p.color || p.fill }}>
            {p.name}: <strong>{typeof p.value === 'number' ? p.value.toLocaleString('ar-SA') : p.value}</strong>
            {p.name?.includes("حجم") ? " مليون دولار" : ""}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// ─── Main Component ──────────────────────────────────────────────────────────

export default function Home() {
  useScrollReveal();

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Almarai', 'Tajawal', sans-serif", direction: "rtl" }}>

      {/* ── Hero Section ── */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0D1F3C 0%, #1B3A6B 40%, #0096C7 100%)",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute"
            style={{
              width: "600px",
              height: "600px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(0,180,216,0.15) 0%, transparent 70%)",
              top: "-100px",
              left: "-100px",
            }}
          />
          <div
            className="absolute"
            style={{
              width: "400px",
              height: "400px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(255,107,53,0.1) 0%, transparent 70%)",
              bottom: "50px",
              right: "10%",
            }}
          />
          {/* Grid pattern */}
          <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="container relative z-10 py-20">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
              style={{
                background: "rgba(0,180,216,0.2)",
                border: "1px solid rgba(0,180,216,0.4)",
                color: "#90E0EF",
              }}
            >
              <span className="text-sm font-medium">تقرير السوق 2024–2025</span>
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            </div>

            <h1
              className="text-5xl md:text-7xl font-black mb-6 leading-tight"
              style={{ color: "#FFFFFF", fontFamily: "'Almarai', sans-serif" }}
            >
              سوق{" "}
              <span style={{ color: "#00B4D8" }}>الهيموديالسيز</span>
              <br />
              في المملكة العربية السعودية
            </h1>

            <p
              className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto"
              style={{ color: "rgba(255,255,255,0.75)", lineHeight: 1.8 }}
            >
              تحليل شامل لحصص السوق، الشركات الرائدة، والتوجهات المستقبلية في قطاع غسيل الكلى
            </p>

            {/* Key Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
              {[
                { label: "حجم السوق 2025", value: 877, suffix: "M$", icon: "💰" },
                { label: "مرضى الهيموديالسيز", value: 20534, suffix: "", icon: "🏥" },
                { label: "مراكز الديالسيز", value: 275, suffix: "", icon: "🏢" },
                { label: "معدل النمو السنوي", value: 4, suffix: "%", icon: "📈" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="rounded-2xl p-5 text-center"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <div className="text-2xl mb-2">{stat.icon}</div>
                  <div
                    className="text-3xl font-black mb-1"
                    style={{ color: "#00B4D8", fontFamily: "'Almarai', sans-serif" }}
                  >
                    <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 80L1440 0V80H0Z" fill="#F8FAFC"/>
          </svg>
        </div>
      </section>

      {/* ── Market Overview Section ── */}
      <section className="py-20" style={{ background: "#F8FAFC" }}>
        <div className="container">
          <div className="text-center mb-16 reveal">
            <span
              className="inline-block px-4 py-1 rounded-full text-sm font-bold mb-4"
              style={{ background: "#E0F7FF", color: "#0096C7" }}
            >
              نظرة عامة
            </span>
            <h2
              className="text-4xl md:text-5xl font-black mb-4"
              style={{ color: "#1B3A6B", fontFamily: "'Almarai', sans-serif" }}
            >
              حجم السوق والنمو
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: "#64748B" }}>
              يشهد سوق الهيموديالسيز في المملكة العربية السعودية نمواً متسارعاً مدفوعاً بارتفاع معدلات أمراض الكلى المزمنة
            </p>
          </div>

          {/* Market Size Chart */}
          <div className="bg-white rounded-3xl p-8 shadow-lg reveal mb-8" style={{ border: "1px solid #E2E8F0" }}>
            <h3 className="text-2xl font-bold mb-6" style={{ color: "#1B3A6B" }}>
              تطور حجم سوق الهيموديالسيز (مليون دولار)
            </h3>
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={marketGrowthData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <defs>
                  <linearGradient id="marketGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00B4D8" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00B4D8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="year" tick={{ fill: "#64748B", fontSize: 13 }} />
                <YAxis tick={{ fill: "#64748B", fontSize: 13 }} domain={[600, 1300]} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="value"
                  name="حجم السوق"
                  stroke="#00B4D8"
                  strokeWidth={3}
                  fill="url(#marketGradient)"
                  dot={{ fill: "#1B3A6B", strokeWidth: 2, r: 5 }}
                  activeDot={{ r: 8, fill: "#FF6B35" }}
                />
              </AreaChart>
            </ResponsiveContainer>
            <p className="text-sm text-center mt-4" style={{ color: "#94A3B8" }}>
              المصدر: IMARC Group, Expert Market Research — التوقعات 2025-2030 بمعدل نمو 3.99%–4.80% سنوياً
            </p>
          </div>

          {/* Patients Growth Chart */}
          <div className="bg-white rounded-3xl p-8 shadow-lg reveal" style={{ border: "1px solid #E2E8F0" }}>
            <h3 className="text-2xl font-bold mb-6" style={{ color: "#1B3A6B" }}>
              نمو عدد مرضى الهيموديالسيز في المملكة
            </h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={patientsGrowthData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="year" tick={{ fill: "#64748B", fontSize: 13 }} />
                <YAxis tick={{ fill: "#64748B", fontSize: 13 }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="patients" name="عدد المرضى" radius={[6, 6, 0, 0]}>
                  {patientsGrowthData.map((_, index) => (
                    <Cell
                      key={index}
                      fill={index === patientsGrowthData.length - 1 ? "#FF6B35" : index >= 5 ? "#48CAE4" : "#1B3A6B"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <p className="text-sm text-center mt-4" style={{ color: "#94A3B8" }}>
              المصدر: المركز السعودي لزراعة الأعضاء، وزارة الصحة السعودية — نمو سنوي ~5%
            </p>
          </div>
        </div>
      </section>

      {/* ── Service Providers Market Share ── */}
      <section
        className="py-20"
        style={{
          background: "linear-gradient(135deg, #1B3A6B 0%, #0D2D5A 100%)",
          clipPath: "polygon(0 5%, 100% 0, 100% 95%, 0 100%)",
          marginTop: "-3rem",
          paddingTop: "8rem",
          paddingBottom: "8rem",
        }}
      >
        <div className="container">
          <div className="text-center mb-16 reveal">
            <span
              className="inline-block px-4 py-1 rounded-full text-sm font-bold mb-4"
              style={{ background: "rgba(0,180,216,0.2)", color: "#90E0EF" }}
            >
              حصص السوق
            </span>
            <h2
              className="text-4xl md:text-5xl font-black mb-4"
              style={{ color: "#FFFFFF", fontFamily: "'Almarai', sans-serif" }}
            >
              مزودو خدمات الديالسيز
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.7)" }}>
              توزيع حصص السوق بين الجهات الحكومية والشركات الخاصة المشغّلة لمراكز الهيموديالسيز
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Pie Chart */}
            <div
              className="rounded-3xl p-8 reveal"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <h3 className="text-xl font-bold mb-4 text-center" style={{ color: "#90E0EF" }}>
                توزيع المرضى حسب مزود الخدمة (2023)
              </h3>
              <ResponsiveContainer width="100%" height={320}>
                <PieChart>
                  <Pie
                    data={serviceProviderData}
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    innerRadius={60}
                    dataKey="value"
                    nameKey="name"
                    paddingAngle={3}
                    label={({ name, value }) => `${value}%`}
                    labelLine={false}
                  >
                    {serviceProviderData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: any, name: any) => [`${value}%`, name]}
                    contentStyle={{
                      background: "#0D1F3C",
                      border: "1px solid #00B4D8",
                      borderRadius: "12px",
                      color: "#fff",
                      direction: "rtl",
                    }}
                  />
                  <Legend
                    formatter={(value) => <span style={{ color: "rgba(255,255,255,0.85)", fontSize: "13px" }}>{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Company Cards */}
            <div className="space-y-4 reveal">
              {serviceProviderData.map((company, i) => (
                <div
                  key={i}
                  className="rounded-2xl p-5"
                  style={{
                    background: "rgba(255,255,255,0.07)",
                    border: `1px solid ${company.color}40`,
                    transition: "all 0.3s ease",
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-4 h-4 rounded-full flex-shrink-0"
                        style={{ background: company.color }}
                      />
                      <span className="font-bold text-white text-lg">{company.name}</span>
                    </div>
                    <span
                      className="text-2xl font-black"
                      style={{ color: company.color, fontFamily: "'Almarai', sans-serif" }}
                    >
                      {company.value}%
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 rounded-full h-2" style={{ background: "rgba(255,255,255,0.1)" }}>
                      <div
                        className="h-2 rounded-full"
                        style={{
                          width: `${company.value}%`,
                          background: `linear-gradient(90deg, ${company.color}, ${company.color}99)`,
                        }}
                      />
                    </div>
                    <span className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                      ~{company.patients} مريض
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sector Distribution Table */}
          <div
            className="mt-12 rounded-3xl p-8 reveal"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            <h3 className="text-xl font-bold mb-6 text-center" style={{ color: "#90E0EF" }}>
              توزيع المراكز والمرضى حسب القطاع (2021)
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-center">
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                    {["القطاع", "عدد المراكز", "نسبة المراكز", "عدد المرضى", "نسبة المرضى"].map((h) => (
                      <th
                        key={h}
                        className="py-3 px-4 text-sm font-bold"
                        style={{ color: "#90E0EF" }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { sector: "وزارة الصحة", centers: 193, centersPct: "70.2%", patients: "13,142", patientsPct: "64.0%" },
                    { sector: "حكومي آخر (عسكري، حرس وطني، جامعات)", centers: 31, centersPct: "11.3%", patients: "4,312", patientsPct: "21.0%" },
                    { sector: "القطاع الخاص (ديافيروم، دافيتا، وآخرون)", centers: 51, centersPct: "18.5%", patients: "3,080", patientsPct: "15.0%" },
                    { sector: "الإجمالي", centers: 275, centersPct: "100%", patients: "20,534", patientsPct: "100%" },
                  ].map((row, i) => (
                    <tr
                      key={i}
                      style={{
                        borderBottom: "1px solid rgba(255,255,255,0.06)",
                        background: i === 3 ? "rgba(0,180,216,0.1)" : "transparent",
                      }}
                    >
                      <td className="py-3 px-4 text-right font-medium" style={{ color: i === 3 ? "#90E0EF" : "rgba(255,255,255,0.85)" }}>
                        {row.sector}
                      </td>
                      <td className="py-3 px-4" style={{ color: "#00B4D8", fontWeight: i === 3 ? "bold" : "normal" }}>
                        {row.centers}
                      </td>
                      <td className="py-3 px-4" style={{ color: "rgba(255,255,255,0.7)" }}>{row.centersPct}</td>
                      <td className="py-3 px-4" style={{ color: "#FF6B35", fontWeight: i === 3 ? "bold" : "normal" }}>
                        {row.patients}
                      </td>
                      <td className="py-3 px-4" style={{ color: "rgba(255,255,255,0.7)" }}>{row.patientsPct}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ── Equipment Market Share ── */}
      <section className="py-20" style={{ background: "#F8FAFC", marginTop: "-3rem" }}>
        <div className="container">
          <div className="text-center mb-16 reveal">
            <span
              className="inline-block px-4 py-1 rounded-full text-sm font-bold mb-4"
              style={{ background: "#FFF0EB", color: "#FF6B35" }}
            >
              معدات وأجهزة
            </span>
            <h2
              className="text-4xl md:text-5xl font-black mb-4"
              style={{ color: "#1B3A6B", fontFamily: "'Almarai', sans-serif" }}
            >
              سوق معدات الهيموديالسيز
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: "#64748B" }}>
              حصص السوق لشركات تصنيع أجهزة الهيموديالسيز والمستهلكات الطبية في المملكة العربية السعودية
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Horizontal Bar Chart */}
            <div className="bg-white rounded-3xl p-8 shadow-lg reveal" style={{ border: "1px solid #E2E8F0" }}>
              <h3 className="text-xl font-bold mb-6" style={{ color: "#1B3A6B" }}>
                الحصة السوقية التقديرية (%)
              </h3>
              <div className="space-y-4">
                {equipmentMarketData.map((company, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium" style={{ color: "#374151" }}>{company.name}</span>
                      <span className="text-sm font-bold" style={{ color: company.color }}>{company.share}%</span>
                    </div>
                    <div className="rounded-full h-3" style={{ background: "#F1F5F9" }}>
                      <div
                        className="h-3 rounded-full"
                        style={{
                          width: `${company.share}%`,
                          background: `linear-gradient(90deg, ${company.color}, ${company.color}CC)`,
                          transition: "width 1s ease",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs mt-6" style={{ color: "#94A3B8" }}>
                * التقديرات مبنية على الحصص العالمية والبيانات الإقليمية المتاحة
              </p>
            </div>

            {/* Equipment Pie Chart */}
            <div className="bg-white rounded-3xl p-8 shadow-lg reveal" style={{ border: "1px solid #E2E8F0" }}>
              <h3 className="text-xl font-bold mb-4 text-center" style={{ color: "#1B3A6B" }}>
                توزيع حصص سوق المعدات
              </h3>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={equipmentMarketData}
                    cx="50%"
                    cy="50%"
                    outerRadius={110}
                    dataKey="share"
                    nameKey="name"
                    paddingAngle={2}
                  >
                    {equipmentMarketData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: any, name: any) => [`${value}%`, name]}
                    contentStyle={{
                      background: "#fff",
                      border: "1px solid #E2E8F0",
                      borderRadius: "12px",
                      direction: "rtl",
                    }}
                  />
                  <Legend
                    formatter={(value) => <span style={{ color: "#374151", fontSize: "12px" }}>{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Equipment Market Size Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {[
              { label: "حجم سوق المعدات 2025", value: "485", unit: "M$", color: "#1B3A6B", icon: "🔬" },
              { label: "المتوقع 2035", value: "775", unit: "M$", color: "#00B4D8", icon: "📊" },
              { label: "معدل النمو السنوي", value: "4.8", unit: "%", color: "#FF6B35", icon: "📈" },
              { label: "أجهزة هيموديالسيز", value: "8,000+", unit: "", color: "#0096C7", icon: "⚕️" },
            ].map((card, i) => (
              <div
                key={i}
                className="rounded-2xl p-6 text-center reveal"
                style={{
                  background: "white",
                  border: `2px solid ${card.color}20`,
                  boxShadow: `0 4px 20px ${card.color}15`,
                }}
              >
                <div className="text-3xl mb-3">{card.icon}</div>
                <div
                  className="text-3xl font-black mb-2"
                  style={{ color: card.color, fontFamily: "'Almarai', sans-serif" }}
                >
                  {card.value}
                  <span className="text-lg">{card.unit}</span>
                </div>
                <div className="text-sm" style={{ color: "#64748B" }}>{card.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Key Companies Profiles ── */}
      <section
        className="py-20"
        style={{
          background: "linear-gradient(135deg, #0096C7 0%, #00B4D8 50%, #48CAE4 100%)",
          clipPath: "polygon(0 5%, 100% 0, 100% 95%, 0 100%)",
          marginTop: "-3rem",
          paddingTop: "8rem",
          paddingBottom: "8rem",
        }}
      >
        <div className="container">
          <div className="text-center mb-16 reveal">
            <span
              className="inline-block px-4 py-1 rounded-full text-sm font-bold mb-4"
              style={{ background: "rgba(255,255,255,0.2)", color: "#FFFFFF" }}
            >
              الشركات الرائدة
            </span>
            <h2
              className="text-4xl md:text-5xl font-black mb-4"
              style={{ color: "#FFFFFF", fontFamily: "'Almarai', sans-serif" }}
            >
              أبرز الشركات في السوق
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "ديافيروم",
                nameEn: "Diaverum",
                flag: "🇸🇪",
                origin: "السويد",
                founded: "1995",
                centers: "40+",
                patients: "10,485+",
                share: "~20.8%",
                color: "#1B3A6B",
                highlights: [
                  "الأكبر بين المزودين المستقلين في السعودية",
                  "بدأت العمليات عام 2014 بعقد مع وزارة الصحة",
                  "استحوذت على 5 عيادات إضافية في فبراير 2024",
                  "تشغّل 40 مركزاً في مختلف مناطق المملكة",
                ],
              },
              {
                name: "دافيتا",
                nameEn: "DaVita",
                flag: "🇺🇸",
                origin: "الولايات المتحدة",
                founded: "1994",
                centers: "25+",
                patients: "2,650+",
                share: "~12.9%",
                color: "#FF6B35",
                highlights: [
                  "بدأت بعقد موازٍ مع وزارة الصحة عام 2014",
                  "تشغّل 25 مركزاً في المملكة",
                  "ثاني أكبر مزود خاص للديالسيز",
                  "تركز على جودة الرعاية وتحسين النتائج السريرية",
                ],
              },
              {
                name: "فريزينيوس ميديكال كير",
                nameEn: "Fresenius Medical Care",
                flag: "🇩🇪",
                origin: "ألمانيا",
                founded: "1996",
                centers: "1+",
                patients: "120+",
                share: "الرائد في المعدات",
                color: "#0D2D5A",
                highlights: [
                  "الرائد العالمي في معدات الهيموديالسيز (~50% عالمياً)",
                  "دخلت سوق الخدمات السعودي عام 2022 عبر نفروكير",
                  "المورد الرئيسي لأجهزة الهيموديالسيز في المملكة",
                  "انسحبت من عطاء 2014 لكنها عادت للسوق",
                ],
              },
            ].map((company, i) => (
              <div
                key={i}
                className="rounded-3xl p-7 reveal"
                style={{
                  background: "rgba(255,255,255,0.95)",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3
                      className="text-2xl font-black"
                      style={{ color: company.color, fontFamily: "'Almarai', sans-serif" }}
                    >
                      {company.name}
                    </h3>
                    <p className="text-sm text-gray-500">{company.nameEn}</p>
                  </div>
                  <span className="text-3xl">{company.flag}</span>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-5">
                  {[
                    { label: "المراكز", value: company.centers },
                    { label: "المرضى", value: company.patients },
                    { label: "الحصة السوقية", value: company.share },
                    { label: "بلد المنشأ", value: company.origin },
                  ].map((stat, j) => (
                    <div
                      key={j}
                      className="rounded-xl p-3 text-center"
                      style={{ background: `${company.color}08`, border: `1px solid ${company.color}20` }}
                    >
                      <div className="text-xs text-gray-500 mb-1">{stat.label}</div>
                      <div className="font-bold text-sm" style={{ color: company.color }}>
                        {stat.value}
                      </div>
                    </div>
                  ))}
                </div>

                <ul className="space-y-2">
                  {company.highlights.map((h, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-gray-600">
                      <span style={{ color: company.color, flexShrink: 0 }}>◆</span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Radar Chart Comparison */}
          <div
            className="mt-12 rounded-3xl p-8 reveal"
            style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}
          >
            <h3 className="text-xl font-bold mb-6 text-center text-white">
              مقارنة الشركات الخاصة الرئيسية (تقييم نسبي)
            </h3>
            <ResponsiveContainer width="100%" height={320}>
              <RadarChart data={companyRadarData}>
                <PolarGrid stroke="rgba(255,255,255,0.2)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "rgba(255,255,255,0.8)", fontSize: 12 }} />
                <PolarRadiusAxis tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 10 }} domain={[0, 100]} />
                <Radar name="ديافيروم" dataKey="Diaverum" stroke="#1B3A6B" fill="#1B3A6B" fillOpacity={0.3} />
                <Radar name="دافيتا" dataKey="DaVita" stroke="#FF6B35" fill="#FF6B35" fillOpacity={0.3} />
                <Radar name="فريزينيوس" dataKey="Fresenius" stroke="#FFD700" fill="#FFD700" fillOpacity={0.2} />
                <Legend
                  formatter={(value) => <span style={{ color: "rgba(255,255,255,0.9)", fontSize: "13px" }}>{value}</span>}
                />
                <Tooltip
                  contentStyle={{
                    background: "#0D1F3C",
                    border: "1px solid #00B4D8",
                    borderRadius: "12px",
                    color: "#fff",
                    direction: "rtl",
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* ── Disease Drivers & Market Dynamics ── */}
      <section className="py-20" style={{ background: "#F8FAFC", marginTop: "-3rem" }}>
        <div className="container">
          <div className="text-center mb-16 reveal">
            <span
              className="inline-block px-4 py-1 rounded-full text-sm font-bold mb-4"
              style={{ background: "#FFF0EB", color: "#FF6B35" }}
            >
              محركات السوق
            </span>
            <h2
              className="text-4xl md:text-5xl font-black mb-4"
              style={{ color: "#1B3A6B", fontFamily: "'Almarai', sans-serif" }}
            >
              أسباب الفشل الكلوي ومحركات الطلب
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* ESRD Causes */}
            <div className="bg-white rounded-3xl p-8 shadow-lg reveal" style={{ border: "1px solid #E2E8F0" }}>
              <h3 className="text-xl font-bold mb-6" style={{ color: "#1B3A6B" }}>
                أسباب الفشل الكلوي المزمن في السعودية
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={esrdCausesData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    nameKey="name"
                    paddingAngle={4}
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {esrdCausesData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: any) => [`${value}%`]}
                    contentStyle={{
                      background: "#fff",
                      border: "1px solid #E2E8F0",
                      borderRadius: "12px",
                      direction: "rtl",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <p className="text-xs text-center mt-2" style={{ color: "#94A3B8" }}>
                المصدر: المركز السعودي لزراعة الأعضاء 2021
              </p>
            </div>

            {/* Market Drivers */}
            <div className="space-y-4 reveal">
              <h3 className="text-xl font-bold mb-4" style={{ color: "#1B3A6B" }}>
                المحركات الرئيسية للسوق
              </h3>
              {[
                {
                  icon: "🩺",
                  title: "ارتفاع معدلات السكري والضغط",
                  desc: "42% من حالات الفشل الكلوي سببها السكري، و34% ارتفاع ضغط الدم — من أعلى المعدلات عالمياً",
                  color: "#FF6B35",
                },
                {
                  icon: "👥",
                  title: "النمو السكاني وتقدم العمر",
                  desc: "يبلغ عدد سكان المملكة 35 مليون نسمة مع زيادة مستمرة في نسبة كبار السن",
                  color: "#1B3A6B",
                },
                {
                  icon: "🏥",
                  title: "رؤية 2030 والاستثمار الصحي",
                  desc: "برامج التحول الوطني تستهدف تطوير البنية التحتية الصحية وتوسيع خدمات الرعاية الكلوية",
                  color: "#00B4D8",
                },
                {
                  icon: "🔬",
                  title: "التطور التكنولوجي",
                  desc: "أجهزة هيموديالسيز أكثر كفاءة وتقنيات الهيموديافيلتريشن عبر الإنترنت (Online HDF)",
                  color: "#0096C7",
                },
                {
                  icon: "📋",
                  title: "الاستعانة بالمصادر الخارجية",
                  desc: "وزارة الصحة تعتزم إسناد المزيد من مرضاها للشركات الخاصة لتحسين جودة الرعاية",
                  color: "#48CAE4",
                },
              ].map((driver, i) => (
                <div
                  key={i}
                  className="flex gap-4 p-4 rounded-2xl"
                  style={{ background: "white", border: `1px solid ${driver.color}20`, boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}
                >
                  <span className="text-2xl flex-shrink-0">{driver.icon}</span>
                  <div>
                    <h4 className="font-bold text-sm mb-1" style={{ color: driver.color }}>{driver.title}</h4>
                    <p className="text-sm text-gray-600">{driver.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Outsourcing Timeline ── */}
      <section
        className="py-20"
        style={{
          background: "linear-gradient(135deg, #0D1F3C 0%, #1B3A6B 60%, #0096C7 100%)",
          clipPath: "polygon(0 5%, 100% 0, 100% 100%, 0 100%)",
          marginTop: "-3rem",
          paddingTop: "8rem",
        }}
      >
        <div className="container">
          <div className="text-center mb-16 reveal">
            <span
              className="inline-block px-4 py-1 rounded-full text-sm font-bold mb-4"
              style={{ background: "rgba(0,180,216,0.2)", color: "#90E0EF" }}
            >
              التطور التاريخي
            </span>
            <h2
              className="text-4xl md:text-5xl font-black mb-4"
              style={{ color: "#FFFFFF", fontFamily: "'Almarai', sans-serif" }}
            >
              مسيرة الاستعانة بالمصادر الخارجية
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.7)" }}>
              كيف تطور نموذج تقديم خدمات الديالسيز في المملكة العربية السعودية
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div
              className="absolute right-1/2 top-0 bottom-0 w-0.5 hidden md:block"
              style={{ background: "rgba(0,180,216,0.3)", transform: "translateX(50%)" }}
            />

            <div className="space-y-8">
              {[
                {
                  year: "1972",
                  title: "بداية خدمات الهيموديالسيز",
                  desc: "افتُتح أول وحدة هيموديالسيز في مستشفى الرياض المركزي بجهازين من نوع Travenol",
                  side: "right",
                  color: "#90E0EF",
                },
                {
                  year: "2011",
                  title: "أزمة الطاقة الاستيعابية",
                  desc: "رصدت وزارة الصحة نقصاً حاداً في أماكن الديالسيز لأكثر من 800 مريض وتفاوتاً في جودة الرعاية",
                  side: "left",
                  color: "#FF6B35",
                },
                {
                  year: "2014",
                  title: "إطلاق مشروع الإسناد",
                  desc: "وقّعت وزارة الصحة عقوداً مع ديافيروم ودافيتا لخدمة 10,000 مريض (50% لكل شركة)",
                  side: "right",
                  color: "#00B4D8",
                },
                {
                  year: "2019",
                  title: "تجديد العقود وتوسيعها",
                  desc: "تجديد العقود بعد تحسن ملحوظ في المؤشرات السريرية ورضا المرضى",
                  side: "left",
                  color: "#48CAE4",
                },
                {
                  year: "2022",
                  title: "دخول فريزينيوس للخدمات",
                  desc: "افتتحت نفروكير (ذراع الخدمات لفريزينيوس) أول عيادة لها في الرياض بـ 21 محطة ديالسيز",
                  side: "right",
                  color: "#ADE8F4",
                },
                {
                  year: "2024-2025",
                  title: "توسع وشركاء جدد",
                  desc: "ديافيروم تستحوذ على 5 عيادات إضافية. نفروبلاس (الهندية) تعلن دخول السوق السعودي",
                  side: "left",
                  color: "#FFB347",
                },
              ].map((event, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-6 reveal ${event.side === "left" ? "md:flex-row-reverse" : ""}`}
                >
                  <div className="flex-1">
                    <div
                      className="rounded-2xl p-6"
                      style={{
                        background: "rgba(255,255,255,0.07)",
                        border: `1px solid ${event.color}30`,
                      }}
                    >
                      <span
                        className="text-3xl font-black block mb-2"
                        style={{ color: event.color, fontFamily: "'Almarai', sans-serif" }}
                      >
                        {event.year}
                      </span>
                      <h4 className="text-lg font-bold text-white mb-2">{event.title}</h4>
                      <p className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>{event.desc}</p>
                    </div>
                  </div>
                  <div
                    className="w-4 h-4 rounded-full flex-shrink-0 hidden md:block"
                    style={{ background: event.color, boxShadow: `0 0 10px ${event.color}` }}
                  />
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Future Outlook ── */}
      <section className="py-20" style={{ background: "#F8FAFC" }}>
        <div className="container">
          <div className="text-center mb-16 reveal">
            <span
              className="inline-block px-4 py-1 rounded-full text-sm font-bold mb-4"
              style={{ background: "#E0F7FF", color: "#0096C7" }}
            >
              المستقبل
            </span>
            <h2
              className="text-4xl md:text-5xl font-black mb-4"
              style={{ color: "#1B3A6B", fontFamily: "'Almarai', sans-serif" }}
            >
              التوقعات والفرص المستقبلية
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: "🚀",
                title: "توسيع الإسناد الحكومي",
                desc: "تعتزم وزارة الصحة إسناد المزيد من مرضاها للشركات الخاصة وتحويل مراكزها الحالية لنموذج الإسناد",
                color: "#1B3A6B",
              },
              {
                icon: "🏠",
                title: "الديالسيز المنزلي",
                desc: "خطط لإطلاق وإسناد برنامج الديالسيز المنزلي (هيموديالسيز وديالسيز بريتوني) لتقليل الضغط على المراكز",
                color: "#00B4D8",
              },
              {
                icon: "🌍",
                title: "شركاء دوليون جدد",
                desc: "نفروبلاس الهندية تفتح مراكزها في 2025، وتوقع دخول مزودين آخرين مع نمو السوق",
                color: "#FF6B35",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-3xl p-8 reveal"
                style={{
                  background: "white",
                  border: `2px solid ${item.color}15`,
                  boxShadow: `0 8px 30px ${item.color}10`,
                }}
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-3" style={{ color: item.color }}>
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Key Takeaways */}
          <div
            className="rounded-3xl p-8 reveal"
            style={{
              background: "linear-gradient(135deg, #1B3A6B 0%, #0096C7 100%)",
              color: "white",
            }}
          >
            <h3 className="text-2xl font-black mb-6 text-center">أبرز النتائج والخلاصة</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "وزارة الصحة تهيمن على 64% من مرضى الهيموديالسيز عبر 193 مركزاً مباشراً",
                "ديافيروم هي الأكبر بين المزودين المستقلين بـ ~20.8% من إجمالي المرضى",
                "فريزينيوس ميديكال كير تقود سوق معدات الهيموديالسيز بحصة ~45% عالمياً",
                "السوق ينمو بمعدل 4-5% سنوياً مدفوعاً بارتفاع معدلات السكري والضغط",
                "275 مركز ديالسيز و8,000+ جهاز هيموديالسيز في المملكة (2021)",
                "توقعات بتوسع كبير في الإسناد الحكومي ودخول مزودين جدد بحلول 2026",
              ].map((point, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5"
                    style={{ background: "#00B4D8", color: "white" }}
                  >
                    {i + 1}
                  </span>
                  <p className="text-sm" style={{ color: "rgba(255,255,255,0.9)", lineHeight: 1.7 }}>
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Suppliers & Distributors ── */}
      <section className="py-20" style={{ background: "linear-gradient(135deg, #1B3A6B 0%, #0D1F3C 100%)" }}>
        <div className="container">
          <div className="text-center mb-16 reveal">
            <span
              className="inline-block px-4 py-1 rounded-full text-sm font-bold mb-4"
              style={{ background: "rgba(0,180,216,0.2)", color: "#90E0EF" }}
            >
              الموردون والوكلاء
            </span>
            <h2
              className="text-4xl md:text-5xl font-black mb-4"
              style={{ color: "#FFFFFF", fontFamily: "'Almarai', sans-serif" }}
            >
              الشركات والموردون الرئيسيون
            </h2>
            <p className="text-lg max-w-3xl mx-auto" style={{ color: "rgba(255,255,255,0.7)" }}>
              خريطة شاملة للشركات العالمية والمصنعين المحليين الذين يزودون سوق الهيموديالسيز في المملكة العربية السعودية
            </p>
          </div>

          {/* Integrated Suppliers */}
          <div className="mb-16">
            <div className="text-center mb-10">
              <h3
                className="text-2xl font-bold"
                style={{ color: "#00B4D8", fontFamily: "'Almarai', sans-serif" }}
              >
                🏢 الفئة الأولى: مزودو الحلول المتكاملة
              </h3>
              <p style={{ color: "rgba(255,255,255,0.6)", marginTop: "0.5rem" }}>
                شركات عالمية توفر أجهزة وأنظمة متكاملة مع المستهلكات والدعم الفني
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {integratedSuppliersData.map((supplier, i) => (
                <div
                  key={i}
                  className="rounded-2xl p-6 reveal backdrop-blur-sm"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: `2px solid ${supplier.color}40`,
                    boxShadow: `0 8px 32px ${supplier.color}15`,
                  }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="text-3xl mb-2">{supplier.flag}</div>
                      <h4 className="text-lg font-bold" style={{ color: supplier.color }}>
                        {supplier.name}
                      </h4>
                      <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
                        {supplier.nameEn}
                      </p>
                    </div>
                  </div>
                  <div className="mb-4 pb-4 border-b" style={{ borderColor: `${supplier.color}30` }}>
                    <p className="text-xs font-semibold mb-2" style={{ color: "rgba(255,255,255,0.6)" }}>
                      الوكيل في السعودية:
                    </p>
                    <p style={{ color: "rgba(255,255,255,0.8)" }} className="font-medium">
                      {supplier.agent}
                    </p>
                  </div>
                  <div className="mb-4">
                    <p className="text-xs font-semibold mb-2" style={{ color: "rgba(255,255,255,0.6)" }}>
                      المنتجات:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {supplier.products.map((product, j) => (
                        <span
                          key={j}
                          className="text-xs px-3 py-1 rounded-full"
                          style={{
                            background: `${supplier.color}25`,
                            color: supplier.color,
                          }}
                        >
                          {product}
                        </span>
                      ))}
                    </div>
                  </div>
                  <a
                    href={`https://${supplier.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold inline-flex items-center gap-2 hover:opacity-80 transition"
                    style={{ color: supplier.color }}
                  >
                    الموقع الرسمي →
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Consumables Specialists */}
          <div>
            <div className="text-center mb-10">
              <h3
                className="text-2xl font-bold"
                style={{ color: "#FF6B35", fontFamily: "'Almarai', sans-serif" }}
              >
                🏭 الفئة الثانية: المتخصصون في المستهلكات (محليون)
              </h3>
              <p style={{ color: "rgba(255,255,255,0.6)", marginTop: "0.5rem" }}>
                شركات سعودية متخصصة في تصنيع وتوزيع المستهلكات الطبية
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {consumablesSpecialistsData.map((supplier, i) => (
                <div
                  key={i}
                  className="rounded-2xl p-6 reveal backdrop-blur-sm"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: `2px solid ${supplier.color}40`,
                    boxShadow: `0 8px 32px ${supplier.color}15`,
                  }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="text-3xl mb-2">{supplier.flag}</div>
                      <h4 className="text-lg font-bold" style={{ color: supplier.color }}>
                        {supplier.name}
                      </h4>
                      <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
                        {supplier.nameEn}
                      </p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <p className="text-xs font-semibold mb-2" style={{ color: "rgba(255,255,255,0.6)" }}>
                      المنتجات الرئيسية:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {supplier.products.map((product, j) => (
                        <span
                          key={j}
                          className="text-xs px-3 py-1 rounded-full"
                          style={{
                            background: `${supplier.color}25`,
                            color: supplier.color,
                          }}
                        >
                          {product}
                        </span>
                      ))}
                    </div>
                  </div>
                  <a
                    href={`https://${supplier.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold inline-flex items-center gap-2 hover:opacity-80 transition"
                    style={{ color: supplier.color }}
                  >
                    الموقع الرسمي →
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Key Benefits */}
          <div className="mt-16 rounded-2xl p-8" style={{ background: "rgba(0,180,216,0.1)", border: "2px solid #00B4D815" }}>
            <h3 className="text-xl font-bold mb-6" style={{ color: "#00B4D8", fontFamily: "'Almarai', sans-serif" }}>
              المميزات الرئيسية للتوازن السوقي:
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { icon: "🌍", title: "توازن عالمي-محلي", desc: "تعاون استراتيجي بين الشركات العالمية الكبرى والمصنعين المحليين" },
                { icon: "🔒", title: "الأمن الصحي الوطني", desc: "المصنعون المحليون يضمنون استمرارية التوريد في الأزمات" },
                { icon: "⚡", title: "سرعة الاستجابة", desc: "المتخصصون المحليون يوفرون استجابة سريعة لطلبات المستشفيات" },
                { icon: "✅", title: "معايير عالية", desc: "الالتزام الصارم بمعايير هيئة الغذاء والدواء السعودية (SFDA)" },
              ].map((benefit, i) => (
                <div key={i} className="flex gap-4">
                  <div className="text-3xl flex-shrink-0">{benefit.icon}</div>
                  <div>
                    <h4 className="font-bold mb-1" style={{ color: "#00B4D8" }}>
                      {benefit.title}
                    </h4>
                    <p className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
                      {benefit.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer
        className="py-12"
        style={{ background: "#0D1F3C" }}
      >
        <div className="container text-center">
          <div
            className="text-2xl font-black mb-3"
            style={{ color: "#00B4D8", fontFamily: "'Almarai', sans-serif" }}
          >
            سوق الهيموديالسيز في المملكة العربية السعودية
          </div>
          <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.5)" }}>
            تقرير بحثي شامل — فبراير 2026
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
            {[
              "IMARC Group",
              "Expert Market Research",
              "Ken Research",
              "PMC / PubMed",
              "المركز السعودي لزراعة الأعضاء",
              "وزارة الصحة السعودية",
              "Diaverum ESG Report 2023",
            ].map((src, i) => (
              <span key={i} className="px-3 py-1 rounded-full" style={{ background: "rgba(255,255,255,0.07)" }}>
                {src}
              </span>
            ))}
          </div>
          <p className="text-xs mt-6" style={{ color: "rgba(255,255,255,0.3)" }}>
            * البيانات مستقاة من مصادر بحثية متعددة. بعض الأرقام تقديرية بسبب محدودية البيانات المتاحة للعموم.
          </p>
        </div>
      </footer>
    </div>
  );
}
