using Dominio;
using Dominio.Context;
using Repositorio.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositorio.Implementacao
{
    public class AdvogadoRepositorio : IAdvogadoRepositorio
    {
        private EFContext db = new EFContext();

        public IEnumerable<Advogados> ListarAdvogados()
        {
            return db.Advogados.ToList();
        }
        public void IncluirAdvogado(Advogados advogado)
        {
            db.Advogados.Add(advogado);
            db.SaveChanges();
        }
        public Advogados ObterAdvogado(int id)
        {
            return db.Advogados.Find(id);
        }
        public void AtualizaAdvogado(Advogados advogado)
        {
            Advogados advogadosDB = db.Advogados.Find(advogado.Id);
            advogadosDB.Nome = advogado.Nome;
            advogadosDB.Senioridade = advogado.Senioridade;
            advogadosDB.Estado = advogado.Estado;
            advogadosDB.Cidade = advogado.Cidade;
            advogadosDB.Bairro = advogado.Bairro;
            advogadosDB.Cep = advogado.Cep;
            advogadosDB.Rua = advogado.Rua;
            advogadosDB.Numero = advogado.Numero;
            db.SaveChanges();
        }

        public void ExcluirAdvogado(int id)
        {
            Advogados advogados = db.Advogados.Find(id);
            db.Advogados.Remove(advogados);
            db.SaveChanges();
        }
        
    }
}
