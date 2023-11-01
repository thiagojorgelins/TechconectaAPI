const Posts = require('../models/Posts')

const exibirTodosPosts = async (req, res) => {
    try{
        const posts = await Posts.findAll()
        res.status(200).json(posts)
    } catch (erro) {
        res.status(500).json({ erro: 'Ocorreu um erro intero.'})
    }
}

const criarPost = async (req, res) => {
    try {
        const { categoria, titulo, subtitulo, conteudo, usuario_id } = req.body;

        if (!categoria || !titulo || !subtitulo || !conteudo || !usuario_id) {
            res.status(400).json({ mensagem: 'Campos inválidos ou ausentes' });
        }
        let post_image = null;

        if (req.file) {
          post_image = req.file.filename;
        }
        const novoPost = await Posts.create({
            categoria: categoria.trim(),
            titulo: titulo.trim(),
            subtitulo: subtitulo.trim(),
            conteudo: conteudo,
            usuario_id: usuario_id,
            post_image
        });

        res.status(201).json(novoPost);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Ocorreu um erro interno no servidor' })
    }
}

const exibirPost = async (req, res) => {
    try {
        const post = await Posts.findByPk(req.params.id)
        if (post) {
            res.status(200).json(post)
        } else {
            res.status(404).json({ msg: "Post não encontrado" })
        }
    } catch (error) {
        res.status(500).json({ erro: "Erro ao buscar o post" })
    }
}

const editarPost = async (req, res) => {
    const { categoria, titulo, subtitulo, conteudo } = req.body;

    try {
        const post = await Posts.findByPk(req.params.id)

        if(!post){
            return res.status(404).json({ erro: 'Post não encontrado'})
        }

        await post.update({
            categoria: categoria.trim(),
            titulo: titulo.trim(),
            subtitulo: subtitulo.trim(),
            conteudo: conteudo
        })
        res.status(200).json(post)
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao atualizar o post." });
    }
}

const deletarPost = async (req, res) => {
    try {
        await Posts.destroy({
            where: {
                id: postId
            }
        });
        res.status(200).json({ msg: 'Post deletado com sucesso' });
    } catch (erro) {
        res.status(500).json({ erro: 'Ocorreu um erro ao deletar o post.' });
    }
}

module.exports = {
    exibirTodosPosts,
    criarPost,
    exibirPost,
    editarPost,
    deletarPost
}