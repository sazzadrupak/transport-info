import { gql } from 'apollo-boost';

export const QUERY_GET_TRANSPORTS = gql`
  query Plan($fromAddress: String!, $toAddress: String!) {
    plan(
      fromPlace: $fromAddress
      toPlace: $toAddress
      transportModes: [
        { mode: BUS }
        { mode: RAIL }
        { mode: TRAM }
        { mode: FERRY }
        { mode: WALK }
        { mode: SUBWAY}
      ],
      numItineraries: 5
    ) {
      itineraries {
        walkDistance
        duration
        legs {
          mode
          startTime
          endTime
          route {
            shortName
          }
          from {
            lat
            lon
            name
            stop {
              code
              name
            }
          }
          to {
            lat
            lon
            name
            stop {
              code
              name
            }
          }
          trip {
            tripHeadsign
            routeShortName
          }
          distance
          legGeometry {
            length
            points
          }
        }
      }
    }
  }
`;
