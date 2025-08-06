import { create } from "zustand";
import { axiosInstance } from "@/lib/axios";

interface PremiumStatus {
  isPremium: boolean;
  premiumStartDate: string | null;
  premiumEndDate: string | null;
  paymentsCount: number;
}

interface PremiumStore {
  premiumStatus: PremiumStatus;
  isLoading: boolean;
  error: string | null;
  
  fetchPremiumStatus: () => Promise<void>;
  updatePremiumStatus: (status: Partial<PremiumStatus>) => void;
  reset: () => void;
}

const initialPremiumStatus: PremiumStatus = {
  isPremium: false,
  premiumStartDate: null,
  premiumEndDate: null,
  paymentsCount: 0,
};

export const usePremiumStore = create<PremiumStore>((set, get) => ({
  premiumStatus: initialPremiumStatus,
  isLoading: false,
  error: null,

  fetchPremiumStatus: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/payments/premium-status");
      set({ 
        premiumStatus: {
          isPremium: response.data.isPremium,
          premiumStartDate: response.data.premiumStartDate,
          premiumEndDate: response.data.premiumEndDate,
          paymentsCount: response.data.paymentsCount,
        },
        isLoading: false 
      });
    } catch (error: any) {
      console.error("Error fetching premium status:", error);
      set({ 
        error: error.response?.data?.error || "Failed to fetch premium status",
        isLoading: false 
      });
    }
  },

  updatePremiumStatus: (status: Partial<PremiumStatus>) => {
    const currentStatus = get().premiumStatus;
    set({
      premiumStatus: { ...currentStatus, ...status }
    });
  },

  reset: () => {
    set({
      premiumStatus: initialPremiumStatus,
      isLoading: false,
      error: null,
    });
  },
}));