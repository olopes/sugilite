import { useCallback, useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useGemstoneActions } from "./gemstone-provider";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import GemstoneForm from "./gemstone-form";
import { Gemstone } from "./gemstone";
import { Button } from "./ui/button";

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
