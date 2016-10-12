( function ()
{
    "use strict";
    //Event.Dispatcher
    function Dispatcher( _object )
    {
        if ( this instanceof Dispatcher )
        {
            this.target = _object;
        }
        else return new Dispatcher( _object );
    }
    Dispatcher.prototype =
        {
            constructor: Dispatcher,
            Emit: function ( _type, _data )
            {
                _data = _data || {};
                var type = Dispatcher.EventList[ _type ];
                if ( type )
                {
                    _data.target = this.target;
                    _data.type = _type;
                    for ( var index in type )
                    {
                        type[ index ]( _data );
                    }
                }
            }
        };
    Dispatcher.EventList = {};

    nk.Event.Dispatcher = Dispatcher;
} () );