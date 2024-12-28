import { ChangeEvent, FormEvent, useCallback, useRef, useState } from "react";
import ChemicalFormula from "@/components/chemical-formula";
import { Gemstone } from "@/components/gemstone";
import { Camera, Image as ImageIcon } from "lucide-react";
import { DialogClose, DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";

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
  const [name, setName] = useState(gemstone.name);
  const [color, setColor] = useState(gemstone.color);
  const [chemFormula, setChemFormula] = useState(gemstone.chemFormula);
  const [image, setImage] = useState(gemstone.image);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);

  const onSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      event.stopPropagation();
      onSave({
        id: gemstone.id,
        name,
        chemFormula,
        color,
        image,
      });
    },
    [gemstone.id]
  );

  /**
   * Autoscale image when the image changes
   *
   * @param {Event} event
   */
  const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
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
      setImage(imageData);
      img.onload = null;
    };
    img.src = src;
  };

  const onOpenImage = () => imageRef.current?.click();

  return (
    <div className="flex space-x-2 w-64">
      <form onSubmit={onSubmit}>
        <div className="name">
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Type the gemstone name"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
        </div>
        <div className="color">
          <label htmlFor="color">Color:</label>
          <input
            id="color"
            name="color"
            type="text"
            placeholder="Type the gemstone color"
            value={color}
            onChange={(ev) => setColor(ev.target.value)}
          />
        </div>
        <div className="chem-formula">
          <label htmlFor="chemFormula">Chemical Formula:</label>
          <input
            id="chemFormula"
            placeholder="Type the gemstone chemical formula"
            name="chemFormula"
            type="text"
            value={chemFormula}
            onChange={(ev) => setChemFormula(ev.target.value)}
          />
        </div>
        <div className="formula-preview">
          <ChemicalFormula formula={chemFormula} />
        </div>

        <div className="image">
          <div className="image-manipulation">
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
          <div className="image-preview" title="Click to change image" onClick={onOpenImage}>
            {image ? <img src={image} /> : <ImageIcon className="w-40 h-40" />}
          </div>
        </div>

        <DialogFooter className="sm:justify-start">
          <Button type={"submit"}>Save</Button>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </div>
  );
}
