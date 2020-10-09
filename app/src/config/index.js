const config = {
  graphqlUrl: 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql',
  addressUrl:
    'https://api.digitransit.fi/geocoding/v1/autocomplete?layers=address,street&size=10&sources=oa,osm,nlsfi&boundary.rect.min_lat=59.9&boundary.rect.max_lat=60.45&boundary.rect.min_lon=24.3&boundary.rect.max_lon=25.5&text=',
  efficodeAddress: 'Pohjoinen Rautatiekatu 25::60.169443,24.926077',
};

export default config;
