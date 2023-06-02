const bd = require ('./bd'); //para poder acessar o banco de dados

//essas funcoes sao async, pois usam funcoes que usam retornam promessas(bd.getConexao), e funcoes que esperam a conclusao(await bd.getConexao ();) 
async function inclua (RESTful)//metodo para incluir com parâmetro livro
{
    const conexao = await bd.getConexao ();
    if (conexao==null) return null;

    try
    {
        const sql     = 'INSERT INTO RESTful (id,ra,lat,log,img) VALUES (?,?,?,?,?)';
        const dados   = [RESTful.id,RESTful.ra,RESTful.lat,RESTful.log,RESTful.img];
        await conexao.query (sql, dados);
        return true;
    }
    catch (excecao)
    {
        return false;
    }
}

async function atualize (RESTful)
{
    const conexao = await bd.getConexao ();
    if (conexao==null) return null;

    try
    {
        const sql   = 'UPDATE RESTful SET ra=?,lat=?,log=?,img=? WHERE id=?';
        const dados = [RESTful.ra,RESTful.lat,RESTful.log,RESTful.img,RESTful.id];
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



