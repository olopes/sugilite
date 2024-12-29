import { useCallback, useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useGemstoneActions } from "@/components/gemstone-provider";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import GemstoneForm from "@/components/gemstone-form";
import { Gemstone } from "@/components/gemstone";
import { Button } from "@/components/ui/button";

/**
 * Open dialog to add new gemstone
 * @param param0
 * @returns
 */
export function AddNewGemstone() {
  const [open, setOpen] = useState(false);
  const { addGemstone } = useGemstoneActions();

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
            <Button>Add Gemstone</Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <div>Click to add a new Gemstone</div>
        </TooltipContent>
      </Tooltip>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Gemstone</DialogTitle>
          <DialogDescription>Enter the gemstone details.</DialogDescription>
        </DialogHeader>
        <GemstoneForm
          gemstone={{
            name: "",
            color: "",
            chemFormula: "",
          }}
          onSave={onSave}
        />
      </DialogContent>
    </Dialog>
  );
}
