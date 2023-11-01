const Usuarios = require('../models/Usuarios')
const bcrypt = require('bcrypt')
const Posts = require('../models/Posts')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config();

const buscarUsuarios = async (req, res) => {
    try {
        const users = await Usuarios.findAll({
            attributes: { exclude: ["senha"] }
        });
        res.status(200).json(users);
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao buscar usuários" });
    }
};

const buscarUsuarioPeloID = async (req, res) => {
    try {
        const usuario = await Usuarios.findByPk(
            req.params.id,
            { attributes: { exclude: ["senha"] } }
        );
        if (usuario) {
            res.status(200).json(usuario);
        } else {
            res.status(404).json({ msg: "Usuário não encontrado" });
        }
    } catch (error) {
        res.status(500).json({ erro: "Erro ao buscar usuário" });
    }
};

const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body

    if (!nome || !email || !senha) {
        return res.status(400).json({ erro: 'Campos inválidos ou ausentes' });
    }

    const isExist = await Usuarios.findOne({ where: { email: email } });

    if (isExist) {
        return res.status(400).json({ erro: "Usuário já está cadastrado!" });
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const senha_hashed = await bcrypt.hash(senha, salt);


        const usuario = await Usuarios.create({
            nome: nome,
            email: email,
            senha: senha_hashed
        });
        token = jwt.sign({
            "id": usuario.id,
            "email": usuario.email,
            "nome": usuario.nome
        }, process.env.JWT_SECRET)
        return res.status(201).json({
            msg: "Usuário cadastrado com sucesso",
            token: token
        });

    } catch (error) {
        res.status(500).json({ erro: "Erro interno do servidor ao cadastrar o usuário." });
    }
};

const login = async (req, res) => {
    const { email, senha } = req.body
    const usuario = await Usuarios.findOne({ where: { email: email } })
    if (usuario) {
        const senha_valida = await bcrypt.compare(senha, usuario.senha)
        if (senha_valida) {
            token = jwt.sign(
                { "id": usuario.id, "nome": usuario.nome },
                process.env.JWT_SECRET,
            )
            res.status(200).json({ msg: "Login bem-sucedido", token: token, id: usuario.id })
        } else {
            res.status(401).json({ erro: "Senha incorreta" })
        }
    } else {
        res.status(404).json({ erro: "Usuário não cadastrado!" })
    }
}

const atualizarUsuario = async (req, res) => {
    const { nome, email } = req.body;

    try {
        const usuario = await Usuarios.findByPk(req.params.id,
            {
                attributes: { exclude: ["senha"] }
            });

        if (!usuario) {
            res.status(404).json({ erro: 'Usuário não encontrado' });
        }

        await usuario.update({
            nome: nome,
            email: email
        });

        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar o usuário' })
    }
}

const removerUsuario = async (req, res) => {
    try {
        await Usuarios.destroy({
            where: {
                id: req.params.id
            }
        });
        const users = await Usuarios.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao remover usuário.' })
    }
}

const exibirPostsUsuario = async (req, res) => {
    try {
        const userId = req.params.id;
        const usuario = await Usuarios.findByPk(userId);

        if (!usuario) {
            res.status(404).json({ erro: 'Usuário não encontrado' });
        }

        const userPosts = await Posts.findAll({
            where: {
                usuario_id: userId
            }
        });
        res.status(200).json(userPosts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: 'Erro ao buscar os posts do usuário' });
    }
}

module.exports = {
    buscarUsuarios,
    buscarUsuarioPeloID,
    cadastrarUsuario,
    atualizarUsuario,
    removerUsuario,
    exibirPostsUsuario,
    login,
}