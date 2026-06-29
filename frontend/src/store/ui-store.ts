"use client";

import { create } from "zustand";

type UiState = {
  activeCategory: string;
  assistantQuestion: string;
  setActiveCategory: (category: string) => void;
  setAssistantQuestion: (question: string) => void;
};

export const useUiStore = create<UiState>((set) => ({
  activeCategory: "all",
  assistantQuestion: "Tell me about Tata Power internship",
  setActiveCategory: (activeCategory) => set({ activeCategory }),
  setAssistantQuestion: (assistantQuestion) => set({ assistantQuestion }),
}));
