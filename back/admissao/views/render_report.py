from io import BytesIO
from django.http import HttpResponse
from django.template.loader import get_template
import xhtml2pdf.pisa as pisa
from django.views.generic import View
from django.utils import timezone
from wkhtmltopdf.views import PDFTemplateResponse
from ..models import PlanoTerapeutico


class Render:

    @staticmethod
    def render(path: str, params: dict):
        template = get_template(path)
        html = template.render(params)
        response = BytesIO()
        pdf = pisa.pisaDocument(BytesIO(html.encode("UTF-8")), response)
        if not pdf.err:
            return HttpResponse(response.getvalue(), content_type='application/pdf')
        else:
            return HttpResponse("Error Rendering PDF", status=400)


# class Pdf(View):

#     def get(self, request):
#         plano = PlanoTerapeutico.objects
#         today = timezone.now()
#         params = {
#             'today': today,
#             'sales': 1231,
#             'request': request
#         }
#         return Render.render('planoTerapeutico.html', params)


class Pdf(View):

    def get(self, request):
        template = 'planoTerapeutico.html'
        # @detail_route(methods=['GET'], permission_classes=[AllowAny])
        context = dict()
        context['rows'] = '123456'
        print(' ========================== Context', context, type(context))
        response = PDFTemplateResponse(
            request=request,
            template=template,
            # filename="Atendimento-%s_GuiaConsulta.pdf"%pk,
            context=context,
            show_content_in_browser=True,
            cmd_options={'margin-top': 10,
                         "zoom": 1,
                         "viewport-size": "1366 x 513",
                         'javascript-delay': 1000,
                         "no-stop-slow-scripts": True,
                         # "collate": True,
                         "quiet": False,
                         }
            # 'quiet': None,"},
        )

        return response
