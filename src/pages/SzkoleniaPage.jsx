import Navbar from "../components/Navbar";
import TrainingAcademy from "../components/TrainingAcademy";
import ContactFooter from "../components/ContactFooter";
import Seo from "../components/Seo";
import JsonLd from "../components/JsonLd";
import { getLocalBusinessSchema, getCourseSchemas } from "../seo/schemas";

export default function SzkoleniaPage() {
  const schemas = [getLocalBusinessSchema(), ...getCourseSchemas()];

  return (
    <div className="font-sans antialiased min-h-screen flex flex-col">
      <Seo
        title="Kurs moksoterapii — Szkolenie z moksy, kursy medycyny chińskiej"
        description="Szkolenia z moksoterapii w Wilkszynie k. Wrocławia: kurs podstawowy, zaawansowany i specjalistyczny (moksa w zdrowiu kobiety). Praktyka i teoria TCM. Zapisz się na kurs."
        keywords="kurs moksoterapii, szkolenie z moksy, kursy medycyny chińskiej, szkolenia TCM, moksoterapia kurs, nauka moksy, kurs moksa Wilkszyn"
        url="/szkolenia"
      />
      <JsonLd schema={schemas} />
      <Navbar />
      <main className="flex-1">
        <section
          className="pt-24 md:pt-28 pb-12 md:pb-16 bg-[#333333] border-b border-[#F5F5DC]/10"
          aria-labelledby="szkolenia-heading"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 text-center">
            <span className="inline-block mb-3 text-xs uppercase tracking-widest text-[#71797E] font-medium">
              Akademia Moksy
            </span>
            <h1
              id="szkolenia-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#F5F5DC] leading-tight"
              style={{ fontFamily: '"Playfair Display", serif' }}
            >
              Szkolenia z moksoterapii
            </h1>
            <p className="mt-4 text-[#F5F5DC]/70 text-base sm:text-lg max-w-xl mx-auto font-light">
              Kursy łączące tradycyjną wiedzę TCM z praktyką. Dla początkujących i
              zaawansowanych.
            </p>
          </div>
        </section>
        <TrainingAcademy />
        <ContactFooter />
      </main>
    </div>
  );
}
