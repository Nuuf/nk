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
            this.mouse.onDownMove = this._MouseDownMoveHandle.bind( this );
            this.mouse.onOut = this._MouseOutHandle.bind( this );
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
        var event = this.event;
        this.HandleChildrenBTT( 'onProcess', _delta, false );
        if ( event.active === true ) event.dispatcher.Emit( event.typeId + 'tick', { delta: _delta });
    };
    World.prototype._MouseDownHandle = function ( _event )
    {
        var event = this.event;
        var child = this.PointInChild( _event.point );
        if ( child && child.onDown ) child.onDown( _event );
        if ( event.active === true ) event.dispatcher.Emit( event.typeId + 'down', { point: _event });
    };
    World.prototype._MouseUpHandle = function ( _event )
    {
        var event = this.event;
        var child = this.PointInChild( _event.point );
        if ( child && child.onUp ) child.onUp( _event );
        if ( event.active === true ) event.dispatcher.Emit( event.typeId + 'up', { point: _event });
    };
    World.prototype._MouseMoveHandle = function ( _event )
    {
        var event = this.event;
        var child = this.PointInChild( _event.point );
        if ( child && child.onMove ) child.onMove( _event );
        if ( event.active === true ) event.dispatcher.Emit( event.typeId + 'move', { point: _event });
    };
    World.prototype._MouseClickHandle = function ( _event )
    {
        var event = this.event;
        var child = this.PointInChild( _event.point );
        if ( child && child.onClick ) child.onClick( _event );
        if ( event.active === true ) event.dispatcher.Emit( event.typeId + 'click', { point: _event });
    };
    World.prototype._MouseDownMoveHandle = function ( _event )
    {
        var event = this.event;
        var child = this.PointInChild( _event.point );
        if ( child && child.onDownMove ) child.onDownMove( _event );
        if ( event.active === true ) event.dispatcher.Emit( event.typeId + 'downmove', { point: _event });
    };
    World.prototype._MouseOutHandle = function(_event)
    {
        var event = this.event;
        if ( event.active === true ) event.dispatcher.Emit( event.typeId + 'out', { point: _event });
    };
    World.prototype.Begin = function ( _tps )
    {
        this.ticker.SetTPS( _tps );
        this.ticker.Start( this._WorldProcess.bind( this ) );
    };

    nk.Entity.World = World;
} () );