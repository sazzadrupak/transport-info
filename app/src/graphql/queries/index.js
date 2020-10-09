import { gql } from 'apollo-boost';

export const QUERY_GET_TRANSPORTS = gql`
  query Plan($fromAddress: String!, $toAddress: String!) {
    plan(
      fromPlace: $fromAddress
      toPlace: $toAddress
      numItineraries: 5
      transportModes: [
        { mode: BUS }
        { mode: RAIL }
        { mode: TRAM }
        { mode: FERRY }
        { mode: WALK }
      ]
      walkReluctance: 2.1
      walkBoardCost: 300
      minTransferTime: 600
      walkSpeed: 1.7
    ) {
      itineraries {
        walkDistance
        duration
        legs {
          mode
          startTime
          endTime
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
