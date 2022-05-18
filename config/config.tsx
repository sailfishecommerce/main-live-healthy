import { atom } from 'jotai'
import { freezeAtom } from 'jotai/utils'

import type { SetUserToken } from '@/hooks/useSearchInsights'
import type { Refinement, RefinementLayout } from '@/typings/refinements'
import { indexName } from '@/utils/env'

export type Config = typeof config

const refinementsLayoutAtom = atom<RefinementLayout>('panel')

const refinements: Refinement[] = [
  {
    type: 'hierarchical',
    header: 'Categories',
    label: 'Category',
    isExpanded: true,
    options: {
      attributes: [
        'hierarchical_categories.lvl0',
        'hierarchical_categories.lvl1',
        'hierarchical_categories.lvl2',
        'hierarchical_categories.lvl3',
      ],
    },
  },
  {
    type: 'list',
    header: 'Vendors',
    label: 'Vendor',
    options: {
      searchable: true,
      attribute: 'vendor',
      showMore: true,
    },
  },
  {
    type: 'list',
    header: 'Tags',
    label: 'Tags',
    options: {
      searchable: true,
      attribute: 'tags',
      showMore: true,
    },
  },
  {
    type: 'price',
    header: 'Price',
    label: 'Price',
    options: {
      attribute: 'sale_price',
    },
  },
  {
    type: 'rating',
    header: 'Ratings',
    label: 'Rating',
    isExpanded: true,
    options: {
      attribute: 'rating',
    },
  },
]

const sorts = [
  { value: indexName, label: 'Most popular', isDefault: true },
  { value: `${indexName}_price_asc`, label: 'Price Low to High' },
  { value: `${indexName}_price_desc`, label: 'Price High to Low' },
]

const breadcrumbAttributes = [
  'hierarchical_categories.lvl0',
  'hierarchical_categories.lvl1',
  'hierarchical_categories.lvl2',
  'hierarchical_categories.lvl3',
]

const searchParameters = {
  hitsPerPage: 10,
  maxValuesPerFacet: 20,
  attributesToSnippet: ['description:60'],
  snippetEllipsisText: '…',
  analytics: true,
  clickAnalytics: true,
}

const setUserToken: SetUserToken = (generatedUserToken, setToken) => {
  setToken(generatedUserToken)
}

const autocomplete = {
  placeholders: [
    'over 10,000',
    'hair care',
    'beauty',
    'confectionery',
    'medicines',
    'personal care',
  ],
  debouncing: 800, // in ms
  detachedMediaQuery: '(max-width: 1439px)',
}

const url = {
  debouncing: 1500, // in ms
}

const config = {
  refinementsLayoutAtom,
  refinements,
  sorts,
  breadcrumbAttributes,
  searchParameters,
  setUserToken,
  autocomplete,
  url,
}

export const configAtom = freezeAtom(atom(() => config))
