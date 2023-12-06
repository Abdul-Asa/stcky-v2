import { atom } from "jotai";
import { handleError, magic } from "./magic";

type UseData = {
  email: string;
  issuer: string;
  isLoggedIn: boolean;
};

export const useDataAtom = atom<UseData>({
  email: "",
  issuer: "",
  isLoggedIn: false,
});

export const loadingsAtom = atom(true);

export const isUserLoggedInAtom = atom(
  (get) => get(useDataAtom).isLoggedIn,
  (get, set, value?: boolean) => {
    if (!magic) return;
    set(loadingsAtom, true);
    if (value !== undefined) {
      set(useDataAtom, { ...get(useDataAtom), isLoggedIn: value });
    }
    magic.user
      .isLoggedIn()
      .then((isLoggedIn) => {
        set(useDataAtom, { ...get(useDataAtom), isLoggedIn });
      })
      .catch(handleError)
      .finally(() => set(loadingsAtom, false));
  }
);

export const logUserOutAtom = atom(null, (get, set) => {
  if (!magic) return;
  set(loadingsAtom, true);
  magic.user
    .logout()
    .then(() => {
      set(useDataAtom, { ...get(useDataAtom), isLoggedIn: false });
    })
    .catch(handleError)
    .finally(() => set(loadingsAtom, false));
});

export const getUserAtom = atom(
  (get) => ({ email: get(useDataAtom).email, issuer: get(useDataAtom).issuer }),
  (get, set) => {
    if (!magic) return;
    set(loadingsAtom, true);
    magic.user
      .getInfo()
      .then((data) => {
        set(useDataAtom, {
          ...get(useDataAtom),
          email: data.email ?? "",
          issuer: data.issuer ?? "",
        });
      })
      .catch(handleError)
      .finally(() => set(loadingsAtom, false));
  }
);
