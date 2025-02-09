export type Variety = 'solid' | 'soft' | 'surface' | 'outline'

export const SIZE_LIST = ['l', 'm', 's'] as const
export type Size = typeof SIZE_LIST[number]

export type Color = 'primary'
