(function()
{
    "use strict";
    //Base.CanvasContainer
    function CanvasContainer(_div, _width, _height)
    {
        if (this instanceof CanvasContainer)
        {
            this.div = (typeof _div === 'string') ? document.getElementById(_div) : _div;
            this.width = _width || 100;
            this.height = _height || 100;
            this.center = new nk.Base.Point(this.width * 0.5, this.height * 0.5);
        }
        else return new CanvasContainer(_div, _width, _height);
    }
    CanvasContainer.prototype = 
    {
        constructor: CanvasContainer,
        Create: function(_id)
        {
            var canvas = document.createElement('canvas');
            canvas.setAttribute('nkcid', _id);
            canvas.width = this.width;
            canvas.height = this.height;
            this.div.appendChild(canvas);
            return canvas;
        },
        Get: function(_id)
        {
            return this.div.querySelector('[nkcid="'+_id+'"]');
        },
        GetByIndex: function(_index)
        {
            return this.div.childNodes[_index];
        },
        GetIndex: function(_id) 
        {
            return Array.prototype.indexOf.call(this.div.childNodes, this.Get(_id));
        },
        SetIndex: function(_id, _index)
        {
            var canvas = this.GetByIndex(_index);
            console.log(canvas)
            this.div.insertBefore(this.Get(_id), canvas.nextSibling);
        },
        Swap: function(_id1, _id2)
        {
            var canvas1 = this.Get(_id1), canvas2 = this.Get(_id2);
            var temp = document.createElement('node');
            this.div.insertBefore(temp, canvas1);
            this.div.insertBefore(canvas1, canvas2);
            this.div.insertBefore(canvas2, temp);
            this.div.removeChild(temp);
        }
    };

    nk.Base.CanvasContainer = CanvasContainer;
}());