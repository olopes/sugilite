import React from "react"
import ChemicalFormula from "./chemical-formula"
import Gemstone from "./gemstone"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

/**
 * Render a Gemscone editor card
 * 
 * @param {{
 * gemstone: Gemstone, 
 * onSave: (gemstone: Gemstone) => void, 
 * onCancel: () => void
 * }} props 
 * 
 * @returns {React.JSX.Element} 
 */
export default function GemstoneForm({gemstone, onSave, onCancel}) {
  const [name, setName] = React.useState(gemstone.name);
  const [color, setColor] = React.useState(gemstone.color);
  const [chemFormula, setChemFormula] = React.useState(gemstone.chemFormula);
  const [image, setImage] = React.useState(gemstone.image);

  const onSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    onSave({
      id: gemstone.id,
      name,
      chemFormula,
      color,
      image,
    });
    return false;
  };

  /**
   * Autoscale image when the image changes
   * 
   * @param {Event} event 
   */
  const onImageChange = (event) => {
    const input = event.target;
    // TODO prevent rescale the scaled image
    console.log('onImageChange');
    const canvas = document.getElementById('image-preview');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    const url = window.URL || window.webkitURL;
    const src = url.createObjectURL(input.files[0]);

    img.onload = () => {
      console.log('img.onload');
      // get the scale
      const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
      // get the top left position of the image
      const x = (canvas.width / 2) - (img.width / 2) * scale;
      const y = (canvas.height / 2) - (img.height / 2) * scale;
      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
      url.revokeObjectURL(src);
      const imageData = canvas.toDataURL("image/jpeg", 0.7);
      setImage(imageData);
      img.onload = null;
    };
    img.src = src;

  };

  const onOpenImage = () =>document.getElementById('image').click();

  return (
    <React.Fragment>
    <div className="gemstone-form visible">
      <form onSubmit={onSubmit}>
        <div className="name"><label htmlFor="name">Name:</label><input id="name" name="name" type="text" placeholder="Type the gemstone name" value={name} onChange={ev => setName(ev.target.value)} /></div>
        <div className="color"><label htmlFor="color">Color:</label><input id="color" name="color" type="text" placeholder="Type the gemstone color" value={color} onChange={ev => setColor(ev.target.value)} /></div>
        <div className="chem-formula"><label htmlFor="chemFormula">Chemical Formula:</label><input id="chemFormula" placeholder="Type the gemstone chemical formula" name="chemFormula" type="text" value={chemFormula} onChange={ev => setChemFormula(ev.target.value)} /></div>
        <div className="formula-preview"><ChemicalFormula formula={chemFormula} /></div>

        <div className="image">
          <div className="image-manipulation"><input id="image" name="image" type="file" accept="image/*" placeholder="Choose a gemstone picture" onChange={onImageChange}/><canvas id="image-preview" width="128" height="128"></canvas></div>
          <div className="image-preview" title="Click to change image" onClick={onOpenImage}>{image ? (<img src={image} />) : (<FontAwesomeIcon icon="camera" style={{width:128, height: 128}} />) }</div>
        </div>


        <div className="buttons"><button type="submit">Save</button><button type="button" onClick={onCancel}>Cancel</button></div>
      </form>
    </div>
    </React.Fragment>
  );

}

