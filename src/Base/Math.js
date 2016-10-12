( function ()
{
    "use strict";
    nk.Math =
        {
            PII: Math.PI * 2,
            RadiansToDegrees: function ( _x )
            {
                return _x * 180 / Math.PI;
            },
            DegreesToRadians: function ( _x )
            {
                return _x * Math.PI / 180;
            }
        };
    nk.Math.R2D = nk.Math.RadiansToDegrees;
    nk.Math.D2R = nk.Math.DegreesToRadians;
    nk.Math.PrecisionRound = function ( _x, _p )
    {
        var dvis = Math.pow( 10, _p );
        return Math.round( dvis * _x ) / dvis;
    };
    nk.Math.PR = nk.Math.PrecisionRound;
    nk.Math.Spread = function ( _start, _amount, _margin, _iterator )
    {
        return ( _start - ( _margin * ( _amount - 1 ) * 0.5 ) + ( _iterator * _margin ) );
    };
    nk.Math.Clamp = function ( _c, _x, _y )
    {
        if ( _c < _x ) return _x;
        else if ( _x > _y ) return _y;
        return _c;
    };
    nk.Math.PointInSprite = function ( _point, _sprite )
    {
        var rect = _sprite.bounds;
        if ( _point.x > _sprite.x + rect.x && _point.x < _sprite.x + rect.width * 0.5 )
        {
            if ( _point.y > _sprite.y + rect.y && _point.y < _sprite.y + rect.height * 0.5 )
            {
                return true;
            }
        }
        return false;
    };


    Object.defineProperty( nk.Math, 'PII', { writable: false });
} () );
String.prototype.b16tob10 = function ()
{
    return parseInt( this, 16 );
};
Number.toHexString = function ()
{
    return this.toString( 16 );
}
Number.toBinaryString = function ()
{
    return this.toString( 2 );
}
