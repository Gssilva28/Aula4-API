
const loadingElement = document.querySelector('#loading')
const postsContainer = document.querySelector('#posts-container')
const url = "http://jsonplaceholder.typicode.com/posts"

//Pegar a url
const urlParametros = new URLSearchParams(window.location.search)
const idPost = urlParametros.get("id")
const comentariosContainer = document.querySelector('#comentarios-container')

if (!idPost) {
    BuscarTodososPosts()
} else 
{
    //Tratar aqui o método de gravar e visualizr o detalhe do post.
    BuscaPostEspecifico(idPost)
}

async function BuscarTodososPosts() {
    const resposta = await fetch(url)

    console.log(resposta)

    const data = await resposta.json()

    console.log(data)

    loadingElement.classList.add("hide")

    data.map((postagem) => {
        const div = document.createElement("div")
        const title = document.createElement("h2")
        const body = document.createElement("p")
        const link = document.createElement("a")

        title.innerText = postagem.title
        body.innerText = postagem.body
        link.innerText = "Ler"
        link.setAttribute("href",'./post.html?id=' + postagem.id)

        div.appendChild(title)
        div.appendChild(body)
        div.appendChild(link)
        postsContainer.appendChild(div)

    })
}

async function BuscaPostEspecifico(id) {
    const respostaPost = await fetch (`${url}/${id}`) //Uma forma de fazer (url + "/" + id) 
    const respostaComentario = await fetch (`${url}/${id}/comments`)

    const dataPostagem = await respostaPost.json()
    const dataComentario = await respostaComentario.json()

    const title = document.createElement("h1")
    const body = document.createElement("p")

    title.innerText = dataPostagem.title
    body.innerText = dataPostagem.body

    postsContainer.appendChild(title)
    postsContainer.appendChild(body)

    dataComentario.map((comentario) => {
        criarComentario(comentario)
    })
}

function criarComentario(comentario) {
    const divComentario = document.createElement("div")
    const email = document.createElement("h3")
    const paragrafocomentario = document.createElement("p")

    email.innerText = comentario.email
    paragrafocomentario.innerText = comentario.body

    divComentario.appendChild(email)
    divComentario.appendChild(paragrafocomentario)
    comentariosContainer.appendChild(divComentario)
}