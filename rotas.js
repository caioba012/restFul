const RESTfuls     = require ('./RESTfuls.js');
const RESTful      = require ('./RESTful.js');
const Comunicado   = require ('./comunicado.js');


// para a rota de CREATE
async function inclusao (req, res)
{
    if (Object.values(req.body).length!=5 || !req.body.id || !req.body.ra || !req.body.lat || !req.body.log || !req.body.img)
    {
        const erro = Comunicado.novo('DdI','Dados inesperados','Não foram fornecidos exatamente as 5 informações esperadas de uma RESTful (id, ra, lat, log, img)').object;
        return res.status(422).json(erro);
    }
    
    let RESTful;
    try
    {
        RESTful = RESTful.novo (req.body.id,req.body.ra,req.body.lat,req.body.log,req.body.img);
    }
    catch (excecao)
    {
        const erro = Comunicado.novo('TDE','Dados de tipos errados','ID deve ser um numero natural positivo, RA deve ser um texto não vazio, LAT deve ser um texto não vazio, LOG deve ser um texto não vazio, IMG deve ser um texto não vazio').object;
        return res.status(422).json(erro);
    }

    const ret = await RESTfuls.inclua(RESTful);

    if (ret===null)
    {
        const  erro = Comunicado.novo('CBD','Sem conexão com o BD','Não foi possível estabelecer conexão com o banco de dados').object;
        return res.status(500).json(erro);
    }

    if (ret===false)
    {
        const  erro = Comunicado.novo('DJE','Dados já existentes','Já há uma RESTful cadastrada com o id informado').object;
        return res.status(409).json(erro);
    }

  //if (ret===true)
  //{
        const  sucesso = Comunicado.novo('IBS','Inclusão bem sucedida','Os dados foram incluídos com sucesso').object;
        return res.status(201).json(sucesso);
  //}
}

// para a rota de UPDATE
async function atualizacao (req, res)
{
    if (Object.values(req.body).length!=5 || !req.body.id || !req.body.ra || !req.body.lat || !req.body.log || !req.body.img)
    {
        const erro = Comunicado.novo('DdI','Dados inesperados','Não foram fornecidos exatamente as 5 informações esperadas de uma RESTful (id atual, novo ra, novo lat, novo log e nova img)').object;
        return res.status(422).json(erro);
    }
    
    let RESTful;
    try
    {
        RESTful = RESTful.novo (req.body.id,req.body.ra,req.body.lat,req.body.log,req.body.img);
    }
    catch (excecao)
    {
        const erro = Comunicado.novo('TDE','Dados de tipos errados','ID deve ser um numero natural positivo, RA deve ser um texto não vazio, LAT deve ser um texto não vazio, LOG deve ser um texto não vazio, IMG deve ser um texto não vazio').object;
        return res.status(422).json(erro);
    }

    const id = req.params.id;
    
    if (id!=RESTful.codigo)
    {
        const erro = Comunicado.novo('TMC','Mudança de código','Tentativa de mudar o id').object;
        return res.status(400).json(erro);    
    }
    
    let ret = await RESTfuls.recupereUm(codigo);

    if (ret===null)
    {
        const  erro = Comunicado.novo('CBD','Sem conexão com o BD','Não foi possível estabelecer conexão com o banco de dados').object;
        return res.status(500).json(erro);
    }

    if (ret===false)
    {
        const  erro = Comunicado.novo('FNC','Falha no comando SQL','O comando SQL apresenta algum erro').object;
        return res.status(409).json(erro);
    }

    if (ret.length==0)
    {
        const erro = Comunicado.novo('DNE','Dados inexistentes','Não há dados cadastrados com o id informado').object;
        return res.status(404).json(erro);
    }

    ret = await RESTfuls.atualize(RESTful);

    if (ret===null)
    {
        const  erro = Comunicado.novo('CBD','Sem conexão com o BD','Não foi possível estabelecer conexão com o banco de dados').object;
        return res.status(500).json(erro);
    }

    if (ret===false)
    {
        const  erro = Comunicado.novo('FNC','Falha no comando SQL','O comando SQL apresenta algum erro').object;
        return res.status(409).json(erro);
    }

  //if (ret===true)
  //{
        const sucesso = Comunicado.novo('ABS','Alteração bem sucedida','Os dados foram atualizados com sucesso').object;
        return res.status(201).json(sucesso);
  //}
}

