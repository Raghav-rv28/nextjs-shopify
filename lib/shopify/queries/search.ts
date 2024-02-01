import searchFragment from '../fragments/search';

export const getSearchResultsQuery = /* GraphQL */ `
  query searchProducts($query: String!, $first: Int) {
    search(query: $query, first: $first, types: PRODUCT) {
      ...search
    }
  }
  ${searchFragment}
`;
