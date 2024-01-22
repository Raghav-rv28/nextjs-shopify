import cartFragment from '../fragments/cart';

export const addToCartMutation = /* GraphQL */ `
  mutation addToCart($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        ...cart
      }
    }
  }
  ${cartFragment}
`;

export const createCartMutationOne = /* GraphQL */ `
  mutation createCart($lineItems: [CartLineInput!], $buyerIdentity: CartBuyerIdentityInput) {
    cartCreate(input: { lines: $lineItems, buyerIdentity: $buyerIdentity }) {
      cart {
        ...cart
      }
    }
  }
  ${cartFragment}
`;

export const createCartMutationTwo = /* GraphQL */ `
  mutation createCart($lineItems: [CartLineInput!], $buyerIdentity: CartBuyerIdentityInput) {
    cartCreate(input: { lines: $lineItems, buyerIdentity: $buyerIdentity }) {
      cart {
        ...cart
      }
    }
  }
  ${cartFragment}
`;
export const editCartItemsMutation = /* GraphQL */ `
  mutation editCartItems($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        ...cart
      }
    }
  }
  ${cartFragment}
`;

export const removeFromCartMutation = /* GraphQL */ `
  mutation removeFromCart($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        ...cart
      }
    }
  }
  ${cartFragment}
`;
