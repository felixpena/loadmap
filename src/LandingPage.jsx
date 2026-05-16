import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Menu,
  X,
  ChevronDown,
  ChevronUp,
  Check,
  Star,
  Zap,
  BarChart2,
  Shield,
  Clock,
  MessageSquare,
  Archive,
  Upload,
  FileText,
  ArrowRight,
  Mail,
  Linkedin,
  Twitter,
  AlertTriangle,
  DollarSign,
  Eye,
  ClipboardList,
} from "lucide-react";

/* ─────────────────────────────────────────────
   HOOK: useIntersectionObserver
───────────────────────────────────────────── */
function useIntersectionObserver(options = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.12, ...options }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
}

/* ─────────────────────────────────────────────
   COMPONENTE: AnimatedSection
───────────────────────────────────────────── */
function AnimatedSection({ children, className = "", delay = 0 }) {
  const [ref, visible] = useIntersectionObserver();
  return (
    <div
      ref={ref}
      className={`animate-on-scroll ${visible ? "visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   COMPONENTE: Button
───────────────────────────────────────────── */
function Button({ children, variant = "primary", size = "md", className = "", onClick, href, type = "button", disabled = false }) {
  const base =
    "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0066FF] focus-visible:ring-offset-2";

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const variants = {
    primary:
      "bg-[#0066FF] text-white hover:bg-[#0052CC] hover:-translate-y-0.5 active:translate-y-0 shadow-md hover:shadow-lg",
    secondary:
      "border-2 border-[#0066FF] text-[#0066FF] hover:bg-[#E6F0FF] hover:-translate-y-0.5 active:translate-y-0",
    white:
      "bg-white text-[#0066FF] hover:bg-[#E6F0FF] hover:-translate-y-0.5 active:translate-y-0 shadow-md hover:shadow-lg",
    ghost: "text-[#0066FF] hover:bg-[#E6F0FF] px-3",
  };

  const cls = `${base} ${sizes[size]} ${variants[variant]} ${className} ${disabled ? "opacity-60 cursor-not-allowed pointer-events-none" : ""}`;

  if (href) {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} className={cls} disabled={disabled}>
      {children}
    </button>
  );
}

/* ─────────────────────────────────────────────
   COMPONENTE: Card
───────────────────────────────────────────── */
function Card({ children, className = "", hover = true }) {
  return (
    <div
      className={`bg-white border border-[#E0E0E0] rounded-xl p-6 ${
        hover
          ? "transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-[#0066FF]/30"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   COMPONENTE: Header
───────────────────────────────────────────── */
function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("inicio");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section tracking
  useEffect(() => {
    const sections = ["hero", "problema", "solucion", "features", "faq"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const navLinks = [
    { href: "#hero", label: "Inicio", id: "hero" },
    { href: "#solucion", label: "Cómo Funciona", id: "solucion" },
    { href: "#features", label: "Características", id: "features" },
    { href: "#faq", label: "Preguntas", id: "faq" },
    { href: "#contacto", label: "Contacto", id: "contacto" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-200 ${
        scrolled ? "shadow-md" : "border-b border-[#E0E0E0]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-[#0066FF] rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold text-[#0066FF] tracking-tight">LOADMAP</span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150 ${
                  active === link.id
                    ? "text-[#0066FF] bg-[#E6F0FF]"
                    : "text-[#666666] hover:text-[#0066FF] hover:bg-[#F8F9FA]"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button size="sm" href="#contacto">
              Contactar
            </Button>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-[#666666] hover:bg-[#F8F9FA]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menú"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-[#E0E0E0] bg-white px-4 py-3 space-y-1 shadow-lg">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block px-3 py-2.5 text-sm font-medium text-[#1A1A1A] hover:bg-[#E6F0FF] hover:text-[#0066FF] rounded-lg transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3 border-t border-[#E0E0E0]">
            <Button size="sm" className="w-full" href="#contacto" onClick={() => setMenuOpen(false)}>
              Contactar
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

/* ─────────────────────────────────────────────
   COMPONENTE: Hero
───────────────────────────────────────────── */
function Hero() {
  return (
    <section
      id="hero"
      className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-[#F0F4FF] to-white relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-[#0066FF]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-64 h-64 bg-[#FFB81C]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Text */}
          <div className="flex-1 text-center lg:text-left animate-on-scroll visible">
            <div className="inline-flex items-center gap-2 bg-[#E6F0FF] text-[#0066FF] text-sm font-semibold px-4 py-2 rounded-full mb-6">
              <Zap className="w-4 h-4" />
              Nuevo: Análisis inteligente de pérdidas
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1A1A1A] leading-tight mb-6">
              Reportes SEC en{" "}
              <span className="text-[#0066FF] relative">
                30 Segundos
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 300 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 10 Q75 2 150 8 Q225 14 298 4"
                    stroke="#FFB81C"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-[#666666] leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
              De 2–3 días de trabajo manual a automatizado, sin errores.
              <br />
              El software que tu cooperativa necesitaba.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-2">
              <Button size="lg" href="#contacto">
                Contactar <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button variant="secondary" size="lg" href="#solucion">
                Cómo Funciona
              </Button>
            </div>

            {/* Social proof */}
            <div className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-[#0066FF]">30s</p>
                <p className="text-xs text-[#666666]">vs 2–3 días</p>
              </div>
              <div className="w-px h-10 bg-[#E0E0E0] hidden sm:block" />
              <div className="text-center">
                <p className="text-2xl font-bold text-[#0066FF]">100%</p>
                <p className="text-xs text-[#666666]">Cumple SEC</p>
              </div>
              <div className="w-px h-10 bg-[#E0E0E0] hidden sm:block" />
              <div className="text-center">
                <p className="text-2xl font-bold text-[#0066FF]">AES-256</p>
                <p className="text-xs text-[#666666]">Encriptación</p>
              </div>
            </div>
          </div>

          {/* Graphic */}
          <div className="flex-1 w-full max-w-lg lg:max-w-none">
            <HeroGraphic />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   COMPONENTE: HeroGraphic (dashboard mock)
───────────────────────────────────────────── */
function HeroGraphic() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      let p = 0;
      const interval = setInterval(() => {
        p += 2;
        setProgress(p);
        if (p >= 100) clearInterval(interval);
      }, 20);
      return () => clearInterval(interval);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const bars = [65, 45, 80, 55, 70, 90, 42, 78];

  return (
    <div className="relative">
      {/* Main card */}
      <div className="bg-white rounded-2xl shadow-2xl border border-[#E0E0E0] p-6 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-xs text-[#666666] uppercase tracking-wider font-medium">LOADMAP Dashboard</p>
            <p className="font-bold text-[#1A1A1A]">Reporte Pérdidas — Mayo 2025</p>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
            <span className="text-xs text-green-600 font-medium">En línea</span>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          {[
            { label: "Pérdidas", value: "4.8%", color: "text-[#0066FF]", bg: "bg-[#E6F0FF]" },
            { label: "Meta SEC", value: "5.0%", color: "text-green-600", bg: "bg-green-50" },
            { label: "Estado", value: "✓ OK", color: "text-green-600", bg: "bg-green-50" },
          ].map((s) => (
            <div key={s.label} className={`${s.bg} rounded-lg p-3 text-center`}>
              <p className={`text-lg font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-[#666666]">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Bar chart */}
        <div className="mb-5">
          <p className="text-xs text-[#666666] mb-2 font-medium">Pérdidas por Subestación (kWh)</p>
          <div className="flex items-end gap-2 h-20">
            {bars.map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-t-sm transition-all duration-700 ease-out"
                  style={{
                    height: `${(h / 100) * progress}%`,
                    backgroundColor: i === 5 ? "#FFB81C" : "#0066FF",
                    opacity: 0.7 + (i % 3) * 0.1,
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-[#666666] mb-1">
            <span>Generando PDF...</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-[#F0F4FF] rounded-full h-2">
            <div
              className="bg-[#0066FF] h-2 rounded-full transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Download button */}
        <button
          className={`w-full py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
            progress === 100
              ? "bg-[#0066FF] text-white hover:bg-[#0052CC] cursor-pointer"
              : "bg-[#E0E0E0] text-[#999] cursor-not-allowed"
          }`}
        >
          <FileText className="w-4 h-4" />
          {progress === 100 ? "Descargar Reporte PDF ✓" : "Procesando..."}
        </button>
      </div>

      {/* Floating badge */}
      <div className="absolute -top-4 -right-4 bg-[#FFB81C] text-white text-xs font-bold px-3 py-2 rounded-full shadow-lg animate-bounce z-20">
        30 seg ⚡
      </div>

      {/* Background blur */}
      <div className="absolute inset-0 bg-[#0066FF]/10 rounded-2xl blur-xl -z-10 transform scale-95 translate-y-4" />
    </div>
  );
}

/* ─────────────────────────────────────────────
   COMPONENTE: Problema
───────────────────────────────────────────── */
function Problema() {
  const problems = [
    {
      icon: <ClipboardList className="w-7 h-7 text-[#0066FF]" />,
      title: "2–3 Días de Trabajo Manual",
      body: "Tus reportes SEC toman 2–3 días de trabajo cada mes. Es repetitivo, consume tiempo de tu equipo y bloquea otras tareas.",
    },
    {
      icon: <AlertTriangle className="w-7 h-7 text-[#FFB81C]" />,
      title: "Riesgo de Errores",
      body: "Un error en Excel = multa SEC de hasta $100,000 USD. Presión y estrés para tu equipo en cada cierre de mes.",
    },
    {
      icon: <DollarSign className="w-7 h-7 text-[#EF4444]" />,
      title: "Costo Oculto",
      body: "$1,200–1,800 en salarios/mes solo para hacer reportes. Dinero que podrías invertir en mejorar tu red.",
    },
    {
      icon: <Eye className="w-7 h-7 text-[#666666]" />,
      title: "Sin Visibilidad Real",
      body: "No sabes dónde están tus pérdidas exactamente. ¿Qué subestación consume más? La respuesta no debería tardar días.",
    },
  ];

  return (
    <section id="problema" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-14">
          <span className="inline-block bg-red-50 text-red-600 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            El Problema de Hoy
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] mb-4">
            ¿Te suena familiar?
          </h2>
          <p className="text-[#666666] text-lg max-w-2xl mx-auto">
            Cada mes, tu equipo enfrenta los mismos cuellos de botella — y el regulador no espera.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {problems.map((p, i) => (
            <AnimatedSection key={i} delay={i * 100}>
              <Card className="h-full">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#F8F9FA] rounded-xl shrink-0">{p.icon}</div>
                  <div>
                    <h3 className="text-lg font-bold text-[#1A1A1A] mb-2">{p.title}</h3>
                    <p className="text-[#666666] leading-relaxed">{p.body}</p>
                  </div>
                </div>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   COMPONENTE: Solución
───────────────────────────────────────────── */
function Solucion() {
  const features = [
    "Calcula pérdidas automáticamente",
    "Genera reportes SEC firmados digitalmente",
    "Compara vs meta (¿Estamos dentro?)",
    "Identifica dónde están las pérdidas",
    "Historial completo y auditable",
    "Encriptación de datos AES-256",
  ];

  return (
    <section id="solucion" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Text */}
          <div className="flex-1 lg:max-w-xl">
            <AnimatedSection>
              <span className="inline-block bg-[#E6F0FF] text-[#0066FF] text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
                La Solución
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] mb-4 leading-tight">
                Lo que tardaba 3 días, ahora es{" "}
                <span className="text-[#0066FF]">30 segundos</span>
              </h2>
              <p className="text-[#666666] text-lg mb-8 leading-relaxed">
                LOADMAP toma tus datos de medidor, aplica los cálculos SEC y genera el PDF firmado — sin que toques una celda de Excel.
              </p>
              <ul className="space-y-3 mb-8">
                {features.map((f, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-[#0066FF] rounded-full flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-[#1A1A1A] font-medium">{f}</span>
                  </li>
                ))}
              </ul>
              <Button href="#contacto">
                Solicitar información <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </AnimatedSection>
          </div>

          {/* Visual: Steps flow */}
          <div className="flex-1 w-full max-w-md lg:max-w-none">
            <AnimatedSection delay={150}>
              <SolucionGraphic />
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}

function SolucionGraphic() {
  const steps = [
    {
      icon: <Upload className="w-5 h-5 text-white" />,
      label: "Subir CSV",
      desc: "Export de tu sistema de medición",
      color: "bg-[#0066FF]",
    },
    {
      icon: <Zap className="w-5 h-5 text-white" />,
      label: "Calcular",
      desc: "Pérdidas técnicas automáticas",
      color: "bg-[#FFB81C]",
    },
    {
      icon: <FileText className="w-5 h-5 text-white" />,
      label: "Descargar PDF",
      desc: "Firmado y listo para la SEC",
      color: "bg-[#10B981]",
    },
  ];

  return (
    <div className="bg-[#F8F9FA] rounded-2xl p-8">
      <p className="text-xs font-semibold text-[#666666] uppercase tracking-wider mb-6 text-center">
        Flujo de trabajo
      </p>
      <div className="space-y-4">
        {steps.map((s, i) => (
          <div key={i}>
            <div className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-sm border border-[#E0E0E0]">
              <div className={`${s.color} w-10 h-10 rounded-lg flex items-center justify-center shrink-0`}>
                {s.icon}
              </div>
              <div>
                <p className="font-semibold text-[#1A1A1A]">{s.label}</p>
                <p className="text-sm text-[#666666]">{s.desc}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="ml-auto">
                  <span className="text-[#0066FF] font-bold text-lg">→</span>
                </div>
              )}
              {i === steps.length - 1 && (
                <div className="ml-auto">
                  <span className="text-[#10B981] font-bold text-lg">✓</span>
                </div>
              )}
            </div>
            {i < steps.length - 1 && (
              <div className="flex justify-center my-1">
                <div className="w-0.5 h-4 bg-[#E0E0E0]" />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-6 bg-[#E6F0FF] rounded-xl p-4 text-center">
        <p className="text-[#0066FF] font-bold text-2xl">30 seg</p>
        <p className="text-[#666666] text-sm">vs. 2–3 días de trabajo</p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   COMPONENTE: Cómo Funciona (3 pasos)
───────────────────────────────────────────── */
function ComoFunciona() {
  const steps = [
    {
      num: "1",
      icon: <Upload className="w-6 h-6 text-[#0066FF]" />,
      title: "Sube tus datos",
      body: "Exporta tu data de medidor a CSV. LOADMAP la carga en 10 segundos sin configuración previa.",
    },
    {
      num: "2",
      icon: <Zap className="w-6 h-6 text-[#0066FF]" />,
      title: "Calcula automático",
      body: "Nuestro motor calcula pérdidas técnicas y no técnicas, y compara contra tus metas SEC vigentes.",
    },
    {
      num: "3",
      icon: <BarChart2 className="w-6 h-6 text-[#0066FF]" />,
      title: "Descarga PDF firmado",
      body: "Reporte listo para enviar a la SEC con firma digital. Todo en 30 segundos, sin un solo Excel.",
    },
  ];

  return (
    <section id="como-funciona" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-14">
          <span className="inline-block bg-[#E6F0FF] text-[#0066FF] text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            Proceso
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] mb-4">Cómo Funciona en 3 Pasos</h2>
          <p className="text-[#666666] text-lg max-w-xl mx-auto">
            Sin capacitación extensa. Sin soporte IT especial. Empieza hoy.
          </p>
        </AnimatedSection>

        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-16 left-1/2 -translate-x-1/2 w-2/3 h-0.5 bg-gradient-to-r from-[#0066FF]/20 via-[#0066FF] to-[#0066FF]/20" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <AnimatedSection key={i} delay={i * 150}>
                <div className="flex flex-col items-center text-center">
                  {/* Number circle */}
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-[#0066FF] rounded-full flex items-center justify-center shadow-lg shadow-[#0066FF]/30 z-10 relative">
                      <span className="text-white text-2xl font-bold">{s.num}</span>
                    </div>
                    <div className="absolute inset-0 bg-[#0066FF]/20 rounded-full blur-md" />
                  </div>
                  <div className="p-3 bg-[#E6F0FF] rounded-xl mb-4">{s.icon}</div>
                  <h3 className="text-xl font-bold text-[#1A1A1A] mb-3">{s.title}</h3>
                  <p className="text-[#666666] leading-relaxed">{s.body}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   COMPONENTE: Features
───────────────────────────────────────────── */
function Features() {
  const features = [
    {
      icon: <Shield className="w-6 h-6 text-[#0066FF]" />,
      title: "Seguridad Garantizada",
      desc: "Encriptación AES-256. Tus datos son solo tuyos. Cumple LGSE + Ley 21.663.",
    },
    {
      icon: <BarChart2 className="w-6 h-6 text-[#0066FF]" />,
      title: "Análisis Inteligente",
      desc: "Identifica qué subestación pierde más. Recomendaciones automáticas para mejorar tu red.",
    },
    {
      icon: <Check className="w-6 h-6 text-[#0066FF]" />,
      title: "Reportes SEC Validados",
      desc: "Cumple 100% con la normativa SEC vigente. Firma digital incluida en cada reporte.",
    },
    {
      icon: <Clock className="w-6 h-6 text-[#0066FF]" />,
      title: "Disponible 24/7",
      desc: "Accede cuando lo necesites, desde donde estés. 99.5% uptime garantizado por contrato.",
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-[#0066FF]" />,
      title: "Soporte Rápido",
      desc: "Respuesta en menos de 48h. Email + documentación completa en español.",
    },
    {
      icon: <Archive className="w-6 h-6 text-[#0066FF]" />,
      title: "Histórico Completo",
      desc: "7 años de reportes guardados y auditables en cualquier momento sin costo adicional.",
    },
  ];

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-14">
          <span className="inline-block bg-[#E6F0FF] text-[#0066FF] text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            Características
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] mb-4">¿Qué Incluye LOADMAP?</h2>
          <p className="text-[#666666] text-lg max-w-2xl mx-auto">
            Todo lo que tu cooperativa necesita — sin extras que no usarás.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <AnimatedSection key={i} delay={i * 80}>
              <Card className="h-full">
                <div className="p-3 bg-[#E6F0FF] rounded-xl w-fit mb-4">{f.icon}</div>
                <h3 className="text-lg font-bold text-[#1A1A1A] mb-2">{f.title}</h3>
                <p className="text-[#666666] leading-relaxed text-sm">{f.desc}</p>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   COMPONENTE: Precios
───────────────────────────────────────────── */
function Precios() {
  const plans = [
    {
      name: "Básico",
      price: "$400",
      period: "/mes",
      desc: "Perfecto para cooperativas pequeñas",
      features: ["1 usuario", "Reportes ilimitados", "Histórico 1 año", "Soporte por email"],
      cta: "Comenzar",
      ctaVariant: "secondary",
      note: "Sin contrato, cancela cuando quieras",
      popular: false,
    },
    {
      name: "Pro",
      price: "$800",
      period: "/mes",
      desc: "Lo que la mayoría de cooperativas necesita",
      features: [
        "3 usuarios",
        "Reportes ilimitados",
        "Histórico 3 años",
        "Análisis avanzado",
        "Soporte prioritario",
      ],
      cta: "Probar Gratis 14 días",
      ctaVariant: "primary",
      note: "El más elegido",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "$1,500+",
      period: "/mes",
      desc: "Para distribuidoras medianas",
      features: [
        "Usuarios ilimitados",
        "API acceso completo",
        "White label (tu logo)",
        "Integraciones SCADA",
        "Soporte 24/7",
      ],
      cta: "Contactar Ventas",
      ctaVariant: "secondary",
      note: "Presupuesto a medida",
      popular: false,
    },
  ];

  return (
    <section id="precios" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-14">
          <span className="inline-block bg-[#E6F0FF] text-[#0066FF] text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            Precios
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] mb-4">
            Planes Simples y Honestos
          </h2>
          <p className="text-[#666666] text-lg">
            Todos incluyen reportes ilimitados, histórico y seguridad. Sin letra chica.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {plans.map((plan, i) => (
            <AnimatedSection key={i} delay={i * 100}>
              <div
                className={`relative bg-white rounded-2xl border-2 p-8 transition-all duration-200 hover:scale-[1.02] ${
                  plan.popular
                    ? "border-[#0066FF] shadow-xl shadow-[#0066FF]/15"
                    : "border-[#E0E0E0] hover:border-[#0066FF]/40 hover:shadow-lg"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#FFB81C] text-white text-xs font-bold px-4 py-1.5 rounded-full shadow">
                    POPULAR ⭐
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-[#1A1A1A] mb-1">{plan.name}</h3>
                  <p className="text-[#666666] text-sm mb-4">{plan.desc}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-[#1A1A1A]">{plan.price}</span>
                    <span className="text-[#666666]">{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-[#0066FF] shrink-0" />
                      <span className="text-[#1A1A1A] text-sm">{f}</span>
                    </li>
                  ))}
                </ul>

                <Button variant={plan.ctaVariant} className="w-full mb-3" href="#contacto">
                  {plan.cta}
                </Button>
                <p className="text-center text-xs text-[#666666]">{plan.note}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   COMPONENTE: Testimonios
───────────────────────────────────────────── */
function Testimonios() {
  const testimonials = [
    {
      quote:
        "Antes pasábamos 2 días haciendo reportes SEC. Ahora con LOADMAP es 10 minutos. El equipo está más motivado y podemos enfocarnos en cosas que realmente importan.",
      author: "Carolina González",
      role: "Gerente IT, Cooperativa Eléctrica Curicó",
      initials: "CG",
    },
    {
      quote:
        "La seguridad y auditoría son perfectas. La SEC nunca ha puesto objeciones a nuestros reportes. Increíblemente confiable.",
      author: "Roberto Sánchez",
      role: "Director General, EMEC",
      initials: "RS",
    },
    {
      quote:
        "El precio versus valor es imbatible. Se paga solo en el primer mes, solo considerando las horas IT que ahorramos.",
      author: "María Flores",
      role: "Directora Comercial, Coop. Osorno",
      initials: "MF",
    },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, [testimonials.length]);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-14">
          <span className="inline-block bg-[#E6F0FF] text-[#0066FF] text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            Testimonios
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] mb-4">
            Lo Que Dicen Nuestros Clientes
          </h2>
        </AnimatedSection>

        {/* Desktop: 3 columns */}
        <div className="hidden md:grid grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <AnimatedSection key={i} delay={i * 100}>
              <TestimonialCard t={t} />
            </AnimatedSection>
          ))}
        </div>

        {/* Mobile: carousel */}
        <div className="md:hidden">
          <AnimatedSection>
            <TestimonialCard t={testimonials[current]} />
          </AnimatedSection>
          <div className="flex justify-center gap-2 mt-4">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === current ? "bg-[#0066FF] w-6" : "bg-[#E0E0E0]"
                }`}
                aria-label={`Testimonio ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ t }) {
  return (
    <Card className="h-full flex flex-col">
      <div className="flex mb-3">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 text-[#FFB81C] fill-[#FFB81C]" />
        ))}
      </div>
      <p className="text-[#1A1A1A] leading-relaxed flex-1 mb-6 italic">"{t.quote}"</p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-[#0066FF] rounded-full flex items-center justify-center shrink-0">
          <span className="text-white text-sm font-bold">{t.initials}</span>
        </div>
        <div>
          <p className="font-semibold text-[#0066FF] text-sm">{t.author}</p>
          <p className="text-[#666666] text-xs">{t.role}</p>
        </div>
      </div>
    </Card>
  );
}

/* ─────────────────────────────────────────────
   COMPONENTE: FAQ
───────────────────────────────────────────── */
function FAQ() {
  const faqs = [
    {
      q: "¿Necesito capacitación para usar LOADMAP?",
      a: "No. Es muy simple: sube CSV, haz clic en generar, descarga PDF. Si necesitas ayuda, hacemos training de 1h gratis con cada cuenta nueva.",
    },
    {
      q: "¿Es compatible con mi SCADA?",
      a: "Por ahora aceptamos CSV estándar. Si tienes un SCADA específico, podemos integrarlo en la hoja de ruta. Contacta a ventas para evaluar tu caso.",
    },
    {
      q: "¿Mis datos están seguros?",
      a: "Sí. Usamos encriptación AES-256, backups diarios y cumplimos la LGSE. Nunca compartimos tus datos con terceros, jamás.",
    },
    {
      q: "¿El PDF sirve para enviar directamente a la SEC?",
      a: "Sí. El PDF está firmado digitalmente y cumple el formato SEC. Tú lo envías (LOADMAP lo genera) — el proceso de envío queda en tus manos.",
    },
    {
      q: "¿Cuánto demora la implementación?",
      a: "En la mayoría de los casos, menos de un día hábil. Importas tus datos, te guiamos en el proceso y ya puedes generar tu primer reporte.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-3xl mx-auto">
        <AnimatedSection className="text-center mb-14">
          <span className="inline-block bg-[#E6F0FF] text-[#0066FF] text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            Preguntas
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] mb-4">Preguntas Frecuentes</h2>
          <p className="text-[#666666] text-lg">Respondemos las dudas más comunes.</p>
        </AnimatedSection>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <AnimatedSection key={i} delay={i * 60}>
              <div className="border border-[#E0E0E0] rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-[#F8F9FA] transition-colors"
                  aria-expanded={openIndex === i}
                >
                  <span className="font-semibold text-[#1A1A1A] pr-4">{faq.q}</span>
                  {openIndex === i ? (
                    <ChevronUp className="w-5 h-5 text-[#0066FF] shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[#666666] shrink-0" />
                  )}
                </button>
                <div
                  className={`faq-answer px-6 ${openIndex === i ? "open pb-4" : ""}`}
                >
                  <p className="text-[#666666] leading-relaxed">{faq.a}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   COMPONENTE: CTA Final
───────────────────────────────────────────── */
function CTAFinal() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#F0F4FF]">
      <div className="max-w-3xl mx-auto text-center">
        <AnimatedSection>
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#0066FF] rounded-2xl mb-6 shadow-lg shadow-[#0066FF]/30">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] mb-4">
            ¿Listo para Optimizar Tus Reportes?
          </h2>
          <p className="text-[#666666] text-lg mb-10">
            Únete a las cooperativas que ya ahorran 2–3 días de trabajo cada mes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" href="#contacto" className="animate-[pulseSoft_2s_ease-in-out_infinite]">
              Probar Gratis 14 Días
            </Button>
            <Button size="lg" variant="secondary" href="#solucion">
              Ver Demo en Video
            </Button>
          </div>
          <p className="mt-6 text-sm text-[#666666]">
            Sin tarjeta de crédito · Sin contrato · Cancela cuando quieras
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   COMPONENTE: Contacto
───────────────────────────────────────────── */
function Contacto() {
  const [form, setForm] = useState({ nombre: "", email: "", cooperativa: "", mensaje: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [serverError, setServerError] = useState("");

  const validate = () => {
    const e = {};
    if (!form.nombre.trim()) e.nombre = "Ingresa tu nombre.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Email inválido.";
    if (!form.cooperativa.trim()) e.cooperativa = "Ingresa tu cooperativa.";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setSending(true);
    setServerError("");
    try {
      const res = await fetch("https://formspree.io/f/meenyrvp", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          nombre: form.nombre,
          email: form.email,
          cooperativa: form.cooperativa,
          mensaje: form.mensaje,
        }),
      });
      if (res.ok) {
        setSent(true);
      } else {
        setServerError("Hubo un problema al enviar. Intenta de nuevo o escríbenos directamente.");
      }
    } catch {
      setServerError("Sin conexión. Verifica tu internet e intenta de nuevo.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contacto" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F8F9FA]">
      <div className="max-w-xl mx-auto">
        <AnimatedSection className="text-center mb-10">
          <span className="inline-block bg-[#E6F0FF] text-[#0066FF] text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            Contacto
          </span>
          <h2 className="text-3xl font-bold text-[#1A1A1A] mb-2">Solicita tu Demo</h2>
          <p className="text-[#666666]">Te contactamos en menos de 24 horas hábiles.</p>
        </AnimatedSection>

        {!sent ? (
          <AnimatedSection delay={100}>
            <Card hover={false} className="p-8">
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {[
                  { id: "nombre", label: "Nombre", type: "text", placeholder: "Tu nombre completo" },
                  { id: "email", label: "Email", type: "email", placeholder: "tu@cooperativa.cl" },
                  { id: "cooperativa", label: "Cooperativa", type: "text", placeholder: "Nombre de tu cooperativa" },
                ].map((field) => (
                  <div key={field.id}>
                    <label htmlFor={field.id} className="block text-sm font-medium text-[#1A1A1A] mb-1">
                      {field.label}
                    </label>
                    <input
                      id={field.id}
                      type={field.type}
                      placeholder={field.placeholder}
                      value={form[field.id]}
                      onChange={(e) => {
                        setForm({ ...form, [field.id]: e.target.value });
                        setErrors({ ...errors, [field.id]: undefined });
                      }}
                      className={`w-full px-4 py-2.5 border rounded-lg text-[#1A1A1A] placeholder-[#999] focus:outline-none focus:ring-2 focus:ring-[#0066FF] transition-all ${
                        errors[field.id] ? "border-red-400" : "border-[#E0E0E0]"
                      }`}
                    />
                    {errors[field.id] && <p className="text-red-500 text-xs mt-1">{errors[field.id]}</p>}
                  </div>
                ))}

                <div>
                  <label htmlFor="mensaje" className="block text-sm font-medium text-[#1A1A1A] mb-1">
                    Mensaje (opcional)
                  </label>
                  <textarea
                    id="mensaje"
                    rows={3}
                    placeholder="¿En qué podemos ayudarte?"
                    value={form.mensaje}
                    onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
                    className="w-full px-4 py-2.5 border border-[#E0E0E0] rounded-lg text-[#1A1A1A] placeholder-[#999] focus:outline-none focus:ring-2 focus:ring-[#0066FF] resize-none"
                  />
                </div>

                <Button type="submit" size="md" className="w-full" disabled={sending}>
                  {sending ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Enviando...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Solicitar Demo <ArrowRight className="w-4 h-4" />
                    </span>
                  )}
                </Button>
                {serverError && (
                  <p className="text-red-500 text-sm text-center">{serverError}</p>
                )}
                <p className="text-center text-xs text-[#666666]">
                  Sin spam. Sin venta agresiva. Solo una demo.
                </p>
              </form>
            </Card>
          </AnimatedSection>
        ) : (
          <AnimatedSection>
            <Card hover={false} className="p-10 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">¡Gracias, {form.nombre}!</h3>
              <p className="text-[#666666]">
                Te contactamos en las próximas 24 horas para coordinar tu demo personalizada.
              </p>
            </Card>
          </AnimatedSection>
        )}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   COMPONENTE: Footer
───────────────────────────────────────────── */
function Footer() {
  const columns = [
    {
      title: "Producto",
      links: [
        { label: "Cómo funciona", href: "#solucion" },
        { label: "Características", href: "#features" },
        { label: "Seguridad", href: "#features" },
        { label: "Preguntas", href: "#faq" },
      ],
    },
    {
      title: "Empresa",
      links: [
        { label: "Sobre nosotros", href: "#" },
        { label: "Blog", href: "#" },
        { label: "Contacto", href: "#contacto" },
        { label: "Carreras", href: "#" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Términos de Servicio", href: "/terminos" },
        { label: "Política de Privacidad", href: "#" },
        { label: "Cookies", href: "#" },
        { label: "Contacto Legal", href: "#" },
      ],
    },
  ];

  return (
    <footer className="bg-[#1a1a1a] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#0066FF] rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold text-white">LOADMAP</span>
            </div>
            <p className="text-[#999] text-sm leading-relaxed mb-6">
              Reportes SEC automáticos para cooperativas eléctricas en Chile.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#0066FF] transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#0066FF] transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#contacto"
                className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#0066FF] transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Nav columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[#999] text-sm hover:text-[#0066FF] transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#666] text-sm">© 2025 LOADMAP. Todos los derechos reservados.</p>
          <p className="text-[#666] text-sm">Hecho con orgullo en 🇨🇱 Chile</p>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────
   COMPONENTE PRINCIPAL: LandingPage
───────────────────────────────────────────── */
export default function LandingPage() {
  // Trigger scroll animations
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

    document.querySelectorAll(".animate-on-scroll").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen font-sans">
      <Header />
      <main>
        <Hero />
        <Problema />
        <Solucion />
        <ComoFunciona />
        <Features />
        <Testimonios />
        <FAQ />
        <Contacto />
      </main>
      <Footer />
    </div>
  );
}
