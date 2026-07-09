export type Category = {
  id: string
  name: string
}

export type Tag = {
  id: string
  name: string
  categoryId: Category['id']
}
