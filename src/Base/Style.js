( function ()
{
    "use strict";
    //Base.Style
    function Style( _strokeColor, _fillColor )
    {
        if ( this instanceof Style )
        {
            this.fillColor = _fillColor || new nk.Base.Color();
            this.strokeColor = _strokeColor || new nk.Base.Color();
            this.lineCap = Style.CAP.BUTT;
            this.lineJoin = Style.JOIN.BEVEL;
            this.lineWidth = 0.5;
            this.shadowColor = new nk.Base.Color();
            this.shadowBlur = 0;
            this.shadowOffset = new nk.Base.Point();
        }
        else return new Style( _strokeColor, _fillColor );
    }
    Style.prototype =
        {
            constructor: Style,
            ApplyToContext: function ( _ctx )
            {
                _ctx.lineWidth = this.lineWidth;
                _ctx.lineCap = this.lineCap;
                _ctx.lineJoin = this.lineJoin;
                _ctx.fillStyle = this.fillColor.value;
                _ctx.strokeStyle = this.strokeColor.value;
                _ctx.shadowColor = this.shadowColor.value;
                _ctx.shadowBlur = this.shadowBlur;
                _ctx.shadowOffsetX = this.shadowOffset.x;
                _ctx.shadowOffsetY = this.shadowOffset.y;
            }
        };
    Style.CAP =
        {
            BUTT: 'butt',
            ROUND: 'round',
            SQUARE: 'square'
        };
    Style.JOIN =
        {
            BEVEL: 'bevel',
            ROUND: 'round',
            MITER: 'miter'
        };
    nk.Base.Style = Style;
} () );