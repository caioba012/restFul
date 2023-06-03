class RESTful
{
    #ra
    #lat
    #lon
    #img

    constructor (ra, lat, lon, img)
    {
        this.ra=ra;
        this.lat=lat;
        this.lon=lon;
        this.img=img;
    }

    get ra ()
    {
        return this.#ra
    }

    get lat ()
    {
        return this.#lat
    }

    get lon ()
    {
        return this.#lon
    }

    get img ()
    {
        return this.#img
    }  

    set ra (ra)
    {
        if (ra===undefined || typeof ra !== 'string' || ra==="")
            throw ('Ra inválido');

        this.#ra = ra;
    }

    set lat (lat)
    {
        if (lat===undefined || typeof lat !== 'string' || lat==="")
            throw ('Lat inválido');

        this.#lat = lat;
    }

    set lon (lon)
    {
        if (lon===undefined || typeof lon !== 'string' || lon==="")
            throw ('lon inválido');

        this.#lon = lon;
    }
    
    set img (img)
    {
        if (img===undefined || typeof img !== 'string' || img==="")
            throw ('img inválido');

        this.#img = img;
    }
}

function novo (ra, lat, lon, img)
{
    return new RESTful (ra, lat, lon, img);
}

module.exports = {novo}
