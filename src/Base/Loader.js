( function ()
{
    "use strict";
    //Base.Loader
    function Loader()
    {
        if ( this instanceof Loader )
        {
            this.images = [];
        }
        else return new Loader();
    }
    Loader.prototype =
        {
            constructor: Loader,
            LoadImage: function ( _count )
            {

            },
            LoadImages: function ( _items, _onComplete )
            {
                if (!_items) throw new Error('Nothing to load');
                var images = this.images, me = this;
                function Load( _count )
                {
                    var item = _items[ _count ];
                    if ( item )
                    {
                        if ( me.GetImage( item.id ) ) throw new Error( 'Id in use or null, undefined' );
                        var image = new Image();
                        image.onload = function ()
                        {
                            this.id = item.id;
                            images.push( this );
                            Load( ++_count );
                        };
                        image.src = item.path || item.src;
                    }
                    else
                    {
                        if ( _onComplete ) _onComplete();
                    }
                }
                Load( 0 );
            },
            GetImage: function ( _id )
            {
                var i = 0, images = this.images, l = images.length, image;
                for ( i; i < l; ++i )
                {
                    image = images[ i ];
                    if ( image && image.id === _id ) return image;
                }
                return null;
            }
        };

    nk.Base.Loader = Loader;
} () );