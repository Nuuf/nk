( function ()
{
    "use strict";
    //Path.Polygon
    function Polygon( _x, _y, _points )
    {
        if ( this instanceof Polygon )
        {
            nk.Geom.Polygon.call( this, _points );
            this.isCut = false;
            this.fill = false;
            this.stroke = true;
        }
        else return new Polygon( _points );
    }
    Polygon.prototype = Object.create( nk.Geom.Polygon.prototype );
    Polygon.prototype.constructor = Polygon;
    Polygon.prototype.ApplyToContext = function ( _ctx )
    {
        var i = 0, points = this.points, l = points.length, p = points[ 0 ];
        _ctx.beginPath();
        if ( p ) _ctx.moveTo( p.x, p.y );
        for ( i; i < l; ++i )
        {
            p = points[ i ];
            if ( p ) _ctx.lineTo( p.x, p.y );
        }
        _ctx.closePath();
        if ( this.fill === true ) _ctx.fill();
        if ( this.stroke === true ) _ctx.stroke();

    };
    Polygon.prototype.Cut = function () { this.isCut = true; };

    nk.Path.Polygon = Polygon;
} () );