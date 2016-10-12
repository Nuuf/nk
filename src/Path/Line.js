( function ()
{
    "use strict";
    //Path.Line
    function Line( _x, _y, _ex, _ey )
    {
        if ( this instanceof Line )
        {
            nk.Geom.Line.call( this, _x, _y, _ex, _ey );
            this.fill = false;
            this.stroke = true;
        }
        else return new Line( _x, _y, _ex, _ey );
    }
    Line.prototype = Object.create( nk.Geom.Line.prototype );
    Line.prototype.constructor = Line;
    Line.prototype.ApplyToContext = function ( _ctx )
    {
        _ctx.beginPath();
        _ctx.moveTo( this.x, this.y );
        var e_p = this.endPoint;
        _ctx.lineTo( e_p.x, e_p.y );
        if ( this.fill === true ) _ctx.fill();
        if ( this.stroke === true ) _ctx.stroke();
    };

    nk.Path.Line = Line;
} () );