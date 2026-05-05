import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Cookie, X } from "lucide-react";

const STORAGE_KEY = "cf_consent";

type Consent = { ads: boolean; analytics: boolean; ts: number };

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const applyConsent = (c: { ads: boolean; analytics: boolean }) => {
  if (typeof window.gtag === "function") {
    window.gtag("consent", "update", {
      ad_storage: c.ads ? "granted" : "denied",
      ad_user_data: c.ads ? "granted" : "denied",
      ad_personalization: c.ads ? "granted" : "denied",
      analytics_storage: c.analytics ? "granted" : "denied",
    });
  }
};

const CookieConsent = () => {
  const [open, setOpen] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);
  const [ads, setAds] = useState(true);
  const [analytics, setAnalytics] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        setOpen(true);
      } else {
        const c: Consent = JSON.parse(stored);
        applyConsent(c);
      }
    } catch {
      setOpen(true);
    }
  }, []);

  const save = (c: { ads: boolean; analytics: boolean }) => {
    const data: Consent = { ...c, ts: Date.now() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    applyConsent(c);
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[100] p-3 sm:p-4">
      <div className="mx-auto max-w-4xl rounded-xl border border-border bg-background/95 backdrop-blur shadow-2xl">
        <div className="p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <Cookie className="w-5 h-5 mt-1 text-primary shrink-0" />
            <div className="flex-1">
              <h2 className="font-semibold text-foreground mb-1">Sua privacidade</h2>
              <p className="text-sm text-muted-foreground">
                Usamos cookies próprios e de terceiros (Google AdSense e Analytics) para
                exibir anúncios relevantes e analisar o tráfego, conforme a LGPD. Você pode
                aceitar todos, recusar ou personalizar.{" "}
                <Link to="/politica-cookies" className="underline text-primary">
                  Saiba mais
                </Link>
                .
              </p>

              {showPrefs && (
                <div className="mt-4 space-y-3 border-t border-border pt-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Essenciais</p>
                      <p className="text-xs text-muted-foreground">Sempre ativos</p>
                    </div>
                    <Switch checked disabled />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Analíticos</p>
                      <p className="text-xs text-muted-foreground">Estatísticas de uso</p>
                    </div>
                    <Switch checked={analytics} onCheckedChange={setAnalytics} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Anúncios personalizados</p>
                      <p className="text-xs text-muted-foreground">Google AdSense</p>
                    </div>
                    <Switch checked={ads} onCheckedChange={setAds} />
                  </div>
                </div>
              )}
            </div>
            <button
              aria-label="Fechar"
              onClick={() => save({ ads: false, analytics: false })}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-4 flex flex-col sm:flex-row gap-2 sm:justify-end">
            {showPrefs ? (
              <>
                <Button variant="outline" onClick={() => save({ ads: false, analytics: false })}>
                  Recusar todos
                </Button>
                <Button onClick={() => save({ ads, analytics })}>Salvar preferências</Button>
                <Button
                  variant="default"
                  onClick={() => save({ ads: true, analytics: true })}
                >
                  Aceitar todos
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" onClick={() => setShowPrefs(true)}>
                  Personalizar
                </Button>
                <Button variant="outline" onClick={() => save({ ads: false, analytics: false })}>
                  Recusar
                </Button>
                <Button onClick={() => save({ ads: true, analytics: true })}>
                  Aceitar todos
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
