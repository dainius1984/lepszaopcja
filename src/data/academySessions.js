/**
 * Domowa Akademia Moksy — pakiety sesji mobilnych (rezerwacja + modale).
 */
export const academySessions = [
  {
    id: "moksa-startup-express",
    order: 1,
    shortTitle: "Start-Up Express",
    title: "Moksa Start-Up Express",
    duration: "60 min",
    price: "250 zł",
    summary:
      "Twój pierwszy krok w moksoterapii w domu. Nauczysz się bezpiecznie odpalać i gasić cygara moksy, poznasz technikę moksy na pępku na imbirze i nauczysz się ogrzewać punkt ST36.",
    bullets: [
      "Indywidualna sesja 1:1",
      "Nauka bezpiecznego odpalenia i gaszenia cygara moksy (dymnej lub bezdymnej z zależności od preferencji i warunków)",
      "Pokaz moksy dymnej cietej na pępku na imbirze",
      "Pokaz ogrzewania punktów, w tym punktu Stu Chorób",
      "Pokaz ogrzewania punktów z pomocą akcesoriów (pudełka, rolery, uchwyty, pokrowce)",
      "Instrukcja z punktami akupunkturowymi, z zaznaczeniem indywidualnych punktów podczas sesji",
      "Dwutygodniowa opieka zdalna po sesji — możesz pytać, konsultować i upewnić się, że praktyka przebiega prawidłowo",
      "Rozpoczęte cygara pozostają u Ciebie do dalszej praktyki",
    ],
    reserveLabel: "Zarezerwuj Start-Up Express",
  },
  {
    id: "moksa-zloty-standard",
    order: 2,
    shortTitle: "Złoty Standard",
    title: "Moksa Złoty Standard",
    duration: "90–120 min",
    price: "400 zł",
    summary:
      "Pełniejsze zanurzenie w moksoterapii z indywidualnym podejściem do Twojego ciała i potrzeb.",
    bullets: [
      "Indywidualna sesja 1:1",
      "Nauka bezpiecznego odpalenia i gaszenia cygara moksy (dymnej lub bezdymnej z zależności od preferencji i warunków)",
      "Pokaz moksy dymnej cietej na pępku na imbirze",
      "Pokaz ogrzewania punktów, w tym punktu Stu Chorób",
      "Pokaz moksy przyklejanej na Bramie Wiatru",
      "Pokaz ogrzewania punktów z pomocą akcesoriów (pudełka, rolery, uchwyty, pokrowce)",
      "Instrukcja z punktami akupunkturowymi, z zaznaczeniem indywidualnych punktów podczas sesji",
      "Miesięczna opieka zdalna po sesji — możesz pytać, konsultować i upewnić się, że praktyka przebiega prawidłowo",
      "Rozpoczęte cygara pozostają u Ciebie do dalszej praktyki",
    ],
    reserveLabel: "Zarezerwuj Złoty Standard",
  },
  {
    id: "warsztat-akademia-dlugowiecznosci",
    order: 3,
    shortTitle: "Akademia Długowieczności",
    title: "Warsztat Domowy — Akademia Długowieczności",
    duration: "180 min",
    price: "800 zł (za 4 osoby)",
    summary:
      "Pełne doświadczenie praktyczne w małej grupie (do 4 osób praktykujących) pod moim okiem. Uczestnicy stawiają sobie nawzajem moksy, ucząc się wzajemnej opieki i samodzielnej praktyki w domu.",
    bullets: [
      "Nauka w małej grupie pod moim okiem",
      "Uczestnicy stawiają sobie nawzajem moksy, ucząc się wzajemnej opieki",
      "Nauka bezpiecznego odpalenia i gaszenia cygara moksy (dymnej lub bezdymnej z zależności od preferencji i warunków)",
      "Pokaz moksy dymnej cietej na pępku na imbirze",
      "Pokaz ogrzewania punktów, w tym punktu Stu Chorób",
      "Pokaz moksy przyklejanej na Bramie Wiatru",
      "Wprowadzenie do protokołu piękności i długowieczności",
      "Pokaz ogrzewania punktów z pomocą akcesoriów (pudełka, rolery, uchwyty, pokrowce)",
      "Instrukcja z punktami akupunkturowymi, z zaznaczeniem indywidualnych punktów podczas sesji",
      "Miesięczna opieka zdalna po sesji — możesz pytać, konsultować i upewnić się, że praktyka przebiega prawidłowo",
      "Rozpoczęte cygara pozostają u uczestników do dalszej praktyki",
      "Instrukcja z punktami akupunkturowymi dla każdego uczestnika, gdzie zaznaczamy w trakcie sesji indywidualne punkty",
    ],
    reserveLabel: "Zarezerwuj Akademię Długowieczności",
  },
];

export function getAcademySessionById(id) {
  return academySessions.find((s) => s.id === id) ?? null;
}
