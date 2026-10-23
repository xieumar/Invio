import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  deleteDoc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
import { nanoid } from "nanoid";
import { db } from "@/lib/firebase";
import { clientSchema } from "@/lib/validations";

const DEMO_CLIENTS_KEY = "invio_demo_clients";

export const initialSeedClients: Client[] = [
  {
    id: "cli_jensen_huang",
    userId: "demo-user",
    name: "Jensen Huang",
    email: "jensenh@mail.com",
    phone: "+44 20 7946 0912",
    address: {
      street: "106 Kendell Street",
      city: "Sharrington",
      postCode: "NR24 5WQ",
      country: "United Kingdom",
    },
    currency: "GBP",
    defaultPaymentTerms: 1,
    notes: "Key tech hardware client. VIP tier.",
    createdAt: "2021-08-18T00:00:00.000Z",
    updatedAt: "2021-08-18T00:00:00.000Z",
  },
  {
    id: "cli_alex_grim",
    userId: "demo-user",
    name: "Alex Grim",
    email: "alexgrim@mail.com",
    phone: "+44 12 7496 0341",
    address: {
      street: "84 Church Way",
      city: "Bradford",
      postCode: "BD1 9PB",
      country: "United Kingdom",
    },
    currency: "GBP",
    defaultPaymentTerms: 30,
    notes: "Digital graphic design contractor.",
    createdAt: "2021-08-21T00:00:00.000Z",
    updatedAt: "2021-08-21T00:00:00.000Z",
  },
  {
    id: "cli_john_morrison",
    userId: "demo-user",
    name: "John Morrison",
    email: "john@morrison.com",
    phone: "+44 19 1234 5678",
    address: {
      street: "79 Dover Road",
      city: "Wensley",
      postCode: "NZ34 92E",
      country: "United Kingdom",
    },
    currency: "GBP",
    defaultPaymentTerms: 7,
    notes: "Brand architecture and website redesign.",
    createdAt: "2021-09-22T00:00:00.000Z",
    updatedAt: "2021-09-22T00:00:00.000Z",
  },
  {
    id: "cli_alyssa_werner",
    userId: "demo-user",
    name: "Alyssa Werner",
    email: "alyssa@werner.com",
    phone: "+1 760 555 0192",
    address: {
      street: "63 Warwick Road",
      city: "Carlsbad",
      postCode: "CA 92008",
      country: "United States",
    },
    currency: "USD",
    defaultPaymentTerms: 30,
    notes: "International enterprise client.",
    createdAt: "2021-10-01T00:00:00.000Z",
    updatedAt: "2021-10-01T00:00:00.000Z",
  },
  {
    id: "cli_mellisa_clarke",
    userId: "demo-user",
    name: "Mellisa Clarke",
    email: "mellisa@clarke.com",
    phone: "+44 19 1987 6543",
    address: {
      street: "46 Rose Crescent",
      city: "Newcastle",
      postCode: "NE1 2AB",
      country: "United Kingdom",
    },
    currency: "GBP",
    defaultPaymentTerms: 7,
    notes: "Design identity sprint.",
    createdAt: "2021-10-07T00:00:00.000Z",
    updatedAt: "2021-10-07T00:00:00.000Z",
  },
];

function getLocalDemoClients(): Client[] {
  if (typeof window === "undefined") return initialSeedClients;
  const stored = localStorage.getItem(DEMO_CLIENTS_KEY);
  if (!stored) {
    localStorage.setItem(DEMO_CLIENTS_KEY, JSON.stringify(initialSeedClients));
    return initialSeedClients;
  }
  try {
    return JSON.parse(stored);
  } catch {
    return initialSeedClients;
  }
}

function saveLocalDemoClients(clients: Client[]): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(DEMO_CLIENTS_KEY, JSON.stringify(clients));
  }
}

