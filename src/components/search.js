import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import { QUERY_GET_TRANSPORTS } from '../graphql/queries';
import { useLazyQuery } from 'react-apollo';
import Addresses from './addresses';
import config from '../config';

const Search = () => {
  const [
    getTransportInfosFromServer,
    { loading, data: transportInfos, error },
  ] = useLazyQuery(QUERY_GET_TRANSPORTS, {
    context: {
      headers: {
        'Content-Type': 'application/graphql',
      },
      method: 'POST',
    },
  });

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

        const DEFAULT_QUERY = debouncedTerm;
        fetch(config.addressUrl + DEFAULT_QUERY)
          .then((response) => response.json())
          .then((data) => {
            if (data.features) {
              let addressList = data.features.map((element) => {
                // console.log(element);
                return element;
              });
              setAddresses(addressList);
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

  useEffect(() => {
    console.log({ type: 'addess selected' });
    getTransportInfo();
  }, [selectedAddess]);

  useEffect(() => {
    getTransportInfo();
  }, [userAddressFlexStatus]);

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
      getTransportInfosFromServer({
        variables: { fromAddress: fromAddress, toAddress: toAddress },
      });
    }
  };

  return (
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
      <div className="row">
        <div className="col col-lg-11">
          {addresses.length > 0 && (
            <Addresses
              onAddressSelect={handleAddressSelect}
              addresses={addresses}
            />
          )}
        </div>
        <div className="col col-lg-1"></div>
      </div>
    </div>
  );
};

export default Search;
