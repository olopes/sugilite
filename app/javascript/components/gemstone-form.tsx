import { ChangeEvent, MouseEvent, useCallback, useRef } from "react";
import ChemicalFormula from "@/components/chemical-formula";
import { Gemstone } from "@/components/gemstone";
import { Image as ImageIcon, Trash2 } from "lucide-react";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
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
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

const formSchema = z.object({
  name: z.string().min(2),
  chemFormula: z.string(),
  color: z.string(),
  image: z.string().nullable().optional(),
});

/**
 * Render a Gemscone editor card
 *
 */
export default function GemstoneForm({
  gemstone,
  onSave,
  onDelete,
}: {
  gemstone: Gemstone;
  onSave: (gemstone: Gemstone) => Promise<Gemstone>;
  onDelete?: (gemstone: Gemstone) => Promise<Gemstone>;
}) {
  const { t } = useTranslation();

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
      await onSave({ ...values, id: gemstone.id } as Gemstone);
    },
    [gemstone.id]
  );

  const clickDelete = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      event.preventDefault();
      onDelete?.(gemstone);
    },
    [gemstone, onDelete]
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
                  <FormLabel>{t("form name")}:</FormLabel>
                  <FormControl>
                    <Input placeholder={t("form name placeholder")} {...field} />
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
                  <FormLabel>{t("form color")}:</FormLabel>
                  <FormControl>
                    <Input placeholder={t("form color placeholder")} {...field} />
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
                  <FormLabel>{t("form formula")}:</FormLabel>
                  <FormControl>
                    <Input placeholder={t("form formula placeholder")} {...field} />
                  </FormControl>
                  <FormDescription>
                    <ChemicalFormula formula={field.value} label={t("form formula preview")} />
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

        <DialogFooter className="gap-2">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              {(t("form cancel"))}
            </Button>
          </DialogClose>
          <Button type={"submit"}>{(t("form save"))}</Button>
          {onDelete && (
            <div className="absolute left-3">
              <DeleteGemstoneAlert gemstone={gemstone} clickDelete={clickDelete} />
            </div>
          )}
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
  const {t} = useTranslation();
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
      // TODO check nulls
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext("2d")!;
      const img = new Image();
      const url = window.URL || window.webkitURL;
      const src = url.createObjectURL(input.files![0]);

      img.onload = () => {
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
          placeholder={(t("form picture placeholder"))}
          onChange={onImageChange}
        />
        <canvas ref={canvasRef} id="image-preview" width="128" height="128"></canvas>
      </div>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className="border border-transparent cursor-pointer rounded-xl w-40 h-40 hover:opacity-30 overflow-hidden"
            onClick={onOpenImage}
          >
            {value ? <img src={value} className="w-full h-full" /> : <ImageIcon className="w-full h-full" />}
          </div>
        </TooltipTrigger>
        <TooltipContent>{(t("form picture tooltip"))}</TooltipContent>
      </Tooltip>
    </div>
  );
};

const DeleteGemstoneAlert = ({
  gemstone,
  className,
  clickDelete,
}: {
  gemstone: Gemstone;
  className?: string;
  clickDelete: (event: MouseEvent<HTMLElement>) => void;
}) => {
  const {t} = useTranslation();

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
        <TooltipContent>{(t("form delete"))}</TooltipContent>
      </Tooltip>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{(t("delete gemstone title", {name: gemstone.name}))}</AlertDialogTitle>
          <AlertDialogDescription>{(t("delete gemstone description"))}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{(t("form cancel"))}</AlertDialogCancel>
          <AlertDialogAction onClick={clickDelete}>{(t("form continue"))}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
