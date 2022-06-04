import { useAtomValue, useUpdateAtom } from 'jotai/utils'
import { useCallback } from 'react'
import type { InfiniteHitsProvided } from 'react-instantsearch-core'

import { Button } from '@/components/@ui/button/button'
import { searchStateAtom } from '@instantsearch/hooks/useUrlSync'
import { isSearchStalledAtom } from '@instantsearch/widgets/virtual-state-results/virtual-state-results'

export type LoadLessProps = Pick<
  InfiniteHitsProvided<any>,
  'hasPrevious' | 'refinePrevious'
>

export function LoadLess({ hasPrevious, refinePrevious }: LoadLessProps) {
  const setSearchState = useUpdateAtom(searchStateAtom)
  const isSearchStalled = useAtomValue(isSearchStalledAtom)

  const handleGoToFirstPage = useCallback(
    () =>
      setSearchState((currentSearchState) => ({
        ...currentSearchState,
        page: 1,
      })),
    [setSearchState]
  )

  if (!hasPrevious) return null

  return (
    <div className="flex flex-col justify-center gap-2 mb-2 lg:gap-4 lg:flex-row lg:mb-7 mt-14 lg:mt-0 px-3">
      <Button
        type="secondary"
        disabled={isSearchStalled}
        onClick={handleGoToFirstPage}
      >
        Go to first page
      </Button>

      <Button
        type="primary"
        disabled={isSearchStalled}
        onClick={refinePrevious}
      >
        {isSearchStalled ? 'Loading' : 'Load previous'}
      </Button>
    </div>
  )
}
