const bd = require ('./bd'); //para poder acessar o banco de dados

//essas funcoes sao async, pois usam funcoes que usam retornam promessas(bd.getConexao), e funcoes que esperam a conclusao(await bd.getConexao ();) 
async function inclua (restful)//metodo para incluir com parâmetro livro
{
    const conexao = await bd.getConexao ();
    if (conexao==null) return null;

    try
    {
        const sql     = 'INSERT INTO RESTful (ra,lat,lon,img) VALUES (?,?,?,?)';
        const dados   = [restful.ra,restful.lat,restful.lon,restful.img];
        await conexao.query (sql, dados);
        return true;
    }
    catch (excecao)
    {
        return false;
    }
}

async function atualize (restful)
{
    const conexao = await bd.getConexao ();
    if (conexao==null) return null;

    try
    {
        const sql   = 'UPDATE RESTful SET ra=?,lat=?,lon=?,img=? WHERE id=?';
        const dados = [restful.ra,restful.lat,restful.lon,restful.img,restful.id];
        await conexao.query (sql,dados);
        return true;
    }
    catch (excecao)
    {
        return false;
    }
}
    
async function remova (id)
{
    const conexao = await bd.getConexao ();
    if (conexao==null) return null;

    try
    {
        const sql   = 'DELETE FROM RESTful WHERE id=?';
        const dados = [id];
        await conexao.query (sql,dados);
        return true;
    }
    catch (excecao)
    {
        return false;
    }
}

async function recupereUm (id)
{
    const conexao = await bd.getConexao();
    if (conexao==null) return null;

    try
    {
        const  sql     = 'SELECT * FROM RESTful WHERE id=?';
        const  dados   = [id];
        const [linhas] = await conexao.execute(sql,dados);
        return linhas;
    }
    catch (excecao)
    {
        return false;
    }
}

async function recupereTodos ()
{
    const conexao = await bd.getConexao();
    if (conexao==null) return null;

    try
    {
        const  sql     = 'SELECT * FROM RESTful';
        const [linhas] = await conexao.query(sql);
        return linhas;
    }
    catch (excecao)
    {
        return false;
    }
}

module.exports = {inclua, atualize, remova, recupereUm, recupereTodos}



