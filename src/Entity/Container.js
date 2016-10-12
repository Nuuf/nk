( function ()
{
    "use strict";
    //Entity.Container
    function Container( _x, _y )
    {
        if ( this instanceof Container )
        {
            nk.Entity.Base.call( this, _x, _y );
            this.children = [];
            this.alpha = 1;
        }
        else return new Container( _x, _y );
    }
    Container.prototype = Object.create( nk.Entity.Base.prototype );
    Container.prototype.constructor = Container;
    Container.prototype.AddChild = function ( _child )
    {
        if ( _child.parent ) _child.parent.RemoveChild( _child );
        _child.parent = this;
        this.children.push( _child );
        return _child;
    };
    Container.prototype.AddChildren = function ( _children )
    {
        if ( _children.constructor === Array )
        {
            var i = 0, l = _children.length;
            for ( i; i < l; ++i )
            {
                this.AddChild( _children[ i ] );
            }
        }
    };
    Container.prototype.RemoveChild = function ( _child )
    {
        var index = this.children.indexOf( _child );
        if ( index !== -1 )
        {
            this.children.splice( index, 1 );
        }
    };
    Container.prototype.RemoveChildren = function ( _children )
    {
        if ( _children.constructor === Array )
        {
            var i = 0, l = _children.length;
            for ( i; i < l; ++i )
            {
                this.RemoveChild( _children[ i ] );
            }
        }
    };
    Container.prototype.Draw = function ( _ctx )
    {
        var i = 0, children = this.children, l = children.length, child;
        _ctx.save();
        _ctx.translate( this.x, this.y );
        _ctx.scale( this.scale.x, this.scale.y );
        _ctx.rotate( this.rotation );
        _ctx.globalAlpha = this.alpha;
        for ( i; i < l; ++i )
        {
            child = children[ i ];
            if ( child )
            {
                if ( typeof child.Draw === 'function' )
                {
                    child.Draw( _ctx );
                }
                else if ( typeof child.ApplyToContext === 'function' )
                {
                    child.ApplyToContext( _ctx );
                }
            }
        }
        _ctx.restore();
    };

    nk.Entity.Container = Container;
} () );