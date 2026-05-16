import React from "react";
import { Zap, ArrowLeft } from "lucide-react";

const sections = [
  {
    num: "1",
    title: "Descripción del Servicio",
    content: (
      <>
        <p className="text-[#444] leading-relaxed mb-4">
          LOADMAP es una plataforma SaaS que automatiza el cálculo y generación de reportes de pérdidas
          técnicas para empresas distribuidoras y cooperativas eléctricas en Chile.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <p className="font-semibold text-green-800 mb-2">✓ Lo que ofrecemos</p>
            <ul className="space-y-1 text-sm text-green-700">
              <li>Cálculo automático de pérdidas técnicas</li>
              <li>Generación de reportes SEC mensuales</li>
              <li>Análisis de pérdidas por subestación</li>
              <li>Firma digital de documentos</li>
            </ul>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="font-semibold text-red-800 mb-2">✗ Lo que NO ofrecemos</p>
            <ul className="space-y-1 text-sm text-red-700">
              <li>Integración SCADA en tiempo real (MVP)</li>
              <li>Envío automático a SEC (tú envías)</li>
              <li>Consultoría o diseño de redes</li>
            </ul>
          </div>
        </div>
      </>
    ),
  },
  {
    num: "2",
    title: "Licencia de Uso",
    content: (
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <p className="font-semibold text-green-800 mb-2">✓ Tú puedes</p>
          <ul className="space-y-1 text-sm text-green-700">
            <li>Usar LOADMAP para tu empresa o cooperativa</li>
            <li>Descargar reportes generados</li>
            <li>Acceder al histórico de 7 años</li>
            <li>Usar con múltiples usuarios (según plan)</li>
          </ul>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="font-semibold text-red-800 mb-2">✗ Tú NO puedes</p>
          <ul className="space-y-1 text-sm text-red-700">
            <li>Compartir acceso con otras empresas</li>
            <li>Re-vender LOADMAP</li>
            <li>Copiar o hackear el código</li>
            <li>Usar para fines ilegales</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    num: "3",
    title: "Responsabilidad del Usuario",
    content: (
      <ul className="space-y-2 text-[#444] leading-relaxed">
        {[
          "Proporcionar datos correctos para el cálculo.",
          "Mantener tu contraseña confidencial.",
          "Enviar los reportes a la SEC (LOADMAP solo los genera).",
          "Cumplir con las leyes vigentes de Chile.",
          "No intentar acceder, copiar o comprometer los sistemas de LOADMAP.",
        ].map((item, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="text-[#0066FF] font-bold shrink-0">({i + 1})</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    ),
  },
  {
    num: "4",
    title: "Responsabilidad de LOADMAP",
    content: (
      <>
        <p className="font-medium text-[#1A1A1A] mb-3">Nos comprometemos a:</p>
        <ul className="space-y-2 text-[#444] leading-relaxed mb-5">
          {[
            "Calcular pérdidas correctamente (motor Pandapower IEEE, precisión ±0.5–2%).",
            "Encriptar tus datos con AES-256.",
            "Garantizar 99.5% de uptime mensual.",
            "Responder soporte en menos de 48 horas hábiles.",
            "Firmar digitalmente los reportes generados.",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-green-600 font-bold shrink-0">✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <p className="font-semibold text-amber-800 mb-2">No somos responsables si:</p>
          <ul className="space-y-1 text-sm text-amber-700">
            <li>• Cargas datos incorrectos o incompletos.</li>
            <li>• Envías el reporte de forma incorrecta a la SEC.</li>
            <li>• Usas el servicio para fines no autorizados.</li>
            <li>• Sufres pérdidas económicas por error atribuible al usuario.</li>
            <li>• Un tercero accede por haber compartido tus credenciales.</li>
          </ul>
        </div>
      </>
    ),
  },
  {
    num: "5",
    title: "Privacidad y Datos",
    content: (
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="bg-[#F0F4FF] border border-[#0066FF]/20 rounded-xl p-4">
          <p className="font-semibold text-[#0066FF] mb-2">Lo que guardamos</p>
          <ul className="space-y-1 text-sm text-[#444]">
            <li>• Datos de medición (encriptados)</li>
            <li>• Reportes generados (encriptados)</li>
            <li>• Logs de acceso (7 años)</li>
          </ul>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <p className="font-semibold text-green-800 mb-2">Lo que jamás hacemos</p>
          <ul className="space-y-1 text-sm text-green-700">
            <li>• Vender tus datos a terceros</li>
            <li>• Compartir datos con competidores</li>
            <li>• Usar tus datos para publicidad</li>
            <li>• Data mining sobre tu operación</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    num: "6",
    title: "Cambios en el Servicio",
    content: (
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <p className="font-semibold text-green-800 mb-2">LOADMAP puede</p>
          <ul className="space-y-1 text-sm text-green-700">
            <li>• Mejorar funcionalidades existentes</li>
            <li>• Cambiar la interfaz de usuario</li>
            <li>• Cambiar precios (con 30 días de aviso)</li>
            <li>• Suspender features con vulnerabilidades</li>
          </ul>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="font-semibold text-red-800 mb-2">LOADMAP NO puede</p>
          <ul className="space-y-1 text-sm text-red-700">
            <li>• Eliminar tu acceso sin causa justificada</li>
            <li>• Vender tus datos</li>
            <li>• Cambiar precios retroactivamente</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    num: "7",
    title: "Soporte",
    content: (
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <p className="font-semibold text-green-800 mb-2">✓ Incluido en todos los planes</p>
          <ul className="space-y-1 text-sm text-green-700">
            <li>• Soporte por email con respuesta en &lt;48h</li>
            <li>• Acceso a documentación y FAQ</li>
            <li>• 1 sesión de training gratis (1 hora)</li>
          </ul>
        </div>
        <div className="bg-[#F8F9FA] border border-[#E0E0E0] rounded-xl p-4">
          <p className="font-semibold text-[#666] mb-2">✗ No incluido</p>
          <ul className="space-y-1 text-sm text-[#888]">
            <li>• Soporte telefónico</li>
            <li>• Visitas presenciales</li>
            <li>• Consultoría personalizada</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    num: "8",
    title: "Cancelación",
    content: (
      <ul className="space-y-2 text-[#444] leading-relaxed">
        <li className="flex items-start gap-2">
          <span className="text-[#0066FF] font-bold shrink-0">•</span>
          <span>Puedes cancelar en cualquier momento enviando aviso con 30 días de anticipación.</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-[#0066FF] font-bold shrink-0">•</span>
          <span>No se realizan devoluciones por el período en curso.</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-[#0066FF] font-bold shrink-0">•</span>
          <span>Tu historial de reportes se mantiene disponible por 7 años desde la cancelación.</span>
        </li>
      </ul>
    ),
  },
  {
    num: "9",
    title: "Ley Aplicable",
    content: (
      <p className="text-[#444] leading-relaxed">
        Estos Términos de Servicio se rigen por las leyes de la República de Chile. Cualquier disputa
        se resolverá ante los tribunales ordinarios de justicia de la ciudad de Santiago.
      </p>
    ),
  },
  {
    num: "10",
    title: "Aceptación",
    content: (
      <p className="text-[#444] leading-relaxed">
        Al crear una cuenta o usar LOADMAP, aceptas estos Términos de Servicio en su totalidad. Si no
        estás de acuerdo con alguna de las condiciones aquí descritas, te pedimos que no uses la
        plataforma.
      </p>
    ),
  },
];

export default function TerminosServicio() {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Header */}
      <header className="border-b border-[#E0E0E0] sticky top-0 bg-white z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#0066FF] rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold text-[#0066FF]">LOADMAP</span>
          </a>
          <a
            href="/"
            className="flex items-center gap-1.5 text-sm text-[#666] hover:text-[#0066FF] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </a>
        </div>
      </header>

      {/* Hero */}
      <div className="bg-[#F0F4FF] border-b border-[#E0E0E0]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <p className="text-sm font-semibold text-[#0066FF] uppercase tracking-wider mb-2">Legal</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] mb-3">
            Términos de Servicio
          </h1>
          <p className="text-[#666] text-lg">
            Última actualización: <strong>Agosto 2025</strong>
          </p>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Intro */}
        <div className="bg-[#FFF8E6] border border-[#FFB81C]/40 rounded-xl p-5 mb-10">
          <p className="text-[#7A5C00] text-sm leading-relaxed">
            <strong>Resumen simple:</strong> LOADMAP genera reportes SEC automáticos para tu cooperativa.
            Tú pones los datos, nosotros calculamos y firmamos. El envío a la SEC es tuya responsabilidad.
            Pagos mensuales sin devolución. Cancela cuando quieras con 30 días de aviso.
          </p>
        </div>

        <div className="space-y-10">
          {sections.map((s) => (
            <section key={s.num} id={`seccion-${s.num}`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-[#0066FF] rounded-lg flex items-center justify-center shrink-0">
                  <span className="text-white text-sm font-bold">{s.num}</span>
                </div>
                <h2 className="text-xl font-bold text-[#1A1A1A]">{s.title}</h2>
              </div>
              <div className="ml-11">{s.content}</div>
              {s.num !== "10" && <div className="mt-10 border-b border-[#E0E0E0]" />}
            </section>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-12 pt-8 border-t border-[#E0E0E0] text-center">
          <p className="text-[#666] text-sm mb-4">
            ¿Tienes preguntas sobre estos términos?
          </p>
          <a
            href="/#contacto"
            className="inline-flex items-center gap-2 bg-[#0066FF] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#0052CC] transition-colors"
          >
            Contáctanos
          </a>
          <p className="text-[#999] text-xs mt-6">© 2025 LOADMAP. Todos los derechos reservados.</p>
        </div>
      </main>
    </div>
  );
}
