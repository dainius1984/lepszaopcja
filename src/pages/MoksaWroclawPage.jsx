import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import ContactFooter from "../components/ContactFooter";
import Seo from "../components/Seo";
import JsonLd from "../components/JsonLd";
import { MOKSA_WROCLAW_PATH, getMoksaWroclawSchemas } from "../seo/schemas";

const wskazania = [
  "przewlekłe napięcia mięśniowe, sztywność oraz bóle stawów i kręgosłupa",
  "zaburzenia trawienia, uczucie „zimna” w ciele i zmęczenie",
  "obniżona odporność, częste infekcje — jako delikatne wsparcie organizmu",
  "stres i trudności z zasypianiem — ciepło moksy często rozluźnia układ nerwowy",
  "wsparcie regeneracji po wysiłku lub urazach (po ocenie terapeutycznej)",
];

export default function MoksaWroclawPage() {
  return (
    <div className="font-sans antialiased min-h-screen flex flex-col bg-white">
      <Seo
        title="Moksa Wrocław - Profesjonalna Moksoterapia | Lepsza Opcja"
        description="Szukasz profesjonalnego zabiegu moksoterapii we Wrocławiu? Odwiedź gabinet Lepsza Opcja. Tradycyjna Medycyna Chińska, naturalne leczenie i poprawa odporności. Zarezerwuj wizytę!"
        keywords="moksa wrocław, moksoterapia wrocław, medycyna chińska wrocław, zabiegi moksy"
        url={MOKSA_WROCLAW_PATH}
        omitTitleSuffix
      />
      <JsonLd schema={getMoksaWroclawSchemas()} />
      <Navbar />
      <main className="flex-1">
        <header className="pt-24 md:pt-28 pb-10 md:pb-14 bg-[#F5F5DC]/50 border-b border-[#71797E]/10">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-10 text-center">
            <p className="text-xs uppercase tracking-widest text-[#71797E] font-medium mb-3">
              Moksa Wrocław
            </p>
            <h1
              className="text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-[#333333] leading-tight text-balance"
              style={{ fontFamily: '"Playfair Display", serif' }}
            >
              Profesjonalna Moksoterapia we Wrocławiu
            </h1>
            <p className="mt-5 text-[#555555] text-base sm:text-lg font-light leading-relaxed">
              Tradycyjna Medycyna Chińska w praktyce: bezpieczne, naturalne ciepło moksy dla mieszkańców
              Wrocławia i okolic.
            </p>
          </div>
        </header>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-10 py-12 md:py-16 space-y-12 md:space-y-16">
          <section aria-labelledby="moksa-co-to">
            <h2
              id="moksa-co-to"
              className="text-2xl sm:text-3xl font-bold text-[#333333] mb-6"
              style={{ fontFamily: '"Playfair Display", serif' }}
            >
              Czym jest zabieg moksy i komu go polecamy?
            </h2>
            <div className="space-y-4 text-[#555555] text-sm sm:text-base leading-relaxed font-light">
              <p>
                Moksoterapia (potocznie „moksa”) to metoda wywodząca się z Tradycyjnej Medycyny Chińskiej (TCM),
                w której wykorzystuje się delikatne, lecznicze ciepło — najczęściej z suszonej bylicy (moksą w formie
                cygar lub stożków) — aby stymulować wybrane punkty i obszary na ciele. Nie chodzi o „mocne parzenie”,
                lecz o precyzyjne, komfortowe ogrzewanie: organizm zwykle reaguje rozluźnieniem, lepszym krążeniem i
                poczuciem ciepła od wewnątrz.
              </p>
              <p>
                W klasycznym ujęciu TCM zabieg wspiera przepływ Qi i krwi, pomaga redukować stagnację oraz uczucie
                chłodu czy ciężkości. Współcześnie łączymy tę wiedzę z rozsądnymi zasadami bezpieczeństwa i doborem
                technik: moksę pośrednią (np. na plasterze imbiru), bezpośrednią z odpowiednią odległością lub pracę
                cygarem — zawsze dobieraną do stanu zdrowia i celu wizyty.
              </p>
              <p>
                Zabieg polecamy osobom szukającym naturalnego wsparcia bez inwazyjności igieł — także w połączeniu z
                higieną snu, odżywianiem i ruchem. Szczególnie doceniają go ludzie pracujący w stresie, trenujący oraz
                seniorzy, u których codzienne dolegliwości bólowe ograniczają komfort życia. O możliwości wizyt z
                dojazdem pod Wrocław i w okolicach informujemy na stronie głównej oraz podczas kontaktu.
              </p>
            </div>
          </section>

          <section aria-labelledby="moksa-dlaczego" className="rounded-2xl border border-[#71797E]/12 bg-[#FAFAF5]/80 p-6 sm:p-8">
            <h2
              id="moksa-dlaczego"
              className="text-2xl sm:text-3xl font-bold text-[#333333] mb-5"
              style={{ fontFamily: '"Playfair Display", serif' }}
            >
              Dlaczego warto wybrać gabinet Lepsza Opcja we Wrocławiu?
            </h2>
            <ul className="space-y-3 text-[#555555] text-sm sm:text-base leading-relaxed font-light list-disc pl-5">
              <li>
                Doświadczenie w <strong className="font-medium text-[#333333]">moksoterapii i TCM</strong>, indywidualny
                dobór techniki i punktów — nie „szablon pod wszystkich”.
              </li>
              <li>
                Nacisk na <strong className="font-medium text-[#333333]">bezpieczeństwo i edukację</strong> — wyjaśniamy,
                co dzieje się podczas zabiegów moksy we Wrocławiu i jak możesz kontynuować pracę w domu.
              </li>
              <li>
                <strong className="font-medium text-[#333333]">Obszar usług obejmuje Wrocław</strong> (oraz m.in.
                Wilkszyn i okolice) — wyraźnie zaznaczone w danych kontaktowych i rezerwacji.
              </li>
            </ul>
          </section>

          <section aria-labelledby="moksa-wskazania">
            <h3 id="moksa-wskazania" className="text-lg font-semibold text-[#333333] mb-4">
              Główne wskazania do moksoterapii
            </h3>
            <p className="text-sm text-[#555555] mb-4 font-light leading-relaxed">
              Poniżej typowe obszary, w których pacjenci poszukują wsparcia — ostateczną kwalifikację zawsze ustala się
              podczas konsultacji.
            </p>
            <ul className="space-y-2.5 text-[#555555] text-sm sm:text-base leading-relaxed pl-4 border-l-2 border-[#C4862A]/50">
              {wskazania.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="text-center pt-2 pb-4">
            <p className="text-[#555555] text-sm mb-6 max-w-lg mx-auto font-light">
              Gotowy/a na pierwszą wizytę? Umów termin i poczuj działanie moksoterapii pod okiem praktyka TCM.
            </p>
            <Link
              to="/rezerwacja"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#333333] text-[#F5F5DC] text-sm font-medium hover:bg-[#71797E] transition-colors shadow-md hover:shadow-lg"
            >
              Umów się na zabieg moksy w naszym wrocławskim gabinecie
            </Link>
          </section>
        </div>

        <ContactFooter />
      </main>
    </div>
  );
}
