using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using Dominio;
using Dominio.Context;
using Repositorio.Interface;
using Repositorio.Implementacao;
using Web.ViewModels;

namespace Web.Controllers
{
    public class AdvogadosController : Controller
    {
        private EFContext db = new EFContext();
        private IAdvogadoRepositorio _advogadoRepositorio = new AdvogadoRepositorio();


        public ActionResult Index()
        {
            return View(_advogadoRepositorio.ListarAdvogados());
        }        

        [HttpPost]
        public void IncluirAdvogado(AdvogadoViewModel advogadoViewModel)
        {
            _advogadoRepositorio.IncluirAdvogado(advogadoViewModel.ConverterViewModelParaModel());
        }

        [HttpPost]
        public JsonResult ObterAdvogado(int id)
        {
            Advogados advogados = _advogadoRepositorio.ObterAdvogado(id);
            return Json(advogados, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public void AtualizarAdvogado(AdvogadoViewModel advogadoViewModel)
        {
            _advogadoRepositorio.AtualizaAdvogado(advogadoViewModel.ConverterViewModelParaModel());
        }

        [HttpPost]        
        public void ExcluirAdvogado(int id)
        {
            _advogadoRepositorio.ExcluirAdvogado(id);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
