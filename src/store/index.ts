import { LocalStorage } from '@/middlewares/localStorage'
import { StateCreator, StoreApi, create } from 'zustand'

export interface Item {
  id: number
  type: 'High' | 'Medium' | 'Low'
  text: string
  isCompleted: boolean
}

export interface Store {
  items: Item[]
  initializeItems: (items: Item[]) => void
  addItem: (item: Item) => void
  removeItem: (id: number) => void
  completeItem: (id: number) => void
  removeAllCompleteds: VoidFunction
}

type Middleware<T> = (
  config: StateCreator<T>,
) => (set: StoreApi<T>['setState'], get: StoreApi<T>['getState'], api: StoreApi<T>) => T

const localStorage: Middleware<Store> = (config) => (set, get, api) =>
  config(
    (args) => {
      set(args)
      LocalStorage.Modify(get().items)
    },
    get,
    api,
  )

export const useStore = create<Store>(
  localStorage((set) => ({
    items: [],
    initializeItems: (items: Item[]) => set(() => ({ items })),
    addItem: (item: Item) => set((state) => ({ items: [...state.items, item] })),
    removeItem: (id: number) =>
      set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
    completeItem: (id: number) =>
      set((state) => {
        const targetItem = state.items.find((item) => item.id === id)
        if (targetItem) {
          targetItem.isCompleted = true
        }

        return { items: state.items }
      }),
    removeAllCompleteds: () =>
      set((state) => ({
        items: state.items.filter((item) => item.isCompleted === false),
      })),
  })),
)
