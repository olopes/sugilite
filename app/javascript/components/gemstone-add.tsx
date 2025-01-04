import { useCallback, useEffect, useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useGemstoneActions } from "@/components/gemstone-provider";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import GemstoneForm from "@/components/gemstone-form";
import { Gemstone } from "@/components/gemstone";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

/**
 * Open dialog to add new gemstone
 * @param param0
 * @returns
 */
export function AddNewGemstone() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const { addGemstone } = useGemstoneActions();

  useEffect(() => {
    const handler = (ev: KeyboardEvent) => {
      if (ev.key === "a" && ev.ctrlKey) {
        ev.preventDefault();
        setOpen(true);
      }
    };
    document.addEventListener("keydown", handler);
    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, []);

  const onSave = useCallback(
    async (gemData: Gemstone) => {
      const gemstone = await addGemstone(gemData);
      setOpen(false);
      return gemstone;
    },
    [addGemstone]
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button>{t("add gemstone")}</Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <div>{t("add gemstone tooltip")}</div>
        </TooltipContent>
      </Tooltip>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("add gemstone title")}</DialogTitle>
          <DialogDescription>{t("add gemstone description")}</DialogDescription>
        </DialogHeader>
        <GemstoneForm
          gemstone={{
            name: "",
            color: "",
            chemFormula: "",
            createdAt: new Date(),
            updatedAt: new Date(),
          }}
          onSave={onSave}
        />
      </DialogContent>
    </Dialog>
  );
}
