( function ()
{
    "use strict";
    //Namespace.Class
    function Class()
    {
        if ( this instanceof Class )
        {
            Class.call( this ); //If inherit
        }
        else return new Class();
    }
    //THIS
    Class.prototype =
        {
            constructor: Class
        };
    //OR
    Class.prototype = Object.create( Class.prototype );
    Class.prototype.constructor = Class;

    Namespace.Class = Class;
} () );