export async function fetchClients(userId?: string | null): Promise<Client[]> {
  if (!userId || userId === "demo-user") {
    return getLocalDemoClients();
  }

  try {
    const clientsRef = collection(db, "users", userId, "clients");
    const q = query(clientsRef, orderBy("name", "asc"));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      // First time user: seed initial demo clients into Firestore so they have data
      const batchPromises = initialSeedClients.map((c) => {
        const clientDocRef = doc(db, "users", userId, "clients", c.id);
        return setDoc(clientDocRef, {
          ...c,
          userId,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      });
      await Promise.all(batchPromises);
      return initialSeedClients.map((c) => ({ ...c, userId }));
    }

    return snapshot.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        userId,
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        address: data.address,
        currency: data.currency || "GBP",
        defaultPaymentTerms: data.defaultPaymentTerms || 14,
        notes: data.notes || null,
        totalInvoicedAmount: data.totalInvoicedAmount || 0,
        invoiceCount: data.invoiceCount || 0,
        createdAt: data.createdAt?.toDate
          ? data.createdAt.toDate().toISOString()
          : data.createdAt || new Date().toISOString(),
        updatedAt: data.updatedAt?.toDate
          ? data.updatedAt.toDate().toISOString()
          : data.updatedAt || new Date().toISOString(),
      } as Client;
    });
  } catch (error) {
    console.warn(
      "Failed to fetch clients from Firestore, falling back to local demo:",
      error
    );
    return getLocalDemoClients();
  }
}

export async function fetchClientById(
  userId: string | null | undefined,
  clientId: string
): Promise<Client | null> {
  if (!userId || userId === "demo-user") {
    const local = getLocalDemoClients();
    return local.find((c) => c.id === clientId) || null;
  }

  try {
    const clientRef = doc(db, "users", userId, "clients", clientId);
    const snapshot = await getDoc(clientRef);
    if (!snapshot.exists()) return null;

    const data = snapshot.data();
    return {
      id: snapshot.id,
      userId,
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      address: data.address,
      currency: data.currency || "GBP",
      defaultPaymentTerms: data.defaultPaymentTerms || 14,
      notes: data.notes || null,
      totalInvoicedAmount: data.totalInvoicedAmount || 0,
      invoiceCount: data.invoiceCount || 0,
      createdAt: data.createdAt?.toDate
        ? data.createdAt.toDate().toISOString()
        : data.createdAt || new Date().toISOString(),
      updatedAt: data.updatedAt?.toDate
        ? data.updatedAt.toDate().toISOString()
        : data.updatedAt || new Date().toISOString(),
    } as Client;
  } catch {
    return null;
  }
}

export async function createClient(
  userId: string | null | undefined,
  data: ClientFormData
): Promise<Client> {
  const validated = clientSchema.parse(data);
  const clientId = `cli_${nanoid(10)}`;
  const now = new Date().toISOString();

  const newClient: Client = {
    id: clientId,
    userId: userId || "demo-user",
    name: validated.name,
    email: validated.email,
    phone: validated.phone || null,
    address: validated.address,
    currency: (validated.currency as CurrencyCode) || "GBP",
    defaultPaymentTerms: validated.defaultPaymentTerms || 14,
    notes: validated.notes || null,
    totalInvoicedAmount: 0,
    invoiceCount: 0,
    createdAt: now,
    updatedAt: now,
  };

  if (!userId || userId === "demo-user") {
    const local = getLocalDemoClients();
    saveLocalDemoClients([newClient, ...local]);
    return newClient;
  }

  const clientRef = doc(db, "users", userId, "clients", clientId);
  await setDoc(clientRef, {
    ...newClient,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return newClient;
}

export async function updateClient(
  userId: string | null | undefined,
  clientId: string,
  data: Partial<ClientFormData>
): Promise<void> {
  const now = new Date().toISOString();

  if (!userId || userId === "demo-user") {
    const local = getLocalDemoClients();
    const index = local.findIndex((c) => c.id === clientId);
    if (index !== -1) {
      local[index] = { ...local[index], ...data, updatedAt: now };
      saveLocalDemoClients(local);
    }
    return;
  }

  const clientRef = doc(db, "users", userId, "clients", clientId);
  await setDoc(
    clientRef,
    {
      ...data,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}

export async function deleteClient(
  userId: string | null | undefined,
  clientId: string
): Promise<void> {
  if (!userId || userId === "demo-user") {
    const local = getLocalDemoClients();
    saveLocalDemoClients(local.filter((c) => c.id !== clientId));
    return;
  }

  const clientRef = doc(db, "users", userId, "clients", clientId);
  await deleteDoc(clientRef);
}
