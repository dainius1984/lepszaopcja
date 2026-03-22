import { Client, Account, Databases, ID, Query } from "appwrite";

const endpoint = import.meta.env.VITE_APPWRITE_ENDPOINT?.trim() || "";
const projectId = import.meta.env.VITE_APPWRITE_PROJECT_ID?.trim() || "";
const databaseId = import.meta.env.VITE_APPWRITE_DATABASE_ID?.trim() || "";
const reservationsCollectionId =
  import.meta.env.VITE_APPWRITE_RESERVATIONS_COLLECTION_ID?.trim() || "";

let _client = null;
let _account = null;
let _databases = null;

function getClient() {
  if (!endpoint || !projectId) return null;
  if (!_client) {
    _client = new Client();
    _client.setEndpoint(endpoint).setProject(projectId);
  }
  return _client;
}

export const appwriteClient = getClient();
export const account = getClient() ? new Account(getClient()) : null;
export const databases = getClient() ? new Databases(getClient()) : null;

export function isAppwriteConfigured() {
  return Boolean(endpoint && projectId && databaseId && reservationsCollectionId);
}

/** Czy Auth jest skonfigurowany (wystarczy endpoint + projectId). */
export function isAuthConfigured() {
  return Boolean(endpoint && projectId);
}

/**
 * Rejestracja użytkownika (email + hasło).
 * @returns {Promise<{ id: string, email: string, name?: string }>}
 */
export async function registerUser(email, password, name) {
  if (!account) throw new Error("Appwrite nie jest skonfigurowany. Uzupełnij plik .env.");
  const user = await account.create(ID.unique(), email, password, name);
  return { id: user.$id, email: user.email, name: user.name };
}

/**
 * Logowanie (email + hasło). Tworzy sesję w Appwrite.
 */
export async function loginUser(email, password) {
  if (!account) throw new Error("Appwrite nie jest skonfigurowany. Uzupełnij plik .env.");
  await account.createEmailPasswordSession({ email, password });
  const user = await account.get();
  return {
    id: user.$id,
    email: user.email,
    name: user.name || "",
    phone: user.phone || "",
  };
}

/**
 * Wylogowanie — usuwa bieżącą sesję.
 */
export async function logoutUser() {
  if (!account) return;
  try {
    await account.deleteSession("current");
  } catch {
    await account.deleteSessions();
  }
}

/**
 * Pobiera aktualnie zalogowanego użytkownika (null jeśli brak sesji).
 */
export async function getCurrentUser() {
  if (!account) return null;
  try {
    const user = await account.get();
    return {
      id: user.$id,
      email: user.email,
      name: user.name || "",
      phone: user.phone || "",
    };
  } catch {
    return null;
  }
}

/** Rozdziela pojedyncze pole `name` z Appwrite na imię i nazwisko (pierwsze słowo / reszta). */
export function splitFullName(name) {
  const n = (name || "").trim();
  if (!n) return { firstName: "", lastName: "" };
  const i = n.indexOf(" ");
  if (i === -1) return { firstName: n, lastName: "" };
  return { firstName: n.slice(0, i).trim(), lastName: n.slice(i + 1).trim() };
}

/** E.164 z plusem — dla pustego zwraca "". */
export function normalizePhoneForAppwrite(raw) {
  const s = String(raw || "").trim().replace(/\s/g, "");
  if (!s) return "";
  if (s.startsWith("+")) {
    const digits = s.slice(1).replace(/\D/g, "");
    return digits ? `+${digits}` : "";
  }
  const digits = s.replace(/\D/g, "");
  if (!digits) return "";
  if (digits.startsWith("48") && digits.length >= 11) return `+${digits}`;
  if (digits.length === 9) return `+48${digits}`;
  return `+${digits}`;
}

/**
 * Aktualizuje imię i nazwisko (jedno pole `name` w Appwrite).
 * @param {{ firstName: string, lastName: string }} p
 */
export async function updateAccountName(firstName, lastName) {
  if (!account) throw new Error("Appwrite nie jest skonfigurowany.");
  const name = `${(firstName || "").trim()} ${(lastName || "").trim()}`.trim();
  if (!name) throw new Error("Podaj imię lub nazwisko.");
  await account.updateName({ name });
}

