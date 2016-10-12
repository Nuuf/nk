( function ()
{
    "use strict";
    //Input.Mouse
    function Mouse( _canvas, _scale, _noffset )
    {
        if ( this instanceof Mouse )
        {
            this.canvas = _canvas;
            this.noffset = new nk.Base.Point( _noffset );
            this.scale = new nk.Base.Point( _scale );
            this.position = new nk.Base.Point();

            this.onDown = function () { };
            this.onUp = function () { };
            this.onMove = function () { };
            this.onClick = function () { };

            this.canvas.addEventListener( 'mousedown', this._OnDown.bind( this ) );
            this.canvas.addEventListener( 'mouseup', this._OnUp.bind( this ) );
            this.canvas.addEventListener( 'mousemove', this._OnMove.bind( this ) );
            this.canvas.addEventListener( 'click', this._OnClick.bind( this ) );
        }
        else return new Mouse( _canvas );
    }
    Mouse.prototype =
        {
            constructor: Mouse,
            _OnDown: function ( _event )
            {
                this.__ProcessPosition( _event );

                this.onDown( this.position );
            },
            _OnUp: function ( _event )
            {
                this.__ProcessPosition( _event );

                this.onUp( this.position );
            },
            _OnMove: function ( _event )
            {
                this.__ProcessPosition( _event );

                this.onMove( this.position );
            },
            _OnClick: function ( _event )
            {
                this.__ProcessPosition( _event );

                this.onClick( this.position );
            },
            __ProcessPosition: function ( _event )
            {
                var x = _event.offsetX;
                var y = _event.offsetY;

                this.position.x = ( x - this.noffset.x ) / this.scale.x;
                this.position.y = ( y - this.noffset.y ) / this.scale.y;
            },
            Delete: function ()
            {

            }
        };

    nk.Input.Mouse = Mouse;
} () );