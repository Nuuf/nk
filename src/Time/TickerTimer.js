( function ()
{
    "use strict";
    //Time.TickerTimer
    function TickerTimer( _stop, _onStop )
    {
        if ( this instanceof TickerTimer )
        {
            this.time = 0;
            this.stop = _stop || 60;
            this.onStop = _onStop;
            this.canBeDeleted = false;
        }
        else return new TickerTimer( _stop, _onStop );
    }
    TickerTimer.prototype =
        {
            constructor: TickerTimer,
            Process: function ()
            {
                if ( this.time++ >= this.stop )
                {
                    this.Stop();
                }
            },
            Reset: function ( _stop, _onStop )
            {
                this.time = 0;
                this.stop = _stop || this.stop;
                this.onStop = _onStop || this.onStop;
                this.canBeDeleted = false;
            },
            Stop: function ()
            {
                this.canBeDeleted = true;
                this.onStop();
            }
        };

    nk.Time.TickerTimer = TickerTimer;
} () );