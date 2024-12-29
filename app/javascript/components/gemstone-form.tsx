import { ChangeEvent, useCallback, useRef } from "react";
import ChemicalFormula from "@/components/chemical-formula";
import { Gemstone } from "@/components/gemstone";
import { Image as ImageIcon } from "lucide-react";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const formSchema = z.object({
  name: z.string().min(2),
  chemFormula: z.string(),
  color: z.string(),
  image: z.string().nullable().optional(),
});

/**
 * Render a Gemscone editor card
 *
 * @param {{
 * gemstone: Gemstone,
 * onSave: (gemstone: Gemstone) => void,
 * onCancel: () => void
 * }} props
 *
 */
export default function GemstoneForm({
  gemstone,
  onSave,
}: {
  gemstone: Gemstone;
  onSave: (gemstone: Gemstone) => Promise<Gemstone>;
}) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...gemstone,
    },
  });

  // 2. Define a submit handler.
  const onSubmit = useCallback(
    async (values: z.infer<typeof formSchema>) => {
      // Do something with the form values.
      // ✅ This will be type-safe and validated.
      console.log("Submitting", values);
      const newGem = await onSave({ ...values, id: gemstone.id });
      console.log("Saved!", newGem);
    },
    [gemstone.id]
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-row justify-stretch gap-4 items-start">
          <div className="flex-1 flex flex-col space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name:</FormLabel>
                  <FormControl>
                    <Input placeholder="Type the gemstone name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color:</FormLabel>
                  <FormControl>
                    <Input placeholder="Type the color names" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="chemFormula"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chemical Formula:</FormLabel>
                  <FormControl>
                    <Input placeholder="Type the chemical formula" {...field} />
                  </FormControl>
                  <FormDescription>
                    <ChemicalFormula formula={field.value} />
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ImagePicker {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <DialogFooter className="gap-4">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
          <Button type={"submit"}>Save</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}

const ImagePicker = ({
  value,
  onChange,
}: {
  value: string | null | undefined;
  onChange: (v: string | null | undefined) => void;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);

  /**
   * Autoscale image when the image changes
   *
   * @param {Event} event
   */
  const onImageChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const input = event.target;
      // TODO prevent rescale the scaled image
      console.log("onImageChange");
      // TODO check nulls
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext("2d")!;
      const img = new Image();
      const url = window.URL || window.webkitURL;
      const src = url.createObjectURL(input.files![0]);

      img.onload = () => {
        console.log("img.onload");
        // get the scale
        const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
        // get the top left position of the image
        const x = canvas.width / 2 - (img.width / 2) * scale;
        const y = canvas.height / 2 - (img.height / 2) * scale;
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
        url.revokeObjectURL(src);
        const imageData = canvas.toDataURL("image/jpeg", 0.7);
        onChange(imageData);
        img.onload = null;
      };
      img.src = src;
    },
    [onChange]
  );

  const onOpenImage = () => imageRef.current?.click();

  return (
    <div className="flex justify-center flex-1 items-center">
      <div className="hidden">
        <input
          ref={imageRef}
          id="image"
          name="image"
          type="file"
          accept="image/*"
          placeholder="Choose a gemstone picture"
          onChange={onImageChange}
        />
        <canvas ref={canvasRef} id="image-preview" width="128" height="128"></canvas>
      </div>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="border border-transparent cursor-pointer rounded-xl w-40 h-40 hover:opacity-30 overflow-hidden" onClick={onOpenImage}>
            {value ? <img src={value} className="w-full h-full" /> : <ImageIcon className="w-full h-full" />}
          </div>
        </TooltipTrigger>
        <TooltipContent>Click to upload a new picture.</TooltipContent>
      </Tooltip>
    </div>
  );
};
