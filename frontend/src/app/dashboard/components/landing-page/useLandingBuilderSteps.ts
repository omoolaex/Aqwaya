import { useState } from "react";

export function useLandingBuilderSteps(maxStep = 5) {
  const [currentStep, setCurrentStep] = useState(1);

  const goToNext = () => setCurrentStep(s => Math.min(maxStep, s + 1));
  const goToPrev = () => setCurrentStep(s => Math.max(1, s - 1));
  const goTo = (step: number) => setCurrentStep(Math.max(1, Math.min(maxStep, step)));

  return { currentStep, setCurrentStep, goToNext, goToPrev, goTo };
}
