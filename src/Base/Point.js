( function ()
{
    "use strict";
    //Base.Point
    function Point( _x, _y )
    {
        if ( this instanceof Point ) this.Set( _x, _y );
        else return new Point( _x, _y );
    }
    Point.prototype =
        {
            constructor: Point,
            CopyPoint: function () { return new Point( this ); },
            Set: function ( _x, _y )
            {
                _x = _x || 0;
                if ( typeof _x === 'object' )
                {
                    if ( _x.constructor === Array )
                    {
                        this.x = _x[ 0 ];
                        this.y = _x[ 1 ];
                    }
                    else
                    {
                        this.x = _x.x;
                        this.y = _x.y
                    }
                }
                else
                {
                    this.x = _x;
                    this.y = ( _y === undefined || _y === null ) ? _x : _y;
                }
            }
        };

    nk.Base.Point = Point;
} () );