import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { businessProfileSchema } from "@/lib/validations";
import { prepareLogo, blobToDataUrl } from "@/lib/image/prepareLogo";

const DEMO_PROFILE_KEY = "invio_demo_business_profile";
const DEMO_ONBOARDING_KEY = "invio_demo_onboarding_status";

export async function saveBusinessProfile(
  userId: string,
  data: BusinessProfileFormData
): Promise<void> {
  const validated = businessProfileSchema.parse(data);

  if (userId === "demo-user" || (typeof window !== "undefined" && !userId)) {
    if (typeof window !== "undefined") {
      // Merge so fields not on this form (e.g. logoUrl) survive a save
      let existing = {};
      try {
        existing = JSON.parse(localStorage.getItem(DEMO_PROFILE_KEY) ?? "{}");
      } catch {
        // corrupt entry: overwrite it
      }
      localStorage.setItem(
        DEMO_PROFILE_KEY,
        JSON.stringify({ ...existing, ...validated })
      );
    }
    return;
  }

  // createdAt is set once, by completeOnboarding; updates must not reset it.
  const profileRef = doc(db, "users", userId, "businessProfile", "default");
  await setDoc(
    profileRef,
    { ...validated, updatedAt: serverTimestamp() },
    { merge: true }
  );
}

function setDemoLogo(logoUrl: string | null): void {
  if (typeof window === "undefined") return;
  let existing = {};
  try {
    existing = JSON.parse(localStorage.getItem(DEMO_PROFILE_KEY) ?? "{}");
  } catch {
    // corrupt entry: overwrite it
  }
  localStorage.setItem(
    DEMO_PROFILE_KEY,
    JSON.stringify({ ...existing, logoUrl })
  );
}

async function writeLogoUrl(
  userId: string,
  logoUrl: string | null
): Promise<void> {
  const profileRef = doc(db, "users", userId, "businessProfile", "default");
  await setDoc(
    profileRef,
    { logoUrl, updatedAt: serverTimestamp() },
    { merge: true }
  );
}

/**
 * Validates and shrinks a logo, then stores it on the profile as a data URL.
 * No Firebase Storage is involved (it needs a paid plan), so the image lives
 * in the Firestore profile document; prepareLogo keeps it under ~100 KB.
 * Returns the new logo URL.
 */
export async function uploadBusinessLogo(
  userId: string,
  file: File
): Promise<string> {
  const { blob } = await prepareLogo(file);
  const dataUrl = await blobToDataUrl(blob);

  if (userId === "demo-user") {
    setDemoLogo(dataUrl);
  } else {
    await writeLogoUrl(userId, dataUrl);
  }
  return dataUrl;
}

export async function removeBusinessLogo(userId: string): Promise<void> {
  if (userId === "demo-user") {
    setDemoLogo(null);
    return;
  }
  await writeLogoUrl(userId, null);
}

export async function getBusinessProfile(
  userId: string
): Promise<BusinessProfile | null> {
  if (userId === "demo-user") {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(DEMO_PROFILE_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          return {
            id: "default",
            ...parsed,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
        } catch {
          return null;
        }
      }
    }
    return null;
  }

  try {
    const profileRef = doc(db, "users", userId, "businessProfile", "default");
    const snapshot = await getDoc(profileRef);
    if (!snapshot.exists()) return null;

    const data = snapshot.data();
    return {
      id: snapshot.id,
      businessName: data.businessName,
      email: data.email,
      phone: data.phone || null,
      taxId: data.taxId || null,
      address: data.address,
      logoUrl: data.logoUrl || null,
      defaultCurrency: data.defaultCurrency || "GBP",
      defaultPaymentTerms: data.defaultPaymentTerms || 14,
      defaultNotes: data.defaultNotes || null,
      paymentDetails: data.paymentDetails || null,
      invoiceTemplate: data.invoiceTemplate || null,
      createdAt: data.createdAt?.toDate
        ? data.createdAt.toDate().toISOString()
        : new Date().toISOString(),
      updatedAt: data.updatedAt?.toDate
        ? data.updatedAt.toDate().toISOString()
        : new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

export async function getOnboardingStatus(
  userId: string
): Promise<OnboardingState> {
  if (userId === "demo-user") {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(DEMO_ONBOARDING_KEY);
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch {
          return { isCompleted: true, currentStep: "ready" };
        }
      }
    }
    return { isCompleted: true, currentStep: "ready" };
  }

  try {
    const statusRef = doc(db, "users", userId, "onboarding", "status");
    const snapshot = await getDoc(statusRef);
    if (snapshot.exists()) {
      const data = snapshot.data();
      return {
        isCompleted: Boolean(data.isCompleted),
        currentStep: data.currentStep || "ready",
        completedAt: data.completedAt?.toDate
          ? data.completedAt.toDate().toISOString()
          : data.completedAt || null,
      };
    }
    return { isCompleted: false, currentStep: "business_info" };
  } catch {
    return { isCompleted: false, currentStep: "business_info" };
  }
}

export async function completeOnboarding(
  userId: string,
  data: BusinessProfileFormData
): Promise<void> {
  // Validate schema before persisting
  const validated = businessProfileSchema.parse(data);

  if (userId === "demo-user") {
    if (typeof window !== "undefined") {
      localStorage.setItem(DEMO_PROFILE_KEY, JSON.stringify(validated));
      localStorage.setItem(
        DEMO_ONBOARDING_KEY,
        JSON.stringify({
          isCompleted: true,
          currentStep: "ready",
          completedAt: new Date().toISOString(),
        })
      );
    }
    return;
  }

  // 1. Save business profile
  const profileRef = doc(db, "users", userId, "businessProfile", "default");
  await setDoc(
    profileRef,
    {
      ...validated,
      updatedAt: serverTimestamp(),
      createdAt: serverTimestamp(),
    },
    { merge: true }
  );

  // 2. Mark onboarding as completed
  const statusRef = doc(db, "users", userId, "onboarding", "status");
  await setDoc(
    statusRef,
    {
      isCompleted: true,
      currentStep: "ready",
      completedAt: serverTimestamp(),
    },
    { merge: true }
  );
}
