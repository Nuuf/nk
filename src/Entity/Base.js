( function ()
{
    "use strict";
    //Entity.Base
    function Base( _x, _y )
    {
        if ( this instanceof Base )
        {
            nk.Base.Vector.call( this, _x, _y );
            this.scale = new nk.Base.Vector( 1, 1 );
            this.rotation = 0;
        }
        else return new Base( _x, _y );
    }
    Base.prototype = Object.create( nk.Base.Vector.prototype );
    Base.prototype.constructor = Base;
    Base.prototype.SetRotationDegrees = function ( _degrees )
    {
        this.rotation = nk.Math.D2R( _degrees );
    };
    Base.prototype.Translate = Base.prototype.Add;

    nk.Entity.Base = Base;
} () );