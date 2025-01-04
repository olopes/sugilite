import { Gemstone } from "@/components/gemstone";
import { Card, CardContent } from "@/components/ui/card";
import ChemicalFormula from "@/components/chemical-formula";
import { CameraOff } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import GemstoneForm from "@/components/gemstone-form";
import { useCallback, useState } from "react";
import { useGemstoneActions } from "@/components/gemstone-provider";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

/**
 * Renders a Gemstone card
 *
 * @param props
 *
 */
export default function GemstoneCard({ gemstone }: { gemstone: Gemstone }) {
  const { t } = useTranslation();
  const { deleteGemstone, updateGemstone } = useGemstoneActions();
  const [open, setOpen] = useState(false);

  const onSave = useCallback(
    async (gemdata: Gemstone) => {
      await updateGemstone(gemdata);
      setOpen(false);
      return gemdata;
    },
    [updateGemstone]
  );

  const onDelete = useCallback(
    (gemstone: Gemstone) =>
      deleteGemstone(gemstone).then((gem) => {
        setOpen(false);
        return gem;
      }),
    []
  );

  return (
    <Card>
      <CardContent className="p-0">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <div className={cn("space-y-3 cursor-pointer")}>
              <div className="overflow-hidden rounded-md">
                {gemstone.image ? (
                  <img
                    src={gemstone.image}
                    alt={gemstone.name}
                    className={"h-40 w-40 object-cover transition-all hover:scale-105 aspect-square"}
                  />
                ) : (
                  <CameraOff
                    aria-label={gemstone.name}
                    className={"h-40 w-40 object-cover transition-all hover:scale-105 aspect-square"}
                  />
                )}
              </div>

              <div className="space-y-1 text-sm truncate max-w-40 p-2 pt-0">
                <h2 className="font-medium leading-none">{gemstone.name}</h2>
                <p className="text-xs text-muted-foreground truncate">
                  <span className="font-medium">{t("gemstone color")}:</span> {gemstone.color}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  <span className="font-medium">{t("gemstone formula")}:</span>{" "}
                  <ChemicalFormula single formula={gemstone.chemFormula} />
                </p>
              </div>
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex justify-between items-center">{t("edit gemstone title")}</DialogTitle>
              <DialogDescription>{t("edit gemstone description")}</DialogDescription>
            </DialogHeader>
            <GemstoneForm gemstone={gemstone} onSave={onSave} onDelete={onDelete} />
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
