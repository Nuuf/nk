( function ()
{
    "use strict";
    //Geom.Polygon
    function Polygon( _points )
    {
        if ( this instanceof Polygon )
        {
            if ( _points )
            {
                this.points = ( _points.constructor === Array ) ? _points : [];
            }
            else this.points = [];
        }
        else return new Polygon( _points );
    }
    Polygon.prototype =
        {
            constructor: Polygon,
            CreatePoint: function ( _x, _y )
            {
                this.points.push( new nk.Base.Vector( _x, _y ) );
            },
            ConstructConvex: function ( _radius, _corners )
            {
                var i = 0, l = _corners, angle = nk.Math.PII / _corners, x, y, theta;
                for ( i; i < l; ++i )
                {
                    theta = angle * i;
                    x = Math.cos( theta ) * _radius;
                    y = Math.sin( theta ) * _radius;

                    this.CreatePoint( x, y );
                }
            },
            ConstructStar: function ( _iRadius, _oRadius, _corners )
            {
                var i = 0, l = _corners * 2, angle = Math.PI / _corners, x, y, theta, radius;
                for ( i; i < l; ++i )
                {
                    radius = ( i & 1 ) === 0 ? _oRadius : _iRadius;
                    theta = angle * i;
                    x = Math.cos( theta ) * radius;
                    y = Math.sin( theta ) * radius;

                    this.CreatePoint( x, y );
                }
            }
        };

    nk.Geom.Polygon = Polygon;
} () );