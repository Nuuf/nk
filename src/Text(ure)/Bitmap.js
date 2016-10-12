( function ()
{
    "use strict";
    //Texture.Bitmap
    function Bitmap( _img )
    {
        if ( !_img ) throw new Error( 'No image provided' );
        if ( this instanceof Bitmap )
        {
            this.clip = new nk.Geom.Rectangle();
            this.offset = new nk.Base.Point();
            this.image = _img;
            this.width = _img.width;
            this.height = _img.height;
            this.clip.width = this.width;
            this.clip.height = this.height;
        }
        else return new Bitmap( _img );
    }
    Bitmap.prototype =
        {
            constructor: Bitmap,
            Draw: function ( _ctx )
            {
                _ctx.drawImage
                    (
                    this.image,
                    this.clip.x,
                    this.clip.y,
                    this.clip.width,
                    this.clip.height,
                    this.offset.x,
                    this.offset.y,
                    this.width,
                    this.height
                    );
            }
        };

    nk.Texture.Bitmap = Bitmap;
} () );