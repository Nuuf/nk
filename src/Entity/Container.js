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
    Container.prototype._ContainerDraw = function ( _ctx )
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
    Container.prototype.Draw = function ( _ctx )
    {
        this._ContainerDraw( _ctx );
    };
    Container.prototype.HandleChildrenBTT = function ( _function, _args, _break )
    {
        var i = 0, children = this.children, l = children.length, child;
        for ( i; i < l; ++i )
        {
            child = children[ i ];
            if ( child && child[ _function ] )
            {
                child[ _function ]( _args );
                if ( _break === true ) break;
            }
        }
    };
    Container.prototype.HandleChildrenTTB = function ( _function, _args, _break )
    {
        var children = this.children, i = children.length, child;
        for ( i; i >= 0; i-- )
        {
            child = children[ i ];
            if ( child && child[ _function ] )
            {
                child[ _function ]( _args );
                if ( _break === true ) break;
            }
        }
    };
    Container.prototype.PointInChild = function ( _point )
    {
        var children = this.children, i = children.length, child;
        for ( i; i >= 0; i-- )
        {
            child = children[ i ];
            if ( child )
            {
                if ( child.PointInSprite( _point ) === true )
                {
                    return child;
                }
            }
        }
    };

    nk.Entity.Container = Container;
} () );