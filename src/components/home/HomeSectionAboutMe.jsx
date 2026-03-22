import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Heart, Shield, BookOpen } from "lucide-react";

export default function HomeSectionAboutMe() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="o-mnie" className="py-16 sm:py-20 md:py-28 bg-white scroll-mt-20 md:scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-block mb-4 text-xs uppercase tracking-widest text-[#71797E] font-medium">
            O mnie
          </span>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#333333] mb-4"
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            Moja historia
          </h2>
        </motion.div>

        {/* Na lg: wysokość bloku = wysokość tekstu; zdjęcie wypełnia prawą połowę od góry do dołu tekstu */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65 }}
            className="space-y-6 text-[#555555] text-sm sm:text-base leading-relaxed font-light lg:w-[calc(50%-2rem)]"
          >
            <p>
              Jestem pasjonatką zdrowego żywienia i samoukiem, która od lat zgłębia wpływ diety i naturalnych
              metod na zdrowie i samopoczucie. Moja fascynacja zaczęła się, gdy szukałam skutecznych,
              bezpiecznych sposobów wsparcia dla mojego syna z autyzmem — który dzięki diecie i holistycznemu
              podejściu funkcjonuje fantastycznie (więcej na{" "}
              <a
                href="https://www.autyzmodkuchni.pl"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#71797E] underline underline-offset-2 hover:text-[#333333]"
              >
                www.autyzmodkuchni.pl
              </a>
              ).
            </p>
            <p>
              Jako poszukiwaczka prostych i sprawdzonych metod poprawy zdrowia szybko przekonałam się, że
              tabletki i leki często tylko maskują problemy i rzadko działają na dłuższą metę. To odkrycie
              skierowało mnie w stronę naturalnych, nieinwazyjnych technik — w tym termopunktury i moksoterapii.
            </p>
            <p>
              W Domowej Akademii Moksy uczę, jak w pełni samodzielnie korzystać z moksoterapii w domu. Moim
              celem jest „dać wędkę” – jedno spotkanie, po którym wiesz, jak bezpiecznie i skutecznie stosować
              moksa dla siebie i bliskich. Jestem pasjonatką nauki przez praktykę: podczas sesji pokazuję
              różne akcesoria, materiały i techniki, aby każdy mógł dopasować narzędzia do swoich potrzeb i
              rozpocząć swoją codzienną praktykę w domu.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.05 }}
            className="mt-8 aspect-[4/5] w-full max-w-md mx-auto overflow-hidden rounded-2xl border border-[#71797E]/10 bg-[#FAFAF5] shadow-sm sm:max-w-lg lg:mx-0 lg:mt-0 lg:aspect-auto lg:max-w-none lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[calc(50%-2rem)]"
          >
            <img
              src="/img/me.jpg"
              alt="Prowadząca Domowej Akademii Moksy"
              className="h-full min-h-[200px] w-full object-cover object-[center_22%]"
              width={960}
              height={1200}
              loading="lazy"
              decoding="async"
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15 }}
          className="mt-14 md:mt-20 max-w-3xl mx-auto"
        >
          <h3
            className="text-2xl font-bold text-[#333333] mb-6 text-center"
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            Dlaczego Domowa Akademia Moksy
          </h3>
          <p className="text-[#555555] text-sm sm:text-base leading-relaxed mb-8 font-light text-center">
            Wierzę, że prawdziwa moc moksoterapii ujawnia się wtedy, gdy staje się częścią codziennego życia —
            nie tylko jednorazową wizytą w gabinecie. Moksa to ciepło, które możesz wprowadzić do swojego domu,
            w swoim rytmie, w zaciszu własnego pokoju, nawet przed ulubionym serialem.
          </p>
          <div className="space-y-5 text-[#555555] text-sm sm:text-base leading-relaxed font-light">
            <p>
              Moją przygodę z moksa rozpoczęłam na warsztatach u Bożeny Olszowskiej i od razu zobaczyłam w niej
              olbrzymi potencjał — moc regeneracji, odzyskiwania energii życiowej i świetnego samopoczucia. Od
              tamtej pory nie przestaję zgłębiać jej możliwości i dzielić się nimi z innymi.
            </p>
            <p>
              Nie chodzi o częste sesje czy wizyty kontrolne — chodzi o nauczenie się, jak bezpiecznie i
              świadomie korzystać z tej starożytnej techniki, tak aby sama stała się narzędziem do wspierania
              zdrowia i harmonii. Dlatego przyjeżdżam do Ciebie — pokazuję, tłumaczę i czuwam nad pierwszymi
              krokami, abyś potem mógł/mogła samodzielnie pomagać sobie i bliskim, w domowym, przyjaznym
              otoczeniu.
            </p>
            <p className="italic text-[#333333]">
              To moja filozofia: jedna sesja może odmienić sposób, w jaki troszczysz się o ciało i energię —
              bez pośpiechu, bez stresu, z sercem i spokojem.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
            {[
              {
                icon: Shield,
                title: "Bezpieczne techniki",
                text: "Uczę tylko sprawdzonych, nieinwazyjnych metod.",
              },
              {
                icon: BookOpen,
                title: "Wiedza praktyczna",
                text: "Od razu możesz stosować moksę w domu dla siebie lub bliskich.",
              },
              {
                icon: Heart,
                title: "Indywidualne dopasowanie",
                text: "Pokazuję różne wersje akcesoriów, rolerów, pokrowców — każdy znajduje to, co mu pasuje.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-[#71797E]/10 bg-[#FAFAF5] p-6 text-center"
              >
                <item.icon className="mx-auto mb-3 text-[#71797E]" size={22} />
                <h4 className="text-sm font-semibold text-[#333333] mb-2">{item.title}</h4>
                <p className="text-xs text-[#555555] leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="#faq"
              className="inline-flex items-center gap-2 text-[#71797E] text-sm font-medium hover:underline underline-offset-4"
            >
              Przejdź do FAQ
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