// para a rota de DELETE
async function remocao (req, res)
{
    if (Object.values(req.body).length!=0)
    {
        const erro = Comunicado.novo('DSP','Fornecimento de dados sem propósito','Foram fornecidos dados sem necessidade no corpo da requisição').object;
        return res.status(422).json(erro);
    }
    
    const codigo = req.params.codigo;
    let ret = await RESTfuls.recupereUm(codigo);

    if (ret===null)
    {
        const  erro = Comunicado.novo('CBD','Sem conexão com o BD','Não foi possível estabelecer conexão com o banco de dados').object;
        return res.status(500).json(erro);
    }

    if (ret===false)
    {
        const  erro = Comunicado.novo('FNC','Falha no comando SQL','O comando SQL apresenta algum erro').object;
        return res.status(409).json(erro);
    }

    if (ret.length==0)
    {
        const erro = Comunicado.novo('DNE','Dados inexistentes','Não há dados cadastrados com o código informado').object;
        return res.status(404).json(erro);
    }

    ret = await RESTfuls.remova(id);

    if (ret===null)
    {
        const  erro = Comunicado.novo('SBD','Sem conexão com o BD','Não foi possível estabelecer conexão com o banco de dados').object;
        return res.status(500).json(erro);
    }

    if (ret===false)
    {
        const  erro = Comunicado.novo('FNC','Falha no comando SQL','O comando SQL apresenta algum erro').object;
        return res.status(409).json(erro);
    }

  //if (ret===true)
  //{
        const sucesso = Comunicado.novo('RBS','Remoção bem sucedida','Os dados foram removidos com sucesso').object;
        return res.status(200).json(sucesso);
  //}    
}

// para a segunda rota de READ (um)
async function recuperacaoDeUm (req, res)
{
    if (Object.values(req.body).length!=0)
    {
        const erro = Comunicado.novo('DSP','Fornecimento de dados sem propósito','Foram fornecidos dados sem necessidade no corpo da requisição').object;
        return res.status(422).json(erro);
    }

    const id = req.params.codigo;

    const ret = await RESTfuls.recupereUm(id);

    if (ret===null)
    {
        const  erro = Comunicado.novo('SBD','Sem conexão com o BD','Não foi possível estabelecer conexão com o banco de dados').object;
        return res.status(500).json(erro);
    }

    if (ret===false)
    {
        const  erro = Comunicado.novo('FNC','Falha no comando SQL','O comando SQL apresenta algum erro').object;
        return res.status(409).json(erro);
    }

    if (ret.length==0)
    {
        const erro = Comunicado.novo('DNE','Dados inexistentes','Não há dados cadastrados com o código informado').object;
        return res.status(404).json(erro);
    }

    return res.status(200).json(ret);
}

// para a primeira rota de READ (todos)
async function recuperacaoDeTodos (req, res)
{
    if (Object.values(req.body).length!=0)
    {
        const erro = Comunicado.novo('DSP','Fornecimento de dados sem propósito','Foram fornecidos dados sem necessidade no corpo da requisição').object;
        return res.status(422).json(erro);
    }

    const ret = await RESTfuls.recupereTodos();

    if (ret===null)
    {
        const  erro = Comunicado.novo('SBD','Sem conexão com o BD','Não foi possível estabelecer conexão com o banco de dados').object;
        return res.status(500).json(erro);
    }

    if (ret===false)
    {
        const  erro = Comunicado.novo('FNC','Falha no comando SQL','O comando SQL apresenta algum erro').object;
        return res.status(409).json(erro);
    }

    return res.status(200).json(ret);
}

module.exports = {inclusao, atualizacao, remocao, recuperacaoDeUm, recuperacaoDeTodos}