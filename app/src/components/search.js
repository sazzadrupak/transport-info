// import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import Loader from 'react-loader-spinner';
import { QUERY_GET_TRANSPORTS } from '../graphql/queries';
import { useLazyQuery } from 'react-apollo';
import Addresses from './addresses';
import config from '../config';
import TransportResult from './transportResult';
import { getDateTime } from '../utils';

const Search = () => {
  const [
    getTransportInfosFromServer,
    { loading, data: transportInfos },
  ] = useLazyQuery(QUERY_GET_TRANSPORTS, {
    context: {
      headers: {
        'Content-Type': 'application/graphql',
      },
      method: 'POST',
    },
  });

  const [searching, setSearching] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [compareTerm, setCompareTerm] = useState('');
  const [term, setTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState(term);
  const [flexDirection, setFlexDirection] = useState('column');
  const [userAddressFlexStatus, setUserAddressFlexStatus] = useState('bottom');
  const [placeholder, setPlaceholder] = useState('Search Destination');
  const [selectedAddess, setSelectedAddress] = useState('');

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedTerm(term);
    }, 700);

    return () => {
      clearTimeout(timerId);
    };
  }, [term]);

  useEffect(() => {
    const search = async () => {
      if (term && debouncedTerm && compareTerm !== term) {
        setAddresses([]);
        setSearching(true);
        const DEFAULT_QUERY = debouncedTerm;
        fetch(config.addressUrl + DEFAULT_QUERY)
          .then((response) => response.json())
          .then((data) => {
            if (data.features) {
              let addressList = data.features.map((element) => {
                return element;
              });
              setAddresses(addressList);
              setSearching(false);
            }
          });
      } else {
        setAddresses([]);
      }
    };
    search();
  }, [debouncedTerm, term, compareTerm]);

  useEffect(() => {
    setUserAddressFlexStatus(
      flexDirection !== '' && flexDirection === 'column' ? 'bottom' : 'up'
    );
  }, [flexDirection]);

  const getTransportInfo = () => {
    const { efficodeAddress } = config;
    if (selectedAddess) {
      let fromAddress;
      let toAddress;
      if (userAddressFlexStatus === 'up') {
        fromAddress = selectedAddess;
        toAddress = efficodeAddress;
      } else if (userAddressFlexStatus === 'bottom') {
        fromAddress = efficodeAddress;
        toAddress = selectedAddess;
      }
      console.log(selectedAddess);

      getTransportInfosFromServer({
        variables: {
          fromAddress: fromAddress,
          toAddress: toAddress,
          date: getDateTime.date,
          time: getDateTime.time
        },
      });
    }
  };

  useEffect(getTransportInfo, [selectedAddess]);

  useEffect(getTransportInfo, [userAddressFlexStatus]);

  const swapInputDivs = () => {
    const newFlexDirection =
      flexDirection === 'column' ? 'column-reverse' : 'column';

    const newPlaceholder =
      placeholder === 'Search Destination'
        ? 'Search Origin'
        : 'Search Destination';

    setPlaceholder(newPlaceholder);
    setFlexDirection(newFlexDirection);
  };

  const handleAddressSelect = (address) => {
    const { properties, geometry } = address;
    setTerm(properties.label);
    setCompareTerm(properties.label);
    const userSelectedAddress = `${properties.label}::${geometry.coordinates[1]},${geometry.coordinates[0]}`;
    setSelectedAddress(userSelectedAddress);
    setAddresses([]);
  };

  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col col-lg-11">
            <form>
              <div
                id="search-inputs"
                style={{
                  display: 'flex',
                  flexDirection,
                }}
              >
                <div className="form-group" id="fixed">
                  <input
                    type="text"
                    className="form-control"
                    aria-describedby="emailHelp"
                    value="Pohjoinen Rautatiekatu 25"
                    disabled
                  />
                </div>

                <div className="form-group" id="variable">
                  <input
                    type="text"
                    className="form-control"
                    id="address_input"
                    placeholder={placeholder}
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="col col-lg-1" style={{ lineHeight: '80px' }}>
            <i
              className="fa fa-exchange align-middle"
              onClick={() => swapInputDivs()}
              aria-hidden="true"
            ></i>
          </div>
        </div>

        {addresses.length > 0 && (
          <Addresses
            onAddressSelect={handleAddressSelect}
            addresses={addresses}
          />
        )}

        {transportInfos && (
          <TransportResult plans={transportInfos.plan.itineraries} />
        )}
      </div>
      {loading || searching ?
        <div id="loader">
          <Loader type="ThreeDots" color="#2BAD60" height="100" width="100" />
        </div>
        : null
      }
    </React.Fragment>
  );
};

export default Search;
