/**
 * Poradnik moksoterapii — sekcje 1–12 (treść edukacyjna).
 * @typedef {{ type: 'p', text: string }} PoradnikP
 * @typedef {{ type: 'ul', items: string[] }} PoradnikUl
 * @typedef {{ type: 'h3', text: string }} PoradnikH3
 * @typedef {{ type: 'callout', variant: 'tip'|'warn', items: string[] }} PoradnikCallout
 */

export const poradnikSectionsPartA = [
  {
    id: "kiedy-wykonywac",
    title: "1. Kiedy wykonywać moksoterapię",
    blocks: [
      {
        type: "p",
        text: "Najlepiej wykonywać moksę w ciągu dnia, między wschodem a zachodem słońca, gdy ciało jest najbardziej podatne na przyjęcie ciepła i energii Yang.",
      },
      {
        type: "p",
        text: "Po godzinie 17:00 najlepiej stosować moksę tylko na stopach, nie na tułowiu.",
      },
      {
        type: "p",
        text: "Przy punktach obustronnych zawsze zaczynaj od lewej strony ciała, a dopiero potem przechodź na prawą.",
      },
      {
        type: "p",
        text: "Podczas sesji nie odsłaniaj całej skóry – najlepiej przykryć ciało lekkim kocem, aby ciepło było komfortowe.",
      },
      {
        type: "p",
        text: "Po zakończeniu moksoterapii delikatnie wmasuj ogrzewany punkt dłonią, aby wspomóc przepływ energii.",
      },
    ],
  },
  {
    id: "przygotowanie-do-zabiegu",
    title: "2. Przygotowanie do zabiegu",
    blocks: [
      {
        type: "ul",
        items: [
          "nie wykonuj moksy na czczo (silny głód)",
          "nie wykonuj moksy bezpośrednio po ciężkim posiłku (odczekaj 1,5–2 godziny)",
          "ubierz się wygodnie",
          "przygotuj spokojne, ciepłe miejsce",
          "miej pod ręką wodę do picia",
        ],
      },
    ],
  },
  {
    id: "warunki-wykonywania",
    title: "3. Warunki wykonywania",
    blocks: [
      {
        type: "ul",
        items: [
          "unikaj przeciągów",
          "zadbaj o komfortową temperaturę",
          "przy moksie dymnej zapewnij dobrą wentylację",
        ],
      },
    ],
  },
  {
    id: "po-moksoterapii",
    title: "4. Po moksoterapii",
    blocks: [
      { type: "p", text: "Przez 2 godziny po zabiegu:" },
      {
        type: "ul",
        items: [
          "unikaj kontaktu z wodą (zimną i gorącą)",
          "nie bierz prysznica ani kąpieli",
          "unikaj zimna i wiatru",
          "nie pij zimnych napojów",
          "nie jedz surowych i zimnych potraw",
          "unikaj alkoholu",
        ],
      },
      { type: "p", text: "Jeśli poczujesz pragnienie, wypij szklankę ciepłej wody." },
    ],
  },
  {
    id: "czas-trwania-czestotliwosc",
    title: "5. Czas trwania i częstotliwość",
    blocks: [
      {
        type: "ul",
        items: [
          "1 punkt: 5–15 minut",
          "1 sesja: 2–4 punkty",
          "cała sesja: 15–40 minut",
        ],
      },
      {
        type: "callout",
        variant: "tip",
        items: [
          "Ogrzewaj punkt do momentu wyraźnego, przyjemnego ciepła",
          "lekki rumień jest prawidłowy",
          "pieczenie oznacza, że należy przerwać",
        ],
      },
      { type: "p", text: "Częstotliwość:" },
      {
        type: "ul",
        items: ["pierwszy tydzień: codziennie", "kolejne tygodnie: co 2 dni"],
      },
    ],
  },
  {
    id: "reakcje-po-moksoterapii",
    title: "6. Reakcje po moksoterapii",
    blocks: [
      { type: "p", text: "Możliwe naturalne reakcje organizmu:" },
      {
        type: "ul",
        items: [
          "uczucie głębokiego ciepła",
          "senność lub zmęczenie",
          "częstsze oddawanie moczu",
          "luźniejszy stolec",
          "chwilowe nasilenie objawów",
        ],
      },
      {
        type: "callout",
        variant: "tip",
        items: ["są to oznaki, że organizm reaguje i się reguluje"],
      },
      { type: "p", text: "Niepokojące objawy:" },
      {
        type: "ul",
        items: ["silne zawroty głowy", "duszność", "wyraźne pogorszenie samopoczucia"],
      },
      {
        type: "callout",
        variant: "warn",
        items: ["w takim przypadku przerwij terapię"],
      },
    ],
  },
  {
    id: "nadmierne-stosowanie",
    title: "7. Kiedy robisz za dużo moksy",
    blocks: [
      { type: "p", text: "Objawy nadmiernego stosowania:" },
      {
        type: "ul",
        items: [
          "uczucie przegrzania",
          "suchość w ustach",
          "rozdrażnienie",
          "bezsenność",
          "silne zaczerwienienie skóry",
        ],
      },
      {
        type: "callout",
        variant: "tip",
        items: ["wtedy: zrób przerwę 1–3 dni", "zmniejsz częstotliwość lub czas"],
      },
    ],
  },
  {
    id: "mechanizm-dzialania",
    title: "8. Na czym polega moksoterapia i mechanizm działania",
    blocks: [
      {
        type: "h3",
        text: "8.1 „Czysta Yang” moksoterapii",
      },
      {
        type: "p",
        text: "Bylica (Artemisia argyi) jest ziołem o naturze gorącej, gorzko-ostrej, działającym na meridiany śledziony, wątroby i nerek.",
      },
      {
        type: "p",
        text: "Podczas spalania ciepło i właściwości lecznicze bylicy przenikają głęboko w ciało, rozpraszając zimno i wilgoć oraz stymulując energię Yang.",
      },
      { type: "h3", text: "8.2 Regulacja dwukierunkowa" },
      {
        type: "p",
        text: "Mimo że moksoterapia jest „czystym Yang”, działa regulująco: wspomaga niedobory, pobudza przy stagnacji, harmonizuje organizm.",
      },
    ],
  },
  {
    id: "glowne-funkcje",
    title: "9. Główne funkcje moksoterapii",
    blocks: [
      { type: "h3", text: "Rozgrzewanie meridianów i usuwanie zimna" },
      { type: "p", text: "Pomaga przy:" },
      {
        type: "ul",
        items: ["bólach menstruacyjnych", "bólach stawów", "chłodnym żołądku"],
      },
      { type: "p", text: "Typowe punkty: Guanyuan (CV4), Zusanli (ST36)." },
      { type: "h3", text: "Wzmacnianie Yang i ratowanie organizmu" },
      {
        type: "ul",
        items: ["chroniczna biegunka", "osłabienie", "moczenie nocne"],
      },
      { type: "p", text: "Punkty: Shenque (CV8), Guanyuan (CV4)." },
      { type: "h3", text: "Poprawa krążenia Qi i krwi" },
      { type: "ul", items: ["bóle mięśni", "obrzęki", "zastój"] },
      { type: "h3", text: "Wzmacnianie odporności" },
      {
        type: "p",
        text: "punkt Zusanli (ST36) – „punkt długowieczności”.",
      },
      { type: "h3", text: "Regulacja hormonalna" },
      { type: "p", text: "punkt Sanyinjiao (SP6)." },
      { type: "h3", text: "Usuwanie wilgoci i wspomaganie metabolizmu" },
      { type: "ul", items: ["obrzęki", "egzema", "problemy trawienne"] },
    ],
  },
  {
    id: "wilgota-w-organizmie",
    title: "10. Wilgoć w organizmie – kluczowy koncept",
    blocks: [
      {
        type: "p",
        text: "„Wilgoć” w tradycyjnej medycynie chińskiej to nadmiar chłodnej lub stagnującej energii, który zaburza prawidłowy przepływ Qi i krwi.",
      },
      { type: "p", text: "Objawy:" },
      {
        type: "ul",
        items: [
          "uczucie ciężkości",
          "zmęczenie",
          "osłabienie",
          "problemy trawienne",
          "obrzęki",
          "bóle stawów",
        ],
      },
      { type: "p", text: "Przyczyny:" },
      {
        type: "ul",
        items: [
          "zimne i ciężkie jedzenie",
          "nadmiar słodyczy i tłuszczu",
          "brak ruchu",
          "stres",
          "wilgotne środowisko",
        ],
      },
      {
        type: "p",
        text: "Jeśli wilgoć pozostaje w organizmie, nawet najlepsze zioła, dieta czy suplementy nie przynoszą pełnego efektu, ponieważ energia nie krąży swobodnie.",
      },
      { type: "p", text: "Rola moksoterapii:" },
      {
        type: "p",
        text: "Moksoterapia jest jedną z najskuteczniejszych metod usuwania wilgoci: pobudza krążenie Qi, rozgrzewa organizm, osusza nadmiar wilgoci, przywraca równowagę.",
      },
    ],
  },
  {
    id: "idealni-kandydaci",
    title: "11. Idealni kandydaci do moksoterapii",
    blocks: [
      {
        type: "ul",
        items: [
          "osoby z niedoborem ciepła",
          "zimne dłonie i stopy",
          "chroniczne zmęczenie",
          "obniżona odporność",
          "bóle przewlekłe",
        ],
      },
    ],
  },
  {
    id: "kto-powinien-uwazac",
    title: "12. Kto powinien uważać",
    blocks: [
      { type: "p", text: "Osoby z oznakami nadmiaru ciepła:" },
      {
        type: "ul",
        items: [
          "uczucie gorąca",
          "zaczerwienienie twarzy",
          "suchość w ustach",
          "problemy ze snem",
        ],
      },
      {
        type: "callout",
        variant: "tip",
        items: ["powinny stosować moksę: rzadziej, krócej, bardziej punktowo"],
      },
    ],
  },
];
