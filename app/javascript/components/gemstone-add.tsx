import { useCallback, MouseEvent, useState } from "react";
import { SquarePlus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { PictureBox } from "@/components/picture-box";
import { useGemstoneActions } from "./gemstone-provider";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import GemstoneForm from "./gemstone-form";
import { Gemstone } from "./gemstone";

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
    <Card className="w-64">
      <CardHeader>
        <CardTitle>Add new Gemstone</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center">
        <Dialog open={open} onOpenChange={setOpen}>
          <Tooltip>
            <TooltipTrigger asChild>
              <DialogTrigger asChild>
                <PictureBox>
                  <SquarePlus className="w-full h-full text-muted-foreground" />
                </PictureBox>
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
      </CardContent>
    </Card>
  );
}
