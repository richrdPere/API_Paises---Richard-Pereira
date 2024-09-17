import { gql } from "@apollo/client";

export const GET_COUNTRIES = gql`
  query GetCountries {
    countries {
      code
      name
      capital
      emoji
      currency
      native
      continent {
        name
      }
      languages {
        name
      }
      states {
        name
      }
      subdivisions {
        name
      }
      
    }
  }
`;
