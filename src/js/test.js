const obtenerListaRestaurants = (restaurants) => {
  
    restaurants = [];
    
      if(restaurants.lenght > 0) {
        return 'hay restaurants';
    } else if (restaurants.length < 1) {
        return 'no hay restaurants';
    }
    
      return restaurants;
    };
    
    module.exports = obtenerListaRestaurants;