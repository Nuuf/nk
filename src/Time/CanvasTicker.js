( function ()
{
    "use strict";
    //Timer.CanvasTicker
    function CanvasTicker( _canvas, _tps )
    {
        if ( this instanceof CanvasTicker )
        {
            nk.Time.Ticker.call( this, _tps );
            this.canvas = _canvas;
            this.clearRect = new nk.Geom.Rectangle( 0, 0, _canvas.width, _canvas.height );
            this.context = _canvas.getContext( '2d' );
            this.clear = true;
            this.fade = false;
            this.fadeColor = new nk.Base.Color(0, 0, 0, 0.1);
        }
        else return new CanvasTicker( _canvas, _tps );
    }
    CanvasTicker.prototype = Object.create( nk.Time.Ticker.prototype );
    CanvasTicker.prototype.constructor = CanvasTicker;
    CanvasTicker.prototype.Process = function ()
    {
        var ctx = this.context, rect = this.clearRect;
        if ( this.clear === true ) ctx.clearRect( rect.x, rect.y, rect.width, rect.height );
        else if ( this.fade === true )
        {
            ctx.fillStyle = this.fadeColor.value;
            ctx.fillRect( rect.x, rect.y, rect.width, rect.height );
        }
        this.CalculateDelta();
        this.Handle( ctx, this.delta );
        this.HandleTimers();
    };

    nk.Time.CanvasTicker = CanvasTicker;
} () );