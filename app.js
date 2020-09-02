class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    validarDados() {
        for(let i in this) {
            if(this[i] == undefined || this[i] == '' || this[i] == null) {
                return false
            } 
        }
        return true
    }
}

class Bd {

    constructor() {
        let id = localStorage.getItem('id')

        if(id === null) {
            localStorage.setItem('id', 0)
        }
    }  

    getProximoId() {
        let proximoid = localStorage.getItem('id')
        return parseInt(proximoid) + 1
    }

    gravar(d) {
        let id = this.getProximoId()

        localStorage.setItem(id, JSON.stringify(d))

        localStorage.setItem('id', id)
    }

    recuperarTudo() {

        let despesas = Array()

        let id = localStorage.getItem('id')

        for(let i = 1; i <= id; i++) {

            let despesa = JSON.parse(localStorage.getItem(i))

            if(despesa === null) {
                continue
            }
            despesa.id = i
            despesas.push(despesa)
        }

        return despesas
    }

    pesquisar(despesa){

		let despesasFiltradas = Array()
		despesasFiltradas = this.recuperarTudo()
		console.log(despesasFiltradas);
		console.log(despesa)

		if(despesa.ano != ''){
			console.log("filtro de ano");
			despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano)
		}
			
		if(despesa.mes != ''){
			console.log("filtro de mes");
			despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes)
		}

		if(despesa.dia != ''){
			console.log("filtro de dia");
			despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia)
		}

		if(despesa.tipo != ''){
			console.log("filtro de tipo");
			despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo)
		}

		if(despesa.descricao != ''){
			console.log("filtro de descricao");
			despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao)
		}

		if(despesa.valor != ''){
			console.log("filtro de valor");
			despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor)
		}
		
		return despesasFiltradas

    }
    
    remover(id) {
		localStorage.removeItem(id)
	}
}

let bd = new Bd()

function cadastrarDespesa(){

    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    let despesa = new Despesa(
        ano.value, 
        mes.value, 
        dia.value, 
        tipo.value, 
        descricao.value, 
        valor.value
    )

    if(despesa.validarDados()) {
        bd.gravar(despesa)
        $('#sucessoGravacao').modal('show')
        ano.value = ''
        mes.value = ''
        dia.value = ''
        tipo.value = ''
        descricao.value = ''
        valor.value = ''
    } else {
        $('#erroGravacao').modal('show')
    }
    
}

function carregaLista(despesas = Array(), filtro = false) {

    if(despesas.length == 0 && filtro == false){
		despesas = bd.recuperarTudo() 
	}

    let listaDespesas = document.getElementById('listaDespesas')
    listaDespesas.innerHTML = ''
    despesas.forEach(function(d) {

        var linha = listaDespesas.insertRow()

        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}` 
		linha.insertCell(1).innerHTML = d.tipo
        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = d.valor

        let btn = document.createElement('button')
		btn.className = 'btn btn-danger'
		btn.innerHTML = '<i class="fa fa-times"></i>'
        btn.id = 'id_despesa_' + d.id
		btn.onclick = function(){
            let idFormatado = this.id.replace('id_despesa_', '')
            bd.remover(idFormatado)
            window.location.reload()
        }		
        linha.insertCell(4).append(btn)

        console.log(d)
    })
}

function pesquisarDespesa() {

    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value

    let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)

    let despesas = bd.pesquisar(despesa)

    this.carregaLista(despesas, true)
}




//SE FOSSE USAR OBJETO LITERAL
/*function cadastrarDespesa() {
    var ano = document.getElementById('ano').value
    var mes = document.getElementById('mes').value
    var dia = document.getElementById('dia').value
    var tipo = document.getElementById('tipo').value
    var descricao = document.getElementById('descricao').value
    var valor = document.getElementById('valor').value

    let Despesa = {
        ano: ano,
        mes: mes,
        dia: dia,
        tipo: tipo,
        descricao: descricao,
        valor: valor,
        }

    console.log(Despesa)
}*/

