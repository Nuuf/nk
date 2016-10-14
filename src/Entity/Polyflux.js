( function ()
{
    "use strict";
    //Entity.Polyflux
    function Polyflux()
    {
        if ( this instanceof Polyflux )
        {
            nk.Entity.Container.call( this );
        }
        else return new Polyflux();
    }
    Polyflux.prototype = Object.create( nk.Entity.Container.prototype );
    Polyflux.prototype.constructor = Polyflux;

    nk.Entity.Polyflux = Polyflux;
} () );