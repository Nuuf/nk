( function ()
{
    "use strict";
    //Time.Ticker
    function Ticker( _tps )
    {
        if ( this instanceof Ticker )
        {
            this.intervalId = null;
            this.delta = 0;
            this.then = 0;
            this.framerate = 1000 / 60;
            this.handles = [];
            this.timers = [];
            if ( typeof _tps === 'number' ) this.SetTPS( _tps );
        }
        else return new Ticker( _tps );
    }
    Ticker.prototype =
        {
            constructor: Ticker,
            AddHandle: function ( _handle )
            {
                this.handles.push( _handle );
            },
            CalculateDelta: function ()
            {
                var now = new Date().getTime();
                this.delta = now - this.then;
                this.then = now;
            },
            Process: function ()
            {
                this.CalculateDelta();
                this.Handle( this.delta );
                this.HandleTimers();
            },
            Handle: function ()
            {
                var i = 0, handles = this.handles, l = handles.length, handle;
                for ( i; i < l; ++i )
                {
                    handle = handles[ i ];
                    if ( handle ) handle.apply( null, arguments );
                }
            },
            HandleTimers: function ()
            {
                var i = 0, timers = this.timers, l = timers.length, timer;
                for ( i; i < l; ++i )
                {
                    timer = timers[ i ];
                    if ( timer && timer.canBeDeleted === false ) timer.Process();
                    else this.timers.splice( i, 1 );
                }
            },
            Start: function ( _handle )
            {
                if ( this.intervalId ) return;
                if ( typeof _handle === 'function' ) this.AddHandle( _handle );
                this.intervalId = setInterval( this.Process.bind( this ), this.framerate );
            },
            Stop: function ()
            {
                clearInterval( this.intervalId );
                this.intervalId = null;
            },
            SetTPS: function ( _tps )
            {
                this.framerate = 1000 / _tps || this.framerate;
            },
            GetTPS: function ()
            {
                return nk.Math.PR( 1 / this.delta * 1000, 2 );
            },
            CreateTimer: function ( _stop, _onStop )
            {
                this.timers.push( new nk.Time.TickerTimer( _stop, _onStop ) );
            }
        };

    nk.Time.Ticker = Ticker;
} () );