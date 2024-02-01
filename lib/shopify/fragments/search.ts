import productFragment from './product';

const searchFragment = /* GraphQL */ `
  fragment search on Search {
    nodes {
      product {
        id
        title
        availableForSale
        selectedOptions {
          name
          value
        }
        price {
          amount
          currencyCode
        }
      }
    }
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
    totalCount
  }
  ${productFragment}
`;

export default searchFragment;
