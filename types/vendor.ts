/**
 * @namespace ItemQuantity
 * @description Used in a number of Destiny contracts to return data about an item stack and its quantity. Can
 *     optionally return an itemInstanceId if the item is instanced - in which case, the quantity returned will be 1.
 *     If it's not... uh, let me know okay? Thanks.
 */
export type ItemQuantity = {
  itemHash: number
  itemInstanceId: number
  quantity: number
  hasConditionalVisibility: boolean
}

/**
 * @namespace VendorReceipt
 * @description If a character purchased an item that is refundable, a Vendor Receipt will be created on the user's
 *     Destiny Profile. These expire after a configurable period of time, but until then can be used to get refunds on
 *     items. BNet does not provide the ability to refund a purchase *yet*, but you know.
 */
export type VendorReceipt = {
  currencyPaid: ItemQuantity[]
  itemReceived: ItemQuantity
  licenseUnlockHash: number
  purchasedByCharacterId: number
  refundPolicy: number
  sequenceNumber: number
  timeToExpiration: number
  expiresOn: string
}
export type VendorReceipts = { receipts: VendorReceipt[] }
