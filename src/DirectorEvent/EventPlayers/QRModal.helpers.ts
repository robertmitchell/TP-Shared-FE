import type { Player } from '@/Common/Common.types'

/**
 * Builds a player from the QR Code data
 */
export const buildPlayerFromQRData = (data: any): Player => {
  return {
    average: data.player || 0,
    brackets: [],
    email: data.email || '',
    firstName: data.firstName || '',
    id: data.id,
    isMale: data.isMale || true,
    lane: '1',
    lastName: data.lastName || '',
    leagues: [],
    organizationId: data.organizationId || '',
    organizationName: data.organizationName || '',
    photo: data.photo || null,
    teams: [],
    tournaments: [],
  }
}
