import { useEffect, useState } from 'react';
import type { SectionId } from '../types';

export function useSectionProgress(sectionIds: SectionId[]) {
  const [activeSection, setActiveSection] = useState<SectionId>(sectionIds[0] || 'section-1');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const observers: IntersectionObserver[] = [];
    const elements: HTMLElement[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      elements.push(el);

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
              // Update html dataset for dynamic scrollbar styling & background shifts
              document.documentElement.setAttribute('data-active-section', id);
            }
          });
        },
        {
          root: null,
          threshold: 0.35, // Trigger when 35% of the section is visible
          rootMargin: '-10% 0px -20% 0px'
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, [sectionIds]);

  return activeSection;
}
