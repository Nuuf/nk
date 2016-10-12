( function ()
{
    "use strict";
    //Entity.Sprite
    function Sprite( _x, _y, _texture )
    {
        if ( this instanceof Sprite )
        {
            nk.Entity.Base.call( this, _x, _y );
            this.texture = _texture || null;
            this.bounds = null;
        }
        else return new Sprite( _x, _y, _texture );
    }
    Sprite.prototype = Object.create( nk.Entity.Base.prototype );
    Sprite.prototype.Draw = function ( _ctx )
    {
        _ctx.save();
        _ctx.translate( this.x, this.y );
        _ctx.scale( this.scale.x, this.scale.y );
        _ctx.rotate( this.rotation );
        if ( this.texture ) this.texture.Draw( _ctx );
        _ctx.restore();
    };
    Sprite.prototype.CalculateBounds = function ()
    {
        this.bounds = this.texture.GetBounds();
    };
    Sprite.Circle = function ( _x, _y, _radius, _options )
    {
        _options = _options || {};
        var path = new nk.Path.Circle( 0, 0, _radius );
        if ( _options.cut === true ) path.Cut();
        var texture = new nk.Texture.Vector( path );
        var sprite = new Sprite( _x, _y, texture );
        return sprite;
    };
    Sprite.Rectangle = function ( _x, _y, _width, _height, _options )
    {
        _options = _options || {};
        var path = new nk.Path.Rectangle( -_height * 0.5, -_width * 0.5, _width, _height );
        if ( _options.cut === true ) path.Cut();
        var texture = new nk.Texture.Vector( path );
        var sprite = new Sprite( _x, _y, texture );
        sprite.CalculateBounds();
        return sprite;
    };
    Sprite.Polygon = function ( _x, _y, _points )
    {
        var path = new nk.Path.Polygon( 0, 0, _points );
        var texture = new nk.Texture.Vector( path );
        var sprite = new Sprite( _x, _y, texture );
        return sprite;
    };
    Sprite.Line = function ( _x, _y, _ex, _ey )
    {
        var path = new nk.Path.Line( _x, _y, _ex, _ey );
        var texture = new nk.Texture.Vector( path );
        var sprite = new Sprite( 0, 0, texture );
        return sprite;
    };
    Sprite.Convex = function ( _x, _y, _radius, _corners )
    {
        var path = new nk.Path.Polygon();
        path.ConstructConvex( _radius, _corners );
        var texture = new nk.Texture.Vector( path );
        var sprite = new Sprite( _x, _y, texture );
        return sprite;
    };
    Sprite.Star = function ( _x, _y, _iRadius, _oRadius, _corners )
    {
        var path = new nk.Path.Polygon();
        path.ConstructStar( _iRadius, _oRadius, _corners );
        var texture = new nk.Texture.Vector( path );
        var sprite = new Sprite( _x, _y, texture );
        return sprite
    };
    Sprite.Image = function ( _x, _y, _image )
    {
        var texture = new nk.Texture.Bitmap( _image );
        texture.offset.x = -texture.width * 0.5;
        texture.offset.y = -texture.height * 0.5;
        var sprite = new Sprite( _x, _y, texture );
        return sprite;
    };


    nk.Entity.Sprite = Sprite;
} () );