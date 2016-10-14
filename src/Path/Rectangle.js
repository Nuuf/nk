( function ()
{
    "use strict";
    //Path.Rectangle
    function Rectangle( _x, _y, _width, _height )
    {
        if ( this instanceof Rectangle )
        {
            nk.Geom.Rectangle.call( this, _x, _y, _width, _height );
            this.isCut = false;
            this.fill = false;
            this.stroke = true;
        }
        else return new Rectangle( _x, _y, _width, _height )
    }
    Rectangle.prototype = Object.create( nk.Geom.Rectangle.prototype );
    Rectangle.prototype.constructor = Rectangle;
    Rectangle.prototype.ApplyToContext = function ( _ctx )
    {
        _ctx.beginPath();
        _ctx.rect( this.x, this.y, this.width, this.height );
        if ( this.isCut === true )
        {
            _ctx.moveTo( this.x, this.y );
            _ctx.lineTo( this.x + this.width, this.y + this.height );
            _ctx.moveTo( this.x + this.width * 0.5, this.y + this.height * 0.5 );
            _ctx.lineTo( this.x + this.width, this.y + this.height * 0.5);
        }
        if ( this.fill === true ) _ctx.fill();
        if ( this.stroke === true ) _ctx.stroke();
    };
    Rectangle.prototype.Cut = function () { this.isCut = true; };
    Rectangle.prototype.GetBounds = function ()
    {
        return new nk.Geom.Rectangle( this.x, this.y, this.width, this.height );
    };

    nk.Path.Rectangle = Rectangle;
} () );