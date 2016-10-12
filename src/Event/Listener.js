( function ()
{
    "use strict";
    //Event.Listener
    function Listener()
    {
        if ( this instanceof Listener )
        {
        }
        else return new Listener();
    }
    Listener.prototype =
        {
            constructor: Listener,
            On: function ( _type, _callback )
            {
                if ( typeof _callback !== 'function' ) throw new Error( 'Not a Function' );
                var list = nk.Event.Dispatcher.EventList;
                if ( !list[ _type ] )
                {
                    list[ _type ] = [];
                }
                if ( list[ _type ].indexOf( _callback ) === -1 )
                {
                    list[ _type ].push( _callback );
                    return _callback;
                }
            },
            Off: function ( _type, _callback )
            {
                if ( typeof _callback !== 'function' ) throw new Error( 'Not a Function' );
                var list = nk.Event.Dispatcher.EventList;
                if ( !list[ _type ] )
                {
                    return false;
                }
                var index = list[_type].indexOf(_callback);
                if ( index !== -1 )
                {
                    list[ _type ].splice(index, 1);
                }
            }
        };

    nk.Event.Listener = Listener;
} () );