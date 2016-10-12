( function ()
{
    "use strict";
    //Base.Vector
    function Vector( _x, _y )
    {
        if ( this instanceof Vector )
        {
            nk.Base.Point.call( this, _x, _y );
        }
        else return new Vector( _x, _y );
    }
    Vector.prototype = Object.create( nk.Base.Point.prototype );
    Vector.prototype.constructor = Vector;
    Vector.prototype.CopyVector = function () { return new Vector( this ); };
    Vector.prototype.Add = function ( _x, _y )
    {
        _x = _x || 0;
        if ( typeof _x === 'object' )
        {
            if ( _x.constructor === Array )
            {
                this.x += _x[ 0 ];
                this.y += _x[ 1 ];
            }
            else
            {
                this.x += _x.x;
                this.y += _x.y;
            }
        }
        else
        {
            this.x += _x;
            this.y += ( _y === undefined || _y === null ) ? _x : _y;
        }
    };
    Vector.prototype.Subtract = function ( _x, _y )
    {
        _x = _x || 0;
        if ( typeof _x === 'object' )
        {
            if ( _x.constructor === Array )
            {
                this.x -= _x[ 0 ];
                this.y -= _x[ 1 ];
            }
            else
            {
                this.x -= _x.x;
                this.y -= _x.y;
            }
        }
        else
        {
            this.x -= _x;
            this.y -= ( _y === undefined || _y === null ) ? _x : _y;
        }
    };
    Vector.prototype.Multiply = function ( _x, _y )
    {
        _x = _x || 0;
        if ( typeof _x === 'object' )
        {
            if ( _x.constructor === Array )
            {
                this.x *= _x[ 0 ];
                this.y *= _x[ 1 ];
            }
            else
            {
                this.x *= _x.x;
                this.y *= _x.y;
            }
        }
        else
        {
            this.x *= _x;
            this.y *= ( _y === undefined || _y === null ) ? _x : _y;
        }
    };
    Vector.prototype.Divide = function ( _x, _y )
    {
        _x = _x || 0;
        if ( typeof _x === 'object' )
        {
            if ( _x.constructor === Array )
            {
                this.x /= _x[ 0 ];
                this.y /= _x[ 1 ];
            }
            else
            {
                this.x /= _x.x;
                this.y /= _x.y;
            }
        }
        else
        {
            this.x /= _x;
            this.y /= ( _y === undefined || _y === null ) ? _x : _y;;
        }
    };
    Vector.prototype.Normalize = function ()
    {
        var l_mag = this.GetMagnitude();
        this.Divide( l_mag, l_mag );
    };
    Vector.prototype.Absolutize = function ()
    {
        this.x = Math.abs( this.x );
        this.y = Math.abs( this.y );
    };
    Vector.prototype.Rotate = function ( _radians )
    {
        var cos = Math.cos( _radians ), sin = Math.sin( _radians );
        var x = this.x * cos - this.y * sin;
        var y = this.x * sin + this.y * cos;
        this.x = x;
        this.y = y;
    };
    Vector.prototype.RotateAbsolute = function ( _radians )
    {
        this.Rotate( _radians - this.GetAngle() );
    };
    Vector.prototype.GetMagnitude = function ()
    {
        return Math.sqrt( this.x * this.x + this.y * this.y );
    };
    Vector.prototype.GetAngle = function ()
    {
        return Math.atan2( this.y, this.x );
    };
    Vector.prototype.GetDeltaAngle = function ( _x, _y )
    {
        var v1 = this.CopyVector();
        var v2 = Vector( _x, _y );
        v1.Subtract( v2 );
        return v1.GetAngle();
    };
    Vector.prototype.GetDotProduct = function ( _x, _y )
    {
        _x = _x || 0;
        if ( typeof _x === 'object' ) 
        {
            if ( _x.constructor === Array ) return ( this.x * _v[ 0 ] + this.y * _v[ 1 ] );
            else return ( this.x * _v.x + this.y * _v.y );
        }
        else return ( this.x * _x + this.y * ( _y === undefined || _y === null ) ? _x : _y );
    };
    Vector.prototype.GetCrossProduct = function ( _x, _y )
    {
        _x = _x || 0;
        if ( typeof _x === 'object' ) 
        {
            if ( _x.constructor === Array ) return ( this.x * _v[ 1 ] - this.y * _v[ 0 ] );
            else return ( this.x * _v.y - this.y * _v.x );
        }
        else return ( this.x * ( _y === undefined || _y === null ) ? _x : _y - this.y * _x );
    };
    Vector.prototype.GetAngleBetween = function ( _x, _y )
    {
        _x = _x || 0;
        if ( typeof _x === 'object' ) 
        {
            if ( _x.constructor === Array ) return ( this.GetAngle() - Math.atan2( _x[ 1 ], _x[ 0 ] ) );
            else if ( _x.constructor === Vector ) return ( this.GetAngle() - _x.GetAngle() );
            else return ( this.GetAngle() - Math.atan2( _x.y, _x.x ) );
        }
        else return ( this.GetAngle() - Math.atan2(( _y === undefined || _y === null ) ? _x : _y, _x ) );
    };
    Vector.prototype.GetDistanceBetween = function ( _x, _y )
    {
        var copy = this.CopyVector();
        copy.Subtract( _x, _y );
        return copy.GetMagnitude();
    };


    nk.Base.Vector = Vector;
} () );