( function ()
{
    "use strict";
    //Base.Color
    function Color( _r, _g, _b, _a )
    {
        if ( this instanceof Color )
        {
            this.channel = [];
            this.channel[ 3 ] = ( _a === undefined || _a === null ) ? 1 : _a;
            this.value = '';
            this.currentConversion = '';
            this.SetRGB( _r || 0, _g || 0, _b || 0 );
        }
        else return new Color( _r, _g, _b, _a );
    }
    Color.prototype =
        {
            constructor: Color,
            _SetValueRGBA: function ()
            {
                this.value = 'rgba(' + this.channel.join( ',' ) + ')';
            },
            _SetValueHSLA: function ()
            {
                this.value = 'hsla(' + this.channel[ 0 ] + ',' + this.channel[ 1 ] + '%,' + this.channel[ 2 ] + '%,' + this.channel[ 3 ] + ')';
            },
            _RGBToHSL()
            {
                var r = this.channel[ 0 ] / 255, g = this.channel[ 1 ] / 255, b = this.channel[ 2 ] / 255;
                var max = Math.max( r, g, b ), min = Math.min( r, g, b ), maxnmin = max - min, maxpmin = max + min;
                var h = 0, s = 0, l = maxpmin * 0.5;
                if ( max !== min )
                {

                    s = ( l > 0.5 ) ? maxnmin / ( 2 - max - min ) : maxnmin / ( max + min );

                    if ( max === r ) h = ( g - b ) / maxnmin + ( ( g < b ) ? 6 : 0 );
                    else if ( max === g ) h = ( b - r ) / maxnmin + 2;
                    else h = ( r - g ) / maxnmin + 4;

                    h /= 6;
                }
                this.channel[ 0 ] = h * 360, this.channel[ 1 ] = s * 100, this.channel[ 2 ] = l * 100;
                this._SetValueHSLA();
                this.currentConversion = 'hsl';
            },
            SetRGB: function ( _r, _g, _b )
            {
                this.channel[ 0 ] = nk.Math.Clamp( _r, 0, 255 );
                this.channel[ 1 ] = nk.Math.Clamp( _g, 0, 255 );
                this.channel[ 2 ] = nk.Math.Clamp( _b, 0, 255 );
                this._SetValueRGBA();
                this.currentConversion = 'rgb';
            },
            SetHex: function ( _hex )
            {
                var strs = _hex.match( /.{2}/g );
                strs = strs.map( function ( _value )
                {
                    return _value.b16tob10();
                });
                this.SetRGB( strs[ 0 ], strs[ 1 ], strs[ 2 ] );
            },
            ConvertToHSL: function ()
            {
                if ( this.currentConversion === 'rgb' ) this._RGBToHSL();
                else throw new Error( 'value is already HSL' );
            },
            IncreaseChannel: function ( _channel, _value )
            {
                _channel = nk.Math.Clamp( _channel, 0, 3 );
                this.channel[ _channel ] += _value;
                if ( this.currentConversion === 'rgb' ) this._SetValueRGBA();
                else if ( this.currentConversion === 'hsl' ) this._SetValueHSLA();
            }
        };

    nk.Base.Color = Color;
} () );