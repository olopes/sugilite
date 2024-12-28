import { Gemstone } from "@/components/gemstone";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import ChemicalFormula from "@/components/chemical-formula";
import { Button } from "@/components/ui/button";
import { CameraOff, Pencil, Trash2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import GemstoneForm from "@/components/gemstone-form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { MouseEvent, useCallback, useState } from "react";
import { PictureBox } from "@/components/picture-box";
import { useGemstoneActions } from "./gemstone-provider";
import { cn } from "@/lib/utils";

/**
 * Renders a Gemstone card
 *
 * @param props
 *
 */
export default function GemstoneDetail({ gemstone }: { gemstone: Gemstone }) {
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

  const clickDelete = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      event.preventDefault();
      deleteGemstone(gemstone);
    },
    [gemstone]
  );

  return (
    <Card className="w-64 group/gemcard">
      <CardHeader>
        <CardTitle className="flex flex-row justify-between items-center">
          {gemstone.name}
          <DeleteGemstoneAlert gemstone={gemstone} clickDelete={clickDelete} className="invisible group-hover/gemcard:visible"/>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center">
        <Dialog open={open} onOpenChange={setOpen}>
          <Tooltip>
            <TooltipTrigger asChild>
              <DialogTrigger asChild>
                <PictureBox>
                  {gemstone.image ? (
                    <img src={gemstone.image} className="w-full h-full" />
                  ) : (
                    <CameraOff className="w-full h-full" />
                  )}
                </PictureBox>
              </DialogTrigger>
            </TooltipTrigger>
            <TooltipContent className="min-w-48">
              <div className="text-center font-medium italic">Click to edit</div>
              <div className="font-medium">Color:</div>
              <div className="ml-2">{gemstone.color}</div>
              <div className="font-medium">Formula:</div>
              <ChemicalFormula className="ml-2" formula={gemstone.chemFormula} />
            </TooltipContent>
          </Tooltip>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Gemstone</DialogTitle>
              <DialogDescription>Change gemstone details.</DialogDescription>
            </DialogHeader>
            <GemstoneForm gemstone={gemstone} onSave={onSave} />
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}

const DeleteGemstoneAlert = ({
  gemstone,
  className,
  clickDelete,
}: {
  gemstone: Gemstone;
  className?: string;
  clickDelete: (event: MouseEvent<HTMLElement>) => void;
}) => {
  return (
    <AlertDialog>
      <Tooltip>
        <TooltipTrigger asChild>
          <AlertDialogTrigger asChild>
            <Button
              size={"icon"}
              variant={"ghost"}
              className={cn("text-muted-foreground hover:text-destructive", className)}
            >
              <Trash2 />
            </Button>
          </AlertDialogTrigger>
        </TooltipTrigger>
        <TooltipContent>Delete gemstone</TooltipContent>
      </Tooltip>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>You are about to delete the gemstone "{gemstone.name}"!</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your gemstone and remove your data from our
            servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={clickDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
