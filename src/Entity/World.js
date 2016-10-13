( function ()
{
    "use strict";
    //Entity.World
    function World( _canvas, _offset, _scale, _begin )
    {
        if ( _canvas === undefined || _canvas === null ) throw new Error( 'A canvas is not optional' );
        if ( this instanceof World )
        {
            _scale = _scale || [ 1, 1 ];
            nk.Entity.Container.call( this, _offset );
            this.scale.Set( _scale );
            this.ticker = new nk.Time.CanvasTicker( _canvas );
            this.mouse = new nk.Input.Mouse( _canvas, _scale, _offset );
            this.mouse.onDown = this._MouseDownHandle.bind( this );
            this.mouse.onUp = this._MouseUpHandle.bind( this );
            this.mouse.onMove = this._MouseMoveHandle.bind( this );
            this.mouse.onClick = this._MouseClickHandle.bind( this );
            this.event =
                {
                    dispatcher: nk.Event.Dispatcher( this ),
                    listener: nk.Event.Listener(),
                    typeId: 'world',
                    active: true
                };

            if ( _begin === true || _begin === undefined )
            {
                this.Begin();
            }
        }
        else return new World( _canvas, _x, _y, _noBegin );
    }
    World.prototype = Object.create( nk.Entity.Container.prototype );
    World.prototype.constructor = World;
    World.prototype._WorldProcess = function ( _ctx, _delta )
    {
        this.Draw( _ctx );
        var i, children = this.children, l = children.length, child, event = this.event;
        for ( i = l - 1; i >= 0; i-- )
        {
            child = children[ i ];
            if ( child && child.onProcess )
            {
                child.onProcess( _delta );
            }
        }
        if ( event.active === true ) event.dispatcher.Emit( event.typeId + 'tick', { delta: _delta });
    };
    World.prototype._MouseDownHandle = function ( _event )
    {

    };
    World.prototype._MouseUpHandle = function ( _event )
    {

    };
    World.prototype._MouseMoveHandle = function ( _event )
    {
        var i, children = this.children, l = children.length, child, event = this.event;
        for ( i = l - 1; i >= 0; i-- )
        {
            child = children[ i ];
            if ( child && child.onMove )
            {
                if ( nk.Math.PointInSprite( _event, child ) === true )
                {
                    child.onMove();
                    break;
                }
            }
        }
        if ( event.active === true ) event.dispatcher.Emit( event.typeId + 'move', { point: _event });
    };
    World.prototype._MouseClickHandle = function ( _event )
    {
        var i, children = this.children, l = children.length, child, event = this.event;
        for ( i = l - 1; i >= 0; i-- )
        {
            child = children[ i ];
            if ( child && child.onClick )
            {
                if ( nk.Math.PointInSprite( _event, child ) === true )
                {
                    child.onClick();
                    break;
                }
            }
        }
        if ( event.active === true ) event.dispatcher.Emit( event.typeId + 'click', { point: _event });
    };
    World.prototype.Begin = function ( _tps )
    {
        this.ticker.SetTPS( _tps );
        this.ticker.Start( this._WorldProcess.bind( this ) );
    };

    nk.Entity.World = World;
} () );