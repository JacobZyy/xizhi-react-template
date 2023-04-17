import { atom, atomFamily, DefaultValue, selector } from "recoil";

export const testStore = atom<number>({
  key: "testStore",
  default: 1,
});

// const transformSelector = selector({
//   key: "transformSelector",
//   get: ({ get }) => {
//     const text = get(testStore);
//     return text * 100;
//   },
//   set: ({ set }, newVal) => {
//     set(testStore, newVal instanceof DefaultValue ? newVal : newVal / 100);
//   },
// });

export const readOnlyState = selector({
  key: "readOnlyState",
  get: ({ get }) => {
    const text = get(testStore);
    return text * 100;
  },
});

export const familyState = atomFamily({
  key: "familyState",
  default: 1,
});