/**
 * Numer telefonu w Appwrite wymaga hasła. Pusty `phone` — pomija aktualizację (nie usuwa numeru w konsoli).
 */
export async function updateAccountPhone(phone, password) {
  if (!account) throw new Error("Appwrite nie jest skonfigurowany.");
  const normalized = normalizePhoneForAppwrite(phone);
  if (!normalized) {
    throw new Error("Podaj numer w formacie z kodem kraju, np. +48123456789.");
  }
  if (!password || password.length < 8) {
    throw new Error("Aby zmienić telefon, podaj aktualne hasło (min. 8 znaków).");
  }
  await account.updatePhone({ phone: normalized, password });
}

/**
 * @param {{ oldPassword: string, newPassword: string }} p
 */
export async function updateAccountPassword(oldPassword, newPassword) {
  if (!account) throw new Error("Appwrite nie jest skonfigurowany.");
  if (!newPassword || newPassword.length < 8) {
    throw new Error("Nowe hasło musi mieć co najmniej 8 znaków.");
  }
  await account.updatePassword({ password: newPassword, oldPassword });
}

/**
 * Zapis rezerwacji w Appwrite (osoba + data + godzina osobno).
 * W kolekcji potrzebne atrybuty: name, email, phone, course, preferredDate, preferredTime, message,
 * oraz opcjonalnie boxChoice (string) — patrz komentarz przy createReservation.
 *
 * --- Appwrite Console (Database → reservations) ---
 * Dodaj atrybut: key = boxChoice, typ = String, size = 64 (wystarczy), required = false.
 * Dozwolone wartości z aplikacji: "start_box" | "premium_box" | "unsure" | "none" | "" (puste przy innych usługach).
 * (Supabase: analogiczna kolumna TEXT lub ENUM z tymi wartościami.)
 */
export async function createReservation(data) {
  if (!isAppwriteConfigured() || !databases) {
    throw new Error("Appwrite nie jest skonfigurowany. Dodaj zmienne VITE_APPWRITE_* w pliku .env");
  }
  const doc = await databases.createDocument(
    databaseId,
    reservationsCollectionId,
    ID.unique(),
    {
      name: data.name,
      email: data.email,
      phone: data.phone || "",
      course: data.course || "",
      preferredDate: data.preferredDate || "",
      preferredTime: data.preferredTime || "",
      message: data.message || "",
      boxChoice: data.boxChoice || "",
    }
  );
  return doc;
}

/**
 * Pobiera listę zajętych godzin na dany dzień (z rezerwacji w bazie).
 * Używane do wyświetlania tylko wolnych slotów w widgetcie.
 * W Appwrite: w kolekcji reservations ustaw Read dla "Any" (lub "Users")
 * oraz dodaj indeks na preferredDate (Database → reservations → Indexes).
 */
export async function getBookedTimesForDate(dateStr) {
  if (!isAppwriteConfigured() || !databases) return [];
  if (!dateStr || !dateStr.trim()) return [];
  try {
    const { documents } = await databases.listDocuments(
      databaseId,
      reservationsCollectionId,
      [
        Query.equal("preferredDate", dateStr.trim()),
        Query.limit(100),
      ]
    );
    const times = documents
      .map((doc) => doc.preferredTime)
      .filter(Boolean);
    return [...new Set(times)];
  } catch {
    return [];
  }
}

/**
 * Pobiera wszystkie rezerwacje powiązane z podanym adresem e-mail.
 * Zwraca tablicę dokumentów (posortowanych malejąco po dacie utworzenia).
 */
export async function getReservationsForEmail(email) {
  if (!isAppwriteConfigured() || !databases) return [];
  if (!email || !email.trim()) return [];
  try {
    const { documents } = await databases.listDocuments(
      databaseId,
      reservationsCollectionId,
      [
        Query.equal("email", email.trim().toLowerCase()),
        Query.limit(200),
      ]
    );
    // Posortuj lokalnie po preferredDate + preferredTime, najbliższe na górze
    return documents.slice().sort((a, b) => {
      const ad = `${a.preferredDate || ""} ${a.preferredTime || ""}`;
      const bd = `${b.preferredDate || ""} ${b.preferredTime || ""}`;
      return ad.localeCompare(bd);
    });
  } catch {
    return [];
  }
}
