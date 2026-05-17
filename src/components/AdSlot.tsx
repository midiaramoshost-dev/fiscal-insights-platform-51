import { useEffect, useRef } from "react";

interface AdSlotProps {
  slot: string;
  format?: "auto" | "fluid" | "rectangle" | "horizontal" | "vertical";
  layout?: string;
  responsive?: boolean;
  className?: string;
  label?: string;
}

/**
 * Espaço reservado para anúncio Google AdSense, com fallback visual e
 * label "Publicidade" para conformidade. O script global do AdSense
 * é carregado no index.html.
 */
const AdSlot = ({
  slot,
  format = "auto",
  layout,
  responsive = true,
  className = "",
  label = "Publicidade",
}: AdSlotProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    try {
      // @ts-expect-error - adsbygoogle injetado pelo script externo
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch (e) {
      // ignora em dev
    }
  }, []);

  return (
    <div className={`my-6 ${className}`} aria-label="Bloco de anúncio">
      <p className="text-[10px] uppercase tracking-widest text-slate-400 text-center mb-1">
        {label}
      </p>
      <div
        ref={ref}
        className="bg-slate-50 border border-dashed border-slate-200 rounded-md overflow-hidden flex items-center justify-center min-h-[90px]"
      >
        <ins
          className="adsbygoogle"
          style={{ display: "block", width: "100%" }}
          data-ad-client="ca-pub-2147917938389486"
          data-ad-slot={slot}
          data-ad-format={format}
          data-ad-layout={layout}
          data-full-width-responsive={responsive ? "true" : "false"}
        />
      </div>
    </div>
  );
};

export default AdSlot;
