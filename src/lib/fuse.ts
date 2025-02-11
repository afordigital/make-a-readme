import Fuse from 'fuse.js'

const fuseBaseOptions = {
  includeScore: true,
  threshold: 0.2,
  minMatchCharLength: 2,
  includeMatches: true
}

export function searchOverList<T>(
  items: T[],
  keysToBrowse: string[]
): {
  search: (query: string) => T[]
  updateItems: (items: T[]) => void
} {
  let fuse = new Fuse(items, { ...fuseBaseOptions, keys: keysToBrowse })

  return {
    search(query: string) {
      const searchResults = fuse.search(query)
      return searchResults.map((result) => result.item)
    },
    updateItems(newItems: T[], newKeysToBrowse: string[] = keysToBrowse) {
      fuse = new Fuse(newItems, {
        ...fuseBaseOptions,
        keys: newKeysToBrowse
      })
    }
  }
}
