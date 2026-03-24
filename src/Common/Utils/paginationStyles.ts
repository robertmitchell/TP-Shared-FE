import styled from 'styled-components'

/**
 * Styled component for the Tournament Scores Table Body
 */
export const TournamentTableContainer = styled.div`
  // .divide-gray-200
  --tw-divide-opacity: 1;
  border-color: rgb(229 231 235 / var(--tw-divide-opacity));

  // .divide-y
  --tw-divide-y-reverse: 0;
  border-top-width: calc(1px * calc(1 - var(--tw-divide-y-reverse)));
  border-bottom-width: calc(1px * var(--tw-divide-y-reverse));

  // .bg-white
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity));

  // .table-row-group
  display: table-row-group;

  margin-bottom: 10rem;
`

/**
 * Style component for the Pagination controls container
 */
export const ControlContainer = styled.div`
  display: flex;
  position: absolute;
  bottom: 0;
`

/**
 * Styled component for the event players cards
 */
export const PlayersContainer = styled.div`
  // .grid
  display: grid;

  // .grid-cols-1
  grid-template-columns: repeat(1, minmax(0, 1fr));

  // .gap-2
  gap: 0.5rem /* 8px */;

  // This is for the Pagination Control
  padding-bottom: 3.5rem;

  @media (min-width: 768px) {
    // .md\:grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: 1024px) {
    // .lg\:grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`

/**
 * Style component for the Pagination controls container for players
 */
export const PlayersControlContainer = styled.div`
  display: flex;
  position: sticky;
  bottom: 0;
`
