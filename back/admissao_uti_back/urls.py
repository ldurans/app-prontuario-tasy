"""admissao_uti_back URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf.urls import url
# from rest_framework_jwt.views import obtain_jwt_token
from .jwt import obtain_jwt_token
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),

    path('admissoes/',  include('admissao.urls')),

    path('evolucoes/',  include('evolucao.urls')),

    path('avaliacoes/',  include('avaliacoes.urls')),

    path('laudos/',  include('laudos.urls')),

    path('prescricoes/',  include('prescricoes.urls')),

    # url(r'^login/', obtain_jwt_token)
    path('login/', obtain_jwt_token)

]


if settings.DEBUG:
    import debug_toolbar

    urlpatterns += [
        url(r'^__debug__/', include(debug_toolbar.urls))
    ]
