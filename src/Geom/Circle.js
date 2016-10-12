( function ()
{
    "use strict";
    //Geom.Circle
    function Circle( _x, _y, _radius )
    {
        if ( this instanceof Circle )
        {
            nk.Base.Vector.call( this, _x, _y );
            this.radius = _radius || 0;
        }
        else return new Circle( _x, _y, _radius );
    }
    Circle.prototype = Object.create( nk.Base.Vector.prototype );
    Circle.prototype.constructor = Circle;

    nk.Geom.Circle = Circle;
} () );