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

/**
 * Rejestracja użytkownika (email + hasło).
 * @returns {Promise<{ id: string, email: string }>}
 */
export async function registerUser(email, password, name) {
  if (!account) throw new Error("Appwrite nie jest skonfigurowany. Uzupełnij plik .env.");
  const user = await account.create(ID.unique(), email, password, name);
  return { id: user.$id, email: user.email };
}

/**
 * Zapis rezerwacji w Appwrite (osoba + data + godzina osobno).
 * W kolekcji potrzebne atrybuty: name, email, phone, course, preferredDate, preferredTime, message.
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
