const assert = require("assert"); 
const obtenerListaRestaurants = require('../src/js/test');
let restaurants = [];

describe('obtenerListaRestaurants', ()=>{
    it('debería indicar el tipo de restaurant', ()=>{
        assert.equal(typeof restaurants, "object");
    });
    
    it('debería devolver 0 si es que no hay restaurant', ()=>{
        assert.equal(obtenerListaRestaurants === restaurants.length, 0);
    });

    it('debería devolver la cantidad de restaurants obtenidos', ()=>{
        assert.equal(obtenerListaRestaurants === restaurants.length, 0);
    });
    it('debería  indicar si se creó una lista de restaurants', ()=>{
        assert.equal(obtenerListaRestaurants === restaurants.value, 0);
    });

});