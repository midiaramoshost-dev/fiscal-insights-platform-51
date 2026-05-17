import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { Helmet } from "react-helmet-async";

export interface Crumb {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: Crumb[];
}

const BASE = "https://fiscal-insights-platform-51.lovable.app";

const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  const list = [{ label: "Início", href: "/" }, ...items];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: list.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: c.href ? `${BASE}${c.href}` : undefined,
    })),
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <nav aria-label="Breadcrumb" className="text-xs md:text-sm text-slate-500 mb-4">
        <ol className="flex flex-wrap items-center gap-1">
          {list.map((c, i) => {
            const isLast = i === list.length - 1;
            return (
              <li key={i} className="flex items-center gap-1">
                {i === 0 && <Home className="w-3 h-3" />}
                {c.href && !isLast ? (
                  <Link to={c.href} className="hover:text-blue-700 hover:underline">
                    {c.label}
                  </Link>
                ) : (
                  <span className={isLast ? "text-slate-700 font-medium" : ""}>{c.label}</span>
                )}
                {!isLast && <ChevronRight className="w-3 h-3 opacity-60" />}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
};

export default Breadcrumbs;
