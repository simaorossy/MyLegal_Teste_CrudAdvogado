using Dominio;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Web.ViewModels
{

    [Serializable]
    public class AdvogadoViewModel
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public Senioridade Senioridade { get; set; }
        public string Estado { get; set; }
        public string Cidade { get; set; }
        public string Bairro { get; set; }
        public string Cep { get; set; }
        public string Rua { get; set; }
        public string Numero { get; set; }


        public Advogados ConverterViewModelParaModel(AdvogadoViewModel viewModel)
        {
            var advogado = new Advogados()
            {
                Id = viewModel.Id,
                Nome = viewModel.Nome,
                Senioridade = viewModel.Senioridade,
                Estado = viewModel.Estado,
                Cidade = viewModel.Cidade,
                Bairro = viewModel.Bairro,
                Numero = viewModel.Numero,
                Cep = viewModel.Cep,
                Rua = viewModel.Rua
            };
            return advogado;
        }

        public Advogados ConverterViewModelParaModel()
        {
            var advogado = new Advogados()
            {
                Id = this.Id,
                Nome = this.Nome,
                Senioridade = this.Senioridade,
                Estado = this.Estado,
                Cidade = this.Cidade,
                Bairro = this.Bairro,
                Numero = this.Numero,
                Cep = this.Cep,
                Rua = this.Rua
            };
            return advogado;
        }


    }

}