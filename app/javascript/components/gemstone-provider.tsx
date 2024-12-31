import { createContext, useContext, ReactNode, useReducer, useState, useEffect } from "react";
import GemstoneService from "@/components/gemstone-service";
import { Gemstone } from "@/components/gemstone";

type DispatchAction =
  | { type: "prepare" }
  | { type: "load"; gemstones: Gemstone[] }
  | { type: "add" | "delete" | "update"; gemstone: Gemstone };

type GemstoneProviderProps = {
  children: ReactNode;
};

type GemstoneProviderState = {
  loading: boolean;
  gemstones: Gemstone[];
};
type GemstoneActionsProviderState = {
  refresh: () => Promise<Gemstone[]>;
  searchGemstones: (search: string) => Promise<Gemstone[]>;
  addGemstone: (gemstone: Gemstone) => Promise<Gemstone>;
  deleteGemstone: (gemstone: Gemstone) => Promise<Gemstone>;
  updateGemstone: (gemstone: Gemstone) => Promise<Gemstone>;
};

const service = new GemstoneService();
const initialState: GemstoneProviderState = {
  loading: true,
  gemstones: [],
};
const initialActionsState: GemstoneActionsProviderState = {
  refresh: async () => [],
  searchGemstones: async () => [],
  addGemstone: async () => {
    throw new Error("not implemented");
  },
  deleteGemstone: async () => {
    throw new Error("not implemented");
  },
  updateGemstone: async () => {
    throw new Error("not implemented");
  },
};

const GemstoneProviderContext = createContext<GemstoneProviderState>(initialState);
const GemstoneActionsContext = createContext<GemstoneActionsProviderState>(initialActionsState);

export function GemstoneProvider({ children }: GemstoneProviderProps) {
  const [gemstoneState, dispatch] = useReducer(reducer, initialState);
  const [actions, setActions] = useState(initialActionsState);

  useEffect(() => {
    const searchGemstones = async (search: string) => {
      // set action adding??
      const gemstones = await service.loadGemstones(search);
      // await new Promise(resolve => setTimeout(resolve, 2000));
      dispatch({ type: "load", gemstones });
      return gemstones;
    };
    const refresh = async () => {
      // set action adding??
      dispatch({ type: "prepare" });
      const gemstones = await service.loadGemstones();
      dispatch({ type: "load", gemstones });
      return gemstones;
    };
    const addGemstone = async (gemData: Gemstone) => {
      // set action adding??
      const gemstone = await service.createGemstone(gemData);
      dispatch({ type: "add", gemstone });
      return gemstone;
    };
    const deleteGemstone = async (gemstone: Gemstone) => {
      // set action adding??
      const deleted = await service.deleteGemstone(gemstone);
      if (deleted) {
        dispatch({ type: "delete", gemstone });
      }
      return gemstone;
    };
    const updateGemstone = async (gemData: Gemstone) => {
      // set action adding??
      const gemstone = await service.updateGemstone(gemData);
      dispatch({ type: "update", gemstone });
      return gemstone;
    };

    setActions({
      addGemstone,
      deleteGemstone,
      refresh,
      searchGemstones,
      updateGemstone,
    });
  }, []);

  return (
    <GemstoneProviderContext.Provider value={gemstoneState}>
      <GemstoneActionsContext.Provider value={actions}>{children}</GemstoneActionsContext.Provider>
    </GemstoneProviderContext.Provider>
  );
}

export const useGemstones = () => {
  const context = useContext(GemstoneProviderContext);

  if (context === undefined) throw new Error("useGemstones must be used within a GemstoneProvider");

  return context;
};

export const useGemstoneActions = () => {
  const context = useContext(GemstoneActionsContext);

  if (context === undefined) throw new Error("useGemstoneActions must be used within a GemstoneProvider");

  return context;
};

function reducer(state: GemstoneProviderState, action: DispatchAction) {
  switch (action.type) {
    case "prepare": {
      return {
        loading: true,
        gemstones: [],
      };
    }
    case "load": {
      return {
        loading: false,
        gemstones: action.gemstones,
      };
    }
    case "add": {
      return {
        ...state,
        gemstones: [...state.gemstones, action.gemstone],
      };
    }
    case "delete": {
      return {
        ...state,
        gemstones: state.gemstones.filter((gem) => gem.id !== action.gemstone.id),
      };
    }
    case "update": {
      return {
        ...state,
        gemstones: state.gemstones.map((gem) => (gem.id === action.gemstone.id ? action.gemstone : gem)),
      };
    }
    default: {
      throw Error("Unknown action: " + (action as Record<string, string>).type);
    }
  }
}
