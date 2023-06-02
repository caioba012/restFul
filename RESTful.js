class RESTful
{
    #id
    #ra
    #lat
    #log
    #img

    constructor (id, ra, lat, log, img)
    {
        this.id=id;
        this.ra=ra;
        this.lat=lat;
        this.log=log;
        this.img=img;
    }

    get id ()
    {
        return this.#id
    }

    get ra ()
    {
        return this.#ra
    }

    get lat ()
    {
        return this.#lat
    }

    get log ()
    {
        return this.#log
    }

    get img ()
    {
        return this.#img
    }

    set id (id)
    {
        if (id===undefined || typeof id !== 'number' || isNaN(id) || id!==parseInt(id) || id<=0)
            throw ('Id inválido');

        this.#id = id;
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

    set log (log)
    {
        if (log===undefined || typeof log !== 'string' || log==="")
            throw ('Log inválido');

        this.#log = log;
    }
    
    set img (img)
    {
        if (img===undefined || typeof img !== 'string' || img==="")
            throw ('Ra inválido');

        this.#img = img;
    }
}

function novo (id, ra, lat, log, img)
{
    return new RESTful (id, ra, lat, log, img);
}

module.exports = {novo}
