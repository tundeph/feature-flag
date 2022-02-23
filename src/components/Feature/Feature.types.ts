export type FeatureType = {
  feature: string
  status: boolean
  quantity?: number
  maxQuantity: number
  children?: {
    feature: string
    status: boolean
    quantity?: number
    maxQuantity: number
  }[]
}
