( function ()
{
    "use strict";
    //Geom.Rectangle
    function Rectangle( _x, _y, _w, _h )
    {
        if ( this instanceof Rectangle )
        {
            nk.Base.Vector.call( this, _x, _y );
            this.width = _w || 0;
            this.height = _h || 0;
        }
        else return new Rectangle( _x, _y, _w, _h );
    };
    Rectangle.prototype = Object.create( nk.Base.Vector.prototype );
    Rectangle.prototype.constructor = Rectangle;
    Rectangle.prototype.GetCenterPoint = function()
    {
        return new nk.Base.Vector(this.x + (this.width * 0.5), this.y + (this.height * 0.5));
    };
    Rectangle.prototype.Centralize = function()
    {
        this.x = -this.width * 0.5;
        this.y = -this.height * 0.5;
    };

    nk.Geom.Rectangle = Rectangle;
} () );