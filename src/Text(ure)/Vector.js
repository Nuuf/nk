( function ()
{
    "use strict";
    //Texture.Vector
    function Vector( _path, _style )
    {
        if ( this instanceof Vector )
        {
            this.path = _path || null;
            this.style = _style || new nk.Base.Style();
        }
        else return new Vector( _path, _style );
    }
    Vector.prototype =
        {
            constructor: Vector,
            Draw: function ( _ctx )
            {
                if ( this.style ) this.style.ApplyToContext( _ctx );
                if ( this.path ) this.path.ApplyToContext( _ctx );
            },
            GetBounds: function ()
            {
                return this.path.GetBounds();
            }
        };

    nk.Texture.Vector = Vector;
} () );