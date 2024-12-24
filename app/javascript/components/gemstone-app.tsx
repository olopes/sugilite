import React from "react"
import { Gemstone } from "./gemstone"
import GemstoneForm from "./gemstone-form"
import GemstoneList from "./gemstone-list"
import GemstoneService from "./gemstone-service"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const emptyPromise = () => new Promise((resolve, reject) => resolve(true));

const Mode = Object.freeze({
  LIST: Symbol("list"),
  MODIFY: Symbol("modify"),
  CREATE: Symbol("create"),
  LOADING: Symbol("loading"),
});

const NEW_GEMSTONE = {
  id: -1,
  name: '',
  chemFormula: '',
  color: '',
}

const gemstoneService = new GemstoneService();

export default function GemstoneApp() {
  const [gemstones, setGemstones] = React.useState<Gemstone[]>([]);
  const [gemstone, setGemstone] = React.useState<Gemstone>();
  const [quicksearch, setQuicksearch] = React.useState('');
  const [mode, setMode] = React.useState(Mode.LOADING);

  const onCancel = () => {
    setMode(Mode.LIST);
  };

  const onSaveNew = (gemstone: Gemstone) => {
    console.log("APP: Save new gemstone", gemstone.name);
    setMode(Mode.LOADING);
    gemstoneService.createGemstone(gemstone)
      .then(newGem => setGemstones([...gemstones, newGem]))
      .finally(() => setMode(Mode.LIST));
  }

  const onSaveExisting = (gemstone: Gemstone) => {
    console.log("APP: Save existing gemstone", gemstone.name);
    setMode(Mode.LOADING);
    gemstoneService.updateGemstone(gemstone)
      .then(updatedGemstone => gemstones.map((g) => g.id == updatedGemstone.id ? updatedGemstone : g))  // replace existing instance
      .then(gemstones => setGemstones([...gemstones]))  // change list (re-render)
      .finally(() => setMode(Mode.LIST));   // show lst
  }

  const onDelete = (gemstone: Gemstone) => {
    if (confirm(`Do you really want to delete "${gemstone.name}" (${gemstone.id}) ?`)) {
      gemstoneService.deleteGemstone(gemstone)
        .then((success) => success && setGemstones(gemstones.filter(g => g.id !== gemstone.id)));
    }
  };

  const onModify = (gemstone: Gemstone) => {
    console.log("APP: Modify gemstone", gemstone.name);
    setGemstone(gemstone);
    setMode(Mode.MODIFY);
  };

  const onCreate = () => {
    console.log("APP: Add gemstone");
    setMode(Mode.CREATE);
  };


  React.useEffect(() => {
    console.log("APP: Loading gemstones", quicksearch);
    gemstoneService.loadGemstones(quicksearch).then(setGemstones).finally(() => setMode(Mode.LIST));
  }, [quicksearch]);





  if (mode === Mode.LOADING) {
    return (
      <React.Fragment>
        <div className="loader-spin"><FontAwesomeIcon icon='spinner' size="5x" spin /></div>
      </React.Fragment>
    );
  }

  else if (mode === Mode.CREATE) {
    return (
      <React.Fragment>
        <GemstoneForm gemstone={{ ...NEW_GEMSTONE }} onSave={onSaveNew} onCancel={onCancel}></GemstoneForm>
      </React.Fragment>
    );
  }

  else if (mode === Mode.MODIFY && gemstone) {
    return (
      <React.Fragment>
        <GemstoneForm gemstone={gemstone} onSave={onSaveExisting} onCancel={onCancel}></GemstoneForm>
      </React.Fragment>
    );
  }

  else {
    return (
      <React.Fragment>
        <div className="filter">
          <form onSubmit={() => false}>
            <input id="quicksearch" name="quicksearch" type="text" placeholder="Quick search" value={quicksearch} onChange={ev => setQuicksearch(ev.target.value)} /><FontAwesomeIcon icon="search" title="Search" />
          </form>
        </div>
        <GemstoneList gemstones={gemstones} onDelete={onDelete} onModify={onModify} onCreate={onCreate}></GemstoneList>
      </React.Fragment>
    );
  }

}
