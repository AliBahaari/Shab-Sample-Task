import { type Item } from '@/store'

export class LocalStorage {
  public static Modify(items: Item[]) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('itemsStorage', JSON.stringify(items))
    }
  }

  public static Read() {
    if (typeof window !== 'undefined' && localStorage.getItem('itemsStorage')) {
      return JSON.parse(localStorage.getItem('itemsStorage') || '[]')
    } else {
      return []
    }
  }
}
