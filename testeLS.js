let produto = []

if(localStorage.prodls){
    produto = JSON.parse(localStorage.getItem('prodls'))
}

let novoProd = prompt("Digite o Produro:")

produto.push(novoProd)

localStorage.prodls = JSON.stringify(produto)

alert(produto)
