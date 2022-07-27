using Dominio;
using System.Collections.Generic;

namespace Repositorio.Interface
{
    public interface IAdvogadoRepositorio
    {
        IEnumerable<Advogados> ListarAdvogados();
        Advogados ObterAdvogado(int id);
        void IncluirAdvogado(Advogados advogado);
        void AtualizaAdvogado(Advogados advogado);
        void ExcluirAdvogado(int id);

    }
}
