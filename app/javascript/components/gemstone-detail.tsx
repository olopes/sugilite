import * as React from "react";
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
import GemstoneForm from "./gemstone-form";

/**
 * Renders a Gemstone card
 * 
 * @param props 
 * 
 */
export default function GemstoneDetail({ gemstone, onModify, onDelete }: { gemstone: Gemstone, onModify: (gemstone: Gemstone) => void, onDelete: (gemstone: Gemstone) => void }) {

  const clickDelete = React.useCallback((event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    onDelete(gemstone);
  }, [gemstone, onDelete]);


  const clickModify = React.useCallback((event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    onModify(gemstone);
  }, [gemstone, onModify]);


  return (<Card className="w-64">
    <CardHeader>
      <CardTitle>{gemstone.name}</CardTitle>
    </CardHeader>
    <CardContent className="flex justify-center">
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="drop-shadow-md border rounded-xl w-40 h-40 transition-all overflow-hidden mb-4 hover:mb-0 hover:w-44 hover:h-44 hover:drop-shadow-xl">
            {gemstone.image ? (<img src={gemstone.image} className="w-full h-full" />) : (<CameraOff className="w-full h-full" />)}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <div>Color: {gemstone.color}</div>
          <div><ChemicalFormula formula={gemstone.chemFormula} /></div>
        </TooltipContent>
      </Tooltip>
    </CardContent>
    <CardFooter className="flex justify-end gap-2">
      <EdittGemstoneDialog gemstone={gemstone} />
      <Tooltip>
        <TooltipTrigger asChild>
          <Button size={"icon"} variant={"destructive"} onClick={clickDelete}>
            <Trash2 />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Delete gemstone</TooltipContent>
      </Tooltip>
    </CardFooter>
  </Card>);
}


const EdittGemstoneDialog = ({ gemstone }: { gemstone: Gemstone }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"icon"} variant={"default"}>
          <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Gemstone</DialogTitle>
          <DialogDescription>
            Change gemstone properties.
          </DialogDescription>
        </DialogHeader>

        <div className="flex space-x-2 w-64">
          {/*<GemstoneForm gemstone={gemstone} onCancel={() => { }} onSave={() => { }} />*/}
      <div> TOMA TOMA TOMA TOMA TOMA TOMA TOMA </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )

}