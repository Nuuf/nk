( function ()
{
    "use strict";
    //Path.Circle
    function Circle( _x, _y, _radius )
    {
        if ( this instanceof Circle )
        {
            nk.Geom.Circle.call( this, _x, _y, _radius );
            this.isCut = false;
            this.fill = false;
            this.stroke = true;
        }
        else return new Circle( _x, _y, _radius )
    }
    Circle.prototype = Object.create( nk.Geom.Circle.prototype );
    Circle.prototype.constructor = Circle;
    Circle.prototype.ApplyToContext = function ( _ctx )
    {
        _ctx.beginPath();
        _ctx.arc( this.x, this.y, this.radius, 0, nk.Math.PII );
        if ( this.isCut === true )
        {
            _ctx.moveTo( this.x, this.y );
            _ctx.lineTo( this.x + this.radius, this.y );
        }
        if ( this.fill === true ) _ctx.fill();
        if ( this.stroke === true ) _ctx.stroke();
    };
    Circle.prototype.Cut = function () { this.isCut = true; };

    nk.Path.Circle = Circle;
} () );