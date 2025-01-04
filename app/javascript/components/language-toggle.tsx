import { Globe, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguageContext, useTranslation } from "@/components/i18n-provider";
import i18n from "@/lib/i18n";
import { useEffect, useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function LanguageToggle() {
  const { t } = useTranslation();
  const { availableLanguages, language, setLanguage } = useLanguageContext();
  const [effectiveLanguage, setEffectiveLanguage] = useState(i18n.resolvedLanguage);

  useEffect(() => {
    const handler = (lng: string) => {
      setEffectiveLanguage(lng);
    };
    i18n.on("languageChanged", handler);

    return () => {
      i18n.off("languageChanged", handler);
    };
  }, []);

  if (availableLanguages === null) {
    return (
      <Button variant="outline" size="icon" disabled>
        <LoaderCircle className="h-[1.2rem] w-[1.2rem] animate-spin text-muted-foreground" />
      </Button>
    );
  }
  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="group/btlang">
              <Globe className="h-[1.2rem] w-[1.2rem] text-muted-foreground group-hover/btlang:rotate-180 transition" />
              <span className="sr-only">{t("toggle language")}</span>
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <div>{t("toggle language tooltip", { current: availableLanguages[effectiveLanguage!] })}</div>
        </TooltipContent>
      </Tooltip>
      <DropdownMenuContent align="end">
        {Object.entries(availableLanguages).map(([lng, description]) => (
          <DropdownMenuCheckboxItem key={lng} checked={language === lng} onClick={() => setLanguage(lng)}>
            {description}
          </DropdownMenuCheckboxItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem checked={language === "system"} onClick={() => setLanguage("system")}>
          {i18n.t("system language")}
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
