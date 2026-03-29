import { useState, useEffect } from 'react';
import type { Resource } from '../data/resources';

export function useLocalStorage() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [userResources, setUserResources] = useState<Resource[]>([]);
  const [hasConsented, setHasConsented] = useState<boolean | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const consent = localStorage.getItem('crf_consent');
    if (consent === 'true') setHasConsented(true);
    else if (consent === 'false') setHasConsented(false);
    else setHasConsented(null);

    if (consent === 'true') {
      const saved = localStorage.getItem('crf_favorites');
      if (saved) setFavorites(JSON.parse(saved));

      const savedResources = localStorage.getItem('crf_user_resources');
      if (savedResources) setUserResources(JSON.parse(savedResources));
    }
  }, []);

  const handleConsent = (allow: boolean) => {
    setHasConsented(allow);
    localStorage.setItem('crf_consent', String(allow));
    if (!allow) {
      localStorage.removeItem('crf_favorites');
      localStorage.removeItem('crf_analytics');
      localStorage.removeItem('crf_reports');
      localStorage.removeItem('crf_user_resources');
      setFavorites([]);
      setUserResources([]);
    }
  };

  const saveFavorites = (favs: string[]) => {
    setFavorites(favs);
    localStorage.setItem('crf_favorites', JSON.stringify(favs));
  };

  const addUserResource = (res: Resource) => {
    const updated = [...userResources, res];
    setUserResources(updated);
    localStorage.setItem('crf_user_resources', JSON.stringify(updated));
  };

  const clearAllData = () => {
    if (confirm('Delete ALL local data (Favorites, Stats, Added Resources)?')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  const trackEvent = (metric: 'searches' | 'views' | 'favorites' | 'emergency') => {
    if (!hasConsented) return;
    const stats = JSON.parse(localStorage.getItem('crf_analytics') || '{"searches":0,"views":0,"favorites":0,"emergency":0}');
    stats[metric]++;
    localStorage.setItem('crf_analytics', JSON.stringify(stats));
  };

  const saveReport = (resourceName: string, issue: string) => {
    if (hasConsented) {
      const reports = JSON.parse(localStorage.getItem('crf_reports') || '[]');
      reports.push({ resource: resourceName, issue, timestamp: new Date().toISOString() });
      localStorage.setItem('crf_reports', JSON.stringify(reports));
    }
  };

  return {
    favorites,
    userResources,
    hasConsented,
    handleConsent,
    saveFavorites,
    addUserResource,
    clearAllData,
    trackEvent,
    saveReport,
  };
}
