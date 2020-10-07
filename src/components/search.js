import React, { Component } from 'react';

class Search extends Component {
  state = {
    placeholder: 'Search Destination',
    flexDirection: 'column',
  };

  swapInputDivs() {
    const flexDirection =
      this.state.flexDirection === 'column' ? 'column-reverse' : 'column';

    const placeholder =
      this.state.placeholder === 'Search Destination'
        ? 'Search Origin'
        : 'Search Destination';
    this.setState({ flexDirection, placeholder });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col col-lg-10">
            <form>
              <div
                id="search-inputs"
                style={{
                  display: 'flex',
                  flexDirection: this.state.flexDirection,
                }}
              >
                <div className="form-group" id="fixed">
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    value="Pohjoinen Rautatiekatu 25"
                    disabled
                  />
                </div>

                <div className="form-group" id="variable">
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder={this.state.placeholder}
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="col col-lg-2">
            <i
              className="fa fa-exchange align-middle"
              onClick={() => this.swapInputDivs()}
              aria-hidden="true"
            ></i>
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
