var table = null;

$(document).ready(function () {
    createDataTable();
});

function createDataTable() {
    table = $("#tableAdvogado").DataTable({
        "paging": true,
        "ordering": false,
        "search": false,
        "pageLength": 5,
        "iDisplayLength": 5,
        "lengthMenu": [[5, 10, 25, 50, 100], [5, 10, 25, 50, 100]],
        "info": false,
        "order": [[1, "asc"]],
        "language": {
            "emptyTable": "Nenhum registro encontrado",
            "lengthMenu": "Mostrar _MENU_ registros",
            "loadingRecords": "Carregando...",
            "processing": "Processando...",
            "search": "Pesquisar:",
            "zeroRecords": "Nenhum registros encontrado",
            "paginate": {
                "first": "Primeira",
                "last": "Ultima",
                "next": "Proxima",
                "previous": "Anterior"
            },
        },
        "columnDefs": [{
            "targets": 'no-sort',
            "orderable": false,
        }]
    });
}

function LimparCampos() {
    $("#ipt_id").val("0");
    $("#ipt_nome").val("");
    $("#ipt_cep").val("");
    $("#ipt_numero").val("");
    $("#ipt_rua").val("");
    $("#ipt_bairro").val("");
    $("#ipt_cidade").val("");
    $("#ipt_estado").val("");
}

function Voltar() {
    location.href = "/Home/Index";
}

function Cadastrar() {
    LimparCampos()
    $("#modal_cadastrar").modal('show')
}

$("#ipt_cep").blur(function () {

    if ($(this).val().length == 8) {

        let cep = $(this).val().replace('.', '').replace('-', '');

        $.getJSON("https://viacep.com.br/ws/" + cep + "/json/?callback=?",
            function (json) {

                $("#ipt_rua").val(json.logradouro);
                $("#ipt_bairro").val(json.bairro);
                $("#ipt_cidade").val(json.localidade);
                $("#ipt_estado").val(json.uf);

            })
            .fail(function () {
                ErroCep()
            }
            );
    }
    else {
        ErroCep()
    }
});

function ErroCep() {
    $("#ipt_rua").val("");
    $("#ipt_bairro").val("");
    $("#ipt_cidade").val("");
    $("#ipt_estado").val("");
    alert("Digite um CEP Valido")
}

function Validar() {
    $(".spn_requerid").addClass("d-none")
    $("input").css("border", " 1px solid #ced4da")

    var error = 0;

    $(".ipt_required").each(function () {
        if (!$(this).val()) {
            $(this).parent().find(".spn_requerid").removeClass("d-none")
            $(this).css("border", "1px solid red")
            error++;
        }
    })
    if (error == 0) {
        Salvar()
    }
}

function Salvar() {
    
    var id = $("#ipt_id").val();
    var nome = $("#ipt_nome").val();
    var senioridade = $("#sltc_senioridade option:selected").val();
    var cep = $("#ipt_cep").val();
    var numero = $("#ipt_numero").val();
    var rua = $("#ipt_rua").val();
    var bairro = $("#ipt_bairro").val();
    var cidade = $("#ipt_cidade").val();
    var estado = $("#ipt_estado").val();

    var formdata = new FormData();
    formdata.append("Id", id);
    formdata.append("Nome", nome);
    formdata.append("Senioridade", senioridade);
    formdata.append("Cep", cep);
    formdata.append("Numero", numero);
    formdata.append("Rua", rua);
    formdata.append("Bairro", bairro);
    formdata.append("Cidade", cidade);
    formdata.append("Estado", estado);

    var url = "/Advogados/IncluirAdvogado";
    if (id != "0") {
        url = "/Advogados/AtualizarAdvogado";
    }


    $.ajax({
        url: url,
        data: formdata,
        type: 'POST',
        processData: false,
        contentType: false,
        success: function (data) {
            
            window.location.reload();
         
        }

    })
}

function editarAdvogado(element) {
    var id = $(element).parent().parent().attr("data-idAdvogado");

    var formdata = new FormData();
    formdata.append("Id", id);

    $.ajax({
        url: '/Advogados/ObterAdvogado',
        data: formdata,
        type: 'POST',
        processData: false,
        contentType: false,
        success: function (data) {

            console.log(data.Senioridade)

            $("#sltc_senioridade option").each(function () {
                console.log($(this).val() )
                if ($(this).val() == data.Senioridade) {
                    $(this).prop("selected", "selected")
                }
            })

            $("#ipt_id").val(data.Id);
            $("#ipt_nome").val(data.Nome);
            $("#ipt_cep").val(data.Cep);
            $("#ipt_numero").val(data.Numero);
            $("#ipt_rua").val(data.Rua);
            $("#ipt_bairro").val(data.Bairro);
            $("#ipt_cidade").val(data.Cidade);
            $("#ipt_estado").val(data.Estado);

            $("#modal_cadastrar").modal('show');
        }

    })

}

function excluirAdvogado(element) {

    var id = $(element).parent().parent().attr("data-idAdvogado");

    var formdata = new FormData();
    formdata.append("Id", id);

    $.ajax({
        url: '/Advogados/ExcluirAdvogado',
        data: formdata,
        type: 'POST',
        processData: false,
        contentType: false,
        success: function (data) {
            window.location.reload();
        }

    })


}