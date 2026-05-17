import { ReactElement } from "react";
import { usePageVisibility } from "../hooks/usePageVisibility";
import ComingSoon from "./ComingSoon";

/**
 * Wrapper für jede Page.
 * 
 * In jeder Page-Komponente kann oben ein default-Wert gesetzt werden (true/false).
 * Steht in der config.json `page_visibility[pageKey]` auf `false`, wird Coming Soon angezeigt.
 * Steht es auf `true` oder ist nicht definiert (und default = true), wird die Page normal angezeigt.
 */
export default function PageGate({
  pageKey,
  pageName,
  defaultVisible = true,
  children,
}: {
  pageKey: string;
  pageName: string;
  defaultVisible?: boolean;
  children: ReactElement;
}) {
  const { visible, loading } = usePageVisibility(pageKey, defaultVisible);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!visible) {
    return <ComingSoon pageName={pageName} />;
  }

  return children;
}
