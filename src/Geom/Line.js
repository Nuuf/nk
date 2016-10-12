( function ()
{
    "use strict";
    //Geom.Line
    function Line( _x, _y, _ex, _ey )
    {
        if ( this instanceof Line )
        {
            nk.Base.Vector.call( this, _x, _y );
            this.endPoint = new nk.Base.Vector( _ex, _ey );
        }
        else return new Line( _x, _y, _ex, _ey );
    }
    Line.prototype = Object.create( nk.Base.Vector.prototype );
    Line.prototype.constructor = Line;

    nk.Geom.Line = Line;
} () );